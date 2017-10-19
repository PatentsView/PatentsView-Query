/**************************************************************/
// /query app router.
/**************************************************************/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/query/queryModel',
  'views/query/stepbystepView',
  'views/query/selectCriteriaView',
  'views/query/selectResultsView',
  'views/query/previewResultsView',
  'views/overlay/overlay'
], function ($, _, Backbone, QueryModel, StepByStepView, SelectCriteriaView, SelectResultsView, previewResultsView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "step/start": "start",
            "step/:view": "step",
            "*actions": "defaultRoute"
        }
    });

    var initialize = function () {

        var appRouter = new AppRouter;
        var start = function () {
            var model = new QueryModel();
            $('#step-by-step-container').html('');
            StepByStepView.initialize(appRouter, model);
            StepByStepView.insertView({ ref: new SelectCriteriaView({ model: model, stepByStepView: StepByStepView }), tab: 'selectCriteria', tabTitle: '', hideTab: false, hideNav: true, pos: 0 });
            StepByStepView.insertView({ ref: new SelectResultsView({ model: model, stepByStepView: StepByStepView }), tab: 'selectResults', tabTitle: '', hideTab: false, hideNav: true, pos: 1 });
            StepByStepView.insertView({ ref: new previewResultsView({ model: model, stepByStepView: StepByStepView }), tab: 'previewResults', tabTitle: '', hideTab: false, hideNav: true, pos: 2 });
            StepByStepView.router = appRouter;
            $('#step-by-step-container').append(StepByStepView.render().el);
        };

        appRouter.on('route:start', function () {
            start();
        });
        appRouter.on('route:step', function (view) {
            try {
                
                StepByStepView.moveToTab(view);
            }
            catch (e) {
                
                window.location = 'index.html';//Not recoverable, start the process over again.
            }
        });
        appRouter.on('route:defaultRoute', function (actions) {
            start();
        });

        Backbone.history.start();
    };

    return { initialize: initialize };
});