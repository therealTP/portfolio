$(document).ready(function(){

  function nextSlide() {
    var $activeSlide = $('.active-section');
    var activeSlideId = $activeSlide.attr('id');
    console.log(activeSlideId);
    if (activeSlideId !== 'contact') { // can't go right of contact slide
      var $nextSlide = $activeSlide.next('.slide-section');
      var nextSlideId = $nextSlide.attr('id');
      $('.active-section').removeClass('active-section');
      console.log(nextSlideId);
      // at same time:
      // animate active slide to left, w/ duration/easing settings
      $activeSlide.animate({
        left: "100vw",
        right: "-100vw"
      }, {
        start: function() {
          $('.active-section').removeClass('active-section'); // make all sections inactive
        },
        duration: 1200, // custom for each. get options by id
        easing: 'swing'
      });

      $nextSlide.animate({
        left: 0, // these are same for all: need to bring next slide into view
        right: 0
      }, {
        start: function() {
          $(this).addClass('active-section'); // when done, make new section active
        },
        duration: 1000,
        easing: 'swing'
      });
    }
  }

  function prevSlide() {
    var $activeSlide = $('.active-section');
    var activeSlideId = $activeSlide.attr('id');
    if (activeSlideId !== "home") { // can't go left of home slide
      var $prevSlide = $activeSlide.prev('.slide-section');
      var prevSlideId = $prevSlide.attr('id');
      // at same time:
      // animate active slide to left, w/ duration/easing settings
      $activeSlide.animate({
        left: "100vw",
        right: "-100vw"
      }, {
        start: function() {
          $('.active-section').removeClass('active-section');
        },
        duration: 1200, // custom for each. get options by id
        easing: 'swing'
      });

      $prevSlide.animate({
        left: 0, // these are same for all: need to bring next slide into view
        right: 0
      }, {
        done: function() {
          $(this).addClass('active-section');
        },
        duration: 800,
        easing: 'swing'
      });
    }
  }

  $('a.section-link').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-target');
    goToCard(id);
  });

  function goToCard(targetId) {
    var $activeSlide = $('.active-section');
    var $targetSlide = $('#' + targetId);
    $activeSlide.animate({
      left: "100vw",
      right: "-100vw"
      }, {
      start: function() {
        $('.active-section').removeClass('active-section');
      },
      duration: 600, // custom for each. get options by id
      easing: 'swing'
    });
    $targetSlide.animate({
      left: 0,
      right: 0
    }, {
      start: function() {$targetSlide.addClass('active-section');}
    });
    // $activeSlide.animate({
    //   left: "100vw",
    //   right: "-100vw"
    //   }, {
    //   start: function() {
    //     $('.active-section').removeClass('active-section');
    //   },
    //   duration: 600, // custom for each. get options by id
    //   easing: 'swing',
    //   done: function() {
    //     $targetSlide.addClass('active-section');
    //     $targetSlide.animate({
    //       left: 0,
    //       right: 0
    //     });
    //   }
    // });
  }
    // else {
    // $activeSlide.animate({
    //   left: "100vw",
    //   right: "-100vw"
    //   }, {
    //   start: function() {
    //     $('.active-section').removeClass('active-section');
    //   },
    //   duration: 600, // custom for each. get options by id
    //   easing: 'swing'
    // });
    // $targetSlide.animate({
    //   left: 0,
    //   right: 0
    // });
    // }
  // }

  // event listeners for forward/back arrows
  $('a.next-slide').on('click', nextSlide);
  $('a.prev-slide').on('click', prevSlide);

  // add event listener for mousewheel
  $('body').bind('mousewheel DOMMouseScroll', function(e){
    // if
    if ($('.slide-section:animated').length > 0) {
      e.preventDefault();
    } else {
      if(e.originalEvent.wheelDelta /120 > 0 || e.originalEvent.detail > 0) {
        prevSlide();
      }
      else{
        nextSlide();
      }
    }
  });

  // event listener for left/right keypresses
  $('body').on('keydown', function(e) {
    if ($('.slide-section:animated').length > 0) {
      e.preventDefault();
    } else {
      if (e.which === 37) {
        prevSlide();
      } else if (e.which === 39) {
        nextSlide();
      }
    }
  });

});
