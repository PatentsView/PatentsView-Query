/**************************************************************/

/**************************************************************/
require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/lodash',
        backbone: 'libs/backbone',
        text: 'libs/plugins/text',
        handlebars: 'libs/plugins/handlebars'
    }
});

require([
  'app'
], function (App) {
    App.initialize();
});