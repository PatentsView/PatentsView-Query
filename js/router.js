/**************************************************************/
// /query app router.
/**************************************************************/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/query/queryModel',
  'views/query/stepbystepView',
  'views/query/entityView',
  'views/query/outputsView',
  'views/query/resultsView',
  'views/query/reviewView',
  'views/query/criteriaView',
  'views/overlay/overlay'
], function ($, _, Backbone, QueryModel, StepByStepView, EntityView, OutputsView, ResultsView, ReviewView, CriteriaView) {

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
            StepByStepView.insertView({ ref: new EntityView({ model: model, stepByStepView: StepByStepView }), tab: 'entity', tabTitle: 'Step 1: Select Output Fields', hideTab: false, hideNav: true, pos: 0 });
            StepByStepView.insertView({ ref: new CriteriaView({ model: model, stepByStepView: StepByStepView }), tab: 'criteria', tabTitle: 'Step 2: Search Criteria', pos: 1 });
            //StepByStepView.insertView({ ref: new OutputsView({ model: model, stepByStepView: StepByStepView }), tab: 'outputs', tabTitle: 'Step 3: Output Fields', pos: 2 });
            StepByStepView.insertView({ ref: new ResultsView({ model: model, stepByStepView: StepByStepView }), tab: 'results', tabTitle: 'Step 3: Customize Results', pos: 2 });
            StepByStepView.insertView({ ref: new ReviewView({ model: model, stepByStepView: StepByStepView }), tab: 'review', tabTitle: 'Review', hideTab: true, hideNav: true, pos: 3 });
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

    return {
        initialize: initialize
    };
});