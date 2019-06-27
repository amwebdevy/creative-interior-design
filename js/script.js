$(document).ready(function () {

  //Mobile Menu 
  $(".btn-toggle").on("click", function(){
    $("body").css({"overflow": "hidden"});
    $(".nav-overlay").css({"display": "block", "opacity": "1" });
    $(".cid-sidebar-left").addClass("open");
  });
  
  function closeMenu() {
    $(".nav-overlay").css({"display": "none", "opacity": "0" });
    $(".cid-sidebar-left").removeClass("open");
  }
  
  $('.nav-overlay').click( function(e) {
    $("body").removeAttr("style");
    closeMenu();
  });

  $(".btn-toggle").click( function(e) {
      e.stopPropagation(); 
  });
  
  //Scrolling
  ;(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    
    throttle ("scroll", "optimizedScroll");
  })();

  window.addEventListener("optimizedScroll", function() {
    /* Nav Location */
    $('section').each(function() {
      
      if ( $(this).offset().top < window.pageYOffset + 30 && $(this).offset().top + $(this).height() > window.pageYOffset + 30) {
        var data = $(this).data('id');
        
        $('.cid-navigation ul li a').each( function() {
          var href = $(this).attr('href');
          
          if ( data == href ) {
            $(this).addClass('nav-active');
          } else {
            $(this).removeClass('nav-active');
          }
        });
      }
    });
    
    /* For Small */
    if ($(this).scrollTop() >= 50) {       
        $('#return-to-top').fadeIn(200);   
    } else {
        $('#return-to-top').fadeOut(200);   
    }
    
  });
  
  //On Page Scroll
  $("#return-to-top, #to-home, #return-to-home").on("click", function() {
    $('html,body').animate({scrollTop:0},800);
    
    if( $(".cid-sidebar-left").hasClass("open") ) {
      $("body").removeAttr("style");
      closeMenu();
    }
  });
  
  $('#to-about, #arrow-to-below').on('click', function() {
    $('html,body').animate({scrollTop: $("section.cid-about").offset().top},600);
    
    if( $(".cid-sidebar-left").hasClass("open") ) {
      $("body").removeAttr("style");
      closeMenu();
    }
  });
  
  $('#to-work, #to-below').on('click', function() {
    $('html,body').animate({scrollTop: $("section.cid-work").offset().top},600);
    
    if( $(".cid-sidebar-left").hasClass("open") ) {
      $("body").removeAttr("style");
      closeMenu();
    }
  });
  
  $('.book-appointment').on('click', function(e) {
    e.stopPropagation();
    $('html,body').animate({scrollTop: $("section.cid-contact").offset().top},600);
    
    if( $(".cid-sidebar-left").hasClass("open") ) {
      $("body").removeAttr("style");
      closeMenu();
    }
  });
  
  $('#to-contact').on('click', function() {
    $('html,body').animate({scrollTop: $("section.cid-contact").offset().top},600);
    
    if( $(".cid-sidebar-left").hasClass("open") ) {
      $("body").removeAttr("style");
      closeMenu();
    }
  });
  
  //Services Grid
  if( $(this).width() > 900 ) {
    $('.reveal-content').on('click', function(e) {
      e.stopPropagation();
      if($(window).width() >= 901){
        $('html,body').animate({scrollTop: $("#services").offset().top},600);
      }  
      /* Allow one .show at a time */
      if($('.services-grid div').hasClass('show')) {
        return false;
      } else {
        $(this).addClass('show');
      }
      /* Hide grid items on .show */
      if ($(this).hasClass('show')) {
        $('.services-grid > div:not(.show)').addClass('hide');
        $(this).children('div').removeClass('hidden').addClass('revealed');
      }
    });
    $('.close').on('click', function(e) {
      e.stopPropagation();
      $(this).closest('div.reveal-content').removeClass('show');
      $('.services-grid  > div').removeClass('hide');
      $(this).parent().removeClass('revealed').addClass('hidden');
    });
  } else {
    /* On resize from small */
    $(window).resize(function() {
      if( $(this).width() > 900 ) {
        $('.reveal-content').on('click', function(e) {
          e.stopPropagation();
          if($(window).width() >= 901){
            $('html,body').animate({scrollTop: $("#services").offset().top},600);
          } 
          /* Allow one .show at a time */
          if($('.services-grid div').hasClass('show')) {
            return false;
          } else {
            $(this).addClass('show');
          }
          /* Hide grid items on .show */
          if ($(this).hasClass('show')) {
            $('.services-grid > div:not(.show)').addClass('hide');
            $(this).children('div').removeClass('hidden').addClass('revealed');
          }
        });
        $('.close').on('click', function(e) {
          e.stopPropagation();
          $(this).closest('div.reveal-content').removeClass('show');
          $('.services-grid  > div').removeClass('hide');
          $(this).parent().removeClass('revealed').addClass('hidden');
        });
      } 
    });
  }

  //AJAX 
  $('#cidContactForm').submit(function(event) {
    event.preventDefault();
    var name = $("#mail-name").val();
    var email = $("#mail-email").val();
    var message = $("#mail-message").val();
    var submit = $("#mail-submit").val();
    
    $("#form-message").load("includes/contact.php", {
      name: name,
      email: email,
      message: message,
      submit: submit
    });
  });
});