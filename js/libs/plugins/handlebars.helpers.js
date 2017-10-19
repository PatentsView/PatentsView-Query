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

    Handlebars.registerHelper('check_multi_rules', function (options) {
        var result = "";

        if (this.rules != undefined && this.rules.length > 1)
        { result = "-multi"; }

        return result;
    });

    Handlebars.registerHelper("switch", function (value, options) {
        this._switch_value_ = value;
        var html = options.fn(this); // Process the body of the switch block
        delete this._switch_value_;

        return html;
    });

    Handlebars.registerHelper("case", function () {
        // Convert "arguments" to a real array - stackoverflow.com/a/4775938
        var args = Array.prototype.slice.call(arguments);

        var options = args.pop();
        var caseValues = args;

        if (caseValues.indexOf(this._switch_value_) === -1) {
            return '';
        } else {
            return options.fn(this);
        }
    });

    return Handlebars;
});