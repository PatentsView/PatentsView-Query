/**************************************************************/
// View that enables ther user to select their outputs and how they would like to recieve their query results.
/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/query/templates/SelectResults.html',
    'text!views/query/templates/OutputListsPatent.html',
    'text!views/query/templates/OutputListsAssignee.html',
    'text!views/query/templates/OutputListsInventor.html',
    'text!views/query/templates/OutputLists.html',
    'bootstrap',
    'validate'
], function ($, _, Backbone, Handlebars, SelectResultsTemplate, OutputListPatentTemplate, OutputListAssigneeTemplate, OutputListInventorTemplate, OutputListTemplate) {

    var SelectResultsView = Backbone.View.extend({
        tagName: 'section',
        className: 'step-view',
        id: 'selectResults',
        initialize: function (options) {
            
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(SelectResultsTemplate);
            this.outputListPatent = Handlebars.compile(OutputListPatentTemplate);
            this.outputListAssignee = Handlebars.compile(OutputListAssigneeTemplate);
            this.outputListInventor = Handlebars.compile(OutputListInventorTemplate);
            this.outputList = Handlebars.compile(OutputListTemplate);
            this.resetView = true;
        },
        events: {
            "change .category": "changeCategory",
            "change .output": "changeOutput",
            "click .list-group-item": "listGroupItemClick",
        },
        render: function (nav) {
            
            if (nav == true && this.resetView == true) {

                $(this.el).empty();
                $(this.el).append(this.template(this.model.toJSON()));
                this.renderOutputs();
                this.resetView = false;
            }

            return this;
        },
        entityChanged: function (e) {

            this.resetView = true;
        },
        listGroupItemClick: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);

            if ($(source).hasClass('list-group-item')) {
                $(source).toggleClass('collapsed');
                $($(source).data('target')).collapse('toggle');
            }
        },
        changeCategory: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var checked = source[0].checked;
            var listGroup = $(source).closest('.list-group');
            listGroup.find('.output').prop('checked', checked);
            listGroup.find('.category').prop('checked', checked);

            if (checked) {
                $(source).closest('.list-group-item').toggleClass('collapsed');
                $(listGroup.find('.list-group-item').data('target')).collapse('show');
            }
        },
        changeOutput: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);

            if ($(source).closest('.list-group-submenu').find('.output').length > $(source).closest('.list-group-submenu').find('.output:checked').length)
                $(source).closest('.list-group').find('.category').prop('checked', false);
            else
                $(source).closest('.list-group').find('.category').prop('checked', true);
        },
        updateModel: function () {
            var outputIds = [];
            var selectedOutputs = $(this.el).find('.output:checked').each(function (i, opt) {
                outputIds.push($(opt).val());
            });

            this.model.set('outputIds', outputIds);
        },
        expandParent: function (parent) {
            var selectedOutputs = $(parent).find('input[type="checkbox"]:checked');

            if (selectedOutputs.length > 0) {
                var submenu = selectedOutputs.closest('.list-group-submenu');
                submenu.addClass('in');
                submenu.closest('.list-group').find('[data-target="#' + submenu.attr('id') + '"]').removeClass('collapsed');
            }
        },
        renderOutputs: function () {
            var entityId = this.model.get("entityId");
            var outputs = this.model.getOutputs();
            var partentOutputsHtml = this.outputList(_.find(outputs, { "categoryId": "Patent" }));
            var inventorOutputsHtml = this.outputList(_.find(outputs, { "categoryId": "Inventor" }));
            var assigneeOutputsHtml = this.outputList(_.find(outputs, { "categoryId": "Assignee" }));
            var citationsOutputsHtml = this.outputList(_.find(outputs, { "categoryId": "Citations" }));
            var technologyClassificationsOutputsHtml = this.outputList(_.find(outputs, { "categoryId": "Technology_Classifications" }));

            switch (entityId) {

                case "inventor":
                    {
                        $(this.el).find('#outputs').html(this.outputListInventor({}));
                        $(this.el).find('#patent-outputs').html(partentOutputsHtml);
                        $(this.el).find('#inventor-outputs').html(inventorOutputsHtml);
                        $(this.el).find('#assignee-outputs').html(assigneeOutputsHtml);
                        $(this.el).find('#technology_Classifications-outputs').html(technologyClassificationsOutputsHtml);
                        this.expandParent($(this.el).find('#patent-outputs'));
                        this.expandParent($(this.el).find('#inventor-outputs'));
                        this.expandParent($(this.el).find('#assignee-outputs'));
                        this.expandParent($(this.el).find('#technology_Classifications-outputs'));

                        break;
                    }
                case "assignee":
                    {
                        $(this.el).find('#outputs').html(this.outputListAssignee({}));
                        $(this.el).find('#patent-outputs').html(partentOutputsHtml);
                        $(this.el).find('#inventor-outputs').html(inventorOutputsHtml);
                        $(this.el).find('#assignee-outputs').html(assigneeOutputsHtml);
                        $(this.el).find('#technology_Classifications-outputs').html(technologyClassificationsOutputsHtml);
                        this.expandParent($(this.el).find('#patent-outputs'));
                        this.expandParent($(this.el).find('#inventor-outputs'));
                        this.expandParent($(this.el).find('#assignee-outputs'));
                        this.expandParent($(this.el).find('#technology_Classifications-outputs'));

                        break;
                    }
                default: //patent
                    {
                        $(this.el).find('#outputs').html(this.outputListPatent({}));
                        $(this.el).find('#patent-outputs').html(partentOutputsHtml);
                        $(this.el).find('#inventor-outputs').html(inventorOutputsHtml);
                        $(this.el).find('#assignee-outputs').html(assigneeOutputsHtml);
                        $(this.el).find('#citations-outputs').html(citationsOutputsHtml);
                        $(this.el).find('#technology_Classifications-outputs').html(technologyClassificationsOutputsHtml);
                        this.expandParent($(this.el).find('#patent-outputs'));
                        this.expandParent($(this.el).find('#inventor-outputs'));
                        this.expandParent($(this.el).find('#assignee-outputs'));
                        this.expandParent($(this.el).find('#citations-outputs'));
                        this.expandParent($(this.el).find('#technology_Classifications-outputs'));

                        break;
                    }
            }
        },
        getNavHtml: function (s) {
            return '';
        },
        getNextHtml: function () {
            return 'Preview Query <i class="fa fa-caret-right" />';
        }
    });

    return SelectResultsView;
});