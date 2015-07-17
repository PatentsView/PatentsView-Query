/**************************************************************/
// Step by step view that conrols what views get loaded in what order.
/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/query/templates/stepbystep.html',
    'recaptcha'
], function ($, _, Backbone, Handlebars, stepbystepTemplate, Recaptcha) {

    var StepByStep = (function () {

        var StepViews = function () {

            var Node = function (viewArg) {
                var next = null;
                var previous = null;
                var view = viewArg.ref;
                var tab = viewArg.tab;
                var hideTab = viewArg.hideTab || false;
                var hideNav = viewArg.hideNav || false;
                var pos = viewArg.pos;
                return {
                    setPrevious: function (node) { previous = node; return this; },
                    getPrevious: function () { return previous; },
                    setNext: function (node) { next = node; return this; },
                    getNext: function () { return next; },
                    getView: function () { return view; },
                    getTab: function () { return tab; },
                    getPos: function() { return pos;  },
                    getHideTab: function() { return hideTab; },
                    getHideNav: function () { return hideNav; },
                };
            };

            var head = null;
            var tail = null;
            var current = null;
            var list = new Array();

            return {
                all: function() { return list; },
                first: function () { return head; },
                last: function () { return tail; },
                moveNext: function () {
                    return (current !== null) ? current = current.getNext() : null;
                },
                movePrevious: function () {
                    return (current !== null) ? current = current.getPrevious() : null;
                },
                getCurrent: function () { return current; },
                getByTab: function (tab) {
                    var node = head;

                    while (node !== undefined && node !== null) {
                        if (node.getTab() !== tab) { node = node.getNext(); }
                        else {return node; }
                    }

                    return null;
                },
                insertView: function (view) {
                    var node = new Node(view);

                    if (tail === null) {
                        current = tail = head = node;
                    }
                    else {
                        tail = tail.setNext(node.setPrevious(tail)).getNext();
                    }

                    list.push(node);
                },
                setCurrentByTab: function (tab) {
                    var node = head;
                    while (node !== undefined && node !== null) {
                        if (node.getTab() !== tab) { node = node.getNext(); }
                        else { current = node; break; }
                    }
                }
            };
        };

        var StepView = Backbone.View.extend({
            tagName: 'div',
            id: 'step-by-step',
            initialize: function () {
                _.bindAll(this, 'render', 'insertView', 'save', 'routeStep');
                $(this.el).append(Handlebars.compile(stepbystepTemplate));
                this.stepViewTabs = $(this.el).find('#step-view-progress');
                this.stepViewContainer = $(this.el).find('#step-view-container');
                this.stepViews = new StepViews();
            },
            events: {
                "click .btn-previous": "routeStep",
                "click #next": "routeStep",
                "click .nav-tabs a": "routeStep",
                "click #save": "save" 
            },
            render: function () {
                var currentView = this.stepViews.getCurrent();

                if (!_.isUndefined(currentView) && !_.isNull(currentView)) {
                    if (currentView.getNext() === null) {
                        $('#next', this.el).hide();
                        $('.form-actions').show();
                        $('#captcha-container').empty();
                        $('#save').prop("disabled", true);

                        //TODO: check if this var is on the window object.
                        if (!_.isUndefined(grecaptcha) && !_.isNull(grecaptcha)) {
                            grecaptcha.render('captcha-container', {
                                'sitekey': '6LdUAAkTAAAAAIJOXjy5mx50N_cUs22JM3XNNDAs',
                                'callback': function(e) {
                                    $('#save').prop("disabled", _.isEmpty(e));
                                },
                                'expired-callback': function() {
                                    $('#save').prop("disabled", true);
                                }
                            });
                        }
                    } else {
                        $('#next', this.el).html(this.getNextHtml());
                        $('#next', this.el).show();
                        $('.form-actions').hide();
                    }
                    if (currentView.getPrevious() === null) {
                        $('.btn-previous', this.el).hide();
                    } else {
                        $('.btn-previous', this.el).show();
                    }
                    if (currentView.getHideNav()) {
                        this.stepViewTabs.hide();
                    } else {
                        this.stepViewTabs.show();
                    }

                    var tabPos = currentView.getPos();
                    var stepViewTabs = this.stepViewTabs;
                    
                    _.forEach(this.stepViews.all(), function (n) {
                        var view = n.getView();
                        var pos = n.getPos();
                        var anchor = stepViewTabs.find('li > a#' + view.id);
                        anchor.parent().attr('class', '');
                        
                        if (pos < tabPos) {
                            anchor.parent().addClass('complete');
                            anchor.empty().html(view.getNavHtml('complete'));
                        } else if (pos == tabPos) {
                            anchor.parent().addClass('active');
                            anchor.empty().html(view.getNavHtml('active'));
                        } else {
                            anchor.empty().html(view.getNavHtml());
                        }
                    });

                    //show only the current view
                    this.stepViewContainer.find('.step-view:parent').hide();
                    $(currentView.getView().render().el).show();
                }
                return this;
            },
            insertView: function (view) {
                view.tab = view.tab.replace(/\s/g, '-');

                if (!(view.hideTab || false)) {
                    this.stepViewTabs.append('<li><a id="' + view.tab + '" href="#" title="' + view.tabTitle + '"><i class="fa fa-lg fa-square-o"></i> ' + view.tabTitle + '</a></li>');
                }

                this.stepViewContainer.append($(view.ref.render().el).hide());
                this.stepViews.insertView(view);
            },
            movePrevious: function () {
                this.updateModel();
                this.stepViews.movePrevious();
                this.render();

                return false;
            },
            moveNext: function () {
                this.updateModel();
                this.stepViews.moveNext();
                this.render();

                return false;
            },
            moveToTab: function (e) {
                this.updateModel();
                this.stepViews.setCurrentByTab(e);
                this.render();

                return false;
            },
            isValid: function () {
                debugger;
                var currentView = this.stepViews.getCurrent().getView();

                return (_.isUndefined(currentView.isValid)) ? true: currentView.isValid();
            },
            updateModel: function() {
                this.stepViews.getCurrent().getView().updateModel();
            },
            save: function (e) {
                e = e || window.event;
                var source = $(e.srcElement || e.target);
                var response = (_.isUndefined(grecaptcha) || _.isNull(grecaptcha)) ? "" : grecaptcha.getResponse();
                var model = this.model.toJSON();
                var query = {
                    entityId: model.entityId,
                    groupId: model.groupId,
                    fieldId: model.fieldId,
                    outputIds: model.outputIds,
                    recipient: model.recipient,
                    resultCount: model.resultCount,
                    xml: model.xml,
                    json: model.json,
                    csv: model.csv,
                    criteria: model.criteria,
                    query: this.model.buildQuery()
                };
                $(source).prop('disabled', true);
                $(source).append('&nbsp;&nbsp;<i class="fa fa-spinner fa-pulse" />');
                $(source).prop('disabled', true);


                jQuery.ajax({
                    type: 'POST',
                    url: "querytool/query/verify.php",
                    data: { "g-recaptcha-response": response, "query": JSON.stringify(query) },
                    success: function (e) {
                        $('#submit').submit();
                    },
                    error: function (e) {
                        grecaptcha.reset();
                        $(save).html("Submit Query");
                        $(save).prop('disabled', true);
                    }
                });
            },
            routeStep: function (e) {
                e = e || window.event;
                var source = $(e.srcElement || e.target);
                var action = $(source).attr('id');
                var dest = 'start';

                if (action === 'next' ) {

                    if (!this.isValid())
                        return false;

                    var nextStep = this.stepViews.getCurrent().getNext();
                    if (!_.isUndefined(nextStep) && !_.isNull(nextStep)) {
                        dest = nextStep.getTab();
                    }
                }
                else if (action === 'previous') {
                    var prevStep = this.stepViews.getCurrent().getPrevious();
                    if (!_.isUndefined(prevStep) && !_.isNull(prevStep)) {
                        dest = prevStep.getTab();
                    }
                }
                else {
                    dest = action;
                    var destTab = this.stepViews.getByTab(dest);

                    if (destTab !== undefined)
                    {
                        if ((destTab.getPos() > this.stepViews.getCurrent().getPos()) && !this.isValid())
                            return false;
                    }
                }

                router.navigate('step/' + dest, true);

                return false;
            },
            getNextHtml: function () {
                if (!_.isUndefined(this.stepViews.getCurrent().getView().getNextHtml()))
                    return this.stepViews.getCurrent().getView().getNextHtml();

                return 'Next';
            }
        });

        var stepView = null;
        var router = null;

        return {
            initialize: function (routerArg, stepModel) {
                router = routerArg;
                stepView = new StepView({ model: stepModel });
            },
            insertView: function (view) {
                stepView.insertView(view);
            },
            movePrevious: function () { stepView.movePrevious(); },
            moveNext: function () { stepView.moveNext(); },
            moveToTab: function(e) {
                return stepView.moveToTab(e);
            },
            render: function () {
                return stepView.render();
            },
            stepEvents: function() {
                return stepView.stepViews.stepEvents();
            }
        };

    })();

    return StepByStep;
});
