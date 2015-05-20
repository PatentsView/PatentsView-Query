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
        'query-builder': 'libs/plugins/query-builder.standalone',
        recaptcha: "https://www.google.com/recaptcha/api.js?render=explicit&response=yes"
    },
    shim: {
        handlebarsCore: { exports: 'Handlebars' },
        handlebars: {
            deps: ['handlebarsCore'],
            exports: 'Handlebars'
        },
        recaptcha: { exports: "Recaptcha" }
    }
});

require([
  'app'
], function (App) {
    App.initialize();
});