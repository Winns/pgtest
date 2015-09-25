if (! app.hasOwnProperty( 'widget' )) app.widget = {};

app.widget.navigation = new (function() {
	var self = this;

	this.el 				= {};
	this.el.$nav 			= $( '#navigation' );
	this.el.$btns 			= this.el.$nav.find( 'li.js-app-link' );

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

		if (typeof v == 'string') {
			page = this.getPage( v );
		}

		app.setPage( page.name, v );
	};

	this.bindEvents = function() {
		app.on( 'SET_PAGE', function(name) {
			var $target = self.el.$btns.filter( '[data-target="'+ name +'"]' );

			self.el.$btns.removeClass( 'active' );
			$target.addClass( 'active' );
		});

		var hm = (function() {
			var el = $('body')[0];

			var opt = {
				recognizers: [
					[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL, velocity: 0.3, threshold: 50 }],
				]
			};

			return new Hammer.Manager( el, opt );
		})();

		hm.on('swiperight', function() {
			self.setPage( 'prev' );
		});

		hm.on('swipeleft', function() {
			self.setPage( 'next' );
		});
	};

	this.init = function() {
		this.indexPages();
		this.bindEvents();
	};
});