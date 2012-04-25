$(function() {

	// Reposition the background image on resize
	$(window).on('resize', function() {
		var winWidth = $(window).width();
		if(winWidth < 1024) {
			$('body, header').addClass('fixed');
		} else {
			$('body, header').removeClass('fixed');
		}
	});

	// nav buttons positioning and animation
	$('.nav-1 a').click(function(e) {
		e.preventDefault();
		var pos = $('#about').position();
		$('body').animate({
			scrollTop: pos.top - 350
		}, 'slow');
	});
	$('.nav-2 a').click(function(e) {
		e.preventDefault();
		var pos = $('#work').position();
		$('body').animate({
			scrollTop: pos.top - 350
		}, 'slow');
	});
	$('.nav-3 a').click(function(e) {
		e.preventDefault();
		var pos = $('#contact').position();
		$('body').animate({
			scrollTop: pos.top - 350
		}, 'slow');
	});

	var column2pos = $('.column-2').position();
	$('.column-2').css('background-position', column2pos.left + 'px 250px');
	
	$(window).resize(function() {
		var column2pos = $('.column-2').position();
		$('.column-2').css('background-position', column2pos.left + 'px 250px');
	});

	$.scrollingParallax('img/stars-2.png', 'parallax', {
				bgHeight: '100%',
				bgWidth: '100%',
				staticSpeed: .10,
				staticScrollLimit: false,
				loopIt: false,
			});
	
/*
	$.scrollingParallax('img/parallax-1.png', 'parallax-1 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: .16,
				staticScrollLimit: false,
				loopIt: false,
			});
	$.scrollingParallax('img/parallax-2.png', 'parallax-2 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: -.12,
				staticScrollLimit: false,
				loopIt: false,
			});
	$.scrollingParallax('img/parallax-3.png', 'parallax-3 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: .14,
				staticScrollLimit: false,
				loopIt: false,
			});
	$.scrollingParallax('img/parallax-4.png', 'parallax-4 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: -.16,
				staticScrollLimit: false,
				loopIt: false,
			});
	$.scrollingParallax('img/parallax-5.png', 'parallax-5 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: .12,
				staticScrollLimit: false,
				loopIt: false,
			});
	$.scrollingParallax('img/parallax-6.png', 'parallax-6 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: -.14,
				staticScrollLimit: false,
				loopIt: false,
			});
	$.scrollingParallax('img/parallax-7.png', 'parallax-7 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: .16,
				staticScrollLimit: false,
				loopIt: false,
			});
	$.scrollingParallax('img/parallax-8.png', 'parallax-8 parallax', {
				bgHeight: '681px',
				bgWidth: '980px',
				staticSpeed: -.18,
				staticScrollLimit: false,
				loopIt: false,
			});

	var column2pos = $('.column-2').position();
	$('.parallax').css('left', column2pos.left - 124);
	
	$(window).resize(function() {
		var column2pos = $('.column-2').position();
		$('.parallax').css('left', column2pos.left - 124);
	});
*/

});