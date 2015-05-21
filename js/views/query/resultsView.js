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
        className: 'step-view row',
        id: 'results',
        initialize: function (options) {
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
           
            this.template = Handlebars.compile(resultsTemplate);
        },
        events: {
            "change #group": "changeGroup",
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.toJSON()));

            var entityId = this.model.get('entityId');
            var groupId = this.model.get('groupId');

            if (!_.isEmpty(entityId)) {
                var goupsTemplate = Handlebars.compile('"<option>-Select Group-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}"');

                $('#group').html(goupsTemplate(this.model.get('sorts')));
                
                var group = _.find(this.model.get('sorts'), { "id": groupId });

                if (!_.isUndefined(group)) {
                    var fieldsTemplate = Handlebars.compile('"<option>-Select Field-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}"');

                    $('#field').html(fieldsTemplate(group.fields));
                }
            }

            return this;
        },
        changeGroup: function(e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var groupId = source.find('option:selected').attr('data-id');
            var group = _.find(this.model.get('sorts'), { "id": groupId });

            if (!_.isUndefined(group)) {
                var fieldsTemplate = Handlebars.compile('"<option>-Select Field-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}"');

                $('#field').html(fieldsTemplate(group.fields));
            }
        },
        updateModel: function () {
            var groupDataId = $(this.el).find('#group > option').filter(':selected').attr('data-id');
            var fieldDataId = $(this.el).find('#field > option').filter(':selected').attr('data-id');
            var sorts = this.model.get('sorts');
            var group = _.find(sorts, { "id": groupDataId });
           
            if (!_.isUndefined(group)) {
                _.forEach(sorts, function (groupOpt) { groupOpt.isActive = false; });
                group.isActive = true;

                var field = _.find(group.fields, { "id": fieldDataId });
                _.forEach(group.fields, function (fieldOpt) { fieldOpt.isActive = false; });
                field.isActive = true;
            }

            this.model.set('groupId', groupDataId);
            this.model.set('fieldId', fieldDataId);
            this.model.set('resultCount', $(this.el).find('#resultCount').val());
            this.model.set('recipient', $(this.el).find('#recipient').val());
            this.model.set('xml', $(this.el).find('#xml').prop('checked'));
            this.model.set('csv', $(this.el).find('#csv').prop('checked'));
            this.model.set('json', $(this.el).find('#json').prop('checked'));
        },
        getNavHtml: function (s) {
            //s is the state requested.
            var result = '<i class="fa fa-lg fa-square-o"></i> Step 4: Customize Results';

            switch (s) {
                case "active":
                    {
                        result = '<i class="fa fa-lg fa-square-o"></i> Step 4: Customize Results';

                        break;
                    }
                case "complete":
                    {
                        result = '<i class="fa fa-lg fa-check-square-o"></i> Step 4: Complete';

                        break;
                    }
                default: {
                    break;
                }
            }


            return result;
        },
        getNextHtml: function () {
            return 'Review Selections';
        }
        });

    return ResultsView;

});