/**************************************************************/
// View that enables the user to select the primary entity to build a query for.
/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/query/templates/entity.html'
], function ($, _, Backbone, Handlebars, entityTemplate) {

    var EntityView = Backbone.View.extend({
        tagName: 'div',
        className: 'step-view row',
        id: 'entity',
        initialize: function (options) {
            _.bindAll(this, 'render');
            this.template = Handlebars.compile(entityTemplate);
        },
        events: {
            "click button.entity": "selectEntity",
            "click #step .btn-previous": "updateModel",
            "click #step .btn-next": "moveNext",
            "click #accordion a": "block",
        },
        render: function () {
            debugger;
            $(this.el).empty();
            $(this.el).append(this.template(this.model.get('entities')));
            //Add logic to select the entity if one has been selected.
            
            return this;
        },
        block: function (e) {
            e.preventDefault();
            $(this.el).find('.panel-collapse').removeClass('in');
            $(this.el).find('.collapsed').removeClass('collapsed');
            $($(e.currentTarget).addClass('collapsed').attr('data-target')).addClass('in');
            var dataId = $(e.currentTarget).parent().attr('data-id');
            var entityId = this.model.get('entityId');

            return false;
        },
        selectEntity: function (e) {
            var dataId = $(e.currentTarget).attr('data-id');
            var entityId = this.model.get('entityId');

            if ((!_.isUndefined(entityId) && !_.isEmpty(entityId)) && dataId != entityId) {
                $('.entity-change-modal').find('.ok').on('click', function () {
                    $('.entity-change-modal').modal('hide');
                    $(e.currentTarget).closest('ul.entity-list').find('li').removeClass('active');
                    $(e.currentTarget).closest('li').addClass('active');
                });
                $('.entity-change-modal').modal('show');
            } else {
                $(e.currentTarget).closest('ul.entity-list').find('li').removeClass('active');
                $(e.currentTarget).closest('li').addClass('active');
            }
        },
        isValid: function()
        {
            return (!_.isUndefined($(this.el).find('.in').parent().attr('data-id')));
        },
        updateModel: function () {
            var dataId = $(this.el).find('.in').parent().attr('data-id');

            //Check if the entityId has changed.
            if (dataId != this.model.get('entityId')) {
                var entities = this.model.get('entities');
                var entity = _.find(entities, { "id": dataId });

                _.forEach(entities, function(opt) { opt.isActive = false; });

                if (!_.isNull(entity)) {
                    entity.isActive = true;
                }

                this.model.trigger('entityChanged', dataId);
                this.model.set('entityId', dataId);
                this.model.set('entityName', entity.name);
                this.model.set('url', entity.url);
                this.model.set('outputs', this.model.getOutputs());
                this.model.set('sorts', this.model.getSorts());
            }
        },
        getNavHtml: function (s) {
            //s is the state requested.
            var result = '<i class="fa fa-lg fa-square-o"></i> Step 1: Select Entity';

            switch (s) {
                case "active":
                    {
                        result = '<i class="fa fa-lg fa-square-o"></i> Step 1: Select Entity';
                    
                        break;
                    }
                case "complete":
                    {
                        result = '<i class="fa fa-lg fa-check-square-o"></i> Step 1: '+ this.model.get('entityName')  ;

                        break;
                    }
                default:{
                    break;
                }
            }

            return result;
        },
        getNextHtml: function () {
            return 'Go to Step 2 &nbsp;&nbsp; <i class="fa fa-play" />';
        }
    });

    return EntityView;

});