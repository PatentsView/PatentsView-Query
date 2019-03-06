define(["jquery","underscore","backbone","text!models/query/options.js","models/overlay/overlay","models/overlay/nls/lexicon"],function(e,t,n,r,i,s){var o=[{id:"patent",name:"Patents",isActive:!0,defaults:["patent_title"],url:"/querytool/query/fields.html#patent"},{id:"inventor",name:"Inventors",isActive:!1,defaults:["inventor_id","inventor_first_name","inventor_last_name"],url:"/querytool/query/fields.html#inventor"},{id:"assignee",name:"Assignees",isActive:!1,defaults:["assignee_id","assignee_first_name","assignee_last_name","assignee_organization"],url:"/querytool/query/fields.html#assignee"}],u=[{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"},{key:"_begins",value:"begins with"},{key:"_contains",value:"contains"}],type:"string",matches:["string"]},{ops:[{key:"_eq",value:"equals"}],type:"select",matches:["select"]},{ops:[{key:"_eq",value:"equals"}],type:"location",matches:["location"]},{ops:[{key:"_eq",value:"equals"}],type:"cpc",matches:["cpc"]},{ops:[{key:"_eq",value:"equals"}],type:"uspc",matches:["uspc"]},{ops:[{key:"_eq",value:"equals"}],type:"ipc",matches:["ipc"]},{ops:[{key:"_text_any",value:"any"},{key:"_text_all",value:"all"},{key:"_text_phrase",value:"phrase"}],type:"string",matches:["full text"]},{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"}],type:"boolean",matches:["boolean"]},{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"},{key:"_gt",value:"greater"},{key:"_gte",value:"greater or equal"},{key:"_lt",value:"less"},{key:"_lte",value:"less or equal"}],type:"date",matches:["date"],validation:{format:"YYYY-MM-DD"},placeholder:"YYYY-MM-DD"},{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"},{key:"_gt",value:"greater"},{key:"_gte",value:"greater or equal"},{key:"_lt",value:"less"},{key:"_lte",value:"less or equal"}],type:"year",matches:["year"],validation:{format:"YYYY"},placeholder:"YYYY"},{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"},{key:"_gt",value:"greater"},{key:"_gte",value:"greater or equal"},{key:"_lt",value:"less"},{key:"_lte",value:"less or equal"}],type:"time",matches:["time"]},{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"},{key:"_gt",value:"greater"},{key:"_gte",value:"greater or equal"},{key:"_lt",value:"less"},{key:"_lte",value:"less or equal"}],type:"datetime",matches:["datetime"]},{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"},{key:"_gt",value:"greater"},{key:"_gte",value:"greater or equal"},{key:"_lt",value:"less"},{key:"_lte",value:"less or equal"}],type:"integer",matches:["integer"]},{ops:[{key:"_eq",value:"equals"},{key:"_neq",value:"not equal"},{key:"_gt",value:"greater"},{key:"_gte",value:"greater or equal"},{key:"_lt",value:"less"},{key:"_lte",value:"less or equal"}],type:"double",matches:["double","float"]}],a=[{type:"text",matches:["input"]},{type:"select",matches:["select","boolean"]}],f=[{category:"Patents",categoryId:"Patent",shortName:"Patents",shortNameId:"Patent",name:"applications",desc:"Data on patents and applications associated with patents"},{category:"Assignees",categoryId:"Assignee",shortName:"Assignees",shortNameId:"Assignee",name:"assignees",desc:"Data on assignees on the patents"},{category:"Inventors",categoryId:"Inventor",shortName:"Inventors",shortNameId:"Inventor",name:"inventors",desc:"Data on the inventors on the patents"},{category:"Citations",categoryId:"Citations",shortName:"Cited Appliations",shortNameId:"Cited_Appliations",name:"application_citations",desc:"Data on applications that are cited by patents"},{category:"Citations",categoryId:"Citations",shortName:"Citing Patents",shortNameId:"Citing_Patents",name:"citedby_patents",desc:"Data on patents that have cited the patents"},{category:"Citations",categoryId:"Citations",shortName:"Cited Patents",shortNameId:"Cited_Patents",name:"cited_patents",desc:"Data on patents that have been cited by the patents"},{category:"Technology Classifications",categoryId:"Technology_Classifications",shortName:"CPC",shortNameId:"CPC",name:"cpcs",desc:"Metadata describing the cooperative patent classification of the patents"},{category:"Technology Classifications",categoryId:"Technology_Classifications",shortName:"IPC",shortNameId:"IPC",name:"ipcs",desc:"Metadata describing the international patent classification of the patents"},{category:"Technology Classifications",categoryId:"Technology_Classifications",shortName:"NBER",shortNameId:"NBER",name:"nbers",desc:"Metadata describing the technology area of the patents.  See www.nber.org/patents for more information on NBER technology areas."},{category:"Technology Classifications",categoryId:"Technology_Classifications",shortName:"USPC",shortNameId:"USPC",name:"uspcs",desc:"Metadata describing the US patent classification of the patents"},{category:"Technology Classifications",categoryId:"Technology_Classifications",shortName:"WIPO",shortNameId:"WIPO",name:"wipos",desc:"Metadata describing the technology field of the patents. See http://www.wipo.int/export/sites/www/ipstats/en/statistics/patents/pdf/wipo_ipc_technology.pdf for more information on WIPO technology fields."}],l=[{name:"AFGHANISTAN",key:"AF"},{name:"ALAND ISLANDS",key:"AX"},{name:"ALBANIA",key:"AL"},{name:"ALGERIA",key:"DZ"},{name:"AMERICAN SAMOA",key:"AS"},{name:"ANDORRA",key:"AD"},{name:"ANGOLA",key:"AO"},{name:"ANGUILLA",key:"AI"},{name:"ANTIGUA AND BARBUDA",key:"AG"},{name:"ARGENTINA",key:"AR"},{name:"ARMENIA",key:"AM"},{name:"ARUBA",key:"AW"},{name:"AUSTRALIA",key:"AU"},{name:"AUSTRIA",key:"AT"},{name:"AZERBAIJAN",key:"AZ"},{name:"BAHAMAS",key:"BS"},{name:"BAHRAIN",key:"BH"},{name:"BANGLADESH",key:"BD"},{name:"BARBADOS",key:"BB"},{name:"BELARUS",key:"BY"},{name:"BELGIUM",key:"BE"},{name:"BELIZE",key:"BZ"},{name:"BENIN",key:"BJ"},{name:"BERMUDA",key:"BM"},{name:"BHUTAN",key:"BT"},{name:"BOLIVIA",key:"BO"},{name:"BONAIRE, SINT EUSTATIUS AND SABA",key:"BQ"},{name:"BOSNIA AND HERZEGOVINA",key:"BA"},{name:"BOTSWANA",key:"BW"},{name:"BRAZIL",key:"BR"},{name:"BRITISH INDIAN OCEAN TERRITORY",key:"IO"},{name:"BRITISH VIRGIN ISLANDS",key:"VG"},{name:"BRUNEI",key:"BN"},{name:"BULGARIA",key:"BG"},{name:"BURKINA FASO",key:"BF"},{name:"CAMBODIA",key:"KH"},{name:"CAMEROON",key:"CM"},{name:"CANADA",key:"CA"},{name:"CAYMAN ISLANDS",key:"KY"},{name:"CENTRAL AFRICAN REPUBLIC",key:"CF"},{name:"CHAD",key:"TD"},{name:"CHILE",key:"CL"},{name:"CHINA",key:"CN"},{name:"COLOMBIA",key:"CO"},{name:"CONGO [DRC]",key:"CD"},{name:"CONGO [REPUBLIC]",key:"CG"},{name:"COOK ISLANDS",key:"CK"},{name:"COSTA RICA",key:"CR"},{name:"CROATIA",key:"HR"},{name:"CUBA",key:"CU"},{name:"CURACAO",key:"CW"},{name:"CYPRUS",key:"CY"},{name:"CZECH REPUBLIC",key:"CZ"},{name:"DENMARK",key:"DK"},{name:"DJIBOUTI",key:"DJ"},{name:"DOMINICA",key:"DM"},{name:"DOMINICAN REPUBLIC",key:"DO"},{name:"ECUADOR",key:"EC"},{name:"EGYPT",key:"EG"},{name:"EL SALVADOR",key:"SV"},{name:"EQUATORIAL GUINEA",key:"GQ"},{name:"ESTONIA",key:"EE"},{name:"ETHIOPIA",key:"ET"},{name:"FAROE ISLANDS",key:"FO"},{name:"FIJI",key:"FJ"},{name:"FINLAND",key:"FI"},{name:"FRANCE",key:"FR"},{name:"FRENCH GUIANA",key:"GF"},{name:"FRENCH POLYNESIA",key:"PF"},{name:"GABON",key:"GA"},{name:"GAMBIA",key:"GM"},{name:"GEORGIA",key:"GE"},{name:"GERMANY",key:"DE"},{name:"GHANA",key:"GH"},{name:"GIBRALTAR",key:"GI"},{name:"GREECE",key:"GR"},{name:"GREENLAND",key:"GL"},{name:"GRENADA",key:"GD"},{name:"GUADELOUPE",key:"GP"},{name:"GUAM",key:"GU"},{name:"GUATEMALA",key:"GT"},{name:"GUERNSEY",key:"GG"},{name:"GUINEA",key:"GN"},{name:"GUINEA-BISSAU",key:"GW"},{name:"GUYANA",key:"GY"},{name:"HAITI",key:"HT"},{name:"HONDURAS",key:"HN"},{name:"HONG KONG",key:"HK"},{name:"HUNGARY",key:"HU"},{name:"ICELAND",key:"IS"},{name:"INDIA",key:"IN"},{name:"INDONESIA",key:"ID"},{name:"IRAN",key:"IR"},{name:"IRAQ",key:"IQ"},{name:"IRELAND",key:"IE"},{name:"ISLE OF MAN",key:"IM"},{name:"ISRAEL",key:"IL"},{name:"ITALY",key:"IT"},{name:"JAMAICA",key:"JM"},{name:"JAPAN",key:"JP"},{name:"JERSEY",key:"JE"},{name:"JORDAN",key:"JO"},{name:"KAZAKHSTAN",key:"KZ"},{name:"KENYA",key:"KE"},{name:"KIRIBATI",key:"KI"},{name:"KUWAIT",key:"KW"},{name:"KYRGYZSTAN",key:"KG"},{name:"LAOS",key:"LA"},{name:"LATVIA",key:"LV"},{name:"LEBANON",key:"LB"},{name:"LESOTHO",key:"LS"},{name:"LIBERIA",key:"LR"},{name:"LIBYA",key:"LY"},{name:"LIECHTENSTEIN",key:"LI"},{name:"LITHUANIA",key:"LT"},{name:"LUXEMBOURG",key:"LU"},{name:"MACAU",key:"MO"},{name:"MACEDONIA [FYROM]",key:"MK"},{name:"MADAGASCAR",key:"MG"},{name:"MALAWI",key:"MW"},{name:"MALAYSIA",key:"MY"},{name:"MALDIVES",key:"MV"},{name:"MALI",key:"ML"},{name:"MALTA",key:"MT"},{name:"MARSHALL ISLANDS",key:"MH"},{name:"MARTINIQUE",key:"MQ"},{name:"MAURITANIA",key:"MR"},{name:"MAURITIUS",key:"MU"},{name:"MAYOTTE",key:"YT"},{name:"MEXICO",key:"MX"},{name:"MICRONESIA",key:"FM"},{name:"MOLDOVA",key:"MD"},{name:"MONACO",key:"MC"},{name:"MONGOLIA",key:"MN"},{name:"MONTENEGRO",key:"ME"},{name:"MOROCCO",key:"MA"},{name:"MOZAMBIQUE",key:"MZ"},{name:"MYANMAR [BURMA]",key:"MM"},{name:"NAMIBIA",key:"NA"},{name:"NEPAL",key:"NP"},{name:"NETHERLANDS",key:"NL"},{name:"NETHERLANDS ANTILLES",key:"AN"},{name:"NEW CALEDONIA",key:"NC"},{name:"NEW ZEALAND",key:"NZ"},{name:"NICARAGUA",key:"NI"},{name:"NIGER",key:"NE"},{name:"NIGERIA",key:"NG"},{name:"NORTH KOREA",key:"KP"},{name:"NORTHERN MARIANA ISLANDS",key:"MP"},{name:"NORWAY",key:"NO"},{name:"OMAN",key:"OM"},{name:"PAKISTAN",key:"PK"},{name:"PALAU",key:"PW"},{name:"PALESTINIAN TERRITORIES",key:"PS"},{name:"PANAMA",key:"PA"},{name:"PAPUA NEW GUINEA",key:"PG"},{name:"PARAGUAY",key:"PY"},{name:"PERU",key:"PE"},{name:"PHILIPPINES",key:"PH"},{name:"POLAND",key:"PL"},{name:"PORTUGAL",key:"PT"},{name:"PUERTO RICO",key:"PR"},{name:"QATAR",key:"QA"},{name:"ROMANIA",key:"RO"},{name:"RUSSIA",key:"RU"},{name:"SAINT BARTHELEMY",key:"BL"},{name:"SAINT KITTS AND NEVIS",key:"KN"},{name:"SAINT LUCIA",key:"LC"},{name:"SAINT MARTIN",key:"MF"},{name:"SAINT PIERRE AND MIQUELON",key:"PM"},{name:"SAINT VINCENT AND THE GRENADINES",key:"VC"},{name:"SAMOA",key:"WS"},{name:"SAN MARINO",key:"SM"},{name:"SAUDI ARABIA",key:"SA"},{name:"SENEGAL",key:"SN"},{name:"SERBIA",key:"RS"},{name:"SEYCHELLES",key:"SC"},{name:"SIERRA LEONE",key:"SL"},{name:"SINGAPORE",key:"SG"},{name:"SINT MAARTEN",key:"SX"},{name:"SLOVAKIA",key:"SK"},{name:"SLOVENIA",key:"SI"},{name:"SOLOMON ISLANDS",key:"SB"},{name:"SOUTH AFRICA",key:"ZA"},{name:"SOUTH KOREA",key:"KR"},{name:"SOUTH SUDAN",key:"SS"},{name:"SOVIET UNION",key:"SU"},{name:"SPAIN",key:"ES"},{name:"SRI LANKA",key:"LK"},{name:"SUDAN",key:"SD"},{name:"SURINAME",key:"SR"},{name:"SVALBARD AND JAN MAYEN",key:"SJ"},{name:"SWAZILAND",key:"SZ"},{name:"SWEDEN",key:"SE"},{name:"SWITZERLAND",key:"CH"},{name:"SYRIA",key:"SY"},{name:"TAIWAN",key:"TW"},{name:"TAJIKISTAN",key:"TJ"},{name:"TANZANIA",key:"TZ"},{name:"THAILAND",key:"TH"},{name:"TIMOR-LESTE",key:"TL"},{name:"TOGO",key:"TG"},{name:"TOKELAU",key:"TK"},{name:"TRINIDAD AND TOBAGO",key:"TT"},{name:"TUNISIA",key:"TN"},{name:"TURKEY",key:"TR"},{name:"TURKMENISTAN",key:"TM"},{name:"TURKS AND CAICOS ISLANDS",key:"TC"},{name:"U.S. VIRGIN ISLANDS",key:"VI"},{name:"UGANDA",key:"UG"},{name:"UKRAINE",key:"UA"},{name:"UNITED ARAB EMIRATES",key:"AE"},{name:"UNITED KINGDOM",key:"GB"},{name:"UNITED STATES",key:"US"},{name:"URUGUAY",key:"UY"},{name:"UZBEKISTAN",key:"UZ"},{name:"VANUATU",key:"VU"},{name:"VENEZUELA",key:"VE"},{name:"VIETNAM",key:"VN"},{name:"WALLIS AND FUTUNA",key:"WF"},{name:"YEMEN",key:"YE"},{name:"YUGOSLAVIA",key:"YU"},{name:"ZAMBIA",key:"ZM"},{name:"ZIMBABWE",key:"ZW"}],c=[{name:"ALABAMA",key:"AL"},{name:"ALASKA",key:"AK"},{name:"ARIZONA",key:"AZ"},{name:"ARKANSAS",key:"AR"},{name:"CALIFORNIA",key:"CA"},{name:"COLORADO",key:"CO"},{name:"CONNECTICUT",key:"CT"},{name:"DELAWARE",key:"DE"},{name:"FLORIDA",key:"FL"},{name:"GEORGIA",key:"GA"},{name:"HAWAII",key:"HI"},{name:"IDAHO",key:"ID"},{name:"ILLINOIS",key:"IL"},{name:"INDIANA",key:"IN"},{name:"IOWA",key:"IA"},{name:"KANSAS",key:"KS"},{name:"KENTUCKY",key:"KY"},{name:"LOUISIANA",key:"LA"},{name:"MAINE",key:"ME"},{name:"MARYLAND",key:"MD"},{name:"MASSACHUSETTS",key:"MA"},{name:"MICHIGAN",key:"MI"},{name:"MINNESOTA",key:"MN"},{name:"MISSISSIPPI",key:"MS"},{name:"MISSOURI",key:"MO"},{name:"MONTANA",key:"MT"},{name:"NEBRASKA",key:"NB"},{name:"NEVADA",key:"NV"},{name:"NEW HAMPSHIRE",key:"NH"},{name:"NEW JERSEY",key:"NJ"},{name:"NEW MEXICO",key:"NM"},{name:"NEW YORK",key:"NY"},{name:"NORTH CAROLINA",key:"NC"},{name:"NORTH DAKOTA",key:"ND"},{name:"OHIO",key:"OH"},{name:"OKLAHOMA",key:"OK"},{name:"OREGON",key:"OR"},{name:"PENNSYLVANIA",key:"PA"},{name:"RHODE ISLAND",key:"RI"},{name:"SOUTH CAROLINA",key:"SC"},{name:"SOUTH DAKOTA",key:"SD"},{name:"TENNESSEE",key:"TN"},{name:"TEXAS",key:"TX"},{name:"UTAH",key:"UT"},{name:"VERMONT",key:"VT"},{name:"VIRGINIA",key:"VA"},{name:"WASHINGTON",key:"WA"},{name:"WEST VIRGINIA",key:"WV"},{name:"WISCONSIN",key:"WI"},{name:"WYOMING",key:"WY"}],h=[{className:"center-pane",blockMouse:!1,verticalCenter:!1,items:[{className:"center-pane",key:i.overlays.patentClass,file:"patentClass.html",title:s.root.titles.patentClass},{className:"center-pane scroll",key:i.overlays.uspc,file:"uspc.html",title:s.root.titles.uspc},{className:"center-pane scroll",key:i.overlays.nber,file:"nber.html",title:s.root.titles.nber},{className:"center-pane scroll",key:i.overlays.cpc,file:"cpc.html",title:s.root.titles.cpc}]}],p=JSON.parse(r);for(var d=0;d<o.length;d++)o[d].outputs=new Array,t.where(p,{entities:[o[d].id]}).forEach(function(e){if(e.isOutput){var n=t.contains(o[d].defaults,e.id),r=t.find(o[d].outputs,{id:e.group}),i={id:e.id,name:e.name,desc:e.desc,isActive:n};if(t.isUndefined(r)){var s=t.find(f,{name:e.group});t.isUndefined(s)?r={id:e.group,name:e.group,category:"",shortName:"",isActive:n,desc:"",fields:new Array}:r={id:e.group,name:e.group,category:s.category,shortName:s.shortName,isActive:n,desc:s.desc,fields:new Array},r.fields.push(i),o[d].outputs.push(r)}else r.fields.push(i)}});var v=n.Model.extend({initialize:function(){this.set("options",p),this.set("entities",o),this.set("isQuickSearch",!0),this.set("quickSearch",""),this.set("query",{}),this.set("expressions",[]),this.set("outputs",[]),this.set("sorts",[]),this.set("entityId","patent"),this.set("outputIds",[]),this.set("groupId",""),this.set("fieldId",""),this.set("resultCount","0"),this.set("recipient",""),this.set("xml",""),this.set("json",""),this.set("csv","")},getFilters:function(e){var n=this.get("entityId"),r=new Array;return t.where(this.get("options"),{entities:[n]}).forEach(function(n){if(!t.isNull(e)&&!t.isEmpty(e)&&n.group!=e)return;var i=t.find(u,{matches:[n.type]}),s=t.find(a,{matches:[n.fieldType]});if(n.isQuery=="true"){try{var o={id:n.id,label:n.name,type:i.type,input:s.type,operators:i.ops,values:n.values,remoteUrl:n.remoteUrl,optgroup:n.group,desc:n.desc}}catch(f){}t.isUndefined(i.validation)||(o.validation=i.validation),t.isUndefined(i.placeholder)||(o.placeholder=i.placeholder),r.push(o)}}),r},getFilter:function(e){var n=this.get("entityId"),r={},i=t.find(this.get("options"),{entities:[n],id:e});if(!t.isUndefined(i)){var s=t.find(u,{matches:[i.type]}),o=t.find(a,{matches:[i.fieldType]});r={id:i.id,label:i.name,type:s.type,input:o.type,operators:s.ops,values:i.values,remoteUrl:i.remoteUrl,optgroup:i.group,desc:i.desc},t.isUndefined(s.validation)||(r.validation=s.validation),t.isUndefined(s.placeholder)||(r.placeholder=s.placeholder)}return r},getGroups:function(){var e=this.get("entityId"),n=new Array;if(t.isNull(e)||t.isEmpty(e)){this.set("groups",n);return}return t.where(this.get("options"),{entities:[e]}).forEach(function(e){n.push({id:e.group,name:e.group,isActive:!1})}),t.uniq(n,"id")},getFields:function(e){var n=this.get("entityId"),r=new Array;return t.isNull(e)||t.isEmpty(e)?r:(t.where(this.get("options"),{entities:[n],group:e}).forEach(function(e){e.isQuery&&r.push({id:e.id,name:e.name,isActive:!1})}),r)},getConditions:function(e){var n=this.get("entityId"),r=new Array;if(t.isNull(e)||t.isEmpty(e))return r;var i=t.findWhere(this.get("options"),{entities:[n],id:e});if(!t.isUndefined(i)){var s=i.type;t.where(this.get("operators"),{types:[s]}).forEach(function(e){r.push({id:e.id,name:e.name,isActive:!1})})}return r},getOutputs:function(e){var n=this.get("entityId"),r=this.get("outputIds"),i=new Array,s=t.find(o,{id:n});return t.isNull(n)||t.isEmpty(n)?(this.set("groups",i),i):(t.where(this.get("options"),{entities:[n]}).forEach(function(n){if(e&&!t.contains(r,n.id))return!0;if(n.isOutput=="true"){var o=t.contains(s.defaults,n.id)||t.contains(r,n.id),u={id:n.id,name:n.name,desc:n.desc,isActive:o},a=t.find(f,{name:n.group}),l=null;if(a.category!=a.shortName){l=t.find(i,{shortName:a.category});var c=!1;t.isUndefined(l)&&(c=!0,l={id:a.categoryId,name:a.category,categoryId:a.categoryId,shortName:a.category,shortNameId:a.shortNameId,isActive:o,desc:"",groups:new Array}),subGroup=t.find(l.groups,{shortName:a.shortName}),t.isUndefined(subGroup)?(subGroup={id:n.group,name:n.group,categoryId:a.categoryId,shortName:a.shortName,shortNameId:a.shortNameId,isActive:o,desc:t.isUndefined(a)?"":a.desc,fields:new Array},subGroup.fields.push(u),l.groups.push(subGroup)):subGroup.fields.push(u),c&&i.push(l)}else l=t.find(i,{id:n.group}),t.isUndefined(l)?(l={id:n.group,name:n.group,categoryId:a.categoryId,shortName:a.shortName,shortNameId:a.shortNameId,isActive:o,desc:t.isUndefined(a)?"":a.desc,fields:new Array},l.fields.push(u),i.push(l)):(t.isUndefined(l.fields)&&(l.fields=new Array),l.fields.push(u))}}),i)},getSorts:function(){var e=this.get("entityId"),n=new Array;return t.isNull(e)||t.isEmpty(e)?(this.set("groups",n),n):(t.where(this.get("options"),{entities:[e]}).forEach(function(e){if(e.isSort=="true"){var r=t.find(n,{id:e.group}),i={id:e.id,name:e.name,isActive:!1};if(t.isUndefined(r)){var s=t.find(f,{name:e.group});r={id:e.group,name:s.shortName,isActive:!1,fields:new Array},r.fields.push(i),n.push(r)}else r.fields.push(i)}}),n)},getOverlay:function(e){return t.find(h,function(n){return!!t.findWhere(n.items,{key:e})})},setGroups:function(){this.set("groups",this.getGroups())},buildQuery:function(){var e=this.get("quickSearch"),t=this.get("expressions"),n="",r="]}",i=this.get("fieldId");i=i==""?"patent_title":i;if(this.get("isQuickSearch"))return e.length==0?n:(e=e.replace(/"/g,""),'q={"_or":[{"_text_all":{"patent_title":"'+e+'"}},{"_text_all":{"patent_abstract":"'+e+'"}}]}'+"&f="+JSON.stringify(this.get("outputIds"))+'&s=[{"'+i+'":"asc"}]');if(t.length==0)return n;if(t.length==1)t[0].operator=="_eq"?n=n+'{"'+t[0].field+'":"'+t[0].value+'"},':n=n+'{"'+t[0].operator+'":{"'+t[0].field+'":"'+t[0].value+'"}},',r="";else{n='{"_and":[';for(var s=0;s<t.length;s++)t[s].operator=="_eq"?n=n+'{"'+t[s].field+'":"'+t[s].value+'"},':n=n+'{"'+t[s].operator+'":{"'+t[s].field+'":"'+t[s].value+'"}},'}n=n.replace(/,\s*$/,"")+r;var o="";return o="q="+n+"&f="+JSON.stringify(this.get("outputIds"))+'&s=[{"'+i+'":"asc"}]',o},getCountryCode:function(e){if(t.isNull(e)||t.isEmpty(e))return"";var n=t.where(l,{name:e.trim().toUpperCase()});return t.isUndefined(n)||n.length==0?"":n[0].key},getStateCode:function(e){if(t.isNull(e)||t.isEmpty(e))return"";var n=t.where(c,{name:e.trim().toUpperCase()});return t.isUndefined(n)||n.length==0?"":n[0].key}});return v});