(function() {

	app.page.vibration = new Page({
		el: {
			page: '#page-vibration'
		},
		view: 	null,

		flags: {
			isAvailable: false
		},

		fl: null,

		// Methods
		onShow: function( e ) {
			if (e == 'next') {
				this.el.$page.transition({ x: '-100%', opacity: '0', duration: 0 });
				this.el.$page.transition({ x: '0', opacity: '1', duration: 250 });
			} else if (e == 'prev') {
				this.el.$page.transition({ x: '100%', opacity: '0', duration: 0 });
				this.el.$page.transition({ x: '0', opacity: '1', duration: 250 });
			} else {
				this.el.$page.transition({ x: '0', opacity: '0', duration: 0 });
				this.el.$page.transition({ opacity: '1', duration: 250 });
			}

			this.el.$page.addClass( 'active' );
		},
		onHide: function( e ) {
			if (e == 'next') {
				this.el.$page.transition({ x: '100%', opacity: 0, duration: 250 });
			} else if (e == 'prev') {
				this.el.$page.transition({ x: '-100%', opacity: 0, duration: 250 });
			} else {
				this.el.$page.transition({ opacity: '0', duration: 250 });
			}

			this.el.$page.removeClass( 'active' );
		},

		render: function( data ) {
			//this.view.render( data.streams );
		},

		cacheElements: function() {
			this.el.$page = $( this.el.page );
			this.el.$btn = this.el.$page.find( '.btn-toggle' );
		},

		prepare: function() {
			var self = this;

			try {
				if (navigator !== undefined) {
					self.flags.isAvailable = navigator.hasOwnProperty( 'vibrate' );
				}
			} catch(e) {
				alert( 'error ' + e.name + ':' + e.message + '<br>' + e.stack );
				app.widget.debugger.show( ('error ' + e.name + ':' + e.message + '<br>' + e.stack) );
			}
		},

		on: function() {
			if (!this.flags.isAvailable) return;

			navigator.vibrate(15000)
		},
		off: function() {
			if (!this.flags.isAvailable) return;

			navigator.vibrate(0);
		},

		bindEvents: function() {
			var self = this;

			this.el.$btn.on( 'click', function() {
				if ($(this).hasClass( 'active' )) {
					$(this).removeClass( 'active' );
					self.off();
				} else {
					$(this).addClass( 'active' );
					self.on();
				}
			});
		},

		init: function() {
			this.cacheElements();
			this.prepare();
			this.bindEvents();
		}
	});

})();