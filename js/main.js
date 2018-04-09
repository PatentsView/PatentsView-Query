/**************************************************************/
// Main backbone app entry point.
/**************************************************************/
require.config({
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        i18n: 'https://cdnjs.cloudflare.com/ajax/libs/require-i18n/2.0.4/i18n.min',
        handlebarsCore: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.min',
        handlebars: 'libs/plugins/handlebars.helpers',
        bootstrap: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min',
        bootstrapSelect: 'libs/plugins/bootstrap-select',
        typeahead: 'libs/plugins/typeahead.bundle',
        bloodhound: 'libs/plugins/typeahead.bundle',
        validateCore: 'libs/plugins/jquery.validate',
        validate: 'libs/plugins/jquery.validate.additional',
        prism: 'libs/plugins/prism',
        papa: 'libs/plugins/papaparse',
        recaptcha: 'https://www.google.com/recaptcha/api.js?render=explicit&response=yes'
    },
    shim: {
        prism: { exports: 'Prism' },
        papa: { exports: 'Papa' },
        handlebarsCore: { exports:'"Handlebars' },
        handlebars: {
            deps: ['handlebarsCore'],
            exports: 'Handlebars'
        },
        bootstrap: { deps: ['jquery'] },
        bootstrapSelect: { deps: ['jquery'], exports: 'BootstrapSelect' },
        typeahead: { deps: ['jquery'], exports: 'Typeahead' },
        bloodhound: { deps: ['jquery'], exports: 'Bloodhound' },
        validateCore: { exports: 'Validate' },
        validate: {
            deps: ['validateCore'],
            exports: 'Validate'
        },
        recaptcha: { exports: 'Recaptcha' }
    },
    urlArgs: "v=" + (new Date()).getTime()
});

require(["app"], function (App) {
    App.initialize();
});

