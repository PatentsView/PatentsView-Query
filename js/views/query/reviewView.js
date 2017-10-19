/**************************************************************/
// View that displays the query options and criteria that the user has built on 
// prior steps before submitting the query.
/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/query/templates/Review.html',
    'text!views/query/templates/OutputListsPatent.html',
    'text!views/query/templates/OutputListsAssignee.html',
    'text!views/query/templates/OutputListsInventor.html',
    'text!views/query/templates/ReviewOutputLists.html'
], function ($, _, Backbone, Handlebars, ReviewTemplate, OutputListPatentTemplate, OutputListAssigneeTemplate, OutputListInventorTemplate, ReviewOutputListsTemplate) {

    var ReviewView = Backbone.View.extend({
        tagName: 'section',
        id: 'review',
        className: 'step-view',
        initialize: function (options) {
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(ReviewTemplate);
            this.outputListPatent = Handlebars.compile(OutputListPatentTemplate);
            this.outputListAssignee = Handlebars.compile(OutputListAssigneeTemplate);
            this.outputListInventor = Handlebars.compile(OutputListInventorTemplate);
            this.outputList = Handlebars.compile(ReviewOutputListsTemplate);

            return this;
        },
        render: function () {
            this.model.set("query", this.model.buildQuery());
            $(this.el).empty();
            $(this.el).append(this.template(this.model.toJSON()));
            this.renderOutputs();

            return this;
        },
        renderOutputs: function () {
            //TODO: refactor the following if the team is okay with rendering selected options like this.
            var entityId = this.model.get("entityId");
            var outputs = this.model.getOutputs(true);
            var partentOutputs = _.find(outputs, { "categoryId": "Patent" });
            var inventorOutputs = _.find(outputs, { "categoryId": "Inventor" });
            var assigneeOutputs = _.find(outputs, { "categoryId": "Assignee" });
            var citationsOutputs = _.find(outputs, { "categoryId": "Citations" });
            var technologyClassificationsOutputs = _.find(outputs, { "categoryId": "Technology_Classifications" });
            var partentOutputsHtml = (!_.isUndefined(partentOutputs)) ? this.outputList(partentOutputs) : '';
            var inventorOutputsHtml = (!_.isUndefined(inventorOutputs)) ? this.outputList(inventorOutputs) : '';
            var assigneeOutputsHtml = (!_.isUndefined(assigneeOutputs)) ? this.outputList(assigneeOutputs) : '';
            var citationsOutputsHtml = (!_.isUndefined(citationsOutputs)) ? this.outputList(citationsOutputs) : '';
            var technologyClassificationsOutputsHtml = (!_.isUndefined(technologyClassificationsOutputs)) ? this.outputList(technologyClassificationsOutputs) : '';
            var categoryCount = outputs.length;
            var outputs = $(this.el).find('#outputs-readonly');

            if (categoryCount == 0) {
                $(outputs).html('<span class="control-label">None Selected</span>');
            }
            else if (categoryCount == 5) {
                $(outputs).html(this.outputListPatent({}));
                $(this.el).find('#patent-outputs').html(partentOutputsHtml);
                $(this.el).find('#inventor-outputs').html(inventorOutputsHtml);
                $(this.el).find('#assignee-outputs').html(assigneeOutputsHtml);
                $(this.el).find('#citations-outputs').html(citationsOutputsHtml);
                $(this.el).find('#technology_Classifications-outputs').html(technologyClassificationsOutputsHtml);
            }
            else {
                var colSize = (12 / categoryCount);
                var outputsHtml = '<div class="row">';

                if (!_.isUndefined(partentOutputs)) {
                    outputsHtml = outputsHtml + '<div id="patent-outputs" class="output-list col-md-' + colSize + '">';
                    outputsHtml = outputsHtml + partentOutputsHtml;
                    outputsHtml = outputsHtml + '</div>';
                }

                if (!_.isUndefined(inventorOutputs)) {
                    outputsHtml = outputsHtml + '<div id="inventor-outputs" class="output-list col-md-' + colSize + '">';
                    outputsHtml = outputsHtml + inventorOutputsHtml;
                    outputsHtml = outputsHtml + '</div>';
                }

                if (!_.isUndefined(assigneeOutputs)) {
                    outputsHtml = outputsHtml + '<div id="assignee-outputs" class="output-list col-md-' + colSize + '">';
                    outputsHtml = outputsHtml + assigneeOutputsHtml;
                    outputsHtml = outputsHtml + '</div>';
                }

                if (!_.isUndefined(citationsOutputs)) {
                    outputsHtml = outputsHtml + '<div id="citations-outputs" class="output-list col-md-' + colSize + '">';
                    outputsHtml = outputsHtml + citationsOutputsHtml;
                    outputsHtml = outputsHtml + '</div>';
                }

                if (!_.isUndefined(technologyClassificationsOutputs)) {
                    outputsHtml = outputsHtml + '<div id="technology_Classifications-outputs" class="output-list col-md-' + colSize + '">';
                    outputsHtml = outputsHtml + technologyClassificationsOutputsHtml;
                    outputsHtml = outputsHtml + '</div>';
                }

                outputsHtml = outputsHtml + '</div>';
                $(outputs).html(outputsHtml);
            }
        },
        updateModel: function () {
        },
        getNavHtml: function (s) {
            return '';
        },
        entityChanged: function (e) {
            this.resetView = true;
        }
    });

    return ReviewView;
});