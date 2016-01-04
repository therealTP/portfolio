$(document).ready(function(){
  $('#mainContent').fullpage({
      sectionSelector: '#mainContent',
      slideSelector: '.slide-section',
      loopHorizontal: false,
      anchors: ['main-content'],
      afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
        // remove active class from any menu item
        $('#mainNav a').removeClass('active-menu');
        // add active class to correct menu item
        if (slideIndex > 0) {
          $('#mainNav li:nth-Child(' + slideIndex + ') a').addClass('active-menu');
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
