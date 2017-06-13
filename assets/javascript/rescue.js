

jQuery(function($) {
	
	$(window).load(function(){


		$('#slider_wrap').flexslider({
			start: function(slider) {
				if (slider.count == 1) {
					$('.flex-control-nav, .flex-direction-nav').hide();
				} 
			},
			animation: "slide",
			slideshowSpeed: 8000,
			smoothHeight: true
		});		
	
	});
	
});

jQuery(document).ready(function($){


	$('#main_menu ul.menu').mobileMenu();
	
    $('select.select-menu').each(function(){
    	"use strict";
        var title = $(this).attr('title');
        if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
        $(this)
            .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
            .after('<span class="select">' + title + '</span>')
            .change(function(){
                val = $('option:selected',this).text();
                $(this).next().text(val);
            })
    });
	
	$("#main_menu ul li ul").css({display: "none"}); // Opera Fix
	$("#main_menu ul li").hover(function(){
		"use strict";
		$(this).find('ul:first').css({visibility: "visible",display: "none"}).show(300);
		},function(){
		$(this).find('ul:first').css({visibility: "hidden"});
	});
	
	// show hide the searchform
	$('#search_link').click(function() {
		"use strict";
		$("#searchform").stop().slideToggle();
    });
	
	
	
	// Fancybox
	$(".lightbox").attr('rel', 'gallery').fancybox();

});