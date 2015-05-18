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
        tagName: 'div',
        className: 'step-view row',
        id: 'outputs',
        initialize: function () {
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(resultsTemplate);
            
        },
        render: function () {
            $(this.el).empty();
            $(this.el).append(this.template(this.model.get('outputs')));
            var mfc = 0;

            var checkAlls = $(this.el).find('input.check-all');
            _.forEach(checkAlls, function (checkall) {

                $(checkall).click(function () {
                    var dataId = $(this).attr('data-id');
                    $('ul[data-output-group-id="' + dataId + '"]').find('.check').prop('checked', $(this).prop('checked'));
                });
            });

            //var maxHeight = 0;

            //$('.output-groups').each(function () {
            //    if ($(this).height() > maxHeight) {
            //        maxHeight = $(this).height();
            //    }
            //});

            $('.output-groups').height(280);//TODO: (High) Replace the static output-groups height set with a calc of max field count.

            return this;
        },
        updateModel: function () {
            var outputs = this.model.get('outputs');
            var outputIds = new Array();

            _.forEach(outputs, function (group) {
                group.isActive = $('#output-group-' + group.id + '').prop('checked');
                group.isChildActive = false;
                _.forEach(group.fields, function (field) {
                    var output = $('#output-field-' + field.id + '');
                    if (output.prop('checked')) {
                        field.isActive = true;
                        group.isChildActive = true;
                        outputIds.push(field.id);
                    }                    
                });
            });

            this.model.set('outputIds', outputIds);
        },
        getNavHtml: function (s) {
            //s is the state requested.
            var result = '<i class="fa fa-lg fa-square-o"></i> Step 3: Output Fields';

            switch (s) {
                case "active":
                    {
                        result = '<i class="fa fa-lg fa-square-o"></i> Step 3: Output Fields';
                    
                        break;
                    }
                case "complete":
                    {
                        result = '<i class="fa fa-lg fa-check-square-o"></i> Step 3: Complete';

                        break;
                    }
                default:{
                    break;
                }
            }


            return result;
        },
        getNextHtml: function () {
            return 'Go to Step 4 &nbsp;&nbsp; <i class="fa fa-play" />';
        }
    });

    return ResultsView;

});