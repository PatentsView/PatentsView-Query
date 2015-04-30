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
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model));

            return this;
        },
        updateModel: function () {

        }
    });

    return ReviewView;
});