(function() {

	app.page.flashlight = new Page({
		name: 'flashlight',

		el: {
			page: '#page-flashlight'
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

				window.plugins.flashlight.available(function( isAvailable ) {
					self.flags.isAvailable = isAvailable
					self.fl = window.plugins.flashlight;

					app.trigger('PAGE_READY', self.name);
				});
			} catch(e) {
				app.widget.debugger.show( ('error ' + e.name + ':' + e.message + '<br>' + e.stack) );
			}
		},

		on: function() {
			if (!this.flags.isAvailable) return;

			this.fl.switchOn();
		},
		off: function() {
			if (!this.flags.isAvailable) return;

			this.fl.switchOff();
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