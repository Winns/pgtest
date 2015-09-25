(function() {

	app.page.vibration = new Page({
		el: {
			page: '#page-vibration'
		},
		view: 	null,

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
		},

		init: function() {
			this.cacheElements();
		}
	});

})();