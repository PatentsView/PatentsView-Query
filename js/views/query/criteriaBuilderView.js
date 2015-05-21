/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/criteriaBuilder.html',
    'moment',
    'query-builder'
], function ($, _, Backbone, Handlebars, criteriaBuilderTemplate) {

    var CriteriaBuilderView = Backbone.View.extend({
        tagName: 'div',
        className: 'step-view row',
        id: 'criteria',
        initialize: function (options) {
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(criteriaBuilderTemplate);
        },
        render: function () {
            if (this.resetView) {
                var qb = this.model.get("qb");

                if (!_.isUndefined(qb)) {
                    qb.queryBuilder('destroy');
                }

                var filters = this.model.getFilters();

                if (!_.isNull(filters) && _.size(filters) > 0) {

                    $(this.el).empty();
                    $(this.el).append(this.template(this.model.toJSON()));

                    this.model.set("qb", $(this.el).find('#builder').queryBuilder({
                        select_placeholder: '- Select Field -',
                        filters: filters
                    }));
                }

                this.resetView = false;
            }

            return this;
        },
        updateModel: function (e) {
            debugger;
            var qb = this.model.get("qb");

            if (!_.isUndefined(qb)) {

                this.model.set("rules", [$(this.el).find('#builder').queryBuilder('getRules')]);



                //if (!qb.queryBuilder('validate')) {

                //    this.model.set("rules", qb.queryBuilder('getRules'));
                //    //TODO: (Med) Convert the rules to a format that we can pass for processing.
                //} else {
                //    //TODO: (High) Short the navigation of the view.
                //}
            }
        },
        getNavHtml: function (s) {
            var result = '<i class="fa fa-lg fa-square-o"></i> Step 2: Select Criteria';

            switch (s) {
                case "active":
                    {
                        result = '<i class="fa fa-lg fa-square-o"></i> Step 2: Select Criteria';

                        break;
                    }
                case "complete":
                    {
                        result = '<i class="fa fa-lg fa-check-square-o"></i> Step 2: Complete';

                        break;
                    }
                default: {
                    break;
                }
            }

            return result;
        },
        getNextHtml: function () {
            return 'Go to Step 3 &nbsp;&nbsp; <i class="fa fa-play" />';
        },
        entityChanged: function(e) {
            this.resetView = true;
        }
    });

    return CriteriaBuilderView;

});