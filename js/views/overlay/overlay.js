define(['underscore', 'jquery', 'backbone',
	'models/overlay/overlay',
	'i18n!models/overlay/nls/lexicon',
	'text!views/overlay/templates/overlay.html'
	],
function(_, $, Backbone, OverlayModel, Lexicon, overlayTemplate) {

	var OverlayPane = Backbone.View.extend({
		className: 'overlay',
		events: {
			'click .paneNav li': 'onNavClick',
			'click .close': 'onCloseClick',
			'mouseenter .term': 'mouseenterTerm',
			'mouseleave .term': 'mouseleaveTerm',
			'click': 'clickOverlay',
		},
		initialize: function() {
		    _.bindAll(this, 'onKeyChange', 'render', 'onExternalAnchorClick');
			this.model.on('change:key', this.onKeyChange);
			this.model.on('change:group change:sub', this.render);
			this.$el = $(this.el);
			$('body').append(this.$el);
			$('a.overlay-link').click(this.onExternalAnchorClick);
		},
		render: function () {

			function clearPrev() {
				if(prevGroup) {
					self.$el.removeClass(prevGroup.overlayClassName);
				}
			}

			function onload(text) {
			    debugger;
				clearPrev();
				text = _.template(text, Lexicon);
				var attr = _.extend({}, self.model.attributes, {copy:text});
				var html = _.template(overlayTemplate, attr);
				self.$el.html(html);
				self.$el.addClass(group.overlayClassName);

				if(group.blockMouse !== self.$el.hasClass('block-mouse')) {
					self.$el.toggleClass('block-mouse');
				}

				if(group.verticalCenter !== self.$el.hasClass('vertical-center')) {
					self.$el.toggleClass('vertical-center');
				}

				//enrich with accessibility info for glossary items
				self.$el.find('.term').each(function() {
					var $span = $(this);
					var term = $span.attr('data-term');
					var entry = Lexicon.glossary[term];

					if (entry) {
						$span.attr('longdesc', entry.title+': '+entry.text);
					}
				});

				//show it now that we've loaded
				if(self.model.get('show')) {
					self.show();
				}
			}

			var self = this;
			var prevGroup = this.model.previous('group');
			var group = this.model.attributes.group; 
			
			if(!group) {
				clearPrev();
			} else {
                //TODO: Update prior to production deployment.
			    $.get('/overlays/' + this.model.get('sub').file + '?1', onload, 'text');
			}			
		},	
		onExternalAnchorClick: function(e) {
			var key = $(e.currentTarget).attr('data-key');
			this.model.set('key', key);
			e.preventDefault();

			return false;
		},
		onNavClick: function(e) {
			var key = $(e.currentTarget).attr('data-key');
			this.model.set('key', key);
		},
		onCloseClick: function () {
			this.close();
		},
		clickOverlay: function(e) {
			if($(e.target).closest('.pane').length === 0) {
				//outside pane, but in overlay
				this.close();
			}
		},
		mouseenterTerm: function(e) {
			var self = this;
			var $span = $(e.currentTarget), term = $span.attr('data-term');

			if(term && Lexicon.glossary[term]) {
				var entry = Lexicon.glossary[term];
				var html = '<h5>'+entry.title+'</h5><p>'+entry.text+'</p>';
				var $tip = $('<div></div>').addClass('tooltip').html(html);
				this.$el.find('.pane').append($tip);
				var pos = $span.position();
				$tip.css({
					left: pos.left - $tip.outerWidth() + $span.outerWidth() * 0.5 + 20,
					top: pos.top - $tip.outerHeight() - 5
				});
				$tip.hide();

				// don't fade in immediately
				// but allow mouseout to cancel
				setTimeout(function(){
					if(self.$tip) {
						self.$tip.fadeIn(300);
					}					
				}, 300);
				this.$tip = $tip;
			}		

			e.preventDefault();

			return false;
		},
		mouseleaveTerm: function(e) {
			this.removeTip();
		},
		removeTip: function() {
			var $tip = this.$tip;
			this.$tip = null;
			
			if($tip) {
				$tip.fadeOut(300, function(){$tip.remove();});
			}
		},

		onKeyChange: function(model, val, opts) {
			var group = _.find(OverlayPane.groups, function(group) {
				return !!_.findWhere(group.items, {key:val});
			});

			if(!group) {
				//not a valid key, deselect
				this.model.set({
					group: null,
					sub: null,
					show: false
				});

				this.hide();
			} else {
				//select the group and subgroup
				this.model.set({
					group: group,
					sub: _.findWhere(group.items, {key:val}),
					show: true
				});
			}
		},
		close: function() {
			this.model.set('key', null);
		},
		show: function () {
			if(!this.model.get('isVisible')) {
				this.model.set('isVisible', true);
				this.$el.find('.pane').css({opacity:0, top:10}).animate({opacity:1, top: 0}, 200);
				this.$el.show();
			}
		}, 
		hide: function() {
			if(this.model.get('isVisible')) {
				this.model.set('isVisible', false);
				this.$el.fadeOut(200);
			}
		},
		exposeApi: function(scope) {
			var self = this;

			scope['overlaysApi'] = {
				register: function(group) {
					if(!(_.isObject(group) &&
						    _.isArray(group.items) &&
						    group.items.length > 0)) {
					    throw 'Overlay group must be an object with an items array of length >= 1';
					}

					for(var i=0, l=group.items.length; i<l; ++i) {
						var item = group.items[i];
						
						if(!(
							_.isString(item.key) &&
							item.key.length>0
						)) {
							throw 'Each overlay group item must have a valid "key"';
						}

						if(!self.keyIsAvailable_(item.key)) {
							throw 'Overlay key "'+item.key+'" is already taken.';
						}

						if(!(_.isString(item.file) &&
							    item.file.length>0)) {
							throw 'Each overlay group item must have a "file" name';
						}

						if(!(item.title === void 0 ||
							    _.isString(item.title))) {
							throw 'Each overlay group item "title" must be a string or undefined';
						}
					}

					OverlayPane.groups.push(group);
				},

				show: function(key) {
					if(!_.isString(key)) {
						throw 'Key must be a string';
					}
					
					self.model.set('key', key);
				},

				hide: function() {
					self.model.set('key', null);
				}
			};
		},

		keyIsAvailable_: function(key) {
			var groups = OverlayPane.groups;

			for(var i=0, l=groups.length; i<l; ++i) {
				var items = groups[i].items;

				for(var j=0, lj=items.length; j<lj; ++j) {
					if(items[j].key === key) {
						return false;
					}
				}
			}

			return true;
		}
	}, 

		/**
		 * @static
		 */
	{
		groups: [
			{
				className: 'center-pane',
				blockMouse: true,
				verticalCenter: false,
				items: [
					{
						key: OverlayModel.overlays.about,
						file: 'about.html',
						title: Lexicon.titles.about
					},
					{
						key: OverlayModel.overlays.economist,
						file: 'economist.html',
						title: Lexicon.titles.economist
					}
				]
			},
			{
				className: 'center-pane',
				blockMouse: true,
				verticalCenter: false,
				items: [
					{
						key: OverlayModel.overlays.methodsSources,
						file: 'methodsSources.html',
						title: Lexicon.titles.methodsSources
					}
				]
			},
			{
				className: 'center-pane',
				blockMouse: true,
				verticalCenter: false,
				items: [
					{
						className: 'glossary scroll',
						key: OverlayModel.overlays.glossary,
						file: 'glossary.html',
						title: Lexicon.titles.glossary
					}
				]
			},
			{
				className: 'center-pane',
				blockMouse: false,
				verticalCenter: false,
				items:	[
					{
						className: 'patent-class-overview',
						key: OverlayModel.overlays.patentClass,
						file: 'patentClass.html',
						title: Lexicon.titles.patentClass
					},
					{
						className: 'patent-class-type scroll',
						key: OverlayModel.overlays.uspc,
						file: 'uspc.html',
						title: Lexicon.titles.uspc
					},
					{
						className: 'patent-class-type scroll',
						key: OverlayModel.overlays.nber,
						file: 'nber.html',
						title: Lexicon.titles.nber
					},
					{
						className: 'patent-class-type scroll',
						key: OverlayModel.overlays.cpc,
						file: 'cpc.html',
						title: Lexicon.titles.cpc
					}
				]
			},
			{
				className: 'right-pane',
				blockMouse: false,
				verticalCenter: false,
				items:	[
					{
						key: OverlayModel.overlays.howTo,
						file: 'howTo.html',
						title: Lexicon.titles.howTo
					},
					{
						className: 'filter-opts',
						key: OverlayModel.overlays.filterOpts,
						file: 'filterOpts.html',
						title: Lexicon.titles.filterOpts
					}
				]
			}
		]
	});

	return OverlayPane;

});