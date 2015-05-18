

/**************************************************************/

/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'models/query/fieldModel'
], function($, _, Backbone, FieldModel) {

    var FieldCollection = Backbone.Collection.extend({
    });

    //var field1 = new FieldModel();
    //field1.set("id", "f1");
    //field1.set("name", "Field 1");
    //field1.set("desc", "Field Description");
    //field1.set("type", "string");
    //field1.set("fieldType", "text");
    //field1.set("isOutput", "true");
    //field1.set("isQuery", "true");
    //field1.set("isSort", "true");
    //field1.set("entities", ["patent", "inventor", "assignee"]);
    //field1.set("groups", ["application", "inventor", "assignee"]);
    //field1.set("values", []);

    return FieldCollection;
});