// function to rotate items
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

function noBorder() {
  $('.pusher').removeClass('white-border-left');
}

// when menu button is clicked on:
$(function() {
    var state = true;
    $( "#sidebar-button" ).on('click', function() {
      $('.sidebar').show(); // show sidebar
      $(this).animateRotate(90, { // rotate menu button
        duration: 500,
        easing: 'linear',
        complete: function() {},
        step: function () {}
      });
      if ( state ) {
        $('.pusher').addClass('white-border-left');
        $('.right-side-column').hide('fade', 300);
        $('.pusher').animate({left: '150px'}, 500);
      } else {
        $( '.pusher').animate({left: '0px'}, 500, 'swing', noBorder);
        $( '.right-side-column').show('fade', 700);
      }
      state = !state;
    });
  });
