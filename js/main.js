/**************************************************************/

/**************************************************************/
require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/lodash',
        backbone: 'libs/backbone',
        text: 'libs/plugins/text',
        handlebars: 'libs/plugins/handlebars',
        recaptcha: "//www.google.com/recaptcha/api.js?render=explicit&response=yes"
    },
    shim: {
        recaptcha: { exports: "Recaptcha" }
    }
});

require([
  'app'
], function (App) {
    App.initialize();
});