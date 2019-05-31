/* =================================
------------------------------------
	LibChurch - Event Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/



'use strict';







$(".single-item").slick({
	dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 1000,
  arrows:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
       
      }
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
  }
  ]
      
});





(function($) {


	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		Counter
	--------------------*/
	$(".counter").countdown("2018/07/01", function(event) {
		$(this).html(event.strftime("<div class='counter-item'><h4>%D</h4>Days</div>" + "<div class='counter-item'><h4>%H</h4>hours</div>" + "<div class='counter-item'><h4>%M</h4>Mins</div>" + "<div class='counter-item'><h4>%S</h4>secs</div>"));
	});


})(jQuery);

