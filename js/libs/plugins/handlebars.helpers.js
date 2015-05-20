define([
    'handlebarsCore'
], function (Handlebars) {
   
    Handlebars.registerHelper('each_every', function (every, context, options) {
        var result = "";
        var subcontext = new Array();

        if (context && context.length > 0) {
            for (i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    result += options.fn(subcontext);
                    subcontext = new Array();
                }
                subcontext.push(context[i]);
            }
            result += options.fn(subcontext);
        }

        return result;
    });

    Handlebars.registerHelper('each_active_output_every', function (every, context, options) {
        var result = "";
        var activeOutputs = new Array();
        var subcontext = new Array();

        if (context && context.length > 0) {
            for (var i = 0; i < context.length; i++) {
                for (var j = 0; j < context[i].fields.length; j++) {
                    if (context[i].fields[j].isActive === true) {
                        activeOutputs.push(context[i]);
                        break;
                    }
                }
            }

            for (i = 0; i < activeOutputs.length; i++) {
                if (i > 0 && i % every === 0) {
                    result += options.fn(subcontext);
                    subcontext = new Array();
                }
                subcontext.push(activeOutputs[i]);
            }

            result += options.fn(subcontext);
        }

        return result;
    });


    return Handlebars;
});