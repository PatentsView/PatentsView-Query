// 1. Install nodejs (it will automatically installs requirejs)

//- assuming the folder structure for your app is:
// app
// 		css
// 		img
// 		js
// 		main.js
// 		index.html
// build
// 		app.build.js
// 		r.js (downloaded from requirejs website)

// 2. the command line to run:
// $ node r.js -o app.build.js
// 

({
	//- paths are relative to this app.build.js file
    baseUrl: "../js",
    //name: "app",
	//- this is the directory that the new files will be. it will be created if it doesn't exist
	dir: '../app-build',
    //out: "../main.js",
	paths: {
	    jquery: 'libs/jquery.min',
	    underscore: 'libs/lodash.min',
	    backbone: 'libs/backbone.min',
	    text: 'libs/plugins/text.min',
	    i18n: 'libs/plugins/i18n.min',
	    handlebarsCore: 'libs/plugins/handlebars.min',
	    handlebars: 'libs/plugins/handlebars.helpers',
	    bootstrap: 'libs/plugins/bootstrap.min',
	    typeahead: 'libs/plugins/typeahead.bundle',
	    bloodhound: 'libs/plugins/typeahead.bundle',
	    validateCore: 'libs/plugins/jquery.validate',
	    validate: 'libs/plugins/jquery.validate.additional',
	    moment: 'libs/plugins/moment',
	    'query-builder': 'libs/plugins/query-builder.standalone',
		recaptcha: 'empty:'
	},
	shim: {
		handlebarsCore: { exports: '"Handlebars' },
		handlebars: {
			deps: ['handlebarsCore'],
			exports: 'Handlebars'
		},
		bootstrap: { "deps": ['jquery'] },
		typeahead: { 'deps': ['jquery'], 'exports': 'Typeahead' },
		bloodhound: { 'deps': ['jquery'], 'exports': 'Bloodhound' },
		validateCore: { exports: 'Validate' },
		validate: {
			deps: ['validateCore'],
			exports: 'Validate'
		},
		recaptcha: { exports: 'Recaptcha' }
	},
    urlArgs: "v=" + 1,
	optimizeCss: 'standard.keepLines',
	modules: [
		{
			name: 'main'
		}
	],
	preserveLicenseComments: false,
	fileExclusionRegExp: /.git|.phpproj|.phppub|.user|.sln|.suo|.php|.css|.scss|.sass|.map/
})