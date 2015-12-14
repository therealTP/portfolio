$(document).ready(function() {

  //---FUNCTIONS---//
  // set initial heights
  function setInitialHeights() {
    // get initial window height
    var initWinHeight = $(window).height();
    console.log(initWinHeight);

    // set element heights accordingly
    $('.sidebar, .side-column, .center-content-section').height(initWinHeight);
    $('.sidebar-link').height(initWinHeight * 0.2);
    $('.home-menu-link, .menu-social').height(initWinHeight * 0.1);
  }

  // call immediately
  setInitialHeights();

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

  // CLOSURES //
  function toggleNameHeadingClosure() {
    var hidden = false;
    return function() {
      // $('.name-link').toggleClass('hidden');
      if (hidden === false) {
        $('.name-link').animate({opacity: 0}, 100);
      } else {
        $('.name-link').animate({opacity: 1}, 400);
      }
      hidden = !hidden; // switch hidden status
    };
  }

  var toggleNameHeader = toggleNameHeadingClosure();

  // reusable scroll animation function

  function toggleMenuClosure() {
    var menuHidden = true; // hidden by default
    return function() {
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
      menuHidden = !menuHidden; // swich menuhidden status
    };
  }
  var toggleMenu = toggleMenuClosure();

  // closure to store current page location
  function currentLocationClosure() {
    var currentLocation = '#home'; //default location is home
    return function(newLocation) {
      if (newLocation) { // if newlocation arg passed in
        currentLocation = newLocation; // set curr location to new location
        // clear highlight color from all menu buttons
        // add highlight class to current location menu button
      }
      return currentLocation; // return currlocation;
    };
  }

  // call this function to get current page location, or change/get new location
  var currentLocation = currentLocationClosure();

  function activateMenuLink(menuLinkId) {
    $('.menu-link, .home-menu-link').removeClass('active-section');
    $(menuLinkId).addClass('active-section');
  }

  // element to get scroll location of section (target heading)
  function getScrollLoc(elemSelect) {
    var scrollLoc = $(elemSelect).offset().top - 25;
    return scrollLoc;
  }

  // event listener for whenever a scroll occurs, to activate menu item based on position
  $(window).on('scroll', function() {
    // get current location
    var currLoc = $(document).scrollTop();
    // get location of each element (target the header)
    var bioLoc = getScrollLoc('#bio');
    var skilLoc = getScrollLoc('#skills');
    var projLoc = getScrollLoc('#projects');
    var contLoc = getScrollLoc('#contact');

    // console.log(currLoc, bioLoc, skillsLoc, projLoc, contLoc);
    if (currLoc < bioLoc) {
      activateMenuLink('#home-menu-link');
    } else if (currLoc > bioLoc && currLoc < skilLoc) {
      activateMenuLink('#bio-menu-link');
    } else if (currLoc > skilLoc && currLoc < projLoc) {
      activateMenuLink('#skills-menu-link');
    } else if (currLoc > projLoc && currLoc < contLoc) {
      activateMenuLink('#projects-menu-link');
    } else if (currLoc > contLoc) {
      activateMenuLink('#contact-menu-link');
    }
  });



  // when main menu button is clicked on:
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

    var target = currentLocation(this.hash); // retreive location of section target & update currentLocation closure var
    var $target = $(target);
    var topOfElem = $target.offset().top;  // get position of target relative to window

    //use scroll top animation to scroll to element at position, close menu after
    $('body').animate({'scrollTop': topOfElem}, {duration: 900, start: toggleNameHeader, complete: toggleMenu, always: toggleNameHeader});

  });

  // when down button is clicked on, move to next section
  $('.down-button a').on('click', function(e) {
    e.preventDefault(); // prevent default link behavior
    // determine next section & location
    var position = $(this).closest('.center-content-section').next().offset().top;
    console.log(position);
    toggleNameHeader();
    // scroll to the next section

    $('body').animate({'scrollTop': position}, 900, 'swing', toggleNameHeader);
  });

  $('.up-button a').on('click', function(e) {
    e.preventDefault();
    toggleNameHeader(); // remove name headers for scroll up
    $('body').animate({'scrollTop': 0}, 1200, 'swing', toggleNameHeader);
 // add name headers after scroll complete
  });

  $('.home-menu-link').on('click', function(e) {
    e.preventDefault();
    $('body').animate({'scrollTop': 0}, 1200, 'swing', toggleMenu);
  });

}); // document.ready
