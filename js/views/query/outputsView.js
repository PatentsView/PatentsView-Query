/**************************************************************/

/**************************************************************/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../templates/query/outputs.html'
], function ($, _, Backbone, Handlebars, resultsTemplate) {

    var ResultsView = Backbone.View.extend({
        tagName: 'section',
        className: 'step-view',
        id: 'outputs',
        initialize: function () {
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(resultsTemplate);
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.get('lookups')));

            //might be able to move this somewhere else.
            var checkAlls = $(this.el).find('input.check-all');
            _.forEach(checkAlls, function (checkall) {

                $(checkall).click(function () {
                    var dataId = $(this).attr('data-id');
                    $('ul[data-category-id="' + dataId + '"]').find('.check').prop('checked', $(this).prop('checked'));
                });
            });

            return this;
        },
        updateModel: function () {
            //var dataIds = $(this.el).find('.check-all').attr('data-id');  //get all the categories
            var lookups = this.model.get('lookups');
            var outputIds = new Array();
            //var entity = _.find(lookups.outputs, { "id": dataId });

            //Loop the categories.
            _.forEach(lookups.outputs, function (category) {
                category.isActive = $('#category-' + category.id + '').prop('checked');

                _.forEach(category.subcategories, function (subCategory) {
                    var output = $('#output-' + subCategory.id + '');
                    if (output.prop('checked')) {
                        subCategory.isActive = true;
                        outputIds.push(subCategory.id);
                    }                    
                });
            });

          
            this.model.set('outputIds', outputIds);
        },
        getNextHtml: function () {
            return 'Go to Step 4 &nbsp;&nbsp; <i class="fa fa-play" />';
        }
    });

    return ResultsView;

});