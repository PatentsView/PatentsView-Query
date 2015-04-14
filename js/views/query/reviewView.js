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
        tagName: 'div',
        initialize: function () {

            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(reviewTemplate);
        },
        render: function () {

            var json = JSON.parse(JSON.stringify(this.model.toJSON()));
            $(this.el).empty();
            $(this.el).append(this.template(json));
            return this;
        },
        updateModel: function () {


        }
    });

    return ReviewView;

});