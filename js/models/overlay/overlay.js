/**
 * Used for data surrounding showing and hiding of various overlay views.
 * 
 * @namespace OverlayModel
 * @class OverlayModel
 * @extends Backbone.Model
 *
 */


define(['backbone'],
function(Backbone) {
	
	var OverlayModel = Backbone.Model.extend({


		defaults: {
			// the current overlay subviews string key
			key: null,
			isVisible: false, //shown
			show: false //show on content load
		},

		initialize: function() {},


		/**
         * Available overlays
         *
         * @enum {object} overlays 
         * @memberOf OverlayModel
         */
		overlays: {
			patentClass: 'patentClass',
			uspc: 'uspc',
			cpc: 'cpc',
			nber: 'nber',
			about: 'about',
			methodsSources: 'methodsSources',
			glossary: 'glossary',
			economist: 'economist',
			howTo: 'howTo',
			filterOpts: 'filterOpts'
		}
	});

	// return a Singleton
	return new OverlayModel();
});