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
		oldA: 0,
		newA: 0,

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
				{ frequency: 500 }
			);
		},
		off: function() {
			if (!this.flags.isAvailable) return;

			navigator.compass.clearWatch( this.compass );
		},		

		/*
			old -> new = result;
			5 -> 350 = -10
			5 -> 15 = 15
			355 -> 1 = 361
			718 -> 1 = 721
		*/
		fixAngle: function(oldA, newA) {
			function to360(a) {
			   return ((a % 360) + 360) % 360;
			};
			   
			function getDif(a, b) {
			   return 180 - Math.abs(Math.abs(a - b) - 180); 
			}

			var oldA360 = to360(oldA),
				newA360 = to360(newA),
				dif = getDif(oldA360, newA360);

			if (oldA360 < newA360)
				return oldA - dif;
			else
				return oldA + dif;
		},

		onCompassUpdate: function( data ) {
			this.el.$val.html( Math.ceil(data.magneticHeading) );

			this.newA = this.fixAngle( this.oldA, -data.magneticHeading );
			this.oldA = this.newA;

			app.widget.debugger.show( this.newA );

			this.el.$arrow.clearQueue().transition({ rotate: this.newA + 'deg', duration: 450 });
		},

		init: function() {
			this.cacheElements();
			this.prepare();

			app.trigger('PAGE_READY', this.name);
		}
	});

})();