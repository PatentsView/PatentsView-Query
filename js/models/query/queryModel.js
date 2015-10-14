/**************************************************************/

/**************************************************************/
define([
  'jquery',
  'underscore',
  'backbone',
  'text!models/query/options.js',
  'models/overlay/overlay',
  'models/overlay/nls/lexicon'
], function ($, _, Backbone, optionsJson, OverlayModel, Lexicon) {

    var entities = [
        { "id": "patent", "name": "Patent", "isActive": true, "defaults": ["patent_title"], "url": "/querytool/query/fields.html#patent" },
        { "id": "inventor", "name": "Inventor", "isActive": false, "defaults": ["inventor_id", "inventor_first_name", "inventor_last_name"], "url": "/querytool/query/fields.html#inventor" },
        { "id": "assignee", "name": "Assignee", "isActive": false, "defaults": ["assignee_id", "assignee_first_name", "assignee_last_name", "assignee_organization"], "url": "/querytool/query/fields.html#assignee" },
        //{ "id": "nberSubcategory", "name": "NBER Technology Area", "isActive": false, "defaults": ["nber_subcategory_id", "nber_subcategory_title"], "url": "/querytool/query/fields.html#nberSubcategory" },
        //{ "id": "cpcSubsection", "name": "Cooperative Patent Class", "isActive": false, "defaults": ["cpc_subsection_id", "cpc_subsection_title"], "url": "/querytool/query/fields.html#cpcSubsection" },
        //{ "id": "uspcMainclass", "name": "US Patent Class", "isActive": false, "defaults": ["uspc_mainclass_id", "uspc_mainclass_title"], "url": "/querytool/query/fields.html#uspcMainclass" },
        { "id": "location", "name": "Location", "isActive": false, "defaults": ["location_id", "location_city", "location_state", "location_country"], "url": "/querytool/query/fields.html#location" }
    ];

    var types = [
        { "ops": ["equal", "not_equal", "begins_with", "contains"], "type": "string", "matches": ["string"] },
        { "ops": ["equal", "not_equal"], "type": "location", "matches": ["location"] },
        { "ops": ["any", "all", "phrase"], "type": "string", "matches": ["full text"] },
        { "ops": ["equal", "not_equal" ], "type": "boolean", "matches": ["boolean"] },
        { "ops": ["equal", "not_equal", "greater", "greater_or_equal", "less", "less_or_equal"], "type": "date", "matches": ["date"], validation: { format: "YYYY-MM-DD" }, placeholder: 'YYYY-MM-DD' },
        { "ops": ["equal", "not_equal", "greater", "greater_or_equal", "less", "less_or_equal"], "type": "time", "matches": ["time"] },
        { "ops": ["equal", "not_equal", "greater", "greater_or_equal", "less", "less_or_equal"], "type": "datetime", "matches": ["datetime"] },
        { "ops": ["equal", "not_equal", "greater", "greater_or_equal", "less", "less_or_equal"], "type": "integer", "matches": ["integer"] },
        { "ops": ["equal", "not_equal", "greater", "greater_or_equal", "less", "less_or_equal"], "type": "double", "matches": ["double", "float"] }
    ];

    var inputs = [
        { "type": "text", "matches": ["input"] },
        { "type": "select", "matches": ["select"] },
        { "type": "location", "matches": ["location"] }
    ];

    var outputGroups = [
        { "name": "Patent Applications Cited by Patents", "desc": "Data on applications that are cited by patents in the output dataset" },
        { "name": "Patent Application", "desc": "Data on applications associated with the patents in the output dataset" },
        { "name": "Patent Assignee", "desc": "Data on assignees on the patents in the output dataset" },
        { "name": "Patents Citing a Given Patent", "desc": "Data on patents that have cited the patents in the output dataset" },
        { "name": "Patents Cited by Other Patents", "desc": "Data on patents that have been cited by the patents in the output dataset" },
        { "name": "Cooperative Patent Class", "desc": "Metadata describing the cooperative patent classification of the patents in the output dataset" },
        { "name": "Inventor", "desc": "Data on the inventors on the patents in the output dataset" },
        { "name": "Co-inventors on a Given Patent", "desc": "Data on all of the inventors on the patents in the output dataset, in addition to the inventors that satisfy the search criteria" },
        { "name": "International Patent Class", "desc": "Metadata describing the international patent classification of the patents in the output dataset" },
        { "name": "Location", "desc": "Locations of the inventors and assignees as listed on the patents in the output dataset" },
        { "name": "NBER Technology Area", "desc": "Metadata describing the technology area of the patents in the output dataset.  See www.nber.org/patents for more information on NBER technology areas." },
        { "name": "Patent", "desc": "Patent metadata" },
        { "name": "US Patent Class", "desc": "Metadata describing the US patent classification of the patents in the output dataset" }
    ];

    var overlays = [
        {
            className: 'center-pane',
            blockMouse: false,
            verticalCenter: false,
            items: [
                {
                    className: 'center-pane',
                    key: OverlayModel.overlays.patentClass,
                    file: 'patentClass.html',
                    title: Lexicon.root.titles.patentClass
                },
                {
                    className: 'center-pane scroll',
                    key: OverlayModel.overlays.uspc,
                    file: 'uspc.html',
                    title: Lexicon.root.titles.uspc
                },
                {
                    className: 'center-pane scroll',
                    key: OverlayModel.overlays.nber,
                    file: 'nber.html',
                    title: Lexicon.root.titles.nber
                },
                {
                    className: 'center-pane scroll',
                    key: OverlayModel.overlays.cpc,
                    file: 'cpc.html',
                    title: Lexicon.root.titles.cpc
                }
            ]
        }
    ];

    var options = JSON.parse(optionsJson);
    for (var i = 0; i < entities.length; i++) {

        entities[i].outputs = new Array();

        _.where(options, { "entities": [entities[i].id] }).forEach(function (field) {

            if (field.isOutput) {
                var isDefault = _.contains(entities[i].defaults, field.id);
                var group = _.find(entities[i].outputs, { "id": field.group });
                var output = { "id": field.id, "name": field.name, desc: field.desc, "isActive": isDefault };

                if (_.isUndefined(group)) {
                    var outputGroup = _.find(outputGroups, { "name": field.group });
                    group = { "id": field.group, "name": field.group, "isActive": isDefault, desc: (_.isUndefined(outputGroup)) ? "" : outputGroup.desc, fields: new Array() };
                    group.fields.push(output);
                    entities[i].outputs.push(group);
                } else {
                    group.fields.push(output);
                }
            }
        });
    }

    var QueryModel = Backbone.Model.extend({
        initialize: function () {
            this.set('options', options);
            this.set('entities', entities);
            this.set('query', {});
            this.set('outputs', []);
            this.set('sorts', []);
            this.set('entityId', "");
            this.set('outputIds', []);
            this.set('rules', []);
            this.set('groupId', "");
            this.set('fieldId', "");
            this.set('resultCount', "100");
            this.set('recipient', "");
            this.set('xml', "");
            this.set('json', "");
            this.set('csv', "");
        },
        getFilters: function () {
            var entityId = this.get('entityId');
            var filters = new Array();

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function (field) {

                var typeMatch = _.find(types, { "matches": [field.type] });
                var inputMatch = _.find(inputs, { "matches": [field.fieldType] });

                if (field.isQuery) {

                    var filter = {
                        id: field.id,
                        label: field.name,
                        type: typeMatch.type,
                        input: inputMatch.type,
                        operators: typeMatch.ops,
                        values: field.values,
                        remoteUrl: field.remoteUrl,
                        optgroup: field.group,
                        desc: field.desc
                    };

                    if (!_.isUndefined(typeMatch.validation)) {
                        filter.validation = typeMatch.validation;
                    }
                    if (!_.isUndefined(typeMatch.placeholder)) {
                        filter.placeholder = typeMatch.placeholder;
                    }

                    filters.push(filter);
                }
            });

            return filters;
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
        getOutputs: function () {
            var entityId = this.get('entityId');
            var groups = new Array();
            var entity = _.find(entities, { "id": entityId });

            if (_.isNull(entityId) || _.isEmpty(entityId)) {
                this.set('groups', groups);

                return groups;
            }

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function(field) {

                if (field.isOutput) {
                    var isDefault = _.contains(entity.defaults, field.id);
                    var group = _.find(groups, { "id": field.group });
                    var output = { "id": field.id, "name": field.name, desc: field.desc, "isActive": isDefault };

                    if (_.isUndefined(group)) {
                        var outputGroup = _.find(outputGroups, { "name": field.group });
                        group = { "id": field.group, "name": field.group, "isActive": isDefault, desc: (_.isUndefined(outputGroup)) ? "" : outputGroup.desc, fields: new Array() };
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
        getOverlay: function (key) {
            return _.find(overlays, function (item) {
                return !!_.findWhere(item.items, { key: key });
            });
        },
        setGroups: function() {
            this.set('groups', this.getGroups());
        },
        buildQuery: function () {
            var result = '';
            result = 'q=' + JSON.stringify(this.get('query'))
                     + '&f=' + JSON.stringify(this.get('outputIds'))
                     + '&o={"page":1,"per_page":' + this.get('resultCount') + '}'
                     + '&s=[{"' + this.get('fieldId') + '":"asc"}]';

            return result;         
        }
    });

    return QueryModel;
})