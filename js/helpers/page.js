var Page = function( cfg ) {
	var self = this;

	this.flags = {
		active: false
	};

	this.status = null;

	this.onShow = function() {};
	this.onHide	= function() {};

	this.show = function( params ) {
		if (this.status == 'show')
			return;
		else
			this.status = 'show';

		this.onShow( params );
	};
	this.hide = function( params ) {
		if (this.status == 'hide')
			return;
		else
			this.status = 'hide';

		this.onHide( params );
	};

	this._constructor = function() {
		for (var key in cfg) {
			this[ key ] = cfg[ key ];
		};

		if (this.hasOwnProperty( 'init' )) {
			this.init();
		};
	};
};

	