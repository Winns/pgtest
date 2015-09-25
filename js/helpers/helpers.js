function wDefArg(x, def) {
	if (x === undefined) { return def; } 
	return x;
}

$(function switcher() {
	$( document ).on( 'click', '.js-switcher', function() {
		var $target = $( $( this ).attr( 'data-switcher-target' ) );

		if ($( this ).hasClass( 'active' )) {
			$target.removeClass( 'active' );
			$( this ).removeClass( 'active' );
		} else {
			$target.addClass( 'active' );
			$( this ).addClass( 'active' );
		}
	});
});