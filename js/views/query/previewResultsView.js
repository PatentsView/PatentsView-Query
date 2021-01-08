define(["jquery","underscore","backbone","prism","papa","handlebars","text!views/query/templates/PreviewResults.html","text!views/query/templates/CSVTemplate.html","text!views/query/templates/SelectResults.html"],function(e,t,n,r,i,s,o,u,a){var f=n.View.extend({tagName:"section",id:"previewResults",className:"step-view",initialize:function(e){return this.listenTo(this.model,"entityChanged",this.entityChanged),t.bindAll(this,"render","updateModel"),this.template=s.compile(o),this.csv=s.compile(u),this},events:{"change #group":"changeGroup"},render:function(){var n='<div class="sub-title" style="margin-top: 10px;">Loading a preview of your query. This could take a couple of minutes, as we are searching through over 5 million patents. <i class="fa fa-spinner fa-pulse" /></div>',i='<div class="sub-title" style="margin-top: 10px;">No Results.</div>',o=this.model.buildQuery(),u=this.model.get("entityId");this.model.set("query",o),e(this.el).empty(),e(this.el).append(this.template(this.model.toJSON())),e(this.el).find("#preview-csv").html(n),e(this.el).find("#preview-json").html(n),e(this.el).find("#preview-xml").html(n),o!=""&&(e.ajax({context:this,url:"https://www.patentsview.org/preview_api/"+u+"s/query?"+o,dataType:"json",beforeSend:function(e){e.setRequestHeader("Authorization","Negotiate")},async:!0,success:function(t){t.count>0?(e.ajax({context:this,type:"POST",url:"https://www.patentsview.org//query/tocsv.php",dataType:"text",data:{query:t},beforeSend:function(e){e.setRequestHeader("Authorization","Negotiate")},async:!0,success:function(t){var n=window.Papa.parse(t,{header:!0});n.data.length>0&&e(this.el).find("#preview-csv").addClass("preview-csv-scroll").html(this.csv(n))},error:function(t,n,r){e(this.el).find("#preview-csv").removeClass("preview-csv-scroll").html(i),e(this.el).find("#preview-json").html(i)}}),e(this.el).find("#preview-json").html('<pre style="max-height: 30em;" class="language-*"><code class="language-json">'+r.highlight(JSON.stringify(t,null,"	"),r.languages.json)+"</code></pre>")):(e(this.el).find("#preview-csv").removeClass("preview-csv-scroll").html(i),e(this.el).find("#preview-json").html(i))},error:function(t,n,r){e(this.el).find("#preview-csv").removeClass("preview-csv-scroll").html(i),e(this.el).find("#preview-json").html(i)}}),e.ajax({context:this,url:"https://www.patentsview.org/preview_api/"+u+"s/query?"+o+"&format=xml",dataType:"text",beforeSend:function(e){e.setRequestHeader("Authorization","Negotiate")},async:!0,success:function(t){if(t.indexOf("<count>0")>=0){e(this.el).find("#preview-xml").html(i);return}try{e.ajax({context:this,type:"POST",url:"https://www.patentsview.org//query/toxml.php",dataType:"text",data:{query:t},beforeSend:function(e){e.setRequestHeader("Authorization","Negotiate")},async:!0,success:function(t){e(this.el).find("#preview-xml").html('<pre style="max-height: 30em;" class="language-*"><code class="language-markup">'+r.highlight(t,r.languages.markup)+"</code></pre>")},error:function(t,n,r){e(this.el).find("#preview-csv").removeClass("preview-csv-scroll").html(i),e(this.el).find("#preview-json").html(i)}})}catch(n){e(this.el).find("#preview-xml").html(i)}},error:function(t,n,r){e(this.el).find("#preview-xml").html(i)}}));var u=this.model.get("entityId"),a=this.model.get("groupId");if(!t.isEmpty(u)){var f=s.compile('"<option>- Select Group -</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" value="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}" value="{{id}}">{{name}}</option>{{/if}}{{/each}}"');e("#group").html(f(this.model.get("sorts")));var l=t.find(this.model.get("sorts"),{id:a});if(!t.isUndefined(l)){var c=s.compile('"<option>- Select Field -</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" value="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}" value="{{id}}">{{name}}</option>{{/if}}{{/each}}"');e("#field").html(c(l.fields))}}return this},isValid:function(){var t=e(this.el).find("#results-form");return t.validate({rules:{recipient:{required:!0,email:!0},format:{required:!0}},messages:{recipient:{required:"Please provide a valid e-mail address to send query results to."},format:{required:"Please select at least one format for the qurey."}},highlight:function(t){e(t).closest(".form-group").addClass("has-error")},unhighlight:function(t){e(t).closest(".form-group").removeClass("has-error")},errorPlacement:function(t,n){n.attr("name")==="format"?t.insertAfter(e(n).closest(".checkbox-group")):t.insertAfter(n)}}),t.valid()},updateModel:function(){var n=e(this.el).find("#group > option:selected"),r=e(this.el).find("#field > option:selected");this.model.set("group",t.isUndefined(n.data("id"))?"None Selected":n.text()),this.model.set("field",t.isUndefined(r.data("id"))?"None Selected":r.text()),this.model.set("groupId",t.isUndefined(n.data("id"))?"":n.data("id")),this.model.set("fieldId",t.isUndefined(r.data("id"))?"":r.data("id")),this.model.set("recipient",e(this.el).find("#recipient").val()),this.model.set("xml",e(this.el).find("#xml").prop("checked")),this.model.set("csv",e(this.el).find("#csv").prop("checked")),this.model.set("json",e(this.el).find("#json").prop("checked"))},getNavHtml:function(e){return""},entityChanged:function(e){this.resetView=!0},changeGroup:function(n){n=n||window.event;var r=e(n.srcElement||n.target),i=r.find("option:selected").attr("data-id"),o=t.find(this.model.get("sorts"),{id:i});if(!t.isUndefined(o)){var u=s.compile('"<option>-Select Field-</option>{{#each this}}{{#if isActive}}<option id="{{id}}" data-id="{{id}}" selected="selected">{{name}}</option>{{else}}<option id="{{id}}" data-id="{{id}}" >{{name}}</option>{{/if}}{{/each}}"');e("#field").html(u(o.fields))}}});return f});