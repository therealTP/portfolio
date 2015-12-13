$(document).ready(function() {

  //---FUNCTIONS---//
  // set sidebar height to initial viewport height
  var initWinHeight = $(window).height;

  $('.sidebar').height(initWinHeight);
  $('.sidebar-link').height(initWinHeight * 0.2);
  $('.home-menu-link, .menu-social').height(initWinHeight * 0.1);
  // func to rotate items, added to jquery obj (borrowed)
  $.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
      args.complete = $.proxy(args.complete, e);
      args.step = function(now) {
        $.style(e, 'transform', 'rotate(' + now + 'deg)');
        if (step) return step.apply(e, arguments);
      };

      $({deg: 0}).animate({deg: angle}, args);
    });
  };

  function toggleBorder() {
    $(this).toggleClass('white-border-left');
  }

  // reusable scroll animation function

  function toggleMenu() {
    if (menuHidden) { // if menu is hidden
      $('.right-side-column').hide('fade', 300); // hide social
      $('.pusher').animate({left: '125px'}, {duration: 500, start: toggleBorder});
      $('.sidebar').animate({left: '0px'}, 500, 'swing'); // add left border and move right
      $('.down-button').animate({left: '60%'}, 500);
    } else { // if menu is not hidden
      $( '.pusher').animate({left: '0px'}, 500, 'swing', toggleBorder);
      $('.sidebar').animate({left: '-125px'}, 500, 'swing');
      $( '.right-side-column').show('fade', 700);
      $('.down-button').animate({left: '47.75%'}, 500);
    }
    menuHidden = !menuHidden;
  }

  // when main menu button is clicked on:
  var menuHidden = true; // default, menu hidden
  var hoverColor = 'green';
  $( ".menu-button" ).on({
    click: function() {
      $('.sidebar').show(); // show sidebar
      $(this).animateRotate(90, { // rotate menu button
        duration: 500,
        easing: 'linear',
        complete: function() {},
        step: function () {}
      });
      toggleMenu();
    },
    mouseenter: function() {
      $(this).find('.menu-button-box').css('background-color', hoverColor);
    },
    mouseleave: function() {
      $(this).find('.menu-button-box').removeAttr('style'); // update state of menu
    }
  });

  // when menu item is clicked on, animate scroll to that section
  $('.menu-link').on('click', function(e) {
    e.preventDefault(); // prevent default action from event

    var target = this.hash; // retreive location of section target
    var $target = $(target);
    var topOfElem = $target.offset().top;  // get position of target relative to window

    //use scroll top animation to scroll to element at position, close menu after
    $('body').animate({'scrollTop': topOfElem}, 900, 'swing',     toggleMenu);

  });

  // when down button is clicked on, move to next section
  $('.down-button a').on('click', function(e) {
    e.preventDefault(); // prevent default link behavior
    // determine next section & location
    var position = $(this).closest('.center-content-section').next().offset().top;
    console.log(position);
    // scroll to the next section

    $('body').animate({'scrollTop': position}, 900, 'swing');
  });

  $('.up-button a').on('click', function(e) {
    e.preventDefault();
    $('body').animate({'scrollTop': 0}, 1200, 'swing');
  });

  $('.home-menu-link').on('click', function(e) {
    e.preventDefault();
    $('body').animate({'scrollTop': 0}, 1200, 'swing', toggleMenu);
  });

}); // document.ready
