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
  'views/query/resultsView',
  'views/query/reviewView'
], function ($, _, Backbone, QueryModel, StepByStepView, EntityView, CriteriaView, ResultsView, ReviewView) {


    /**************************************************************/
    //QueryController
    /**************************************************************/
    var QueryController = {
        start: function (entity) {
            var model = new QueryModel();
            //TODO: Update via json object.
            model.set({ "entity": entity });
            model.set(
            { "entities": ["Patent", "Inventor", "Assignee", "NBER", "CPC", "USPC"] });
            model.set({
                "outputs": [
                    { "category": "Patent", "subcategories": [{ "key": "eg 1", "value": "true" }, { "key": "eg 2", "value": "false" }, { "key": "eg 3", "value": "true" }] },
                    { "category": "Inventor", "subcategories": [{ "key": "eg 1", "value": "true" }, { "key": "eg 2", "value": "false" }, { "key": "eg 3", "value": "true" }] },
                    { "category": "Assignee", "subcategories": [{ "key": "eg 1", "value": "true" }, { "key": "eg 2", "value": "false" }, { "key": "eg 3", "value": "true" }] },
                    { "category": "Co-Inventor", "subcategories": [{ "key": "eg 1", "value": "true" }, { "key": "eg 2", "value": "false" }, { "key": "eg 3", "value": "true" }] },
                    { "category": "ETC...", "subcategories": [{ "key": "eg 1", "value": "true" }, { "key": "eg 2", "value": "false" }, { "key": "eg 3", "value": "true" }] }
                ]
            });
            $('#step-by-step-container').html('');
            StepByStepView.initialize(model);
            StepByStepView.insertView({ ref: new EntityView({ model: model }), tab: 'Entity', tabTitle: 'Step 1: Select Primary Entity' });
            StepByStepView.insertView({ ref: new CriteriaView({ model: model }), tab: 'Criteria', tabTitle: 'Step 2: Search Criteria' });
            StepByStepView.insertView({ ref: new ResultsView({ model: model }), tab: 'Results', tabTitle: 'Step 3: Output Fields' });
            StepByStepView.insertView({ ref: new ReviewView({ model: model }), tab: 'Review', tabTitle: 'Step 4: Customize Results' });
            $('#step-by-step-container').append(StepByStepView.render().el);
        }
    }

    var AppRouter = Backbone.Router.extend({
        routes: {
            "entity/:value": "start",
            //Default Route
            "*actions": "defaultRoute"
        }
    });


    var initialize = function () {
        var appRouter = new AppRouter;

        appRouter.on('route:start', function (entity) {
            QueryController.start(entity);
        });
        appRouter.on('route:defaultRoute', function (actions) {
            QueryController.start();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});