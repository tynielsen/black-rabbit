//randomize slides in carousel
(function($) {

  $.fn.randomize = function(childElem, cb) {
    return this.each(function() {
        var $this = $(this);
        var elems = $this.children(childElem);

        // sorting twice for better randomization
        elems.sort(function() { return (Math.round(Math.random())-0.5); });
        elems.sort(function() { return (Math.round(Math.random())-0.5); });

        $this.remove(childElem);  

        for(var i=0; i < elems.length; i++)
          $this.append(elems[i]);

        setTimeout(cb, 250);
    });    
  }
})(jQuery);


$(function() {
//image carousel
  $('.image-carousel ul').randomize('li', function(){$('.image-carousel ul').css('visibility', 'visible');} );

  // click event for hotspots
  $('.hotspot').click(function() {
    if($(this).hasClass('open')) {
      $(this).prev('.hotspot-content').hide();
      $(this).removeClass('open');
    } else {
      $('.hotspot-content').hide();
      $('.hotspot').removeClass('open');
      $(this).prev('.hotspot-content').stop(true, true).fadeIn(100);
      $(this).toggleClass('open');
    }
  });
  $('.image-carousel ul li img, .btn-carousel-prev, .btn-carousel-next').click(function() {
    $('.hotspot-content').hide();
    $('.hotspot').removeClass('open');
  });

  // setting width of image carousel to width dynamically
  $('.image-carousel, .image-carousel ul li > img, .image-carousel ul li').width($(window).width());
  $(window).resize(function() {
   $('.image-carousel, .image-carousel ul li > img, .image-carousel ul li').width($(window).width());
    $('.image-carousel ul').width(items * $(".image-carousel ul li").outerWidth() + 'px');
    $(".image-carousel ul li > img").width($(window).width());
  });

  // show/hide next and previous buttons for image carousel - fade
  $('.image-carousel').mouseenter(function() {
    $(this).children('.carousel-button-container').children('.btn-carousel-prev, .btn-carousel-next').stop(true, true).fadeIn(140);
    $(this).find('.hotspot').css('display', 'block');
    clearInterval(intervalHandle);
  });
  $('.image-carousel').mouseleave(function() {
    $(this).children('.carousel-button-container').children('.btn-carousel-prev, .btn-carousel-next').stop(true, true).fadeOut(140);
    $(this).find('.hotspot, .hotspot-content').css('display', 'none').removeClass('open');
  });

  // auto scroll for the homepage image carousel
  var items = $(".image-carousel ul li").length;
  var ulWidth = items * $(".image-carousel ul li").outerWidth() + 'px';

  var carouselOffset = ((1500 - $(window).width()) / 2) / 2;
  if($(window).width() < 1100 && carouselOffset < 110) {
    carouselOffset = ((1500 - $(window).width()) / 2) / 2 - 40;
  } else if($(window).width() < 1141 && carouselOffset < 110) {
      carouselOffset = 20;
  } else if($(window).width() < 1051 && carouselOffset > 109) {
    carouselOffset = 110;
  } else {
    carouselOffset = 0;
  }

  $('.image-carousel ul').css('margin-left', -carouselOffset);
  $(window).resize(function() {
    if($(window).width() < 1100 && carouselOffset < 110) {
      carouselOffset = ((1500 - $(window).width()) / 2) / 2 - 40;
    } else if($(window).width() < 1141 && carouselOffset < 110) {
        carouselOffset = 20;
    } else if($(window).width() < 1051 && carouselOffset > 109) {
      carouselOffset = 110;
    } else {
      carouselOffset = 0;
    }

    $('.image-carousel ul').css('margin-left', -carouselOffset);
  });

  // only run auto scrolling if there's more than one image
  if(items > 1) {
    // automatically scroll
    var startInterval = function() {
    var items = [];
    var currentItem = 0;

    return setInterval(function() {
      $(".image-carousel ul").next();
      $(".image-carousel ul").stop(true, true);
      var li = $(".image-carousel ul li:first");
      var scrollWidth = li.outerWidth(true);
      $(".image-carousel ul").animate({
        marginLeft: -scrollWidth - carouselOffset
      }, 400, 'swing', function() {
          $(".image-carousel ul").append(li);
          $(".image-carousel ul").css("marginLeft", -carouselOffset);
        });

        currentItem++;
        if(currentItem >= items.length) {
          currentItem = 0;
        }
      }, 8000);

    };
    var intervalHandle = startInterval();

    // stopping auto scroll when image carousel is hovered over / interacted with
    $('.image-carousel').hover(
      function() {
        clearInterval(intervalHandle);
        intervalHandle = null;
      },
      function() {
        if(!intervalHandle) 
          intervalHandle = startInterval();
      }
    );
    $('.hotspot, .btn-carousel-prev, .btn-carousel-next, .hotspot-content').hover(function() {
      clearInterval(intervalHandle);
      intervalHandle = null;
    });

    // carousel scroll buttons
    $(".btn-carousel-prev").click(function() {
      $(".image-carousel ul").prev();
      $(".image-carousel ul").stop(true,true);
      var li = $(".image-carousel ul li:last");
      var scrollWidth = li.outerWidth(true);
      $(".image-carousel ul").prepend(li);
      $(".image-carousel ul").css("marginLeft", -scrollWidth - carouselOffset + "px");
      $(".image-carousel ul").animate({
        marginLeft: -carouselOffset
      }, 400, 'swing', function() {
      });
      clearInterval(intervalHandle);
    });

    $(".btn-carousel-next").click(function() {
      $(".image-carousel ul").next();
      $(".image-carousel ul").stop(true,true);
      var li = $(".image-carousel ul li:first");
      var scrollWidth = li.outerWidth(true);
      $(".image-carousel ul").animate({
        marginLeft: -scrollWidth - carouselOffset
      }, 400, 'swing', function() {
         $(".image-carousel ul").append(li);
         $(".image-carousel ul").css("marginLeft", -carouselOffset);
      });
      clearInterval(intervalHandle);
    });
  }
});
