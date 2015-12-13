$(document).ready(function() {

  //---FUNCTIONS---//

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

  // when main menu button is clicked on:
  var menuHidden = true; // default, menu hidden
  $( "#sidebar-button" ).on('click', function() {
    $('.sidebar').show(); // show sidebar
    $(this).animateRotate(90, { // rotate menu button
      duration: 500,
      easing: 'linear',
      complete: function() {},
      step: function () {}
    });
    if (menuHidden) { // if menu is hidden
      $('.right-side-column').hide('fade', 300); // hide social
      $('.pusher').animate({left: '150px'}, {duration: 500, start: toggleBorder}); // add left border and move right
      $('.down-button').animate({left: '60%'}, 500);
    } else { // if menu is not hidden
      $( '.pusher').animate({left: '0px'}, 500, 'swing', toggleBorder);
      $( '.right-side-column').show('fade', 700);
      $('.down-button').animate({left: '47.75%'}, 500);
    }
    menuHidden = !menuHidden; // update state of menu
  });

  // when menu item is clicked on, animate scroll to that section
  $('.menu-link').on('click', function(e) {
    e.preventDefault(); // prevent default action from event


    var target = this.hash; // retreive location of section target
    var $target = $(target);
    var topOfElem = $target.offset().top;  // get position of section relative to window

    //use scroll top animation to scroll to element
    $('body').animate({
      'scrollTop': topOfElem
    }, 900, 'swing'); //, function() {window.location.hash = target;});
  });

}); // document.ready
