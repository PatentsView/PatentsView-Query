/**************************************************************/
// View that enables the user to build the criteria of the query to execute.
/**************************************************************/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/query/templates/SelectCriteria.html',
    'text!views/query/templates/SelectCriteriaPatent.html',
    'text!views/query/templates/SelectCriteriaAssignee.html',
    'text!views/query/templates/SelectCriteriaInventor.html',
    'text!views/query/templates/Expressions.html',
    'text!views/query/templates/AddCriteria.html',
    'text!views/query/templates/AddCriteriaOperator.html',
    'text!views/query/templates/AddCriteriaValue.html',
    'bootstrap',
    'models/overlay/overlay',
    'views/overlay/overlay',
    'validate',
    'typeahead',
    'bloodhound',
], function ($, _, Backbone, Handlebars, SelectCriteriaTemplate, SelectCriteriaPatentTemplate, SelectCiteriaAssigneeTemplate, SelectCiteriaInventorTemplate, ExpressionsTemplate, AddCriteriaTemplate, AddCriteriaOperatorTemplate, AddCriteriaValueTemplate, OverlayModel, Overlay) {

    var SelectCriteriaView = Backbone.View.extend({
        tagName: 'section',
        id: 'selectCriteria',
        className: 'step-view',
        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, 'entityChanged', this.entityChanged);
            _.bindAll(this, 'render', 'updateModel');
            this.template = Handlebars.compile(SelectCriteriaTemplate);
            this.selectCriteriaPatentTemplate = Handlebars.compile(SelectCriteriaPatentTemplate);
            this.selectCriteriaAssigneeTemplate = Handlebars.compile(SelectCiteriaAssigneeTemplate);
            this.selectCriteriaInventorTemplate = Handlebars.compile(SelectCiteriaInventorTemplate);
            this.expressionsTemplate = Handlebars.compile(ExpressionsTemplate);
            this.addTemplate = Handlebars.compile(AddCriteriaTemplate);
            this.addOperatorTemplate = Handlebars.compile(AddCriteriaOperatorTemplate);
            this.addValueTemplate = Handlebars.compile(AddCriteriaValueTemplate);

            return this;
        },
        events: {
            "click #advanced-search": "toggleSearch",
            "click #back-quick-search": "toggleSearch",
            "click .quick-search": "quickSearch",
            "click .submit-search": "submitSearch",
            "keyup #quickSearch": "keyPressQuickSearch",
            "click input[type=radio][name=entity]": "selectEntity",
            "change #patent-condition": "changeCondition",
            "change #assignee-condition": "changeCondition",
            "change #inventor-condition": "changeCondition",
            "change #lawyer-condition" :"changeCondition",
            "change #cpc-condition": "changeCondition",
            "change #nber-condition": "changeCondition",
            "change #ipc-condition": "changeCondition",
            "change #uspc-condition": "changeCondition",
            "change #wipos-condition": "changeCondition",
            "change #citedPatents-condition": "changeCondition",
            "change #citedApplications-condition": "changeCondition",
            "change #citingPatents-condition": "changeCondition",
            "click #add-applications": "addCondition",
            "click #add-inventors": "addCondition",
            "click #add-assignees": "addCondition",
            "click #add-lawyers": "addCondition",
            "click #add-cpcs": "addCondition",
            "click #add-nbers": "addCondition",
            "click #add-ipcs": "addCondition",
            "click #add-uspcs": "addCondition",
            "click #add-wipos": "addCondition",
            "click #add-cited_patents": "addCondition",
            "click #add-application_citations": "addCondition",
            "click #add-citedby_patents": "addCondition",
            "click .clear-btn": "clearCondition",
            "click #filters-clearall": "clearAllExpressions",
            'keydown .city': 'keyLocation',
            'keydown .state': 'keyLocation',
            'focusout .city': 'blurLocation',
            'focusout .state': 'blurLocation',
            'focusout .country': 'blurLocation',
        },
        render: function () {
            var modelJSON = this.model.toJSON();
            $(this.el).empty();
            $(this.el).append(this.template(modelJSON));
            this.renderCategoryCriteria();
            $(this.el).find('#filters').html(this.expressionsTemplate(modelJSON));
            
            //TODO: move this it's own method.
            if (!this.model.get('isQuickSearch')) {
                $(this.el).find('#quick-search-section').hide();
                $(this.el).find('#entity-section').show();
                $(this.el).find('#criteria-section').show();
                $(this.el).find('#back-quick-search').show();
                $(this.el).find('.intro-text').hide();
                $(this.el).find('.intro').removeClass('intro-centered');
            }
            else {
                $(this.el).find('#entity-section').hide();
                $(this.el).find('#criteria-section').hide();
                $(this.el).find('#quick-search-section').show();
                $(this.el).find('#back-quick-search').hide();
                $(this.el).find('.intro-text').show();
                $(this.el).find('.intro').addClass('intro-centered');
            }

            return this;
        },
        isValid: function () {
            if (this.model.get('isQuickSearch') == true) {
                var form = $(this.el).find('#quickSearchForm');
                form.validate({
                    rules: {
                        quickSearch: {
                            required: true,
                        }
                    },
                    messages: {
                        quickSearch: {
                            required: "Please provide quick search keywords for the query."
                        }
                    },
                    highlight: function (element) {
                        $(element).closest('#quickSearch').addClass('has-error');
                    },
                    unhighlight: function (element) {
                        $(element).closest('#quickSearch').removeClass('has-error');
                    }
                });

                return form.valid();
            }
            else if ($(this.el).find('.expression').length == 0) {
                $(this.el).find('#filters').html('<span id="submitSearch-error" class="error">Please add search criteria for the query.</span>');
                //TODO: Might condier adding a scrollto so that if the button at the bottom of the form was clicked this is seen.
                return false;
            }

            return true;
        },
        updateModel: function () {
            
            var entities = this.model.get('entities');
            var entityChecked = $(this.el).find('input[name=entity]:checked');
            var entityName = entityChecked.data('name');
            var entityId = entityChecked.val();
            var entity = _.find(entities, { "id": entityId });
            var expressions = []

            $(this.el).find('.expression').each(function (i, exp) {
                var expression = $(exp);
                
                expressions.push(
                {
                    "fieldText": expression.data('fieldText'),
                    "field": expression.data('field'),
                    "operatorText": expression.data('operatorText'),
                    "operator": expression.data('operator'),
                    "value": expression.data('value')
                });
            });
            
            _.forEach(entities, function (opt) { opt.isActive = (opt.id == entityId); });

            this.model.set('expressions', expressions);
            this.model.set('entities', entities);
            this.model.set('entityId', entityId);
            this.model.set('entityName', entityName);
            this.model.set('quickSearch', $(this.el).find('#quickSearch').val());
            this.model.set('sorts', this.model.getSorts());
        },
        renderCategoryCriteria: function () {
            var entityId = this.model.get("entityId");
            var patentConditionHtml = this.addTemplate({
                "optGroup": "applications",
                "id": "applications",
                "name": "Patents",
                "tip": "Data related to patents and patent applications",
                "fields": this.model.getFilters("applications")
            });
            var inventorConditionHtml = this.addTemplate({
                "optGroup": "inventors",
                "id": "inventors",
                "name": "Inventors",
                "tip": "Data related to inventors on the patents",
                "fields": this.model.getFilters("inventors")
            });
            var assigneeConditionHtml = this.addTemplate({
                "optGroup": "assignees",
                "id": "assignees",
                "name": "Assignees",
                "tip": "Data related to assignees on the patents",
                "fields": this.model.getFilters("assignees")
            });

            var lawyerConditionHtml = this.addTemplate({
                "optGroup": "lawyers",
                "id": "lawyer",
                "name": "Lawyers",
                "tip": "Data related to lawyers on the patents",
                "fields": this.model.getFilters("lawyers")
            });

            var cpcCondHtml = this.addTemplate({
                "optGroup": "cpcs",
                "id": "cpcs",
                "name": "Cooperative Patent Class",
                "tip": "Metadata describing the cooperative patent classification of the patents. The full class string can be searched in CPC Class field with type-ahead functionality.",
                "fields": this.model.getFilters("cpcs")
            });

            var nberCondHtml = this.addTemplate({
                "optGroup": "nbers",
                "id": "nbers",
                "name": "NBER",
                "tip": "Metadata describing the technology area of the patents. See www.nber.org/patents for more information on NBER technology areas. Only available through May 2015.",
                "fields": this.model.getFilters("nbers")
            });

            var ipcCondHtml = this.addTemplate({
                "optGroup": "ipcs",
                "id": "ipcs",
                "name": "International Patent Class",
                "tip": "Metadata describing the international patent classification of the patents. The full class string can be searched in IPC Class field with type-ahead functionality.",
                "fields": this.model.getFilters("ipcs")
            });

            var uspcsCondHtml = this.addTemplate({
                "optGroup": "uspcs",
                "id": "uspcs",
                "name": "US Patent Class",
                "tip": "Metadata describing the US patent classification of the patents. The full class string can be searched in USPC Class field with type-ahead functionality. Only available through May 2015.",
                "fields": this.model.getFilters("uspcs")
            })

            var wiposCondHtml = this.addTemplate({
                "optGroup": "wipos",
                "id": "wipos",
                "name": "WIPO",
                "tip": "WIPO tooltip should read: Metadata describing the technology field of the patents.",
                "fields": this.model.getFilters("wipos")
            });

            var citedPatentsCondHtml = this.addTemplate({
                "optGroup": "cited_patents",
                "id": "cited_patents",
                "name": "Cited Patents",
                "tip": "Data related to patents that have been cited by the patents associated with the search criteria",
                "fields": this.model.getFilters("cited_patents")
            });

            var applicationCitationsCondHtml = this.addTemplate({
                "optGroup": "application_citations",
                "id": "application_citations",
                "name": "Cited Appliations",
                "tip": "Data related to patent applications that have been cited by the patents associated with the search criteria",
                "fields": this.model.getFilters("application_citations")
            });

            var citedbyPatentsCondHtml = this.addTemplate({
                "optGroup": "citedby_patents",
                "id": "citedby_patents",
                "name": "Citing Patents",
                "tip": "Data related to patents that have cited the patents associated with the search criteria",
                "fields": this.model.getFilters("citedby_patents")
            });

            switch (entityId) {

                case "inventor":
                    {
                        $(this.el).find('#conditions').html(this.selectCriteriaInventorTemplate({}));
                        $(this.el).find('#patent-condition').html(patentConditionHtml);
                        $(this.el).find('#inventor-condition').html(inventorConditionHtml);
                        $(this.el).find('#assignee-condition').html(assigneeConditionHtml);
                        $(this.el).find('#lawyer-condition').html(lawyerConditionHtml);
                        $(this.el).find('#cpc-condition').html(cpcCondHtml);
                        $(this.el).find('#nber-condition').html(nberCondHtml);
                        $(this.el).find('#ipc-condition').html(ipcCondHtml);
                        $(this.el).find('#uspc-condition').html(uspcsCondHtml);
                        $(this.el).find('#wipos-condition').html(wiposCondHtml);

                        break;
                    }
                case "assignee":
                    {
                        $(this.el).find('#conditions').html(this.selectCriteriaAssigneeTemplate({}));
                        $(this.el).find('#patent-condition').html(patentConditionHtml);
                        $(this.el).find('#inventor-condition').html(inventorConditionHtml);
                        $(this.el).find('#assignee-condition').html(assigneeConditionHtml);
                        $(this.el).find('#lawyer-condition').html(lawyerConditionHtml);
                        $(this.el).find('#cpc-condition').html(cpcCondHtml);
                        $(this.el).find('#nber-condition').html(nberCondHtml);
                        $(this.el).find('#ipc-condition').html(ipcCondHtml);
                        $(this.el).find('#uspc-condition').html(uspcsCondHtml);
                        $(this.el).find('#wipos-condition').html(wiposCondHtml);

                        break;
                    }
                default: //patent
                    {
                        $(this.el).find('#conditions').html(this.selectCriteriaPatentTemplate({}));
                        $(this.el).find('#patent-condition').html(patentConditionHtml);
                        $(this.el).find('#inventor-condition').html(inventorConditionHtml);
                        $(this.el).find('#assignee-condition').html(assigneeConditionHtml);
                        $(this.el).find('#lawyer-condition').html(lawyerConditionHtml);
                        $(this.el).find('#cpc-condition').html(cpcCondHtml);
                        $(this.el).find('#nber-condition').html(nberCondHtml);
                        $(this.el).find('#ipc-condition').html(ipcCondHtml);
                        $(this.el).find('#uspc-condition').html(uspcsCondHtml);
                        $(this.el).find('#wipos-condition').html(wiposCondHtml);
                        $(this.el).find('#citedPatents-condition').html(citedPatentsCondHtml);
                        $(this.el).find('#citedApplications-condition').html(applicationCitationsCondHtml);
                        $(this.el).find('#citingPatents-condition').html(citedbyPatentsCondHtml);

                        break;
                    }
            }

            $(this.el).find('[data-toggle="popover"]').popover({
                trigger: 'hover',
                'placement': 'top'
            });
        },
        toggleSearch: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);

            if (this.model.get('isQuickSearch')) {
                $(this.el).find('#quick-search-section').hide();
                $(this.el).find('#entity-section').show();
                $(this.el).find('#criteria-section').show();
                $(this.el).find('#back-quick-search').show();
                $(this.el).find('.intro-text').hide();
                $(this.el).find('.intro').removeClass('intro-centered');
                this.model.set('isQuickSearch', false);
            }
            else {
                $(this.el).find('#entity-section').hide();
                $(this.el).find('#criteria-section').hide();
                $(this.el).find('#quick-search-section').show();
                $(this.el).find('#back-quick-search').hide();
                $(this.el).find('.intro-text').show();
                $(this.el).find('.intro').addClass('intro-centered');
                this.model.set('isQuickSearch', true);
            }

            this.options.stepByStepView.displayPager(this.displayPager());

            return false;
        },
        keyPressQuickSearch: function (e) {
            if (e.keyCode == 13) {
                return this.quickSearch();
            }
        },
        keyLocation: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);

            //Ignore the shift and tab keys.
            if (e.keyCode == 16 || e.keyCode == 9) return true;

            ///if the target has a class of state or city then prepare to eval.
            if (source.hasClass('state'))
            {
                var country = $('#add-' + source.data("id") + '-country');

                if (country.val().trim().toUpperCase() == "UNITED STATES")
                {
                    $(source).popover('destroy');

                    return true;
                }

                var attr = $(source).attr('aria-describedby');

                if (_.isUndefined(attr) || attr == false) {
                    $(source).popover({ content: "States data is only available for the United States.", placement: "top" }).popover('show');
                }
                
                return false;
            }

            if (source.hasClass('city')) {
                var country = $('#add-' + source.data("id") + '-country');

                if (country.val().trim().length > 0) {
                    $(source).popover('destroy');

                    return true;
                }

                var attr = $(source).attr('aria-describedby');

                if (_.isUndefined(attr) || attr == false) {
                    $(source).popover({ content: "Specify a country first.", placement: "top" }).popover('show');
                }

                return false;
            }
        },
        blurLocation: function(e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);

            if (source.hasClass('country'))
            {
                if (source.val().trim().length == 0)
                {
                    $('#add-' + source.data("id") + '-state').typeahead('val', '');
                    $('#add-' + source.data("id") + '-city').typeahead('val', '');
                }
                else if (source.val().trim().toUpperCase() != "UNITED STATES")
                {
                    $('#add-' + source.data("id") + '-state').typeahead('val', '');
                }
            }
            else
            { $(source).popover('destroy'); }
        },
        quickSearch: function () {
            this.model.set('isQuickSearch', true);
            this.model.set('entityId', "patent");
            $('#next').click();

            return false;
        },
        submitSearch: function () {
            this.model.set('isQuickSearch', false);
            $('#next').click();
        },
        changeCondition: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var isFieldChange = source.hasClass('select-field-id');
            
            if (isFieldChange) {
                var field = this.model.getFilter(source.val());

                //update the operator.
                $(this.el).find('#add-' + source.data("id") + '-operator-container').html(this.addOperatorTemplate(field));
                //update the value.
                $(this.el).find('#add-' + source.data("id") + '-value-container').html(this.addValueTemplate(field));

                if (field.type == "location") {
                    var locationCountry = $(this.el).find('#add-' + source.data("id") + '-value-container input[data-location-type="country"]');
                    var locationCity = $(this.el).find('#add-' + source.data("id") + '-value-container input[data-location-type="city"]');
                    var locationState = $(this.el).find('#add-' + source.data("id") + '-value-container input[data-location-type="state"]');

                    var countryEngine = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: ['Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Cambodia', 'Cameroon', 'Canada', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Congo [DRC]', 'Congo [Republic]', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia [FYROM]', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar [Burma]', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russia', 'Saint Barthelemy', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'South Africa', 'South Korea', 'South Sudan', 'Soviet Union', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'U.S. Virgin Islands', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Wallis and Futuna', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe'],
                        initialize: true
                    });

                    var stateEngine = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
                        initialize: true
                    });

                    var cityEngine = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/location.php",
                            //url: "/query/location.php",
                            replace: function (url, query) {
                                return url + "?cc=" + locationCountry.typeahead('val') + "&r=c" + "&c=" + query;
                            }
                        },
                        initialize: true
                    });

                    locationCountry.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    }, {
                        name: 'countries',
                        source: countryEngine
                    });

                    locationCity.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 2
                    },
                    {
                        name: 'cities',
                        source: cityEngine
                    });

                    locationState.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'states',
                        source: stateEngine
                    });
                }

                if (field.type == "cpc") {

                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var cpcEngine = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/cpc.php",
                            //url: "/query/cpc.php",
                            replace: function (url, query) {
                                return url + "?cc=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'cpc',
                        source: cpcEngine
                    });
                }

                if (field.type == "uspc") {

                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var uspcEngine = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/uspc.php",
                            //url: "/query/uspc.php",
                            replace: function (url, query) {
                                return url + "?cc=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'uspc',
                        source: uspcEngine
                    });
                }

                if (field.type == "ipc") {

                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var ipcEngine = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/ipc.php",
                            //url: "/query/ipc.php",
                            replace: function (url, query) {
                                return url + "?cc=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'ipc',
                        source: ipcEngine
                    });
                }
                
                //Add typeahead support if the assignee_organization field if it has been selected and the equal or not equal operator is in use.
                if (field.id == "assignee_organization") {
                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var organizationEngine = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/assignee.php",
                            //url: "/query/assignee.php",
                            replace: function (url, query) {
                                return url + "?o=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'organization',
                        limit: 10,
                        source: organizationEngine
                    });
                }

                //Add typeahead support if the govint_org_name field if it has been selected and the equal or not equal operator is in use.
                if (field.id == "govint_org_name") {
                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var govName = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/gov.php",
                            //url: "/query/gov.php",
                            replace: function (url, query) {
                                return url + "?n=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'govName',
                        limit: 10,
                        source: govName
                    });
                }

                if (field.id == "govint_org_level_one") {
                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var govTopLevel = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/gov.php",
                            //url: "/query/gov.php",
                            replace: function (url, query) {
                                return url + "?lo=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'govTopLevel',
                        limit: 10,
                        source: govTopLevel
                    });
                }

                if (field.id == "govint_org_level_two") {
                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var govSecondLevel = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/gov.php",
                            //url: "/query/gov.php",
                            replace: function (url, query) {
                                return url + "?ltw=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'govSecondLevel',
                        limit: 10,
                        source: govSecondLevel
                    });
                }

                if (field.id == "govint_org_level_three") {
                    var valueField = $(this.el).find('#add-' + field.id + '-value');
                    valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                    var govThirdLevel = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.whitespace,
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "https://www.patentsview.org/querydev/query/gov.php",
                            //url: "/query/gov.php",
                            replace: function (url, query) {
                                
                                return url + "?lth=" + query;
                            }
                        },
                        initialize: true
                    });

                    valueField.typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'govThirdLevel',
                        limit: 10,
                        source: govThirdLevel
                    });
                }
            }
            else {
                var id = source.data("id");
                var field = this.model.getFilter(id);
                var valueField = $(this.el).find('#add-' + field.optgroup + '-value-container').find('#add-' + field.id + '-value');

                if (field.id == "assignee_organization") {
                    if (source.val() == "_eq" || source.val() == "_neq") {
                        valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                        var organizationEngine = new Bloodhound({
                            datumTokenizer: Bloodhound.tokenizers.whitespace,
                            queryTokenizer: Bloodhound.tokenizers.whitespace,
                            remote: {
                                url: "https://www.patentsview.org/querydev/query/assignee.php",
                                //url: "/query/assignee.php",
                                replace: function (url, query) {
                                    return url + "?o=" + query;
                                }
                            },
                            initialize: true
                        });

                        valueField.typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        },
                        {
                            name: 'organization',
                            limit: 10,
                            source: organizationEngine
                        });
                    }
                    else {
                        valueField.typeahead('destroy');
                    }
                }

                if (field.id == "govint_org_name") {
                    if (source.val() == "_eq" || source.val() == "_neq") {
                        valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                        var govName = new Bloodhound({
                            datumTokenizer: Bloodhound.tokenizers.whitespace,
                            queryTokenizer: Bloodhound.tokenizers.whitespace,
                            remote: {
                                url: "https://www.patentsview.org/querydev/query/gov.php",
                                //url: "/query/gov.php",
                                replace: function (url, query) {
                                    return url + "?n=" + query;
                                }
                            },
                            initialize: true
                        });

                        valueField.typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        },
                        {
                            name: 'govName',
                            limit: 10,
                            source: govName
                        });
                    }
                    else {
                        valueField.typeahead('destroy');
                    }
                }

                if (field.id == "govint_org_level_one") {
                    if (source.val() == "_eq" || source.val() == "_neq") {
                        valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                        var govTopLevel = new Bloodhound({
                            datumTokenizer: Bloodhound.tokenizers.whitespace,
                            queryTokenizer: Bloodhound.tokenizers.whitespace,
                            remote: {
                                url: "https://www.patentsview.org/querydev/query/gov.php",
                                //url: "/query/gov.php",
                                replace: function (url, query) {
                                    return url + "?lo=" + query;
                                }
                            },
                            initialize: true
                        });

                        valueField.typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        },
                        {
                            name: 'govTopLevel',
                            limit: 10,
                            source: govTopLevel
                        });
                    }
                    else {
                        valueField.typeahead('destroy');
                    }
                }

                if (field.id == "govint_org_level_two") {
                    
                    if (source.val() == "_eq" || source.val() == "_neq") {
                        valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                        var govSecondLevel = new Bloodhound({
                            datumTokenizer: Bloodhound.tokenizers.whitespace,
                            queryTokenizer: Bloodhound.tokenizers.whitespace,
                            remote: {
                                url: "https://www.patentsview.org/querydev/query/gov.php",
                                //url: "/query/gov.php",
                                replace: function (url, query) {
                                    return url + "?ltw=" + query;
                                }
                            },
                            initialize: true
                        });

                        valueField.typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        },
                        {
                            name: 'govSecondLevel',
                            limit: 10,
                            source: govSecondLevel
                        });
                    }
                    else {
                        valueField.typeahead('destroy');
                    }
                }

                if (field.id == "govint_org_level_three") {
                    
                    if (source.val() == "_eq" || source.val() == "_neq") {
                        valueField.attr("data-provider", "typeahead").attr("autocomplete", "false");

                        var govThirdLevel = new Bloodhound({
                            datumTokenizer: Bloodhound.tokenizers.whitespace,
                            queryTokenizer: Bloodhound.tokenizers.whitespace,
                            remote: {
                                url: "https://www.patentsview.org/querydev/query/gov.php",
                                //url: "/query/gov.php",
                                replace: function (url, query) {
                                    
                                    return url + "?lth=" + query;
                                }
                            },
                            initialize: true
                        });

                        valueField.typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        },
                        {
                            name: 'govThirdLevel',
                            limit: 10,
                            source: govThirdLevel
                        });
                    }
                    else {
                        valueField.typeahead('destroy');
                    }
                }
            }
        },
        addCondition: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var form = source.closest('.condition').find('form');

            //If no form is found then don't perform validation and return the call.
            if (form.length == 0)
                return;

            var validator = form.validate(
                {
                    //errorPlacement: function (error, element) {
                    //    var target = $(element).closest('.panel-body');
                    //    var errorLabel = target.find('label.error');

                    //    if (!_.isUndefined(errorLabel)) {
                    //        errorLabel.remove();
                    //    }

                    //    target.append(error);
                    //}
                }
            );

            if (form.valid()) {
                
                var id = source.data("id");
                var name = source.data("name");
                var expressions = this.model.get('expressions');
                var field = $(this.el).find('#add-' + id + '-field option:selected');
                var fieldVal = field.val();
                var operator = $(this.el).find('#add-' + fieldVal + '-operator option:selected');
                var filter = this.model.getFilter(fieldVal);


                if (filter.type == "location") {
                    var country = $(this.el).find('#add-' + fieldVal + '-country');
                    var city = $(this.el).find('#add-' + fieldVal + '-city');
                    var state = $(this.el).find('#add-' + fieldVal + '-state');
                    
                    if (country.val().length > 0)
                    {
                        var countryCode = this.model.getCountryCode(country.val());

                        if (countryCode.length > 0) {
                            expressions.push(
                            {
                                "fieldText": field.text() + " Country",
                                "field": fieldVal.replace("location", "country"),
                                "operatorText": operator.text(),
                                "operator": operator.val(),
                                "value": countryCode
                            });
                        }

                       this.clearValue(country);
                    }

                    if (city.val().length > 0) {
                        expressions.push(
                        {
                            "fieldText": field.text() + " City",
                            "field": fieldVal.replace("location", "city"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": city.val()
                        });

                        this.clearValue(city);
                    }

                    if (state.val().length > 0) {

                        var stateCode = this.model.getStateCode(state.val());

                        if (stateCode.length > 0) {
                            expressions.push(
                            {
                                "fieldText": field.text() + " State",
                                "field": fieldVal.replace("location", "state"),
                                "operatorText": operator.text(),
                                "operator": operator.val(),
                                "value": stateCode
                            });
                        }

                        this.clearValue(state);
                    }
                }
                else if (filter.type == "cpc")
                {
                    var value = $(this.el).find('#add-' + fieldVal + '-value');
                    var val = value.val().trim();
                    var section_id = (val.length > 0) ? val.substr(0, 1) : "";
                    var subsection_id = (val.length > 2) ? val.substr(0, 3) : "";
                    var group_id = (val.length > 3) ? val.substr(0, 4) : "";
                    var subgroup_id = (val.length > 4) ? val : "";
                    
                    expressions.push(
                    {
                        "fieldText": "CPC Section ID",
                        "field": fieldVal.replace("class", "section_id"),
                        "operatorText": operator.text(),
                        "operator": operator.val(),
                        "value": section_id.trim()
                    });

                    if (subsection_id.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "CPC Subsection ID",
                            "field": fieldVal.replace("class", "subsection_id"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": subsection_id.trim()
                        });
                    }

                    if (group_id.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "CPC Group ID",
                            "field": fieldVal.replace("class", "group_id"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": group_id.trim()
                        });
                    }

                    if (subgroup_id.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "CPC Subgroup ID",
                            "field": fieldVal.replace("class", "subgroup_id"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": subgroup_id.trim()
                        });
                    }

                    this.clearValue(value);
                }
                else if (filter.type == "uspc") {
                    
                    var value = $(this.el).find('#add-' + fieldVal + '-value');
                    var val = value.val().trim().split('/');
                    
                    var mainclass_id = (val.length > 0) ? val[0] : "";
                    var subclass_id = (val.length > 1) ? val[1] : "";
                                       
                    if (mainclass_id.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "USPC Mainclass ID",
                            "field": fieldVal.replace("class", "mainclass_id"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": mainclass_id.trim()
                        });
                    }

                    if (subclass_id.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "USPC Subclass ID",
                            "field": fieldVal.replace("class", "subclass_id"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": (mainclass_id.length > 0) ? mainclass_id + "/" + subclass_id : subclass_id
                        });
                    }

                    this.clearValue(value);
                }
                else if (filter.type == "ipc") {
                    
                    var value = $(this.el).find('#add-' + fieldVal + '-value');
                    var val = value.val().trim();

                    var ipc_section = (val.length > 0) ? val.substr(0, 1) : "";
                    var ipc_class = (val.length > 2) ? val.substr(1, 2) : "";
                    var ipc_subclass = (val.length > 3) ? val.substr(3, 1) : "";

                    var splitClass = val.split('/');
                    
                    var ipc_main_group = (val.length > 4 && splitClass.length > 0) ? splitClass[0].substr(4) : "";
                    var ipc_subgroup = (val.length > 4 && splitClass.length > 1) ? splitClass[1] : "";

                    expressions.push(
                    {
                        "fieldText": "IPC Section ID",
                        "field": fieldVal.replace("classes", "section"),
                        "operatorText": operator.text(),
                        "operator": operator.val(),
                        "value": ipc_section.trim()
                    });

                    if (ipc_class.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "IPC Class ID",
                            "field": fieldVal.replace("classes", "class"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": ipc_class.trim()
                        });
                    }

                    if (ipc_subclass.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "IPC Subclass ID",
                            "field": fieldVal.replace("classes", "subclass"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": ipc_subclass.trim()
                        });
                    }

                    if (ipc_main_group.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "IPC Maingroup ID",
                            "field": fieldVal.replace("classes", "main_group"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": ipc_main_group.trim()
                        });
                    }

                    if (ipc_subgroup.length > 0) {
                        expressions.push(
                        {
                            "fieldText": "IPC Subgroup ID",
                            "field": fieldVal.replace("classes", "subgroup"),
                            "operatorText": operator.text(),
                            "operator": operator.val(),
                            "value": ipc_subgroup.trim()
                        });
                    }

                    this.clearValue(value);
                }
                else {
                    var value = $(this.el).find('#add-' + fieldVal + '-value');

                    expressions.push(
                    {
                        "fieldText": field.text(),
                        "field": fieldVal,
                        "operatorText": operator.text(),
                        "operator": operator.val(),
                        "value": value.val()
                    });

                    this.clearValue(value);
                }
                
                var error = $(this.el).find('#submitSearch-error');
                var filtersDesc = $(this.el).find('#filters p');

                if (!_.isUndefined(filtersDesc))
                    filtersDesc.remove();

                if (!_.isUndefined(error))
                    error.remove();

                this.model.set('expressions', expressions);
                $(this.el).find('#filters').html(this.expressionsTemplate(this.model.toJSON()));
                validator.resetForm();
                this.model.set('isQuickSearch', false);
                this.resetFields(id);
            }
        },
        resetFields: function (id) {
            
            $(this.el).find('#add-' + id + '-field')[0].selectedIndex = 0;
            //update the operator.    
            $(this.el).find('#add-' + id + '-operator-container').html(this.addOperatorTemplate({"id": id}));
            //update the value.       
            $(this.el).find('#add-' + id + '-value-container').html(this.addValueTemplate({ "id": id,  "reset": true }));
        },
        clearAllExpressions: function (e) {
            this.model.set('expressions', []);
            $(this.el).find('#filters').html(this.expressionsTemplate(this.model.toJSON()));
        },
        clearCondition: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            source.remove();
            var expressions = []

            //TODO: This is a quick fix and needs to be refactored.
            $(this.el).find('.expression').each(function (i, exp) {
                var expression = $(exp);

                expressions.push(
                {
                    "fieldText": expression.data('fieldText'),
                    "field": expression.data('field'),
                    "operatorText": expression.data('operatorText'),
                    "operator": expression.data('operator'),
                    "value": expression.data('value')
                });
            });

            this.model.set('expressions', expressions);

            if ($(this.el).find('.expression').length == 0) { //No expressions exist so reset the expressions template.
                this.model.set('expressions', []);
                $(this.el).find('#filters').html(this.expressionsTemplate(this.model.toJSON()));
            }
        },
        clearValue: function (target) {
            
            if (_.isUndefined(target))
                return;

            //Determine what type this control is and reset it as appropriate.

            if ($(target).is('select')) { //is select element
                $(target).find('option').each(function () {
                    if (this.defaultSelected) {
                        this.selected = true;
                        return false;
                    }
                });

                return;
            }

            if ($(target).is('input')) { //is input elelment
                target.val('');

                return;
            }
        },
        getNextHtml: function () {
            return 'Submit Search <i class="fa fa-caret-right" />';
        },
        getNavHtml: function (s) {
            return '';
        },
        displayPager: function () {
            return !this.model.get("isQuickSearch");
        },
        entityChanged: function () {
            this.model.set('outputIds', []);
            this.model.set('quickSearch', '');
            this.model.set('expressions', []);
            $(this.el).find('#quickSearch').val('');
            $(this.el).find('#filters').html(this.expressionsTemplate(this.model.toJSON()));
            this.renderCategoryCriteria();
            this.resetView = true;
        },
        selectEntity: function (e) {
            e = e || window.event;
            var source = $(e.srcElement || e.target);
            var dataId = source.val();
            var entityId = this.model.get("entityId");
            var quickSearch = $(this.el).find('#quickSearch').val();
            var expressions = this.model.get('expressions');
            var that = this;

            if ((!_.isUndefined(entityId) && !_.isEmpty(entityId)) && dataId != entityId && (quickSearch != '' || expressions.length > 0)) {
                $('.entity-change-modal').find('.ok').on('click', function () {
                    $('.entity-change-modal').modal('hide');
                    that.model.set("entityId", dataId);
                    that.model.trigger('entityChanged');
                });
                $('.entity-change-modal').find('.cancel').on('click', function () {
                    $('#categories').find('input[type=radio][name=entity]').prop('checked', false);
                    $('#categories').find('input[type=radio][value=' + entityId + ']').prop('checked', true);
                    $('.entity-change-modal').modal('hide');
                });

                $('.entity-change-modal').modal('show');
            }
            else {
                this.model.set("entityId", dataId);
                this.model.trigger('entityChanged');
            }
        }
    });

    return SelectCriteriaView;
});