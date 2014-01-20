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
  $('.image-carousel-m ul').randomize('li', function(){$('.image-carousel-m ul').css('visibility', 'visible');} );

  // setting width of image carousel to width dynamically
  $('.image-carousel-m, .image-carousel-m ul li > img, .image-carousel-m ul li').width($(window).width());
  $(window).resize(function() {
   $('.image-carousel-m, .image-carousel-m ul li > img, .image-carousel-m ul li').width($(window).width());
    $('.image-carousel-m ul').width(items * $(".image-carousel-m ul li").outerWidth() + 'px');
    $(".image-carousel-m ul li > img").width($(window).width());
  });

  // auto scroll for the homepage image carousel
  var items = $(".image-carousel-m ul li").length;
  var ulWidth = items * $(".image-carousel-m ul li").outerWidth() + 'px';
  var carouselOffset = 0;
  
  // only run auto scrolling if there's more than one image
  if(items > 1) {
    // automatically scroll
    var startInterval = function() {
    var items = [];
    var currentItem = 0;

    return setInterval(function() {
      console.log('start interval');
      $(".image-carousel-m ul").next();
      $(".image-carousel-m ul").stop(true, true);
      var li = $(".image-carousel-m ul li:first");
      var scrollWidth = li.outerWidth(true);
      $(".image-carousel-m ul").animate({
        marginLeft: -scrollWidth - carouselOffset
      }, 400, 'swing', function() {
          $(".image-carousel-m ul").append(li);
          $(".image-carousel-m ul").css("marginLeft", -carouselOffset);
        });

        currentItem++;
        if(currentItem >= items.length) {
          currentItem = 0;
        }
      }, 8000);

    };
    var intervalHandle = startInterval();
  }

  // carousel scroll buttons
  $(".image-carousel-m").on("swiperight", function() {
    $(".image-carousel-m ul").prev();
    $(".image-carousel-m ul").stop(true,true);
    var li = $(".image-carousel-m ul li:last");
    var scrollWidth = li.outerWidth(true);
    $(".image-carousel-m ul").prepend(li);
    $(".image-carousel-m ul").css("marginLeft", -scrollWidth - carouselOffset + "px");
    $(".image-carousel-m ul").animate({
      marginLeft: -carouselOffset
    }, 400, 'swing', function() {
    });
    clearInterval(intervalHandle);
    intervalHandle = null;

    if(!intervalHandle) 
          intervalHandle = startInterval();
  });

  $(".image-carousel-m").on("swipeleft" , function() {
    $(".image-carousel-m ul").next();
    $(".image-carousel-m ul").stop(true,true);
    var li = $(".image-carousel-m ul li:first");
    var scrollWidth = li.outerWidth(true);
    $(".image-carousel-m ul").animate({
      marginLeft: -scrollWidth - carouselOffset
    }, 400, 'swing', function() {
       $(".image-carousel-m ul").append(li);
       $(".image-carousel-m ul").css("marginLeft", -carouselOffset);
    });
    clearInterval(intervalHandle);
    intervalHandle = null;

    if(!intervalHandle) 
          intervalHandle = startInterval();
  });

});