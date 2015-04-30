/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/criteria.html'
], function ($, _, Backbone, Handlebars, criteriaTemplate) {

    var CriteriaView = Backbone.View.extend({
        tagName: 'div',
        initialize: function() {

            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(criteriaTemplate);
        },
        render: function() {

            var json = JSON.parse(JSON.stringify(this.model.toJSON()));
            $(this.el).empty();
            $(this.el).append(this.template(json));
            return this;
        },
        updateModel: function() {


        },
        getNextHtml: function () {
            return 'Go to Step 3 &nbsp;&nbsp; <i class="fa fa-play" />';
        }
    });

    return CriteriaView;
});