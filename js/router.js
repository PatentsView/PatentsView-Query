/**************************************************************/

/**************************************************************/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/query/querymodel',
  'views/query/stepbystepView',
  'views/query/entityView',
  'views/query/criteriaView',
  'views/query/outputsView',
  'views/query/resultsView',
  'views/query/reviewView'
], function ($, _, Backbone, QueryModel, StepByStepView, EntityView, CriteriaView, OutputsView, ResultsView, ReviewView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "step/start": "start",
            "step/:view": "step",
            //Default Route
            "*actions": "defaultRoute"
        }
    });

    var initialize = function () {
        
        var appRouter = new AppRouter;

        var start = function () {
            var model = new QueryModel();
            $('#step-by-step-container').html('');
            StepByStepView.initialize(appRouter, model);
            StepByStepView.insertView({ ref: new EntityView({ model: model }), tab: 'entity', tabTitle: 'Step 1: Select Entity', hideTab: false, hideNav: true, pos: 1 });
            StepByStepView.insertView({ ref: new CriteriaView({ model: model }), tab: 'criteria', tabTitle: 'Step 2: Search Criteria', pos: 2 });
            StepByStepView.insertView({ ref: new OutputsView({ model: model }), tab: 'outputs', tabTitle: 'Step 3: Output Fields', pos: 3 });
            StepByStepView.insertView({ ref: new ResultsView({ model: model }), tab: 'results', tabTitle: 'Step 4: Customize Results', pos: 4 });
            StepByStepView.insertView({ ref: new ReviewView({ model: model }), tab: 'review', tabTitle: 'Review', hideTab: true, hideNav: true, pos: 5 });
            
            StepByStepView.router = appRouter;
            $('#step-by-step-container').append(StepByStepView.render().el);
        };

        appRouter.on('route:start', function (entity) {
            start();
        });
        appRouter.on('route:step', function (view) {
            return StepByStepView.moveToTab(view);
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