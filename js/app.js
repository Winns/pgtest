$(function() {
	app.currentPage = 'flashlight';

	// ON
	app.onPool = [];
	app.on = function( method, f ) {
		this.onPool.push({
			method: method,
			f: f
		});
	};
	app.trigger = function( method, data ) {
		var o;

		if (data === undefined) data = null;
		
		for (var i=0; i < this.onPool.length; i++) {
			o = this.onPool[i];
			if (o.method == method) o.f( data );
		}
	};
	// End ON

	// Methods
	app.setPage = function( name, data ) {
		this.currentPage = name;

		for (var key in this.page) {
			if (key !== name) {
				console.log( 'hide', key, data );
				this.page[ key ].hide( data );
			}
		}

		this.page[ name ].show( data );

		app.trigger( 'SET_PAGE', name );
	};

	app.initRouter = function() {
		$(document).on( 'click', '.js-app-link', function() {
			var target = $(this).attr( 'data-target' );

			app.setPage( target );
		});
	};

	app.initEvents = function() {
		$(document).on( 'click', '.js-app-event', function() {
			app.trigger( $(this).attr( 'data-event' ) );
		});
	};

	app.initWidgets = function() {
		if (! this.hasOwnProperty( 'widget' )) return;

		for (var key in this.widget) {
			if (this.widget[ key ].hasOwnProperty( 'init' ))
				this.widget[ key ].init();
		}
	};

	app.handleEvent = function() {
		this.on( 'EXIT_APP', function() {
			try {
				navigator.app.exitApp();
			} catch(e) {}
		});
	};

	app.init = function() {
		this.initWidgets();
		this.initRouter();
		this.initEvents();
		this.handleEvent();

		this.setPage( this.currentPage );
	};

	app.init();
});