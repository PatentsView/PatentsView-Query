/**************************************************************/
// View that enables the user to build the criteria of the query to execute.
/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/query/templates/criteria.html',
    'models/overlay/overlay',
    'views/overlay/overlay',
    'moment',
    'typeahead',
    'bloodhound',
    'query-builder' 
], function ($, _, Backbone, Handlebars, criteriaTemplate, OverlayModel, Overlay) {
    var OverlayView = null;

    var CriteriaView = Backbone.View.extend({
        tagName: 'div',
        className: 'step-view row',
        id: 'criteria',
        initialize: function (options) {
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(criteriaTemplate);
            OverlayView = new Overlay({ model: OverlayModel });
        },
        events: {
            "click a.tooltip-how-to": "showOverlay"
        },
        render: function () {
            if (this.resetView) {
                var qb = this.model.get("qb");

                if (!_.isUndefined(qb)) {
                    qb.queryBuilder('destroy');
                }
                
                var filters = this.model.getFilters();

                if (!_.isNull(filters) && _.size(filters) > 0) {
                    $(this.el).empty();
                    $(this.el).append(this.template(this.model.toJSON()));
                    this.model.set("qb", $(this.el).find('#builder').queryBuilder({
                        plugins: ['location'],
                        select_placeholder: '- Select Field -',
                        filters: filters
                    }));
                }

                this.resetView = false;
            }

            return this;
        },
        isValid: function() {
            return $(this.el).find('#builder').queryBuilder('validate');
        },
        updateModel: function (e) {
            var qb = this.model.get("qb");

            if (!_.isUndefined(qb)) {
                this.model.set("rules", [$(this.el).find('#builder').queryBuilder('getRules')]);
                this.model.set("query", $(this.el).find('#builder').queryBuilder('getQuery'));
            }
        },
        getNavHtml: function (s) {
            var result = '<i class="fa fa-lg fa-square-o"></i> Step 2: Select Criteria';

            switch (s) {
                case "active":
                    {
                        result = '<i class="fa fa-lg fa-square-o"></i> Step 2: Select Criteria';

                        break;
                    }
                case "complete":
                    {
                        result = '<i class="fa fa-lg fa-check-square-o"></i> Step 2: Complete';

                        break;
                    }
                default: {
                    break;
                }
            }

            return result;
        },
        getNextHtml: function () {
            return 'Go to Step 3 &nbsp;&nbsp; <i class="fa fa-play" />';
        },
        entityChanged: function(e) {
            this.resetView = true;
        },
        showOverlay: function (e) {
            debugger;
            var overlayGroup = this.model.getOverlay(OverlayModel.overlays.patentClass);

            if (!overlayGroup) {
                OverlayModel.set({
                    group: null,
                    key: null,
                    sub: null,
                    show: false
                });
                this.hide();
            } else {
                OverlayModel.set({
                    group: overlayGroup,
                    key: OverlayModel.overlays.patentClass,
                    sub: _.findWhere(overlayGroup.items, { key: OverlayModel.overlays.patentClass }),
                    show: true
                });
            }

            e.preventDefault();

            return false;
        }
    });

    return CriteriaView;

});