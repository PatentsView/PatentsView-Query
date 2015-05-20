/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'query-builder',
    'text!../../../templates/query/criteriaBuilder.html'
], function ($, _, Backbone, Handlebars, QueryBuilder, criteriaBuilderTemplate) {

    var CriteriaBuilderView = Backbone.View.extend({
        tagName: 'div',
        className: 'step-view row',
        id: 'builder',
        initialize: function () {
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(criteriaBuilderTemplate);
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.toJSON()));
            debugger;

            var filters = this.model.getFilters();

            if (!_.isNull(filters) && _.size(filters) > 0) {

                $(this.el).find('#builder').queryBuilder({
                    select_placeholder: '- Select Field -',
                    filters: filters
                });
            }

            return this;
        },
        updateModel: function (e) {
            
        },
        getNavHtml: function (s) {
            //s is the state requested.
            var result = '<i class="fa fa-lg fa-square-o"></i> testing';

            //switch (s) {
            //    case "active":
            //        {
            //            result = '<i class="fa fa-lg fa-square-o"></i> Step 1: Select Entity';

            //            break;
            //        }
            //    case "complete":
            //        {
            //            result = '<i class="fa fa-lg fa-check-square-o"></i> Step 1: ' + this.model.get('entityName');

            //            break;
            //        }
            //    default: {
            //        break;
            //    }
            //}


            return result;
        },
        getNextHtml: function () {
            return 'Go to Step 3 &nbsp;&nbsp; <i class="fa fa-play" />';
        }

    });

    return CriteriaBuilderView;

});