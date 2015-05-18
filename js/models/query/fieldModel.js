

/**************************************************************/

/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    //var StateModel = Backbone.Model.extend({ "abbr": "", "name": "" });

    //var IdNamePairModel = Backbone.Model.extend({ "id": "", "name": "" });
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

    return FieldModel;
});