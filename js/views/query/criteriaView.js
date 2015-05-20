/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/criteria.html',
    'text!../../../templates/query/criterion.html'
], function ($, _, Backbone, Handlebars, criteriaTemplate, criterionTemplate) {

    debugger;
    var_queryModel = null;

    CriterionView = Backbone.View.extend({
        tagName: 'tr',
        initialize: function () {
            //this.model.on('change', this.render, this);
            this.template = Handlebars.compile(criterionTemplate);
        },
        events: {
            "click .delete-criterion": "removeSet",
            "change .criterion-group": "changeGroup",
            "change .criterion-field": "changeField"
        },
        render: function () {
            var id = this.model.get('id');

            $(this.el).attr('data-id', id);
            $(this.el).html(this.template(this.model.toJSON()));

            var groups = _queryModel.getGroups();
            var group = _.find(groups, { "id": this.model.get('group') });

            if (!_.isUndefined(group)) {
                group.isActive = true;
            }

            //TODO: move to partial
            var groupsTemplate = Handlebars.compile('<option data-id="0">-Select Group-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}');
            $(this.el).find('#criterion-group-' + id).html(groupsTemplate(groups));

            var fields = _queryModel.getFields(group.id);
            var field = _.find(fields, { "id": this.model.get('field') });

            if (!_.isUndefined(field)) {
                field.isActive = true;
            }
            

            //TODO: move to partial
            var fieldTemplate = Handlebars.compile('<option data-id="0">-Select Field-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}');
            $(this.el).find('#criterion-field-' + id).html(fieldTemplate(fields));

            var conditions = _queryModel.getConditions(field.id);
            var condition = _.find(conditions, { "id": this.model.get('condition') });

            if (!_.isUndefined(condition)) {
                 condition.isActive = true;
            }

            //TODO: move to partial
             var conditionsTemplate = Handlebars.compile('<option data-id="0">-Select Condition-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}');
             $(this.el).find('#criterion-condition-' + id).html(conditionsTemplate(conditions));

             $(this.el).find('#criterion-value-' + id).tagsinput(this.model.get('value'));
//            $(this.el).find('#criterion-value-' + id).val(this.model.get('value'));

            return this;
        },
        changeGroup: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var id = source.attr('data-id');
            var group = source.find('option:selected').attr('data-id');

            var fields = _queryModel.getFields(group);

            this.resetField(id);
            this.resetCondition(id);
            this.resetValue(id);

            //TODO: to partial
            var fieldsTemplate = Handlebars.compile('<option  data-id="0">-Select Field-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}');

            $(this.el).find('#criterion-field-' + id).html(fieldsTemplate(fields));
        },
        changeField: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var id = source.attr('data-id');
            var field = source.find('option:selected').attr('data-id');

            var conditions = _queryModel.getConditions(field);

            this.resetCondition(id);
            this.resetValue(id);

            //TODO: to partial
            var conditionsTemplate = Handlebars.compile('<option data-id="0">-Select Condition-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" >{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}');

            $(this.el).find('#criterion-condition-' + id).html(conditionsTemplate(conditions));
        },
        resetField: function (id) {
            $(this.el).find('#criterion-field-' + id).html('<option data-id="0">-Select Field-</option>');
        },
        resetCondition: function (id) {
            $(this.el).find('#criterion-condition-' + id).html('<option data-id="0">-Select Condition-</option>');
        },
        resetValue: function (id) {
            $(this.el).find('#criterion-value-' + id).val("");
        },
        removeSet: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var id = $(source).closest('[data-id]').attr('data-id');
            this.model.collection.remove(this.model.collection.get(id));
        }
    });

    var CriteriaView = Backbone.View.extend({
        tagName: 'div',
        className: 'step-view row',
        id: 'criteria',
        initialize: function () {
            _queryModel = this.model;
            this.model.get('criteria').on('reset', this.addAll, this);
            this.model.get('criteria').on('add', this.addOne, this);
            this.model.get('criteria').on('remove', this.removeSet, this);
            _.bindAll(this, 'updateModel');
            this.template = Handlebars.compile(criteriaTemplate);
        },
        events: {
            "click #add-criterion": "addSet",
            "change #add-criterion-group": "changeGroup",
            "change #add-criterion-field": "changeField"
        },
        render: function () {
            this.model.setGroups();

            var entityId = this.model.get('entityId');

            if (!_.isEmpty(entityId)) {
                var models = _.where(this.model.get('options'), { "entities": [entityId] });
                
                $(this.el).empty();
                $(this.el).append(this.template(this.model.toJSON()));

                $('#add-criterion-value').tagsinput();

                this.addAll();
            }

            return this;
        },
        addSet: function () {
            var criteria = this.model.get('criteria');
            var criterion = new criteria.model();

            criterion.set("id", _.uniqueId());
            criterion.set("name", "Criterion");
            criterion.set("group", $('#add-criterion-group').find('option:selected').attr('data-id'));
            criterion.set("field", $('#add-criterion-field').find('option:selected').attr('data-id'));
            criterion.set("condition", $('#add-criterion-condition').find('option:selected').attr('data-id'));
            criterion.set("value",  $('#add-criterion-value').val());
            
            criteria.add(criterion);
        },
        addOne: function (criterion) {
            var criterionView = new CriterionView({ model: criterion });
            $(this.el).find('#criteria-items').append(criterionView.render().el);
        },
        addAll: function () {
            
            this.model.get('criteria').models.forEach(this.addOne, this);
        },
        removeSet: function () {
            $(this.el).find('#criteria-items').empty();
            this.model.get('criteria').models.forEach(this.addOne, this);
        },
        changeGroup: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var groupId = source.find('option:selected').attr('data-id');
            var fields = this.model.getFields(groupId);

            this.resetAddField();
            this.resetAddCondition();
            this.resetAddValue();

            //TODO: to partial
            var fieldsTemplate = Handlebars.compile('<option data-id="0">-Select Field-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}');

            source.closest('tr').find('#add-criterion-field').html(fieldsTemplate(fields));
        },
        changeField: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var fieldId = source.find('option:selected').attr('data-id');

            this.resetAddCondition();
            this.resetAddValue();

            var conditions = this.model.getConditions(fieldId);

            //TODO: to partial
            var conditionsTemplate = Handlebars.compile('<option data-id="0">-Select Condition-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}">{{name}}</option>{{/if}}{{/each}}');

            source.closest('tr').find('#add-criterion-condition').html(conditionsTemplate(conditions));
        },
        resetAddField: function() {
            $('#add-criterion-field').html('<option data-id="0">-Select Field-</option>');
        },
        resetAddCondition: function () {
            $('#add-criterion-condition').html('<option data-id="0">-Select Condition-</option>');
        },
        resetAddValue: function () {
            $('#add-criterion-value').val("");
        },
        updateModel: function () {
            var criteria = this.model.get('criteria');

            _.forEach(criteria.models, function (criterion) {
                criterion.set("group", $('#criterion-group-' + criterion.id).find('option:selected').attr('data-id'));
                criterion.set("field", $('#criterion-field-' + criterion.id).find('option:selected').attr('data-id'));
                criterion.set("condition", $('#criterion-condition-' + criterion.id).find('option:selected').attr('data-id'));
                criterion.set("value", $('#criterion-value-' + criterion.id).val());
            });

            //this.model.set('criteria', criteria);
        },
        getNavHtml: function (s) {
            //s is the state requested.
            var result = '<i class="fa fa-lg fa-square-o"></i> Step 2: Select Criteria';

            switch (s) {
                case "active":
                    {
                        result = '<i class="fa fa-lg fa-square-o"></i> Step 2: Select Criteria';

                        break;
                    }
                case "complete":
                    {
                        result = '<i class="fa fa-lg fa-check-square-o"></i> Step 2: Complete';

                        break;
                    }
                default: {
                    break;
                }
            }


            return result;
        },
        getNextHtml: function () {
            return 'Go to Step 3 &nbsp;&nbsp; <i class="fa fa-play" />';
        }
    });

    return CriteriaView;
});