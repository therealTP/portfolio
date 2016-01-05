$(document).ready(function(){
  $('#mainContent').fullpage({
      sectionSelector: '#mainContent',
      slideSelector: '.slide-section',
      loopHorizontal: false,
      anchors: ['main-content'],
      onSlideLeave: function(anchorLink, index, slideIndex, nextSlideIndex){
        // remove active class from any menu item
        $('#mainNav a').removeClass('active-menu');
        // add active class to correct menu item
        if (nextSlideIndex === 'right') {
          $('#mainNav li:nth-Child(' + (slideIndex + 1) + ') a').addClass('active-menu');
        } else if (nextSlideIndex === 'left') {
          $('#mainNav li:nth-Child(' + (slideIndex - 1) + ') a').addClass('active-menu');
        }
      }
  });

  // add event listener for mousewheel
  $('html').bind('mousewheel', function(e){
      if(e.originalEvent.wheelDelta /120 > 0) {
        $.fn.fullpage.moveSlideLeft();
      }
      else{
        $.fn.fullpage.moveSlideRight();
      }
  });
});
