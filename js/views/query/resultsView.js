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
        tagName: 'section',
        id: 'results',
        className: 'step-view',
        initialize: function () {

            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(resultsTemplate);
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.toJSON()));

            return this;
        },
        updateModel: function () {
            var groupDataId = $(this.el).find('#group > option').filter(':selected').attr('data-id');
            var fieldDataId = $(this.el).find('#field > option').filter(':selected').attr('data-id');

            var lookups = this.model.get('lookups');
            var group = _.find(lookups.groups, { "id": groupDataId });
            var field = _.find(lookups.fields, { "id": fieldDataId });

            _.forEach(lookups.groups, function (opt) { opt.isActive = false; });
            _.forEach(lookups.fields, function (opt) { opt.isActive = false; });

            if (!_.isUndefined(group)) group.isActive = true;
            if (!_.isUndefined(field)) field.isActive = true;

            this.model.set('groupId', groupDataId);
            this.model.set('fieldId', fieldDataId);
            this.model.set('resultCount', $(this.el).find('#resultCount').val());
            this.model.set('recipient', $(this.el).find('#recipient').val());
            this.model.set('xml', $(this.el).find('#xml').prop('checked'));
            this.model.set('csv', $(this.el).find('#csv').prop('checked'));
            this.model.set('json', $(this.el).find('#json').prop('checked'));
        },
        getNextHtml: function () {
            return 'Review Selections';
        }
        });

    return ResultsView;

});