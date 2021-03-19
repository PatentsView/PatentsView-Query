/**************************************************************/
// View that displays the query options and criteria that the user has built on
// prior steps before submitting the query.
/**************************************************************/
define([
  "jquery",
  "underscore",
  "backbone",
  "prism",
  "papa",
  "handlebars",
  "text!views/query/templates/PreviewResults.html",
  "text!views/query/templates/CSVTemplate.html",
  "text!views/query/templates/SelectResults.html",
], function (
  $,
  _,
  Backbone,
  Prism,
  Papa,
  Handlebars,
  PreviewResultsTemplate,
  CSVTemplate,
  SelectResultsTemplate
) {
  var PreviewResultsView = Backbone.View.extend({
    tagName: "section",
    id: "previewResults",
    className: "step-view",
    initialize: function (options) {
      this.listenTo(this.model, "entityChanged", this.entityChanged);
      _.bindAll(this, "render", "updateModel");
      this.template = Handlebars.compile(PreviewResultsTemplate);
      this.csv = Handlebars.compile(CSVTemplate);
      return this;
    },
    events: {
      "change #group": "changeGroup",
    },
    render: function () {
      var loadingResults =
        '<div class="sub-title" style="margin-top: 10px;">Loading a preview of your query. This could take a couple of minutes, as we are searching through over 5 million patents. <i class="fa fa-spinner fa-pulse" /></div>';
      var noResults =
        '<div class="sub-title" style="margin-top: 10px;">No Results.</div>';
      var query = this.model.buildQuery();
      var entityId = this.model.get("entityId");
      this.model.set("query", query);
      $(this.el).empty();
      $(this.el).append(this.template(this.model.toJSON()));
      $(this.el).find("#preview-csv").html(loadingResults);
      $(this.el).find("#preview-json").html(loadingResults);
      $(this.el).find("#preview-xml").html(loadingResults);

      if (query != "") {
        $.ajax({
          context: this,
          url:
            "https://querytoolapi.patentsview.org/" +
            entityId +
            "s/query?" +
            query,
          dataType: "json",
          beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Negotiate");
          },
          async: true,
          success: function (data) {
            if (data.count > 0) {
              $.ajax({
                context: this,
                type: "POST",
                url: "https://querysupport.patentsview.org/tocsv.php",
                dataType: "text",
                data: { query: data },
                beforeSend: function (request) {
                  request.setRequestHeader("Authorization", "Negotiate");
                },
                async: true,
                success: function (data) {
                  var results = window.Papa.parse(data, { header: true });

                  if (results.data.length > 0) {
                    $(this.el)
                      .find("#preview-csv")
                      .addClass("preview-csv-scroll")
                      .html(this.csv(results));
                  }
                },
                error: function (xhr, textStatus, errorMessage) {
                  $(this.el)
                    .find("#preview-csv")
                    .removeClass("preview-csv-scroll")
                    .html(noResults);
                  $(this.el).find("#preview-json").html(noResults);
                },
              });

              $(this.el)
                .find("#preview-json")
                .html(
                  '<pre style="max-height: 30em;" class="language-*"><code class="language-json">' +
                    Prism.highlight(
                      JSON.stringify(data, null, "\t"),
                      Prism.languages.json
                    ) +
                    "</code></pre>"
                );
            } else {
              $(this.el)
                .find("#preview-csv")
                .removeClass("preview-csv-scroll")
                .html(noResults);
              $(this.el).find("#preview-json").html(noResults);
            }
          },
          error: function (xhr, textStatus, errorMessage) {
            $(this.el)
              .find("#preview-csv")
              .removeClass("preview-csv-scroll")
              .html(noResults);
            $(this.el).find("#preview-json").html(noResults);
          },
        });

        $.ajax({
          context: this,
          url:
            "https://querytoolapi.patentsview.org/" +
            entityId +
            "s/query?" +
            query +
            "&format=xml",
          dataType: "text",
          beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Negotiate");
          },
          async: true,
          success: function (data) {
            if (data.indexOf("<count>0") >= 0) {
              // no results returned.
              $(this.el).find("#preview-xml").html(noResults);

              return;
            }

            try {
              $.ajax({
                context: this,
                type: "POST",
                url: "https://querysupport.patentsview.org/toxml.php",
                dataType: "text",
                data: { query: data },
                beforeSend: function (request) {
                  request.setRequestHeader("Authorization", "Negotiate");
                },
                async: true,
                success: function (data) {
                  $(this.el)
                    .find("#preview-xml")
                    .html(
                      '<pre style="max-height: 30em;" class="language-*"><code class="language-markup">' +
                        Prism.highlight(data, Prism.languages.markup) +
                        "</code></pre>"
                    );
                },
                error: function (xhr, textStatus, errorMessage) {
                  $(this.el)
                    .find("#preview-csv")
                    .removeClass("preview-csv-scroll")
                    .html(noResults);
                  $(this.el).find("#preview-json").html(noResults);
                },
              });
            } catch (e) {
              $(this.el).find("#preview-xml").html(noResults);
            }
          },
          error: function (xhr, textStatus, errorMessage) {
            $(this.el).find("#preview-xml").html(noResults);
          },
        });
      }

      var entityId = this.model.get("entityId");
      var groupId = this.model.get("groupId");

      if (!_.isEmpty(entityId)) {
        var groupsTemplate = Handlebars.compile(
          '"<option>- Select Group -</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" value="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}" value="{{id}}">{{name}}</option>{{/if}}{{/each}}"'
        );
        $("#group").html(groupsTemplate(this.model.get("sorts")));
        var group = _.find(this.model.get("sorts"), { id: groupId });

        if (!_.isUndefined(group)) {
          var fieldsTemplate = Handlebars.compile(
            '"<option>- Select Field -</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" value="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}" value="{{id}}">{{name}}</option>{{/if}}{{/each}}"'
          );
          $("#field").html(fieldsTemplate(group.fields));
        }
      }

      return this;
    },
    isValid: function () {
      var form = $(this.el).find("#results-form");
      form.validate({
        rules: {
          recipient: {
            required: true,
            email: true,
          },
          format: {
            required: true,
          },
        },
        messages: {
          recipient: {
            required:
              "Please provide a valid e-mail address to send query results to.",
          },
          format: {
            required: "Please select at least one format for the qurey.",
          },
        },
        highlight: function (element) {
          $(element).closest(".form-group").addClass("has-error");
        },
        unhighlight: function (element) {
          $(element).closest(".form-group").removeClass("has-error");
        },
        errorPlacement: function (error, element) {
          if (element.attr("name") === "format") {
            error.insertAfter($(element).closest(".checkbox-group"));
          } else {
            error.insertAfter(element);
          }
        },
      });

      return form.valid();
    },
    updateModel: function () {
      var group = $(this.el).find("#group > option:selected");
      var field = $(this.el).find("#field > option:selected");

      this.model.set(
        "group",
        _.isUndefined(group.data("id")) ? "None Selected" : group.text()
      );
      this.model.set(
        "field",
        _.isUndefined(field.data("id")) ? "None Selected" : field.text()
      );
      this.model.set(
        "groupId",
        _.isUndefined(group.data("id")) ? "" : group.data("id")
      );
      this.model.set(
        "fieldId",
        _.isUndefined(field.data("id")) ? "" : field.data("id")
      );
      this.model.set("recipient", $(this.el).find("#recipient").val());
      this.model.set("xml", $(this.el).find("#xml").prop("checked"));
      this.model.set("csv", $(this.el).find("#csv").prop("checked"));
      this.model.set("json", $(this.el).find("#json").prop("checked"));
    },
    getNavHtml: function (s) {
      return "";
    },
    entityChanged: function (e) {
      this.resetView = true;
    },
    changeGroup: function (e) {
      e = e || window.event;
      var source = $(e.srcElement || e.target);
      var groupId = source.find("option:selected").attr("data-id");
      var group = _.find(this.model.get("sorts"), { id: groupId });

      if (!_.isUndefined(group)) {
        var fieldsTemplate = Handlebars.compile(
          '"<option>-Select Field-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}" >{{name}}</option>{{/if}}{{/each}}"'
        );
        $("#field").html(fieldsTemplate(group.fields));
      }
    },
  });

  return PreviewResultsView;
});
