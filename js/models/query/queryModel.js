/**************************************************************/

/**************************************************************/
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

    //Lookups for views.
    var LookupModel = Backbone.Model.extend({
        defaults: {},
        entities: [
            { "id": "1", "name": "Patent", "isActive": false },
            { "id": "2", "name": "Inventor", "isActive": false },
            { "id": "3", "name": "Assignee", "isActive": false },
            { "id": "4", "name": "NBER", "isActive": false },
            { "id": "5", "name": "CPC", "isActive": false },
            { "id": "6", "name": "USPC", "isActive": false },
            { "id": "7", "name": "Locations", "isActive": false }
        ],
        outputs: [
            { "id": "1", "category": "Patent", "isActive": false, "subcategories": [{ "id": "1", "name": "eg 1", "isActive": false }, { "id": "6", "name": "eg 6", "isActive": false }, { "id": "11", "name": "eg 11", "isActive": false }] },
            { "id": "2", "category": "Inventor", "isActive": false, "subcategories": [{ "id": "2", "name": "eg 2", "isActive": false }, { "id": "7", "name": "eg 7", "isActive": false }, { "id": "12", "name": "eg 12", "isActive": false }] },
            { "id": "3", "category": "Assignee", "isActive": false, "subcategories": [{ "id": "3", "name": "eg 3", "isActive": false }, { "id": "8", "name": "eg 8", "isActive": false }, { "id": "13", "name": "eg 13", "isActive": false }] },
            { "id": "4", "category": "Co-Inventor", "isActive": false, "subcategories": [{ "id": "4", "name": "eg 4", "isActive": false }, { "id": "9", "name": "eg 9", "isActive": false }, { "id": "14", "name": "eg 14", "isActive": false }] },
            { "id": "5", "category": "ETC...", "isActive": false, "subcategories": [{ "id": "5", "name": "eg 5", "isActive": false }, { "id": "10", "name": "eg 10", "isActive": false }, { "id": "15", "name": "eg 15", "isActive": false }] }
        ],
        groups: [
            { "id": "1", "name": "Group 1", "isActive": false },
            { "id": "2", "name": "Group 2", "isActive": false },
            { "id": "3", "name": "Group 3", "isActive": false }
        ],
        fields: [
            { "id": "1", "name": "Field 1", "isActive": false },
            { "id": "2", "name": "Field 2", "isActive": false },
            { "id": "3", "name": "Field 3", "isActive": false }
        ]
});

    var QueryModel = Backbone.Model.extend({
        initialize: function () {
            this.set("lookups", new LookupModel());
            this.set("entityId", "");
            this.set("outputIds", []);
            this.set("groupId", "");
            this.set("fieldId", "");
            this.set("resultCount", "");
            this.set("recipient", "");
            this.set("xml", "");
            this.set("json", "");
            this.set("csv", "");
        }
    });

    return QueryModel;
})