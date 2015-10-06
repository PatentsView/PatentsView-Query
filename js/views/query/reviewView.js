/**************************************************************/
// View that displays the query options and criteria that the user has built 
// prior steps submitting the query.
/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/query/templates/review.html',
    'text!views/query/templates/rules.html'
], function ($, _, Backbone, Handlebars, reviewTemplate, rulesTemplate) {

    var ReviewView = Backbone.View.extend({
        tagName: 'section',
        id: 'review',
        className: 'step-view',
        initialize: function(options) {
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
            Handlebars.registerPartial('part_rules', rulesTemplate);
            this.template = Handlebars.compile(reviewTemplate);

            return this;
        },
        render: function () {
            debugger;
            $(this.el).empty();
            $(this.el).append(this.template(this.model.toJSON()));

            return this;
        },
        updateModel: function () {
        },
        getNavHtml: function (s) {
            return '<i class="fa fa-lg fa-square-o"></i> Review and Submit';
        },
        entityChanged: function (e) {
            this.resetView = true;
        }
    });

    return ReviewView;
});