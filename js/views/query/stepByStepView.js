/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/stepbystep.html',
    'recaptcha'
], function ($, _, Backbone, Handlebars, stepbystepTemplate, Recaptcha) {

    var StepByStep = (function () {

        var StepViews = function () {

            var Node = function (view) {
                var _next = null;
                var _previous = null;
                var _view = view.ref;
                var _tab = view.tab;
                var _hideTab = view.hideTab || false;
                var _hideNav = view.hideNav || false;
                var _pos = view.pos;
                return {
                    setPrevious: function (node) { _previous = node; return this; },
                    getPrevious: function () { return _previous; },
                    setNext: function (node) { _next = node; return this; },
                    getNext: function () { return _next; },
                    getView: function () { return _view; },
                    getTab: function () { return _tab; },
                    getPos: function() { return _pos;  },
                    getHideTab: function() { return _hideTab; },
                    getHideNav: function () { return _hideNav; },
                };
            };

            var _events = _({}).extend(Backbone.Events);
            var _head = null;
            var _tail = null;
            var _current = null;
            var _list = new Array();

            return {
                all: function() { return _list; },
                first: function () { return _head; },
                last: function () { return _tail; },
                moveNext: function () {
                    return (_current !== null) ? _current = _current.getNext() : null;
                }, //set current to next and return current or return null
                movePrevious: function () {
                    return (_current !== null) ? _current = _current.getPrevious() : null;
                }, //set current to previous and return current or return null
                getCurrent: function () { return _current; },
                insertView: function (view) {
                    var node = new Node(view);

                    if (_tail === null) { // list is empty (implied head is null)
                        _current = _tail = _head = node;
                    }
                    else {//list has nodes
                        _tail = _tail.setNext(node.setPrevious(_tail)).getNext();
                    }

                    _list.push(node);
                },
                setCurrentByTab: function (tab) {
                    var node = _head;
                    while (node !== null) {
                        if (node.getTab() !== tab) { node = node.getNext(); }
                        else { _current = node; break; }
                    }
                },
                stepEvents: function () {
                    return _events;
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
                "click #save": "save",
                "click .nav-tabs a": "routeStep"
            },
            render: function () {
                
                var currentView = this.stepViews.getCurrent();
                var firstView = this.stepViews.first();
                if (currentView !== null) {
                    if (currentView.getNext() === null) {
                        $('#next', this.el).hide();
                        $('.form-actions').show();

                        $('#captcha-container').empty();
                        //check if we're at this step and render and move the container.
                        var widgetid = grecaptcha.render('captcha-container', {
                            "sitekey": "6LcUEgYTAAAAAPXnyayKNTkx4nZsgQoBG52pD9_D"
                        });

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
                    
                    _.forEach(this.stepViews.all(), function (n, key) {
                        
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
                var tab = view.tab;
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
            updateModel: function () {
                this.stepViews.getCurrent().getView().updateModel();
                //favor view update method convention to force synchronous updates
            },
            save: function () {
                //
               
                //jQuery.ajax({
                //    type: 'POST', url: "verify.php", data: {}, success: function (result) {
                //        if (result) {
                //            $('#show').html('Your Form Successfully Submitted');
                //            $('.formwrap').hide(result);
                //            return true;
                //        }
                //    }
                //});
                //$('#show').html('Please Enter Valid Captcha');


                alert(JSON.stringify(this.model.toJSON()));
            },
            routeStep: function (e) {
                e = e || window.event;
                var source = $(e.srcElement || e.target);
                var action = $(source).attr('id');
                var dest = 'start';

                if (action === 'next') {
                    var nextStep = this.stepViews.getCurrent().getNext();
                    if (nextStep !== null) dest = nextStep.getTab();
                }
                else if (action === 'previous') {
                    var prevStep = this.stepViews.getCurrent().getPrevious();
                    if (prevStep !== null) dest = prevStep.getTab();
                }
                else {
                    dest = action;
                }

                _router.navigate('step/'+dest, true);

                return false;
            },
            getNextHtml: function () {
                if (!_.isUndefined(this.stepViews.getCurrent().getView().getNextHtml()))
                    return this.stepViews.getCurrent().getView().getNextHtml();

                return 'Next';//Would rather use the template instead of sending this back.
            }
        });

        var _stepView = null;
        var _router = null;

        return {
            initialize: function (router, stepModel) {
                _router = router;
                _stepView = new StepView({ model: stepModel });
            },
            insertView: function (view) {
                _stepView.insertView(view);
            },
            movePrevious: function () { _stepView.movePrevious(); },
            moveNext: function () { _stepView.moveNext(); },
            moveToTab: function(e) {
                return _stepView.moveToTab(e);
            },
            render: function () {
                return _stepView.render();
            },
            stepEvents: function() {
                return _stepView.stepViews.stepEvents();
            }

        };

    })();

    return StepByStep;
});
