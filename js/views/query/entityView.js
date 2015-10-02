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
            "click #step .btn-previous": "updateModel",
            "click #step .btn-next": "moveNext",
            "click #accordion a": "selectEntity",
            "click input.check-all": "checkAll",
            "click input.check": "checkField",
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.get('entities')));
            $(this.el).find('[data-toggle="popover"]').popover({
                trigger: 'hover',
                'placement': 'top'
            });
            
            return this;
        },
        checkAll: function (e) {
            var dataId =  $(e.currentTarget).attr('data-id');
            $('ul[data-output-group-id="' + dataId + '"]').find('.check').prop('checked',  $(e.currentTarget).prop('checked'));
        },
        checkField: function (e) {
            var dataid = $(this.el).find('.in').parent().attr('data-id');
            var group = $(e.currentTarget).closest('ul').attr('data-output-group-id');
            $(this.el).find('#panel-' + dataid + '').find('[data-id="' + group + '"]').prop('checked', ($(e.currentTarget).closest('ul').find('li input').not(':checked').length == 0) ? 'checked' : '');
        },
        selectEntity: function (e) {
            e.preventDefault();

            var dataId = $(e.currentTarget).parent().attr('data-id');
            var entityId = this.model.get('entityId');

            if ((!_.isUndefined(entityId) && !_.isEmpty(entityId)) && dataId != entityId) {
                $('.entity-change-modal').find('.ok').on('click', function () {
                    $('.entity-change-modal').modal('hide');
                    $(this.el).find('.panel-collapse').removeClass('in');
                    $(this.el).find('.collapsed').removeClass('collapsed');
                    $($(e.currentTarget).addClass('collapsed').attr('data-target')).addClass('in');
                });
                $('.entity-change-modal').modal('show');
            } else {
                $(this.el).find('.panel-collapse').removeClass('in');
                $(this.el).find('.collapsed').removeClass('collapsed');
                $($(e.currentTarget).addClass('collapsed').attr('data-target')).addClass('in');
            }

            return false;
        },
        //selectEntity: function (e) {

        //    var dataId = $(e.currentTarget).attr('data-id');
        //    var entityId = this.model.get('entityId');

        //    if ((!_.isUndefined(entityId) && !_.isEmpty(entityId)) && dataId != entityId) {
        //        $('.entity-change-modal').find('.ok').on('click', function () {
        //            $('.entity-change-modal').modal('hide');
        //            $(e.currentTarget).closest('ul.entity-list').find('li').removeClass('active');
        //            $(e.currentTarget).closest('li').addClass('active');
        //        });
        //        $('.entity-change-modal').modal('show');
        //    } else {
        //        $(e.currentTarget).closest('ul.entity-list').find('li').removeClass('active');
        //        $(e.currentTarget).closest('li').addClass('active');
        //    }
        //},
        isValid: function()
        {
            return (!_.isUndefined($(this.el).find('.in').parent().attr('data-id')));
        },
        updateModel: function () {
            debugger;
            var dataId = $(this.el).find('.in').parent().attr('data-id');
            var entities = this.model.get('entities');
            var entity = _.find(entities, { "id": dataId });
            var outputs = entity.outputs;
            var outputIds = new Array();

            //Check if the entityId has changed.
            if (dataId != this.model.get('entityId')) {
                _.forEach(entities, function(opt) { opt.isActive = false; });

                if (!_.isNull(entity)) {
                    entity.isActive = true;
                }
                
                this.model.trigger('entityChanged', dataId);
                this.model.set('entityId', dataId);
                this.model.set('entityName', entity.name);
                this.model.set('url', entity.url);
                this.model.set('sorts', this.model.getSorts());
            }

            for (var i = 0; i < outputs.length; i++) {
                outputs[i].isActive = $(this.el).find('#panel-' + entity.id + '').find('[data-id="' + outputs[i].id + '"]').prop('checked');
                outputs[i].isChildActive = false;

                for (var j = 0; j < outputs[i].fields.length; j++) {
                    outputs[i].fields[j].isActive = false;
                    var output = $(this.el).find('#panel-' + entity.id + '').find('#output-field-' + outputs[i].fields[j].id + '');

                    if (output.prop('checked')) {
                        outputs[i].isChildActive = true;
                        outputs[i].fields[j].isActive = true;
                        outputIds.push(outputs[i].fields[j].id);
                    }
                }
            }

            this.model.set('outputIds', outputIds);
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