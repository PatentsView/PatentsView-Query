/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/review.html'
], function ($, _, Backbone, Handlebars, reviewTemplate) {

    var ReviewView = Backbone.View.extend({
        tagName: 'section',
        id: 'review',
        className: 'step-view',
        initialize: function () {
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(reviewTemplate);

            return this;
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.toJSON()));

            return this;
        },
        updateModel: function () {

        },
        getNavHtml: function (s) {
            //s is the state requested.
            var result = '<i class="fa fa-lg fa-square-o"></i> Review and Submit';

            return result;
        }
    });

    return ReviewView;
});