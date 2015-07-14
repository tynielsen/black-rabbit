$(function() {

  var sidebar_pos           = $('.main-content').offset().top
      , w_pos                    = $(window).scrollTop()
      , animation_speed   = 1 // In Seconds
      ;

  // if ( w_pos >= sidebar_pos ) {
  //   $('.sidebar').addClass('fixed');
  // } else {
  //   $('.sidebar').removeClass('fixed');
  // }

  // $(window).on('scroll', function() {
    
  //   var sidebar_pos = $('.main-content').offset().top
  //       , w_pos          = $(window).scrollTop()
  //       ;

  //   if ( w_pos >= sidebar_pos ) {
  //     $('.sidebar').addClass('fixed');
  //   } else {
  //     $('.sidebar').removeClass('fixed');
  //   }
  // });


  // Click Event for all Nav Links
  $('.nav li a').click(function(e) {
    e.preventDefault();

    var target_el = $(this).attr('href')
        , el_offset  = $(target_el).offset()
        ;

    // Animate scroll event to related section
    $('body, html').animate({
      scrollTop: el_offset.top - 245 + 'px'
    }, animation_speed * 1000);

    // $('.nav-link a').removeClass('current');
    // $(this).addClass('current');
  });

  $(window).on('scroll', function() {
    var work_pos     = $('#work').offset().top
        , about_pos   = $('#about').offset().top
        , contact_pos = $('#contact').offset().top
        , w_pos          = $(window).scrollTop() + 450
        ;

    if(w_pos >= contact_pos) {
      $('.nav-link a').removeClass('current');
      $('.nav-3 a').addClass('current');
    } else if (w_pos >= work_pos) {
      $('.nav-link a').removeClass('current');
      $('.nav-2 a').addClass('current');
    } else {
      $('.nav-link a').removeClass('current');
      $('.nav-1 a').addClass('current');
    }

  });


});

