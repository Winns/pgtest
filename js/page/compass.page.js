(function() {

	app.page.compass = new Page({
		el: {
			page: '#page-compass'
		},
		view: 	null,

		flags: {
			isAvailable: false
		},

		compass: null,

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

			this.on();
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

			this.off();
		},

		render: function( data ) {
			
		},

		cacheElements: function() {
			this.el.$page 	= $( this.el.page );
			this.el.$btn 	= this.el.$page.find( '.btn-toggle' );
			this.el.$val 	= this.el.$page.find( '.val' );
			this.el.$arrow 	= this.el.$page.find( '.arrow' );
		},

		prepare: function() {
			var self = this;

			try {
				if (navigator !== undefined && navigator.hasOwnProperty( 'compass' )) {

					navigator.compass.getCurrentHeading(
						function() { self.flags.isAvailable = true; }, // success
						function() { self.flags.isAvailable = false; } // error
					);

				}
			} catch(e) {
				app.widget.debugger.show( ('error ' + e.name + ':' + e.message + '<br>' + e.stack) );
			}
		},

		on: function() {
			if (!this.flags.isAvailable) return;

			this.compass = navigator.compass.watchHeading(
				this.onCompassUpdate.bind(this), 
				function(e) { app.widget.debugger.show( ('error ' + e.code) ); }, 
				{ frequency: 1000 }
			);
		},
		off: function() {
			if (!this.flags.isAvailable) return;

			navigator.compass.clearWatch( this.compass );
		},

		onCompassUpdate: function( data ) {
			this.el.$val( data.magneticHeading );
			this.el.$arrow.transition({ rotate: data.magneticHeading + 'deg' });
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