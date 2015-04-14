/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/entity.html'
], function ($, _, Backbone, Handlebars, entityTemplate) {

    var EntityView = Backbone.View.extend({
        tagName: 'div',
        initialize: function () {

            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(entityTemplate);
        },
        events: {
            "click #step .btn-previous": "updateModel",
            "click #step .btn-next": "updateModel"
        },
        render: function () {
            debugger;
            var json = JSON.parse(JSON.stringify(this.model.toJSON()));
            $(this.el).empty();
            $(this.el).append(this.template(json));
            return this;
        },
        updateModel: function () {

        }
    });

    return EntityView;

});