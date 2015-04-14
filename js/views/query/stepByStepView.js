/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/stepbystep.html'
], function ($, _, Backbone, Handlebars, stepbystepTemplate) {

    var StepByStep = (function () {

        var StepViews = function () {

            var Node = function (view) {
                var _next = null;
                var _previous = null;
                var _view = view.ref;
                var _tab = view.tab;
                return {
                    setPrevious: function (node) { _previous = node; return this; },
                    getPrevious: function () { return _previous; },
                    setNext: function (node) { _next = node; return this; },
                    getNext: function () { return _next; },
                    getView: function () { return _view; },
                    getTab: function () { return _tab; }
                };
            };

            var _head = null;
            var _tail = null;
            var _current = null;

            return {
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
                    if (_tail === null) { // list is empty (implied head is null)
                        _current = _tail = _head = new Node(view);
                    }
                    else {//list has nodes
                        _tail = _tail.setNext(new Node(view).setPrevious(_tail)).getNext();
                    }
                },
                setCurrentByTab: function (tab) {
                    var node = _head;
                    while (node !== null) {
                        if (node.getTab() !== tab) { node = node.getNext(); }
                        else { _current = node; break; }
                    }
                }
            };
        };

        var StepView = Backbone.View.extend({
            tagName: 'div',
            initialize: function () {
                _.bindAll(this, 'render', 'movePrevious', 'moveNext', 'insertView', 'save', 'moveToTab');

                //$("#step-template").html()
                $(this.el).append(Handlebars.compile(stepbystepTemplate));
                this.stepViewTabs = $(this.el).find('#step-view-progress');
                this.stepViewContainer = $(this.el).find('#step-view-container');
                this.stepViews = new StepViews();
            },
            events: {
                "click .btn-previous": "movePrevious",
                "click .btn-next": "moveNext",
                "click .btn-save": "save",
                "click .nav-tabs a": "moveToTab"
            },
            render: function () {
                var currentView = this.stepViews.getCurrent();
                if (currentView !== null) {

                    if (currentView.getNext() === null) {
                        $('.btn-next', this.el).hide();
                        $('.form-actions', this.el).show();
                    } else {
                        $('.btn-next', this.el).show();
                        $('.form-actions', this.el).hide();
                    }
                    if (currentView.getPrevious() === null) {
                        $('.btn-previous', this.el).hide();
                    } else {
                        $('.btn-previous', this.el).show();
                    }

                    //clear the active tab css class
                    this.stepViewTabs.
                        find('li').removeClass('active');

                    //set the active tab for the current view
                    this.stepViewTabs.
                        find('a#' + currentView.getTab() + '').
                        parents('li:first').addClass('active');

                    //show only the current view
                    this.stepViewContainer.find('.step-view:parent').hide();
                    $(currentView.getView().render().el).show();

                }
                return this;
            },
            insertView: function (view) {

                var tab = view.tab;
                view.tab = view.tab.replace(/\s/g, '-');

                this.stepViewTabs.
                    append('<li><a id="' + view.tab + '" href="#' + view.tab + '" title="' + view.tabTitle + '">' + view.tabTitle + '</a></li>');

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
                e = e || window.event;
                var anchor = $(e.srcElement || e.target);
                this.updateModel();
                this.stepViews.setCurrentByTab($(anchor).attr('title'));
                this.render();
                return false;
            },
            updateModel: function () {
                this.stepViews.getCurrent().getView().updateModel();
                //favor view update method convention to force synchronous updates
            },
            save: function () {
                this.updateModel();
                alert(JSON.stringify(this.model.toJSON()));
            }
        });

        var _stepView = null;

        return {
            initialize: function (stepModel) {
                _stepView = new StepView({ model: stepModel });
            },
            insertView: function (view) {
                _stepView.insertView(view);
            },
            render: function () {
                return _stepView.render();
            }
        };

    })();

    return StepByStep;
});
