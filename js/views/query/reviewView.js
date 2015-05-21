/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/review.html',
    'text!../../../templates/query/rules.html'
], function ($, _, Backbone, Handlebars, reviewTemplate, rulesTemplate) {

    var ReviewView = Backbone.View.extend({
        tagName: 'section',
        id: 'review',
        className: 'step-view',
        initialize: function (options) {
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
            Handlebars.registerPartial('part_rules', rulesTemplate);
            this.template = Handlebars.compile(reviewTemplate);

            return this;
        },
        render: function () {
            $(this.el).empty();
            
            //if (this.resetView) {
            //    var qb = this.model.get("qb");
            //    var rules = qb.queryBuilder("getRules"
            //, {
            //    filter_readonly: true,
            //    operator_readonly: true,
            //    value_readonly: true,
            //    no_delete: true
            //});
                
            //    var filters = this.model.getFilters();

            //    if (!_.isNull(filters) && _.size(filters) > 0) {

            //        $(this.el).empty();
            //        $(this.el).append(this.template(this.model.toJSON()));

            //        var vqb = $(this.el).find('#reviewCriteria').queryBuilder({
            //            filters: filters,
            //        });

            //        debugger;
            //        vqb.queryBuilder('setRules', rules);
            //    }

            //    this.resetView = false;
            //}

            $(this.el).append(this.template(this.model.toJSON()));

            return this;
        },
        updateModel: function () {

        },
        getNavHtml: function (s) {
            //s is the state requested.
            var result = '<i class="fa fa-lg fa-square-o"></i> Review and Submit';

            return result;
        },
        entityChanged: function(e) {
            this.resetView = true;
        }
    });

    return ReviewView;
});