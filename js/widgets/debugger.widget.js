if (! app.hasOwnProperty( 'widget' )) app.widget = {};

app.widget.debugger = new (function() {
	var self = this;

	this.el = {};

	// Templates
	this.templates = {};

	this.templates.base = function() {
		var html = '';

		html += '<div id="debugger">';
		html += 	'<div class="header">';
		html += 		'<span>Debugger</span><i class="btn-close">Close</i><i class="btn-clear">Clear</i>';
		html += 	'</div>';
		html += 	'<ul class="content"></ul>';
		html += '</div>';

		return html;
	};

	this.templates.msg = function( str ) {
		return '<li>'+ str +'</li>';
	};

	// Methods
	this.render = function() {
		var $body = $('body');

		$body.append( this.templates.base() );

		this.el.$debugger 	= $body.find( '#debugger' );
		this.el.$content	= this.el.$debugger.find( '.content' );
		this.el.$btnClear 	= this.el.$debugger.find( '.btn-clear' );
		this.el.$btnClose 	= this.el.$debugger.find( '.btn-close' );
	};

	this.show = function() {
		if (arguments.length) {
			var html = '';

			for (var i=0; i < arguments.length; i++) {
				html += this.templates.msg( arguments[i] );
			}

			this.el.$content.append( html );
		}
		this.el.$content.scrollTop(
			this.el.$content[0].scrollHeight
		);

		this.el.$debugger.addClass( 'active' );
	};

	this.hide = function() {
		this.el.$debugger.removeClass( 'active' );
	};

	this.clear = function() {
		this.el.$content.html('');
	};

	this.init = function() {
		this.render();

		this.el.$btnClose.on( 'click', this.hide.bind(this) );
		this.el.$btnClear.on( 'click', this.clear.bind(this) );
	};
});