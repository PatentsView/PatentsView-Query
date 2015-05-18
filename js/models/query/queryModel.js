/**************************************************************/

/**************************************************************/
define([
  'jquery',
  'underscore',
  'backbone',
  'text!../query/options.json'
], function ($, _, Backbone, optionsJson) {

    var entities = [
        { "id": "patent", "name": "Patent", "isActive": false },
        { "id": "inventor", "name": "Inventor", "isActive": false },
        { "id": "assignee", "name": "Assignee", "isActive": false },
        { "id": "nberSubcategory", "name": "NBER Technology Area", "isActive": false },
        { "id": "cpcSubsection", "name": "Cooperative Patent Class", "isActive": false },
        { "id": "uspcMainclass", "name": "US Patent Class", "isActive": false },
        { "id": "location", "name": "Location", "isActive": false }
    ];


    var operators = [
        { "id": "IsEqualTo", "name": "is equal to", "types": ["string", "date", "float", "integer", "fullText"], "isActive": false },
        { "id": "IsNotEqualTo", "name": "is not equal to", "types": ["string", "date", "float", "integer", "fullText"], "isActive": false },
        { "id": "IsGreaterThan", "name": "is greater than", "types": ["date", "float", "integer"], "isActive": false },
        { "id": "IsLessThan", "name": "is less than", "types": ["date", "float", "integer"], "isActive": false }
    ];

    var FieldModel = Backbone.Model.extend({
        initialize: function() {
            this.set("id", "");
            this.set("name", "");
            this.set("desc", "");
            this.set("type", "");
            this.set("fieldType", "");
            this.set("isOutput", "");
            this.set("isQuery", "");
            this.set("isSort", "");
            this.set("entities", []);
            this.set("groups", []);
            this.set("values", []);
        }
    });

    var FieldCollection = Backbone.Collection.extend({
        model: FieldModel,
        getGroups: function (entityId) {
            var results = new Array();

            _.forEach(this.models, function (n) {
                if (_.some(n.get('entities'), function (id) {
                    return id === entityId;
                })) {
                    var group = n.get('group');
                    if (!_.contains(results, group)) {
                        results.push(group);
                    }
                }
            });

            return results;
        },
        getFields: function (entityId, groupIds) {
            var results = new Array();

            _.forEach(this.models, function (n) {
                if (_.some(groupIds, function (id) {
                    return id === n.get('group');
                }) &&
                    _.some(n.get('entities'), function (id) {
                    return id === entityId;
                })) {
                        results.push(n);
                }
            });

            return results;
        }
    });

    var CriterionModel = Backbone.Model.extend({
        initialize: function() {
            this.set("id", "");
            this.set("name", "");
            this.set("group", "");
            this.set("field", "");
            this.set("condition", "");
            this.set("value");
        }
    });

    var CriteraCollection = Backbone.Collection.extend({
        model: CriterionModel
    });

    var options = JSON.parse(optionsJson);

    //Lookups for views.
    var LookupModel = Backbone.Model.extend({
        defaults: {},
        outputs: [
            { "id": "1", "category": "Patent", "isActive": false, "subcategories": [{ "id": "1", "name": "eg 1", "isActive": false }, { "id": "6", "name": "eg 6", "isActive": false }, { "id": "11", "name": "eg 11", "isActive": false }] },
            { "id": "2", "category": "Inventor", "isActive": false, "subcategories": [{ "id": "2", "name": "eg 2", "isActive": false }, { "id": "7", "name": "eg 7", "isActive": false }, { "id": "12", "name": "eg 12", "isActive": false }] },
            { "id": "3", "category": "Assignee", "isActive": false, "subcategories": [{ "id": "3", "name": "eg 3", "isActive": false }, { "id": "8", "name": "eg 8", "isActive": false }, { "id": "13", "name": "eg 13", "isActive": false }] },
            { "id": "4", "category": "Co-Inventor", "isActive": false, "subcategories": [{ "id": "4", "name": "eg 4", "isActive": false }, { "id": "9", "name": "eg 9", "isActive": false }, { "id": "14", "name": "eg 14", "isActive": false }] },
            { "id": "5", "category": "ETC...", "isActive": false, "subcategories": [{ "id": "5", "name": "eg 5", "isActive": false }, { "id": "10", "name": "eg 10", "isActive": false }, { "id": "15", "name": "eg 15", "isActive": false }] }
        ]
    });

    var QueryModel = Backbone.Model.extend({
        initialize: function () {
            this.set('options', options);
            this.set('entities', entities);
            this.set('operators', operators);
            this.set('outputs', []);
            this.set('sorts', []);
            this.set('entityId', "");
            this.set('outputIds', []);
            this.set('criteria', new CriteraCollection());
            this.set('groupId', "");
            this.set('fieldId', "");
            this.set('resultCount', "");
            this.set('recipient', "");
            this.set('xml', "");
            this.set('json', "");
            this.set('csv', "");
        },
        getGroups: function() {
            var entityId = this.get('entityId');
            var groups = new Array();

            if (_.isNull(entityId) || _.isEmpty(entityId)) {
                this.set('groups', groups);

                return;
            }

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function (field) {
                groups.push({ "id": field.group, "name": field.group, "isActive": false });
            });

            return _.uniq(groups, 'id');
        },
        getFields: function(groupId) {
            var entityId = this.get('entityId');
            var fields = new Array();

            if (_.isNull(groupId) || _.isEmpty(groupId)) {
                return fields;
            }

            _.where(this.get('options'), { "entities": [entityId], "group": groupId }).forEach(function (field) {

                if (field.isQuery) {
                    fields.push({ "id": field.id, "name": field.name, "isActive": false });
                }
            });

            return fields;
        },
        getConditions: function (fieldId) {
            var entityId = this.get('entityId');
            var conditions = new Array();

            if (_.isNull(fieldId) || _.isEmpty(fieldId)) {
                return conditions;
            }

            var field = _.findWhere(this.get('options'), { "entities": [entityId], "id": fieldId }); //Might need to add group but not sure.

            if (!_.isUndefined(field)) {
                var type = field.type;

                _.where(this.get('operators'), { "types": [type]}).forEach(function (operator) {
                    conditions.push({ "id": operator.id, "name": operator.name, "isActive": false });
                });
            }
            
            return conditions;
        },
        getOutputs: function() {
            var entityId = this.get('entityId');
            var groups = new Array();

            if (_.isNull(entityId) || _.isEmpty(entityId)) {
                this.set('groups', groups);

                return groups;
            }

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function(field) {

                if (field.isOutput) {

                    var group = _.find(groups, { "id": field.group });
                    var output = { "id": field.id, "name": field.name, "isActive": false, "isChildActive": false };

                    if (_.isUndefined(group)) {
                        group = { "id": field.group, "name": field.group, "isActive": false, fields: new Array() };
                        group.fields.push(output);
                        groups.push(group);
                    } else {
                        group.fields.push(output);
                    }
                }
            });

            return groups;
        },
        getSorts: function() {
            var entityId = this.get('entityId');
            var groups = new Array();

            if (_.isNull(entityId) || _.isEmpty(entityId)) {
                this.set('groups', groups);

                return groups;
            }

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function(field) {

                if (field.isSort) {

                    var group = _.find(groups, { "id": field.group });
                    var output = { "id": field.id, "name": field.name, "isActive": false };

                    if (_.isUndefined(group)) {
                        group = { "id": field.group, "name": field.group, "isActive": false, fields: new Array() };
                        group.fields.push(output);
                        groups.push(group);
                    } else {
                        group.fields.push(output);
                    }
                }
            });

            return groups;
        },
        setGroups: function() {
            this.set('groups', this.getGroups()); //TODO: May need to go _.uniq here.
        }
    });

    return QueryModel;
})