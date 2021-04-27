define([
  'jquery',
  'underscore',
  'backbone',
  'text!models/query/options.js',
  'models/overlay/overlay',
  'models/overlay/nls/lexicon'
], function ($, _, Backbone, optionsJson, OverlayModel, Lexicon) {

    var entities = [
        { "id": "patent", "name": "Patents", "isActive": true, "defaults": ["patent_title"], "url": "/querytool/query/fields.html#patent" },
        { "id": "inventor", "name": "Inventors", "isActive": false, "defaults": ["inventor_id", "inventor_first_name", "inventor_last_name"], "url": "/querytool/query/fields.html#inventor" },
        { "id": "assignee", "name": "Assignees", "isActive": false, "defaults": ["assignee_id", "assignee_first_name", "assignee_last_name", "assignee_organization"], "url": "/querytool/query/fields.html#assignee" },
    ];

    var types = [
        {
            "ops": [{ "key": "_eq", "value": "equals" },
              { "key": "_neq", "value": "not equal" },
              { "key": "_begins", "value": "begins with" },
              { "key": "_contains", "value": "contains" }], "type": "string", "matches": ["string"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" }], "type": "select", "matches": ["select"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" }], "type": "location", "matches": ["location"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" }], "type": "cpc", "matches": ["cpc"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" }], "type": "uspc", "matches": ["uspc"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" }], "type": "ipc", "matches": ["ipc"]
        },
        {
            "ops": [{ "key": "_text_any", "value": "any" },
              { "key": "_text_all", "value": "all" },
              { "key": "_text_phrase", "value": "phrase" }], "type": "string", "matches": ["full text"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" },
              { "key": "_neq", "value": "not equal" }], "type": "boolean", "matches": ["boolean"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" },
              { "key": "_neq", "value": "not equal" },
              { "key": "_gt", "value": "greater" },
              { "key": "_gte", "value": "greater or equal" },
              { "key": "_lt", "value": "less" },
              { "key": "_lte", "value": "less or equal" }], "type": "date", "matches": ["date"], validation: { format: "YYYY-MM-DD" }, placeholder: 'YYYY-MM-DD'
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" },
            { "key": "_neq", "value": "not equal" },
            { "key": "_gt", "value": "greater" },
            { "key": "_gte", "value": "greater or equal" },
            { "key": "_lt", "value": "less" },
            { "key": "_lte", "value": "less or equal" }], "type": "year", "matches": ["year"], validation: { format: "YYYY" }, placeholder: 'YYYY'
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" },
              { "key": "_neq", "value": "not equal" },
              { "key": "_gt", "value": "greater" },
              { "key": "_gte", "value": "greater or equal" },
              { "key": "_lt", "value": "less" },
              { "key": "_lte", "value": "less or equal" }], "type": "time", "matches": ["time"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" },
                      { "key": "_neq", "value": "not equal" },
                      { "key": "_gt", "value": "greater" },
                      { "key": "_gte", "value": "greater or equal" },
                      { "key": "_lt", "value": "less" },
                      { "key": "_lte", "value": "less or equal" }], "type": "datetime", "matches": ["datetime"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" },
                      { "key": "_neq", "value": "not equal" },
                      { "key": "_gt", "value": "greater" },
                      { "key": "_gte", "value": "greater or equal" },
                      { "key": "_lt", "value": "less" },
                      { "key": "_lte", "value": "less or equal" }], "type": "integer", "matches": ["integer"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" }], "type": "integer", "matches": ["integer-exact"]
        },
        {
            "ops": [{ "key": "_eq", "value": "equals" },
                      { "key": "_neq", "value": "not equal" },
                      { "key": "_gt", "value": "greater" },
                      { "key": "_gte", "value": "greater or equal" },
                      { "key": "_lt", "value": "less" },
                      { "key": "_lte", "value": "less or equal" }], "type": "double", "matches": ["double", "float"]
        }
    ];

    var inputs = [
        { "type": "text", "matches": ["input"] },
        { "type": "select", "matches": ["select", "boolean"] }
    ];

    var outputGroups = [
        { "category": "Patents", "categoryId": "Patent", "shortName": "Patents", "shortNameId": "Patent", "name": "applications", "desc": "Data on patents and applications associated with patents" },
        { "category": "Assignees", "categoryId": "Assignee", "shortName": "Assignees", "shortNameId": "Assignee", "name": "assignees", "desc": "Data on assignees on the patents" },
        { "category": "Inventors", "categoryId": "Inventor", "shortName": "Inventors", "shortNameId": "Inventor", "name": "inventors", "desc": "Data on the inventors on the patents" },
        { "category": "Lawyers", "categoryId": "Lawyer", "shortName": "Lawyers", "shortNameId": "Lawyer", "name": "lawyers", "desc": "Data on patents that have cited lawyers" },
        { "category": "Citations", "categoryId": "Citations", "shortName": "Cited Appliations", "shortNameId": "Cited_Appliations", "name": "application_citations", "desc": "Data on applications that are cited by patents" },
        { "category": "Citations", "categoryId": "Citations", "shortName": "Citing Patents", "shortNameId": "Citing_Patents", "name": "citedby_patents", "desc": "Data on patents that have cited the patents" },
        { "category": "Citations", "categoryId": "Citations", "shortName": "Cited Patents", "shortNameId": "Cited_Patents", "name": "cited_patents", "desc": "Data on patents that have been cited by the patents" },
        { "category": "Technology Classifications", "categoryId": "Technology_Classifications", "shortName": "CPC", "shortNameId": "CPC", "name": "cpcs", "desc": "Metadata describing the cooperative patent classification of the patents" },
        { "category": "Technology Classifications", "categoryId": "Technology_Classifications", "shortName": "IPC", "shortNameId": "IPC", "name": "ipcs", "desc": "Metadata describing the international patent classification of the patents" },
        { "category": "Technology Classifications", "categoryId": "Technology_Classifications", "shortName": "NBER", "shortNameId": "NBER", "name": "nbers", "desc": "Metadata describing the technology area of the patents.  See www.nber.org/patents for more information on NBER technology areas." },
        { "category": "Technology Classifications", "categoryId": "Technology_Classifications", "shortName": "USPC", "shortNameId": "USPC", "name": "uspcs", "desc": "Metadata describing the US patent classification of the patents" },
        { "category": "Technology Classifications", "categoryId": "Technology_Classifications", "shortName": "WIPO", "shortNameId": "WIPO", "name": "wipos", "desc": "Metadata describing the technology field of the patents. See http://www.wipo.int/export/sites/www/ipstats/en/statistics/patents/pdf/wipo_ipc_technology.pdf for more information on WIPO technology fields." }
    ];

    var countries = [{ "name": "AFGHANISTAN", "key": "AF" },
    { "name": "ALAND ISLANDS", "key": "AX" },
    { "name": "ALBANIA", "key": "AL" },
    { "name": "ALGERIA", "key": "DZ" },
    { "name": "AMERICAN SAMOA", "key": "AS" },
    { "name": "ANDORRA", "key": "AD" },
    { "name": "ANGOLA", "key": "AO" },
    { "name": "ANGUILLA", "key": "AI" },
    { "name": "ANTIGUA AND BARBUDA", "key": "AG" },
    { "name": "ARGENTINA", "key": "AR" },
    { "name": "ARMENIA", "key": "AM" },
    { "name": "ARUBA", "key": "AW" },
    { "name": "AUSTRALIA", "key": "AU" },
    { "name": "AUSTRIA", "key": "AT" },
    { "name": "AZERBAIJAN", "key": "AZ" },
    { "name": "BAHAMAS", "key": "BS" },
    { "name": "BAHRAIN", "key": "BH" },
    { "name": "BANGLADESH", "key": "BD" },
    { "name": "BARBADOS", "key": "BB" },
    { "name": "BELARUS", "key": "BY" },
    { "name": "BELGIUM", "key": "BE" },
    { "name": "BELIZE", "key": "BZ" },
    { "name": "BENIN", "key": "BJ" },
    { "name": "BERMUDA", "key": "BM" },
    { "name": "BHUTAN", "key": "BT" },
    { "name": "BOLIVIA", "key": "BO" },
    { "name": "BONAIRE, SINT EUSTATIUS AND SABA", "key": "BQ" },
    { "name": "BOSNIA AND HERZEGOVINA", "key": "BA" },
    { "name": "BOTSWANA", "key": "BW" },
    { "name": "BRAZIL", "key": "BR" },
    { "name": "BRITISH INDIAN OCEAN TERRITORY", "key": "IO" },
    { "name": "BRITISH VIRGIN ISLANDS", "key": "VG" },
    { "name": "BRUNEI", "key": "BN" },
    { "name": "BULGARIA", "key": "BG" },
    { "name": "BURKINA FASO", "key": "BF" },
    { "name": "CAMBODIA", "key": "KH" },
    { "name": "CAMEROON", "key": "CM" },
    { "name": "CANADA", "key": "CA" },
    { "name": "CAYMAN ISLANDS", "key": "KY" },
    { "name": "CENTRAL AFRICAN REPUBLIC", "key": "CF" },
    { "name": "CHAD", "key": "TD" },
    { "name": "CHILE", "key": "CL" },
    { "name": "CHINA", "key": "CN" },
    { "name": "COLOMBIA", "key": "CO" },
    { "name": "CONGO [DRC]", "key": "CD" },
    { "name": "CONGO [REPUBLIC]", "key": "CG" },
    { "name": "COOK ISLANDS", "key": "CK" },
    { "name": "COSTA RICA", "key": "CR" },
    { "name": "CROATIA", "key": "HR" },
    { "name": "CUBA", "key": "CU" },
    { "name": "CURACAO", "key": "CW" },
    { "name": "CYPRUS", "key": "CY" },
    { "name": "CZECH REPUBLIC", "key": "CZ" },
    { "name": "DENMARK", "key": "DK" },
    { "name": "DJIBOUTI", "key": "DJ" },
    { "name": "DOMINICA", "key": "DM" },
    { "name": "DOMINICAN REPUBLIC", "key": "DO" },
    { "name": "ECUADOR", "key": "EC" },
    { "name": "EGYPT", "key": "EG" },
    { "name": "EL SALVADOR", "key": "SV" },
    { "name": "EQUATORIAL GUINEA", "key": "GQ" },
    { "name": "ESTONIA", "key": "EE" },
    { "name": "ETHIOPIA", "key": "ET" },
    { "name": "FAROE ISLANDS", "key": "FO" },
    { "name": "FIJI", "key": "FJ" },
    { "name": "FINLAND", "key": "FI" },
    { "name": "FRANCE", "key": "FR" },
    { "name": "FRENCH GUIANA", "key": "GF" },
    { "name": "FRENCH POLYNESIA", "key": "PF" },
    { "name": "GABON", "key": "GA" },
    { "name": "GAMBIA", "key": "GM" },
    { "name": "GEORGIA", "key": "GE" },
    { "name": "GERMANY", "key": "DE" },
    { "name": "GHANA", "key": "GH" },
    { "name": "GIBRALTAR", "key": "GI" },
    { "name": "GREECE", "key": "GR" },
    { "name": "GREENLAND", "key": "GL" },
    { "name": "GRENADA", "key": "GD" },
    { "name": "GUADELOUPE", "key": "GP" },
    { "name": "GUAM", "key": "GU" },
    { "name": "GUATEMALA", "key": "GT" },
    { "name": "GUERNSEY", "key": "GG" },
    { "name": "GUINEA", "key": "GN" },
    { "name": "GUINEA-BISSAU", "key": "GW" },
    { "name": "GUYANA", "key": "GY" },
    { "name": "HAITI", "key": "HT" },
    { "name": "HONDURAS", "key": "HN" },
    { "name": "HONG KONG", "key": "HK" },
    { "name": "HUNGARY", "key": "HU" },
    { "name": "ICELAND", "key": "IS" },
    { "name": "INDIA", "key": "IN" },
    { "name": "INDONESIA", "key": "ID" },
    { "name": "IRAN", "key": "IR" },
    { "name": "IRAQ", "key": "IQ" },
    { "name": "IRELAND", "key": "IE" },
    { "name": "ISLE OF MAN", "key": "IM" },
    { "name": "ISRAEL", "key": "IL" },
    { "name": "ITALY", "key": "IT" },
    { "name": "JAMAICA", "key": "JM" },
    { "name": "JAPAN", "key": "JP" },
    { "name": "JERSEY", "key": "JE" },
    { "name": "JORDAN", "key": "JO" },
    { "name": "KAZAKHSTAN", "key": "KZ" },
    { "name": "KENYA", "key": "KE" },
    { "name": "KIRIBATI", "key": "KI" },
    { "name": "KUWAIT", "key": "KW" },
    { "name": "KYRGYZSTAN", "key": "KG" },
    { "name": "LAOS", "key": "LA" },
    { "name": "LATVIA", "key": "LV" },
    { "name": "LEBANON", "key": "LB" },
    { "name": "LESOTHO", "key": "LS" },
    { "name": "LIBERIA", "key": "LR" },
    { "name": "LIBYA", "key": "LY" },
    { "name": "LIECHTENSTEIN", "key": "LI" },
    { "name": "LITHUANIA", "key": "LT" },
    { "name": "LUXEMBOURG", "key": "LU" },
    { "name": "MACAU", "key": "MO" },
    { "name": "MACEDONIA [FYROM]", "key": "MK" },
    { "name": "MADAGASCAR", "key": "MG" },
    { "name": "MALAWI", "key": "MW" },
    { "name": "MALAYSIA", "key": "MY" },
    { "name": "MALDIVES", "key": "MV" },
    { "name": "MALI", "key": "ML" },
    { "name": "MALTA", "key": "MT" },
    { "name": "MARSHALL ISLANDS", "key": "MH" },
    { "name": "MARTINIQUE", "key": "MQ" },
    { "name": "MAURITANIA", "key": "MR" },
    { "name": "MAURITIUS", "key": "MU" },
    { "name": "MAYOTTE", "key": "YT" },
    { "name": "MEXICO", "key": "MX" },
    { "name": "MICRONESIA", "key": "FM" },
    { "name": "MOLDOVA", "key": "MD" },
    { "name": "MONACO", "key": "MC" },
    { "name": "MONGOLIA", "key": "MN" },
    { "name": "MONTENEGRO", "key": "ME" },
    { "name": "MOROCCO", "key": "MA" },
    { "name": "MOZAMBIQUE", "key": "MZ" },
    { "name": "MYANMAR [BURMA]", "key": "MM" },
    { "name": "NAMIBIA", "key": "NA" },
    { "name": "NEPAL", "key": "NP" },
    { "name": "NETHERLANDS", "key": "NL" },
    { "name": "NETHERLANDS ANTILLES", "key": "AN" },
    { "name": "NEW CALEDONIA", "key": "NC" },
    { "name": "NEW ZEALAND", "key": "NZ" },
    { "name": "NICARAGUA", "key": "NI" },
    { "name": "NIGER", "key": "NE" },
    { "name": "NIGERIA", "key": "NG" },
    { "name": "NORTH KOREA", "key": "KP" },
    { "name": "NORTHERN MARIANA ISLANDS", "key": "MP" },
    { "name": "NORWAY", "key": "NO" },
    { "name": "OMAN", "key": "OM" },
    { "name": "PAKISTAN", "key": "PK" },
    { "name": "PALAU", "key": "PW" },
    { "name": "PALESTINIAN TERRITORIES", "key": "PS" },
    { "name": "PANAMA", "key": "PA" },
    { "name": "PAPUA NEW GUINEA", "key": "PG" },
    { "name": "PARAGUAY", "key": "PY" },
    { "name": "PERU", "key": "PE" },
    { "name": "PHILIPPINES", "key": "PH" },
    { "name": "POLAND", "key": "PL" },
    { "name": "PORTUGAL", "key": "PT" },
    { "name": "PUERTO RICO", "key": "PR" },
    { "name": "QATAR", "key": "QA" },
    { "name": "ROMANIA", "key": "RO" },
    { "name": "RUSSIA", "key": "RU" },
    { "name": "SAINT BARTHELEMY", "key": "BL" },
    { "name": "SAINT KITTS AND NEVIS", "key": "KN" },
    { "name": "SAINT LUCIA", "key": "LC" },
    { "name": "SAINT MARTIN", "key": "MF" },
    { "name": "SAINT PIERRE AND MIQUELON", "key": "PM" },
    { "name": "SAINT VINCENT AND THE GRENADINES", "key": "VC" },
    { "name": "SAMOA", "key": "WS" },
    { "name": "SAN MARINO", "key": "SM" },
    { "name": "SAUDI ARABIA", "key": "SA" },
    { "name": "SENEGAL", "key": "SN" },
    { "name": "SERBIA", "key": "RS" },
    { "name": "SEYCHELLES", "key": "SC" },
    { "name": "SIERRA LEONE", "key": "SL" },
    { "name": "SINGAPORE", "key": "SG" },
    { "name": "SINT MAARTEN", "key": "SX" },
    { "name": "SLOVAKIA", "key": "SK" },
    { "name": "SLOVENIA", "key": "SI" },
    { "name": "SOLOMON ISLANDS", "key": "SB" },
    { "name": "SOUTH AFRICA", "key": "ZA" },
    { "name": "SOUTH KOREA", "key": "KR" },
    { "name": "SOUTH SUDAN", "key": "SS" },
    { "name": "SOVIET UNION", "key": "SU" },
    { "name": "SPAIN", "key": "ES" },
    { "name": "SRI LANKA", "key": "LK" },
    { "name": "SUDAN", "key": "SD" },
    { "name": "SURINAME", "key": "SR" },
    { "name": "SVALBARD AND JAN MAYEN", "key": "SJ" },
    { "name": "SWAZILAND", "key": "SZ" },
    { "name": "SWEDEN", "key": "SE" },
    { "name": "SWITZERLAND", "key": "CH" },
    { "name": "SYRIA", "key": "SY" },
    { "name": "TAIWAN", "key": "TW" },
    { "name": "TAJIKISTAN", "key": "TJ" },
    { "name": "TANZANIA", "key": "TZ" },
    { "name": "THAILAND", "key": "TH" },
    { "name": "TIMOR-LESTE", "key": "TL" },
    { "name": "TOGO", "key": "TG" },
    { "name": "TOKELAU", "key": "TK" },
    { "name": "TRINIDAD AND TOBAGO", "key": "TT" },
    { "name": "TUNISIA", "key": "TN" },
    { "name": "TURKEY", "key": "TR" },
    { "name": "TURKMENISTAN", "key": "TM" },
    { "name": "TURKS AND CAICOS ISLANDS", "key": "TC" },
    { "name": "U.S. VIRGIN ISLANDS", "key": "VI" },
    { "name": "UGANDA", "key": "UG" },
    { "name": "UKRAINE", "key": "UA" },
    { "name": "UNITED ARAB EMIRATES", "key": "AE" },
    { "name": "UNITED KINGDOM", "key": "GB" },
    { "name": "UNITED STATES", "key": "US" },
    { "name": "URUGUAY", "key": "UY" },
    { "name": "UZBEKISTAN", "key": "UZ" },
    { "name": "VANUATU", "key": "VU" },
    { "name": "VENEZUELA", "key": "VE" },
    { "name": "VIETNAM", "key": "VN" },
    { "name": "WALLIS AND FUTUNA", "key": "WF" },
    { "name": "YEMEN", "key": "YE" },
    { "name": "YUGOSLAVIA", "key": "YU" },
    { "name": "ZAMBIA", "key": "ZM" },
    { "name": "ZIMBABWE", "key": "ZW" }];

    var states = [{ "name": "ALABAMA", "key": "AL"},
    { "name": "ALASKA", "key": "AK"},
    { "name": "ARIZONA", "key": "AZ"},
    { "name": "ARKANSAS", "key": "AR"},
    { "name": "CALIFORNIA", "key": "CA"},
    { "name": "COLORADO", "key": "CO"},
    { "name": "CONNECTICUT", "key": "CT"},
    { "name": "DELAWARE", "key": "DE"},
    { "name": "FLORIDA", "key": "FL"},
    { "name": "GEORGIA", "key": "GA"},
    { "name": "HAWAII", "key": "HI"},
    { "name": "IDAHO", "key": "ID"},
    { "name": "ILLINOIS", "key": "IL"},
    { "name": "INDIANA", "key": "IN"},
    { "name": "IOWA", "key": "IA"},
    { "name": "KANSAS", "key": "KS"},
    { "name": "KENTUCKY", "key": "KY"},
    { "name": "LOUISIANA", "key": "LA"},
    { "name": "MAINE", "key": "ME"},
    { "name": "MARYLAND", "key": "MD"},
    { "name": "MASSACHUSETTS", "key": "MA"},
    { "name": "MICHIGAN", "key": "MI"},
    { "name": "MINNESOTA", "key": "MN"},
    { "name": "MISSISSIPPI", "key": "MS"},
    { "name": "MISSOURI", "key": "MO"},
    { "name": "MONTANA", "key": "MT"},
    { "name": "NEBRASKA (NB)", "key": "NB"},
    { "name": "NEBRASKA (NE)", "key": "NE"},
    { "name": "NEVADA", "key": "NV"},
    { "name": "NEW HAMPSHIRE", "key": "NH"},
    { "name": "NEW JERSEY", "key": "NJ"},
    { "name": "NEW MEXICO", "key": "NM"},
    { "name": "NEW YORK", "key": "NY"},
    { "name": "NORTH CAROLINA", "key": "NC"},
    { "name": "NORTH DAKOTA", "key": "ND"},
    { "name": "OHIO", "key": "OH"},
    { "name": "OKLAHOMA", "key": "OK"},
    { "name": "OREGON", "key": "OR"},
    { "name": "PENNSYLVANIA", "key": "PA"},
    { "name": "RHODE ISLAND", "key": "RI"},
    { "name": "SOUTH CAROLINA", "key": "SC"},
    { "name": "SOUTH DAKOTA", "key": "SD"},
    { "name": "TENNESSEE", "key": "TN"},
    { "name": "TEXAS", "key": "TX"},
    { "name": "UTAH", "key": "UT"},
    { "name": "VERMONT", "key": "VT"},
    { "name": "VIRGINIA", "key": "VA"},
    { "name": "WASHINGTON", "key": "WA"},
    { "name": "WEST VIRGINIA", "key": "WV"},
    { "name": "WISCONSIN", "key": "WI"},
    { "name": "WYOMING", "key": "WY"}];

    var overlays = [
        {
            className: 'center-pane',
            blockMouse: false,
            verticalCenter: false,
            items: [
                {
                    className: 'center-pane',
                    key: OverlayModel.overlays.patentClass,
                    file: 'patentClass.html',
                    title: Lexicon.root.titles.patentClass
                },
                {
                    className: 'center-pane scroll',
                    key: OverlayModel.overlays.uspc,
                    file: 'uspc.html',
                    title: Lexicon.root.titles.uspc
                },
                {
                    className: 'center-pane scroll',
                    key: OverlayModel.overlays.nber,
                    file: 'nber.html',
                    title: Lexicon.root.titles.nber
                },
                {
                    className: 'center-pane scroll',
                    key: OverlayModel.overlays.cpc,
                    file: 'cpc.html',
                    title: Lexicon.root.titles.cpc
                }
            ]
        }
    ];

    var options = JSON.parse(optionsJson);

    for (var i = 0; i < entities.length; i++) {
        entities[i].outputs = new Array();

        _.where(options, { "entities": [entities[i].id] }).forEach(function (field) {

            if (field.isOutput) {
                var isDefault = _.contains(entities[i].defaults, field.id);
                var group = _.find(entities[i].outputs, { "id": field.group });
                var output = { "id": field.id, "name": field.name, desc: field.desc, "isActive": isDefault };

                if (_.isUndefined(group)) {
                    var outputGroup = _.find(outputGroups, { "name": field.group });

                    if (_.isUndefined(outputGroup)) {
                        group = { "id": field.group, "name": field.group, "category": "", "shortName": "", "isActive": isDefault, desc: "", fields: new Array() };
                    }
                    else {
                        group = { "id": field.group, "name": field.group, "category": outputGroup.category, "shortName": outputGroup.shortName, "isActive": isDefault, desc: outputGroup.desc, fields: new Array() };
                    }

                    group.fields.push(output);
                    entities[i].outputs.push(group);
                } else {
                    group.fields.push(output);
                }
            }
        });
    }
    
    var QueryModel = Backbone.Model.extend({
        initialize: function () {
            this.set('options', options);
            this.set('entities', entities);
            this.set('isQuickSearch', true);
            this.set('quickSearch', "");
            this.set('query', {});
            this.set('expressions', []);
            this.set('outputs', []);
            this.set('sorts', []);
            this.set('entityId', "patent");//default entityId to patent
            this.set('outputIds', []);
            this.set('groupId', "");
            this.set('fieldId', "");
            this.set('resultCount', "0");
            this.set('recipient', "");
            this.set('xml', "");
            this.set('json', "");
            this.set('csv', "");
        },
        getFilters: function (optGroup) {
            var entityId = this.get('entityId');
            var filters = new Array();

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function (field) {

                if (!(_.isNull(optGroup)) && !(_.isEmpty(optGroup)) && (field.group != optGroup))
                    return;

                //var typeMatch = _.find(types, { "matches": [(field.values.length > 0) ? "select": field.type] });
                var typeMatch = _.find(types, { "matches": [field.type] });
                var inputMatch = _.find(inputs, { "matches": [field.fieldType] });

                if (field.isQuery == "true") {

                    try {
                        var filter = {
                            id: field.id,
                            label: field.name,
                            type: typeMatch.type,
                            input: inputMatch.type,
                            operators: typeMatch.ops,
                            values: field.values,
                            remoteUrl: field.remoteUrl,
                            optgroup: field.group,
                            desc: field.desc
                        };
                    }
                    catch (e) {

                    }

                    if (!_.isUndefined(typeMatch.validation)) {
                        filter.validation = typeMatch.validation;
                    }
                    if (!_.isUndefined(typeMatch.placeholder)) {
                        filter.placeholder = typeMatch.placeholder;
                    }

                    filters.push(filter);
                }
            });

            return filters;
        },
        getFilter: function (id) {
            var entityId = this.get('entityId');
            var filter = {};
            var field = _.find(this.get('options'), { "entities": [entityId], "id": id });

            if (!_.isUndefined(field)) {
                //var typeMatch = _.find(types, { "matches": [(field.values.length > 0) ? "select" : field.type] });
                var typeMatch = _.find(types, { "matches": [field.type] });
                var inputMatch = _.find(inputs, { "matches": [field.fieldType] });

                filter = {
                    id: field.id,
                    label: field.name,
                    type: typeMatch.type,
                    input: inputMatch.type,
                    operators: typeMatch.ops,
                    values: field.values,
                    remoteUrl: field.remoteUrl,
                    optgroup: field.group,
                    desc: field.desc
                };

                if (!_.isUndefined(typeMatch.validation)) {
                    filter.validation = typeMatch.validation;
                }
                if (!_.isUndefined(typeMatch.placeholder)) {
                    filter.placeholder = typeMatch.placeholder;
                }
            }

            return filter;
        },
        getGroups: function () {
            var entityId = this.get('entityId');
            var groups = new Array();

            if (_.isNull(entityId) || _.isEmpty(entityId)) {
                this.set('groups', groups);

                return;
            }

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function (field) {
                groups.push({ "id": field.group, "name": field.group, "isActive": false });
            });

            return _.uniq(groups, 'id');
        },
        getFields: function (groupId) {
            var entityId = this.get('entityId');
            var fields = new Array();

            if (_.isNull(groupId) || _.isEmpty(groupId)) {
                return fields;
            }

            _.where(this.get('options'), { "entities": [entityId], "group": groupId }).forEach(function (field) {

                if (field.isQuery) {
                    fields.push({ "id": field.id, "name": field.name, "isActive": false });
                }
            });

            return fields;
        },
        getConditions: function (fieldId) {
            var entityId = this.get('entityId');
            var conditions = new Array();

            if (_.isNull(fieldId) || _.isEmpty(fieldId)) {
                return conditions;
            }

            var field = _.findWhere(this.get('options'), { "entities": [entityId], "id": fieldId }); //Might need to add group but not sure.

            if (!_.isUndefined(field)) {
                var type = field.type;

                _.where(this.get('operators'), { "types": [type] }).forEach(function (operator) {
                    conditions.push({ "id": operator.id, "name": operator.name, "isActive": false });
                });
            }

            return conditions;
        },
        getOutputs: function (selected) {
            var entityId = this.get('entityId');
            var outputIds = this.get('outputIds');
            var groups = new Array();
            var entity = _.find(entities, { "id": entityId });

            if (_.isNull(entityId) || _.isEmpty(entityId)) {
                this.set('groups', groups);

                return groups;
            }
      
            _.where(this.get('options'), { "entities": [entityId] }).forEach(function (field) {

                if (selected && !(_.contains(outputIds, field.id)))
                    return true; //continue to next item.

                if (field.isOutput == "true") {
                    var isDefault = _.contains(entity.defaults, field.id) || _.contains(outputIds, field.id);
                    var output = { "id": field.id, "name": field.name, desc: field.desc, "isActive": isDefault };
                    //Always start with the output group.
                    var outputGroup = _.find(outputGroups, { "name": field.group });
                    var group = null;

                   
                    //Determine if the group.category matches the group.shortName.
                    if (outputGroup.category != outputGroup.shortName) {
                        //This field belongs to a subgroup. Try to retrieve the category group first.
                        group = _.find(groups, { "shortName": outputGroup.category });
                        var isNewGroup = false;
                        //If there's no category group then create one.
                        if (_.isUndefined(group)) {
                            isNewGroup = true;
                            group = { "id": outputGroup.categoryId, "name": outputGroup.category, "categoryId": outputGroup.categoryId, "shortName": outputGroup.category, "shortNameId": outputGroup.shortNameId, "isActive": isDefault, desc: "", groups: new Array() };
                        }

                        //We have a group to work with. Now check to see if there is a subgroup that has the same shortName.
                        subGroup = _.find(group.groups, { "shortName": outputGroup.shortName });
                        //Determine if the subGroup has been created yet.
                        if (_.isUndefined(subGroup)) {
                            subGroup = { "id": field.group, "name": field.group, "categoryId": outputGroup.categoryId, "shortName": outputGroup.shortName, "shortNameId": outputGroup.shortNameId, "isActive": isDefault, desc: (_.isUndefined(outputGroup)) ? "" : outputGroup.desc, fields: new Array() };
                            subGroup.fields.push(output);
                            group.groups.push(subGroup);
                        }
                        else {
                            subGroup.fields.push(output);
                        }

                        if (isNewGroup) {
                            groups.push(group);
                        }
                    }
                    else {
                        group = _.find(groups, { "id": field.group });

                        if (_.isUndefined(group)) {
                            group = { "id": field.group, "name": field.group, "categoryId": outputGroup.categoryId, "shortName": outputGroup.shortName, "shortNameId": outputGroup.shortNameId, "isActive": isDefault, desc: (_.isUndefined(outputGroup)) ? "" : outputGroup.desc, fields: new Array() };
                            group.fields.push(output);
                            groups.push(group);
                        }
                        else {
                            if (_.isUndefined(group.fields))
                                group.fields = new Array();

                            group.fields.push(output);
                        }
                    }
                }
            });

            return groups;
        },
        getSorts: function () {

            var entityId = this.get('entityId');
            var groups = new Array();

            if (_.isNull(entityId) || _.isEmpty(entityId)) {
                this.set('groups', groups);

                return groups;
            }

            _.where(this.get('options'), { "entities": [entityId] }).forEach(function (field) {

                if (field.isSort == "true") {
                    var group = _.find(groups, { "id": field.group });
                    var output = { "id": field.id, "name": field.name, "isActive": false };

                    if (_.isUndefined(group)) {
                        var outputGroup = _.find(outputGroups, { "name": field.group });
                        group = { "id": field.group, "name": outputGroup.shortName, "isActive": false, fields: new Array() };
                        group.fields.push(output);
                        groups.push(group);
                    } else {
                        group.fields.push(output);
                    }
                }
            });

            return groups;
        },
        getOverlay: function (key) {
            return _.find(overlays, function (item) {
                return !!_.findWhere(item.items, { key: key });
            });
        },
        setGroups: function () {
            this.set('groups', this.getGroups());
        },
        buildQuery: function () {
            
            var quickSearch = this.get('quickSearch');
            var expressions = this.get('expressions');
            var query = '';
            var trailChar = ']}';
            var fieldId = this.get('fieldId');
            fieldId = ((fieldId == '') ? 'patent_title' : fieldId);//use patent_title as the fieldId if one is not set.

            if (this.get('isQuickSearch')) {
                if (quickSearch.length == 0)
                    return query;

                quickSearch = quickSearch.replace(/"/g, '');

                return 'q={"_or":[{"_text_all":{"patent_title":"' + quickSearch + '"}},{"_text_all":{"patent_abstract":"' + quickSearch + '"}}]}' + '&f=' + JSON.stringify(this.get('outputIds'))
                     + '&s=[{"' + fieldId + '":"asc"}]';
            }
            else {
                if (expressions.length == 0)
                    return query;

                if (expressions.length == 1) { //Simple Query.
                    if (expressions[0].operator == "_eq") {//Simple equality pair.
                        query = query + '{"' + expressions[0].field + '":"' + expressions[0].value + '"},';
                    }
                    else {//Not a simple equality pair.
                        query = query + '{"' + expressions[0].operator + '":{"' + expressions[0].field + '":"' + expressions[0].value + '"}},';
                    }
                    trailChar = '';
                }
                else { //Not a Simple Query.
                    query = '{"_and":[';

                    for (var i = 0; i < expressions.length; i++) {
                        if (expressions[i].operator == "_eq") {//Simple equality pair.
                            query = query + '{"' + expressions[i].field + '":"' + expressions[i].value + '"},';
                        }
                        else {//Not a simple equality pair.
                            query = query + '{"' + expressions[i].operator + '":{"' + expressions[i].field + '":"' + expressions[i].value + '"}},';
                        }
                    }
                }
            }

            query = query.replace(/,\s*$/, "") + trailChar;
           
            var result = '';
            
            result = 'q=' + query
                     + '&f=' + JSON.stringify(this.get('outputIds'))
                     + '&s=[{"' + fieldId + '":"asc"}]';

            return result;
        },
        getCountryCode: function (name)
        {
            if (_.isNull(name) || _.isEmpty(name)) {
                return "";
            };

            var country = _.where(countries, { "name": name.trim().toUpperCase() });

            return (_.isUndefined(country) || country.length == 0) ? "" : country[0].key;
        },
        getStateCode: function (name) {
            
            if (_.isNull(name) || _.isEmpty(name)) {
                return "";
            };

            var state = _.where(states, { "name": name.trim().toUpperCase() });

            return (_.isUndefined(state) || state.length == 0) ? "" : state[0].key;
        }
    });

    return QueryModel;
})