(function($) {
  var paddingTop = 74;
  var stopScrollFromTop = 160;
  var scrollSpeed = 750;
  var bodyClassName = 'stuck';
  var minorOffset = 20;

  //our-history is so different, this is a necessary evil - reassigning stopScrollFromTop
  if($('body').hasClass('our-history')) {
    var stopScrollFromTop = 230;
    var minorOffset = 100;
  }

  $.fn.magellan = function (elem) {
    return this.each(function() {
      var $this = $(this);

      //magellan navbar, stick to header
      if($(window).width() >= 767) {
        $(window).scroll(function() {
          var pos = $this.offset().top - $(window).scrollTop();
          var contentPos = $('.scrollable-content').offset().top - $(window).scrollTop();
          if(pos <= paddingTop && contentPos <= stopScrollFromTop ) {
            $this.addClass(bodyClassName);
            $('body').addClass(bodyClassName);
          } else if(contentPos > stopScrollFromTop) {
            $this.removeClass(bodyClassName);
            $('body').removeClass(bodyClassName);
          }
        });
      }

      //smooth, animated scroll for magellan navbar
      $('.' + $this.attr('class') + ' li').click(function(e) {
        var that = $(this).find('a').attr('href');

        $('html, body').animate({
          'scrollTop': $(that).offset().top - stopScrollFromTop+ minorOffset + 'px'
        }, scrollSpeed);

        e.preventDefault();
      });
    });
  }
})(jQuery);

function isMobile() {
  var a = navigator.userAgent || navigator.vendor || window.opera;
  if ((/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|p      dxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))) {
    return true;
  }
  else if ($(window).width() < 767) {
    return true;
  }
  else {
    return false;
  }
}

// Gross, temp fix to reset all magellan links to inactive - mainly for our-history page
$(document).on('ready', function() {
  if($('.magellan-scrollbar ul li').hasClass('active')) {
    $('.magellan-scrollbar ul li').removeClass('active');  
  }

    //show stock ticker subnav for 8 seconds on page load.

  if ($('.footer-nav-8').length != 0) {
      setTimeout(function () {
          $('.footer-nav-8').removeClass('active');
      }, 8000);
  }
});

//custom select element
(function($){
  $.fn.extend({
    customSelect : function(options) {
      if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)) {
        return this.each(function() {
          var currentSelected = $(this).find(':selected');
          var selectBoxWidth = $(this).width()+43;
          $(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+currentSelected.text()+'</span></span>').css({width:selectBoxWidth, position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
          var selectBoxSpan = $(this).next();
          var selectBoxSpanInner = selectBoxSpan.find(':first-child');
          selectBoxSpan.css({display:'inline-block'});
          selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
          var selectBoxHeight = selectBoxSpan.height();
          $(this).height(selectBoxHeight).change(function() {
              selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
          });
       });
      }
    }
  });
})(jQuery);



$(function() {


  // this is the new piece required for the superbowl scoreboard
  $("#scrolling-banner").smoothDivScroll({ 
    autoScrollingMode: "always", 
    autoScrollingDirection: "endlessLoopRight", 
    autoScrollingStep: 1, 
    autoScrollingInterval: 25 
  });
  
  $("#scrolling-banner").bind("mouseover", function() {
    $(this).smoothDivScroll("stopAutoScrolling");
  }).bind("mouseout", function() {
    $(this).smoothDivScroll("startAutoScrolling");
  });


  // superbowl countedown counter
  var end = new Date(2014, 1, 2, 16, 30, 0, 0);

  $('.countdown').countdown({
    until: $.countdown.UTCDate(-7, end),
    layout: '<div class="days"><span>{d10}</span><span>{d1}</span></div> ' +
            '<div class="hours"><span>{h10}</span><span>{h1}</span></div> ' +
            '<div class="minutes"><span>{m10}</span><span>{m1}</span></div> ' +
            '<div class="seconds"><span>{s10}</span><span>{s1}</span></div>'
  });
  // end superbowl scoreboard updates


  // fix for overflow on fixed header and footer, creating horizontal scroll 
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_opera = navigator.userAgent.indexOf("Presto") > -1;
  if(is_firefox || is_opera || is_explorer) {
    mainContainer = $('html');
  } else {
    mainContainer = $('body');
  }
  
  $(window).scroll(function(e) {
    $('.header-content, .footer-content').css({
        left: -mainContainer[0].scrollLeft + 'px'
    });
  });

  //we're getting hacky up in here. trying to make article images resemble what they were designed to look like
  $('.article .main-content img').map(function() {
    var align = $(this).prop("align");
    
    if(align == "right") {
       $(this).addClass('right-aligned');
    } else if(align == "left") {
       $(this).addClass('left-aligned');
    } else {
      return;
    }
  });

  $('.magellan-scrollbar').scrollspy();
  $('.magellan-scrollbar').magellan();
  $('.custom-select').customSelect();

  // showing/hiding submenu
  $('.nav li').mouseenter(function() {
    $(this).children('.subnav').stop(true, true).fadeIn(100);
  });
  $('.nav li').mouseleave(function() {
    $(this).children('.subnav').stop(true, true).fadeOut(100);
  });

  // IE support for pseudo selectors
  //$('li:nth-child(odd)').each(function() {
  //  $(this).addClass('odd');
  //});
  //$('li:nth-child(even)').each(function() {
  //  $(this).addClass('even');
  //});
  $('li:first-child').each(function() {
    $(this).addClass('first-child');
  });
  $('li:last-child').each(function() {
    $(this).addClass('last-child');
  });
  $('.brand:last-child').each(function() {
    $(this).addClass('last-child');
  })
  
  $('input').change(function() {
    var that = $(this);
    var i = $(this).attr('checked');
    $('input[type="radio"]').removeClass('checked');
    if(i) {
      that.addClass('checked');
    } else {
      $('input').removeClass('checked');
    }
  });

  //Page Contact - display different contact info for each company 
  $('ul.subnav-contact-info').on('click', 'li a', swapInfo);
  updatePhoneNumbers();

  //Page Brands
  if ($('#brands-filter').length > 0){
      $('#brands-filter').on('click', 'div.column', brandFilter);
      $('#brands-filter div.column').hover(brandFilterMouseOver, brandFilterMouseOut);
      $('.brand').on('mouseenter', 'img.active', brandOverlayMouseOver);
      $('.brand').on('mouseleave', '.overlay', brandOverlayMouseOut);

      $('.main-nav-3 .subnav-links ul li a').on('click', brandFilterMegaNav);

      //Only show one of the text blocks on the brand page. defaults to "Top Global Brands"  
      var q = window.location.href;
      var query = q.split('#');
      $('#main-content .brand-section').css('display', 'none');
      $('#brands-filter div.column').removeClass('active-column');
      $('#brands-filter div.icon-box').removeClass('active-box inactive-box').addClass('inactive-box'); 

      if(typeof query[1] != 'undefined') {

          switch (query[1]) {
              case 'top-global':
                  $('.section-top-global-brands').css('display', 'block');
                  $('#top-global-brands').addClass('active-column');
                  $('#top-global-brands-box').removeClass('inactive-box').addClass('active-box');
                  $('.main-nav-3 li').removeClass('current-page-link');
                  $('.main-nav-3-1').addClass('current-page-link');
                  break;
 
              case 'good-for-you':
                  $('.section-good-for-you').css('display', 'block');
                  $('#good').addClass('active-column');
                  $('#good-box').removeClass('inactive-box').addClass('active-box');
                  $('.main-nav-3 li').removeClass('current-page-link');
                  $('.main-nav-3-2').addClass('current-page-link');
                  break;
 
              case 'better-for-you':
                  $('.section-better-for-you').css('display', 'block');
                  $('#better').addClass('active-column');
                  $('#better-box').removeClass('inactive-box').addClass('active-box');
                  $('.main-nav-3 li').removeClass('current-page-link');
                  $('.main-nav-3-4').addClass('current-page-link');
                  break;
 
              case 'fun-for-you':
                  $('.section-fun-for-you').css('display', 'block');
                  $('#fun').addClass('active-column');
                  $('#fun-box').removeClass('inactive-box').addClass('active-box');
                  $('.main-nav-3 li').removeClass('current-page-link');
                  $('.main-nav-3-3').addClass('current-page-link');
                  break;
          }
      } else {
          //no query string is set, so display the default
          $('.section-top-global-brands').css('display', 'block');
          $('#main-content .section-top-global-brands').css('display', 'block');
          $('#top-global-brands').addClass('active-column');
          $('#top-global-brands-box').removeClass('inactive-box').addClass('active-box');
          $('.main-nav-3 li').removeClass('current-page-link');
          $('.main-nav-3-1').addClass('current-page-link');
      }
  }
  
   //global sites interaction
    $(".btn-close-blue").on("click", function(){
      $(".accordion").hide();
    });

    $(".country-links li").on("click", function(){
      //hide all accordions if any are open
      $(".accordion").hide();
      //grab the list item's ID and add -content to access it's accordion
      var myLink = $(this).attr("id");
      var myContent = $('#' + myLink + "-content");
      //add some subtle animation to the accordion
      var t1 = new TimelineMax();
      //display accordion then animate it
      t1.to(myContent, 0, {display:"block"});
      t1.from(myContent, .75, {alpha:0, y:-20, ease:Power2.easeOut});
    });

    $(".btn-share").on("mouseenter", function(){
      //grab the list item's ID and add -content to access it's accordion
      var socialBar = $(".social-bar");
      //add some subtle animation to the accordion
      var t1 = new TimelineMax();
      //display accordion then animate it
      t1.to(socialBar, 0, {display:"block"});
      t1.to(socialBar, .75, {alpha:1, ease:Power2.easeOut});
      
      //nested function to remove event listener
      $('.social-bar').on("mouseleave", function(){        
        setTimeout(function() {
          var socialBar = $(".social-bar");
          var t1 = new TimelineMax();
          t1.to(socialBar, .50, {alpha:0, ease:Power2.easeOut});
          //turn off the .social-bar listener so it doesn't interfere with re-hovers
          $('.social-bar').off("mouseleave");
        }, 500);
      });

      //t1.from(myElement, .50, {alpha:0, y:-5, ease:Power2.easeOut});
    });

    //Page Leadership
    $("body.leadership .column").on("click", function(event){
      event.preventDefault();
      var leadershipBox = $("#leadership-box");
      var corporateBox = $("#corporate-box");

      //check to see if the button is already active
      if($(this).hasClass("active-column") || $(this).hasClass('starting-state')){

        $(this).removeClass('active-column');
        corporateBox.addClass('inactive-box');
        corporateBox.removeClass('active-box');
        leadershipBox.addClass('inactive-box');
        leadershipBox.removeClass('active-box');
        $(this).removeClass('starting-state');
        $(".executive-toggle").css('display','none');
        $(".leadership-toggle").css('display','none');


      //if it is not active check if it is leadership or officers
      }else{

          if($(this).attr("id") == "our-leadership"){        

            //swap classes
            $(this).addClass('active-column');
            $("#corporate-officers").removeClass('active-column');

            //swap images 
            leadershipBox.removeClass('inactive-box');
            corporateBox.addClass('inactive-box');

            //toggle overlay
            $(".leadership-only").css('display','none');
            $(".executive-only").css('display','block');

            
            $(".executive-only").on("click", function(event){
              event.preventDefault();
              event.stopPropagation();
            });

            $(".executive-only").on("mouseenter", function(event){
              event.preventDefault();
              event.stopPropagation();
            });

          }else{
             //swap classes
            $(this).addClass('active-column');
            $("#our-leadership").removeClass('active-column');
            $("#our-leadership").removeClass('starting-state');

            //swap images 
            leadershipBox.addClass('inactive-box');
            corporateBox.removeClass('inactive-box');

            //swap overlays
            $(".leadership-only").css('display','block');
            $(".executive-only").css('display','none');

            $(".leadership-only").on("click", function(event){
              event.preventDefault();
              event.stopPropagation();
            });

            $(".leadership-only").on("mouseenter", function(event){
              event.preventDefault();
              event.stopPropagation();
            });
          }

        }

    });

    //leadership roll over listeners
    $(".leadership-column").on("mouseenter", function(event){
      
      if( $(this).find(".name-box").hasClass("active-click")){
        //do nothing
      }else{
        //apply the active class to name-box
        $(this).find(".name-box").addClass("active");
        //remove active class when mouse is off
        $(this).on("mouseleave", function(event){
          $(this).find(".name-box").removeClass("active");
        });
      }
    });

    $(".leadership-column").on("click", function(){

      //clean up all .name-box elements
      $(".name-box").removeClass("active");
      $(".name-box").removeClass("active-click");

      //assign active-click class only
      $(this).find(".name-box").addClass("active-click");
      $('.leadership-column').off("mouseleave");
      
      //hide all accordions if any are open
      $(".accordion").hide();
      
      //grab the list item's ID and add -content to access it's accordion
      var myLink = $(this).attr("id");
      var myContent = $('#' + myLink + "-content");
      
      //add some subtle animation to the accordion
      var t1 = new TimelineMax();
      
      //display accordion then animate it
      t1.to(myContent, 0, {display:"block"});
      t1.from(myContent, .75, {alpha:0, y:-20, ease:Power2.easeOut, onComplete:openScrollBar});
        $('html, body').animate({
          'scrollTop': myContent.offset().top - 70
        }, 750);
	  
	  //also position scroll to the top of the content.

      //load after animation
      function openScrollBar(){        
        $(".text-box").mCustomScrollbar("destroy");
        $(".text-box").mCustomScrollbar({
          advanced:{
            updateOnContentResize: true
          }
        });
      }

    $(".leadership-close-btn").off().on("click", function(){
    var thisAccordion = $(".accordion");
    thisAccordion.hide();
    //This is used to push the leadership bios back up to their original line.
    $('html, body').animate({
        'scrollTop': $(this).offset().top - 450
      }, 750);
    });//end leadership-close-btn

    $(".leadership-close-btn-m").on("click", function(){
    var thisAccordion = $(".accordion");
    thisAccordion.hide();
    });//end leadership-close-btn

    });//end leadership on click event

    //Page Leadership-mobile
    $("body.leadership-m .column-m").on("click", function(event){
      event.preventDefault();
      var leadershipBox = $("#leadership-box");
      var corporateBox = $("#corporate-box");

      //check to see if the button is already active
      if($(this).hasClass("active-column") || $(this).hasClass('starting-state')){

        $(this).removeClass('active-column');
        corporateBox.addClass('inactive-box');
        corporateBox.removeClass('active-box');
        leadershipBox.addClass('inactive-box');
        leadershipBox.removeClass('active-box');
        $(this).removeClass('starting-state');
        $(".executive-toggle").css('display','none');
        $(".leadership-toggle").css('display','none');


      //if it is not active check if it is leadership or officers
      }else{

          if($(this).attr("id") == "our-leadership"){        

            //swap classes
            $(this).addClass('active-column');
            $("#corporate-officers").removeClass('active-column');

            //swap images 
            leadershipBox.removeClass('inactive-box');
            corporateBox.addClass('inactive-box');

            //toggle overlay
            $(".leadership-only").css('display','none');
            $(".executive-only").css('display','block');

            
            $(".executive-only").on("click", function(event){
              event.preventDefault();
              event.stopPropagation();
            });

            $(".executive-only").on("mouseenter", function(event){
              event.preventDefault();
              event.stopPropagation();
            });

          }else{
             //swap classes
            $(this).addClass('active-column');
            $("#our-leadership").removeClass('active-column');
            $("#our-leadership").removeClass('starting-state');

            //swap images 
            leadershipBox.addClass('inactive-box');
            corporateBox.removeClass('inactive-box');

            //swap overlays
            $(".leadership-only").css('display','block');
            $(".executive-only").css('display','none');

            $(".leadership-only").on("click", function(event){
              event.preventDefault();
              event.stopPropagation();
            });

            $(".leadership-only").on("mouseenter", function(event){
              event.preventDefault();
              event.stopPropagation();
            });
          }

        }

        });//end leadership-m on click event

    // repeat function because we need a few different values

    $(".military-column").on("mouseenter", function(event){
      
      if( $(this).find(".name-box").hasClass("active-click")){
        //do nothing
      }else{
        //apply the active class to name-box
        $(this).find(".name-box").addClass("active");
        //remove active class when mouse is off
        $(this).on("mouseleave", function(event){
          $(this).find(".name-box").removeClass("active");
        });
      }
    });

    $(".military-column").on("click", function(){

      //clean up all .name-box elements
      $(".name-box").removeClass("active");
      $(".name-box").removeClass("active-click");

      //assign active-click class only
      $(this).find(".name-box").addClass("active-click");
      $('.military-column').off("mouseleave");
      
      //hide all accordions if any are open
      $(".accordion").hide();
      
      //grab the list item's ID and add -content to access it's accordion
      var myLink = $(this).attr("id");
      var myContent = $('#' + myLink + "-content");
      
      //add some subtle animation to the accordion
      var t1 = new TimelineMax();
      
      //display accordion then animate it
      t1.to(myContent, 0, {display:"block"});
      t1.from(myContent, .75, {alpha:0, y:-20, ease:Power2.easeOut});
        $('html, body').animate({
          'scrollTop': myContent.offset().top - 120
        }, 750);

    });//end military on click event

    $(".military-close-btn").on("click", function(){
      $(".accordion").hide();
      $('html, body').animate({
        'scrollTop': $('.military-row').offset().top - 100
      }, 750);
    });//end military on click event

  // clearing and resetting placeholder text on focus rather than on type
  //$('.search-bar').focus(function() {
    ///if($(this).attr('placeholder') == 'search') {
      //$('.search-bar').attr('placeholder', '').val('');
    //}
  //});
  //$('.search-bar').blur(function() {
    //if($(this).val().trim().length === 0) {
      //$('.search-bar').val('').attr('placeholder', 'search');
    //}
  //});

  //simple show/hide for resource centers viewing options
  $('.refine-view-options h6').on('click', function() {
    var p = $(this).parents('.refine-view-options');
    p.toggleClass('open');
  });

  //Page Media - Calendar interaction
  if($('#to').length || $('#from').length) {
    if(jQuery().dateinput) {
      $('#to').dateinput({selectors: true, firstDay: 0});
      $('#from').dateinput({selectors:true, firstDay: 0});
    } 
  }

  // when first date input is changed
  if ($('#from').length > 0 && $('body.media #from').data('dateinput')) {
      $('#from').data('dateinput').change(function () {
          // we use it's value for the seconds input min option
          $('body.media #to').data('dateinput').setMin(this.getValue(), true);
      });
  }
});

function swapInfo(event) {
  event.preventDefault();
  
  $('.contact-info').hide();
  $('ul.subnav-contact-info li').removeClass('active');
  $(this).parent().addClass('active');

  switch($(this).html()){
    case 'PepsiCo Corporate':
      $('#info-pepsico-corporate').show();
      break;
    case 'Pepsi-Cola':
      $('#info-pepsi').show();
      break;
    case 'Frito-Lay':
     $('#info-frito-lay').show();
      break;
    case 'Quaker':
      $('#info-quaker').show();
      break;
    case 'Tropicana':
      $('#info-tropicana').show();
      break;
    case 'Gatorade':
      $('#info-gatorade').show();
      break;
    case 'Global':
      window.location.href = '/Home/GlobalSites';
      break;
  } 
}//end function swapInfo

$("#goback").click(function () {
    history.back();
    return false;
});

// expand-box function for investor pages

$("h4, .icon", $('.clickable')).click(function() {
  var row = $(this).parent();
  var icon = row.find('.icon-plus');
  if(icon.hasClass('icon-close')) {
    icon.removeClass('icon-close');
  }
  else {
    icon.addClass('icon-close');
  }
  row.find(".expand-box").fadeToggle(100);
});

//// people swapping function for people-of-pepsico

//var previous = "helen";
//$(".thumb").click(function(event){
//  var name = $(this).context.name;
//  var profile = $(".people").find("#" + name);
//  var job = profile.find(".job").text().toUpperCase();
//  $(document).find('.title').text(job);
//  $(document).find('.video-image').attr('src', 'img/people-' + name + '.jpg');

//  $('.quote').each(function() {
//    if   ($(this).hasClass(name)){ $(this).addClass('enabled'); }
//    else {$(this).removeClass('enabled');}
//  });

//  $(".people").find("#" + previous).removeClass("enabled");
//  profile.addClass("enabled");
//  previous = name;
//});

function brandFilter(event) {
  event.preventDefault();
  $('.row-one .brands-section').css('display', 'none');
  $('#brands-filter div.column').removeClass('active-column');
  $('#brands-filter div.icon-box').removeClass('active-box inactive-box').addClass('inactive-box');
  $('#main-content .brand-section').css('display', 'none');
 
  switch($(this).attr('id')) {
    case 'top-global-brands':
      $('.section-top-global-brands').css('display', 'block');
      $('#top-global-brands').addClass('active-column');
      $('#top-global-brands-box').removeClass('inactive-box').addClass('active-box');
      $('.main-nav-3 li').removeClass('current-page-link');
      $('.main-nav-3-1').addClass('current-page-link');
      break;
    case 'good':
      $('.section-good-for-you').css('display', 'block');
      $('#good').addClass('active-column');
      $('#good-box').removeClass('inactive-box').addClass('active-box');
      $('.main-nav-3 li').removeClass('current-page-link');
      $('.main-nav-3-2').addClass('current-page-link');
      break;
    case 'better':
      $('.section-better-for-you').css('display', 'block');
      $('#better').addClass('active-column');
      $('#better-box').removeClass('inactive-box').addClass('active-box');
      $('.main-nav-3 li').removeClass('current-page-link');
      $('.main-nav-3-4').addClass('current-page-link');
      break;
    case 'fun':
      $('.section-fun-for-you').css('display', 'block');
      $('#fun').addClass('active-column');
      $('#fun-box').removeClass('inactive-box').addClass('active-box');
      $('.main-nav-3 li').removeClass('current-page-link');
      $('.main-nav-3-3').addClass('current-page-link');
      break;
  }  
}//end function brandFilter

function brandFilterMegaNav(event) {
  event.preventDefault();
  $('#main-content .brand-section').css('display', 'none');
  $('#brands-filter div.column').removeClass('active-column');
  $('#brands-filter div.icon-box').removeClass('active-box inactive-box').addClass('inactive-box');

  //hide intro text
  $('.row-one .brands-section').hide();
  var query = $(this).attr('href').split('#');
  if(typeof query[1] != 'undefined') {

      switch (query[1]){
          case 'top-global':
              //show top global
              $('.section-top-global-brands').css('display', 'block');
              $('#top-global-brands').addClass('active-column');
              $('#top-global-brands-box').removeClass('inactive-box').addClass('active-box');
              $('.main-nav-3 li').removeClass('current-page-link');
              $('.main-nav-3-1').addClass('current-page-link');
              break;
    
          case 'good-for-you':
              $('.section-good-for-you').css('display', 'block');
              $('#good').addClass('active-column');
              $('#good-box').removeClass('inactive-box').addClass('active-box');
              $('.main-nav-3 li').removeClass('current-page-link');
              $('.main-nav-3-2').addClass('current-page-link');
              break;

          case 'better-for-you':
              $('.section-better-for-you').css('display', 'block');
              $('#better').addClass('active-column');
              $('#better-box').removeClass('inactive-box').addClass('active-box');
              $('.main-nav-3 li').removeClass('current-page-link');
              $('.main-nav-3-4').addClass('current-page-link');
              break;

          case 'fun-for-you':
              $('.section-fun-for-you').css('display', 'block');
              $('#fun').addClass('active-column');
              $('#fun-box').removeClass('inactive-box').addClass('active-box');
              $('.main-nav-3 li').removeClass('current-page-link');
              $('.main-nav-3-3').addClass('current-page-link');
              break;
      }
  }
}//end brandFilterMegaNav

function brandFilterMouseOver(event) {
  event.preventDefault();
  var $current = '#' + $(this).attr('id');
  $(this).addClass('hover-column');
  $($current+' div.icon-box').removeClass('inactive-box').addClass('hover-box');
}//end function brandFilterMouseOver

function brandFilterMouseOut(event) {
  var $current = '#' + $(this).attr('id');
  $(this).removeClass('hover-column');
  if($($current+' div.icon-box').hasClass('active-box')){
    $($current+' div.icon-box').removeClass('hover-box');
  }else {
    $($current+' div.icon-box').removeClass('hover-box').addClass('inactive-box');
  }
}//end function brandFilterMouseOut

function brandOverlayMouseOver (event) {
  if($(window).width() >= 768 && !isMobile()) {
    event.preventDefault();
    //hide the hovered brand, and display the overlay
    $(this).css('display', 'none');
    $(this).next('.overlay').css('display', 'block');
  }
  
}//end function brandOverlayMouseOver

function brandOverlayMouseOut (event) {
  if($(window).width() >= 768 && !isMobile()) {
    event.preventDefault();
    //hide the overlay, show the original brand
    $(this).css('display', 'none');
    $(this).prev('img.active').css('display', 'block');
  }
}//end function brandOverlayMouseOut

function updatePhoneNumbers(){
  (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

  if(!jQuery.browser.mobile) {
    $('a.phone').attr('href', '#');
    $('a.phone').css('cursor', 'default');
    $('a.phone').click(function(event){event.preventDefault();});
  }
}//end function updatePhoneNumbers

/* Mobile function for menus */
if($(window).width() <= 767) {
  // removing links to sections that have been removed for mobile
  $('.magellan-scrollbar ul li a[href="#rss-feeds"]').parents('li').hide();
  $('.magellan-scrollbar ul li a[href="#multimedia-downloads"]').parents('li').hide();
  $('.subnav-resource-center ul li a[href="/Media/Resource-Center#rss-feeds"]').parents('li').hide();
  $('.subnav-resource-center ul li a[href="/Media/Resource-Center#multimedia-downloads"]').parents('li').hide();

  $('.magellan-scrollbar').on("click", function(){
    if ($(this).hasClass('menu-open')) {
      $(this).removeClass('menu-open');
      $(this).find('.nav').fadeOut(200);
    } else {
      $(this).addClass('menu-open');
      $(this).find('.nav').fadeIn(200);
    }
  });
}

/* enable side menu on mobile devices. */

$(document).ready(function() {
  if($(window).width() < 767 || isMobile()) {
    $('#open-menu').sidr();
    //$('.nav').css('width', $(window).width());
    $('#sidr').css('width', 280 + 'px');
  }
  if($(window).width() < 575) {
    var menuWidth = $(window).width() - 55 ;
    $('.magellan-scrollbar').addClass('closed');
    $('#sidr').css('width', menuWidth + 'px');
    $('.sidr.left').css('left', -menuWidth + 'px');
  }
});

/* Mobile menu resizing function for all widths*/

$(window).resize(function () {
  if (window.location.pathname.toLowerCase().indexOf('login') >= 0)
    return;
  if($(window).width() < 768 || isMobile()) {
    //$('.nav').css('width', $(window).width());
    if($('.header').hasClass('open')) {
      $('.nav').css('width', $(window).width() -280);
      $('#sidr').css('width', 280 + 'px');
      $('#open-menu').css('left', 280);
    }
  }
  if($(window).width() < 575) {
    if($('.header').hasClass('open')) {
      var menuWidth = $(window).width() - 55 ;
      $('#sidr').css('width', menuWidth + 'px');
      var siderWidth = $('#sidr').width();
      $('#open-menu').css('left', siderWidth);
    }
  }
  /*if (isMobile() && !wasMobile()) {
      location.reload(true);
  }
  else if (!isMobile() && wasMobile()) {
      location.reload(true);
  }*/
});

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function wasMobile() {
    var isMobile = readCookie('isMobileDevice');
    if (isMobile && isMobile == 'true') {
        return true;
    }
    else {
        return false;
    }
}
    
var wasMobileSave = wasMobile();

/* Mobile side menu pop in settings to keep everything where it should be */

$('#open-menu').on('click', function(){
  var menuWidth = $(window).width() - 55 ;
  if($('.header').hasClass('open')){
    $('.nav').animate({width : $(window).width()});
    $('.header').removeClass('open');
    $('#open-menu').animate({left : '0'}, 400);
    $('.logo').animate({'padding-left' : 75 + 'px'}, 400);
  } else {
    //$('.nav').animate({width : $(window).width() -280});
    if( $(window).width() < 575) {
      $('.header').addClass('open');
      $('#sidr').css('width', menuWidth + 'px');
      $('.sidr.left').css('left', -menuWidth + 'px');
      $('#open-menu').animate({left : menuWidth + 'px'}, 400);
    } else {
      $('#sidr').css('width', 280 + 'px');
      $('.logo').animate({'padding-left' : 355 + 'px'}, 400);
      $('.sidr.left').css('left', -280 + 'px');
      $('.header').addClass('open');
      $('#open-menu').animate({left : 280 + 'px'}, 400);
    }
  }
});

$('.expand, .menu-arrow, .menu-arrow-side').on('click', function(){
  var next = $(this).parent().find('ul').first();
  var button = $(this).parent().find('i').first();
  if(next.hasClass('menu-open')) {
    button.removeClass('menu-arrow');
    button.addClass('menu-arrow-side');
    next.slideUp(200);
    next.removeClass('menu-open');
    return false;
  } else {
    button.removeClass('menu-arrow-side');
    button.addClass('menu-arrow');
    next.slideDown(200);
    next.addClass('menu-open');
    return false;
  }
});

/* Mobile Scroll to top button */

$('.back-to-top').off().on('click', function (){
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

/* Andriod 2.3 and below scroll enabler. */

/* Check if Andriod 2.3 or lower and change side menu and select options scroll behavior */
$(document).ready(function() {
  var ua = navigator.userAgent;
  if( ua.indexOf("Android") >= 0 ) {
    var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
    if (androidversion <= 2.3) {
      touchScroll('sidr', 'id');
      if($('.options').length){
        touchScroll('options', 'class');
      }
    }
  }
});

function isTouchDevice(){
  try{
    document.createEvent("TouchEvent");
    return true;
  }catch(e){
    return false;
  }
}

/* Helper function for older android phones for scrolling */
function touchScroll(element, type){

  if(isTouchDevice()){ //if touch events exist...
    if(type == 'id') {
      var el=document.getElementById(element);
    } else {
      var object=document.getElementsByClassName(element);
      var el=object[0];
    }
    var scrollStartPos=0;
    el.addEventListener("touchstart", function(event) {
      scrollStartPos=this.scrollTop+event.touches[0].pageY;
    },false);
 
    el.addEventListener("touchmove", function(event) {
      this.scrollTop=scrollStartPos-event.touches[0].pageY;
      event.preventDefault();
    },false);
  }
}
