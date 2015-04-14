/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/results.html'
], function ($, _, Backbone, Handlebars, resultsTemplate) {

    var ResultsView = Backbone.View.extend({
        tagName: 'div',
        initialize: function () {

            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(resultsTemplate);
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

    return ResultsView;

});