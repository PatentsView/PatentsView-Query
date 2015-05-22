/**************************************************************/

/**************************************************************/
require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/lodash',
        backbone: 'libs/backbone',
        text: 'libs/plugins/text',
        handlebarsCore: 'libs/plugins/handlebars',
        handlebars: 'libs/plugins/handlebars.helpers',
        validateCore: 'libs/plugins/jquery.validate',
        validate: 'libs/plugins/jquery.validate.additional',
        moment: 'libs/plugins/moment',
        'query-builder': 'libs/plugins/query-builder.standalone',
        recaptcha: 'https://www.google.com/recaptcha/api.js?render=explicit&response=yes'
    },
    shim: {
        handlebarsCore: { exports:'"Handlebars' },
        handlebars: {
            deps: ['handlebarsCore'],
            exports: 'Handlebars'
        },
        validateCore: { exports: 'Validate' },
        validate: {
            deps: ['validateCore'],
            exports: 'Validate'
        },
        recaptcha: { exports: 'Recaptcha' }
    }
});

require([
  "app"
], function (App) {
    App.initialize();
});