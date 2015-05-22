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
        className: 'step-view row',
        id: 'entity',
        initialize: function (options) {
            _.bindAll(this, 'render');
            this.template = Handlebars.compile(entityTemplate);
        },
        events: {
            "click button.entity": "selectEntity",
            "click #step .btn-previous": "updateModel",
            "click #step .btn-next": "moveNext"
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.get('entities')));

            return this;
        },
        selectEntity: function (e) {
            if (!_.isNull(e)) {
                $(this.el).find('ul.entity-list > li').removeClass('active');
                $(e.currentTarget).closest('li').addClass('active');
            }
        },
        isValid: function()
        {
            return (!_.isUndefined($(this.el).find('.active button.entity').attr('data-id')));
        },
        updateModel: function () {
            var dataId = $(this.el).find('.active button.entity').attr('data-id');

            //Check if the entityId has changed.
            //TODO: (High) add dialog to prompt the user that that they're about to change the entity.
            if (dataId != this.model.get('entityId')) {

                var entities = this.model.get('entities');
                var entity = _.find(entities, { "id": dataId });

                _.forEach(entities, function(opt) { opt.isActive = false; });

                if (!_.isNull(entity)) entity.isActive = true;

                this.model.trigger('entityChanged', dataId);

                //TODO: (High) move these to their views to handle.
                this.model.set('entityId', dataId);
                this.model.set('entityName', entity.name);

                //The following calls could be moved to a method explicitly used for reseting the entity id.
                //reset criteria.
                //here.

                //reset outputs
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