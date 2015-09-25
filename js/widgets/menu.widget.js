if (! app.hasOwnProperty( 'widget' )) app.widget = {};

app.widget.menu = new (function() {
	var self = this;

	this.el 				= {};
	this.el.$menu 			= $( '#menu' );
	this.el.$btns 			= this.el.$menu.find( 'li.js-app-link' );
	this.el.$swipeTrigger 	= this.el.$menu.find( '.swipe-trigger' );

	this.hm = null; // hammer.js manager

	this.pages = [];

	// Methods
	this.indexPages = function() {
		this.el.$btns.each(function(i) {
			self.pages.push({
				$el: 	$(this),
				name: 	$(this).attr('data-target'),
				index: 	i
			});
		});
	};

	this.show = function() {
		this.el.$menu.addClass( 'active' );
	};

	this.hide = function() {
		this.el.$menu.removeClass( 'active' );
	};

	this.getPage = function( v ) {
		var currentIndex = this.el.$btns.filter( '[data-target="'+ app.currentPage +'"]' ).index(),
			r = {};

		switch (v) {
			case 'next':
				r = (function() {
					var index = currentIndex + 1;

					if (index > self.el.$btns.length - 1) index = currentIndex;

					return self.pages[ index ];
				})();
				break;

			case 'prev':
				r = (function() {
					var index = currentIndex - 1;

					if (index < 0) index = 0;

					return self.pages[ index ];
				})();
				break;
		}

		return r;
	};

	this.setPage = function( v ) {
		var page;

		console.log( v );

		if (typeof v == 'string') {
			page = this.getPage( v );
		}

		app.setPage( page.name );
	};

	this.bindEvents = function() {
		this.el.$btns.on( 'click', self.hide.bind(this) );
		this.el.$swipeTrigger.on( 'click', self.show.bind(this) );
	};

	this.init = function() {
		this.indexPages();
		this.bindEvents();

		var hOpen = (function() {
			var el = self.el.$menu.find('.swipe-trigger')[0];

			var opt = {
				recognizers: [
					[Hammer.Swipe, { direction: Hammer.DIRECTION_ALL, velocity: 0.3, threshold: 50 }],
				]
			};

			return new Hammer.Manager( el, opt );
		})();

		hOpen.on('swipedown', self.show.bind(this));


		var hClose = (function() {
			var el = $('body')[0];

			var opt = {
				recognizers: [
					[Hammer.Swipe, { direction: Hammer.DIRECTION_ALL, velocity: 0.3, threshold: 50 }],
				]
			};

			return new Hammer.Manager( el, opt );
		})();
		hClose.on('swipeup', self.hide.bind(this));
		hClose.on('swiperight', function() {
			self.setPage( 'prev' );
		});

		hClose.on('swipeleft', function() {
			self.setPage( 'next' );
		});
	};
});