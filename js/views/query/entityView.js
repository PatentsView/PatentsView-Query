/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/entity.html',
], function ($, _, Backbone, Handlebars, entityTemplate) {

    var EntityView = Backbone.View.extend({
        tagName: 'div',
        className: 'step-view row',
        id: 'entity',
        initialize: function() {
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(entityTemplate);
        },
        events: {
            "click button.entity": "selectEntity",
            "click #step .btn-previous": "updateModel",
            "click #step .btn-next": "updateModel"
        },
        render: function() {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.get('lookups')));

            return this;
        },
        selectEntity: function (e) {
            if (!_.isNull(e)) {
                $(this.el).find('ul.entity-list > li').removeClass('active');
                $(e.currentTarget).closest('li').addClass('active');
            }
        },      
        updateModel: function (e) {
            var dataId = $(this.el).find('.active button.entity').attr('data-id');
            var lookups = this.model.get('lookups');
            var entity = _.find(lookups.entities, { "id": dataId });
            
            _.forEach(lookups.entities, function (opt) { opt.isActive = false; });

            if (!_.isNull(entity)) entity.isActive = true;

            this.model.set('entityId', dataId);
        },
        getNextHtml: function () {
            return 'Go to Step 2 &nbsp;&nbsp; <i class="fa fa-play" />';
        }
});

    return EntityView;

});