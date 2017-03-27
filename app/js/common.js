$(function() {
	var main = {
		opt: {
			tabs: $('.tabs'),
			popup: $('.btn.pop'),
			img: $('img'),
			linc: $('a'),
			body: $('body'),
			wind: $(window),
			mobButton: $('.mob-button'),
			slider: $('.slider'),
			owlOptions: {
				autoPlay: 3000,
				navigation: true,
				singleItem: true,
				autoPlay: false,	
				pagination: true,
				scrollPerPage: true,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']								
			}
		},
		tabs: function(el){
			var linc = el.find('.tab-link'),
					tab  = el.find('.tab'),
					dataShow;
			linc.on('click',function(){				
				dataShow = $(this).data('show');
				linc.removeClass('active');
				$(this).addClass('active');

				tab.css('display','none')
				.find('.tab-content').removeClass('active');

				$('#'+dataShow).fadeIn(600)
				.find('.tab-content').addClass('active');
			});
		},
		popup: function(el){
			el.on('click',function(event){
				event.preventDefault();		
				var show = $(this).data('show'),
						pop  = $('#'+ show);

				pop.fadeIn(600)
				.css('height', $(window).height() + 'px')
				.find('.popup-content')
				.removeClass('anim')
				.append('<span class="fade_out">&#9587;</span>')

				$('.fade_out').click(function(){
					pop.fadeOut(600)
					.find('.popup-content')
					.addClass('anim');
					$(this).detach();
				});
			});
		},
		toggleC: function(el){
			el.on('click',function(){
				el.toggleClass('active');
				$('nav').slideToggle('fast');
			});			
		},
		winH: function(){
			return this.opt.wind.height();
		},
		fullHeight: function(el){
			$(el).css('min-height',this.winH()+'px');
		},
		dragstart: function(el){
			$(el).on('dragstart',function(event){
				event.preventDefault();
			});
		},
		scrollEventListener: function(){
			this.opt.wind.on('scroll', function(){
				var scrlTop = $(this).scrollTop(),
						header  = $('header'),
						headerH = header.height();
				if(scrlTop > headerH){
					header.addClass('active');
				}else{
					header.removeClass('active');
				};
			});
		},
		init: function(){
			// default functions
			this.dragstart(this.opt.img);
			this.dragstart(this.opt.linc);

			// tabs init
			this.tabs(this.opt.tabs);
			// popup init
			this.popup(this.opt.popup);
			// Add el window height
			this.fullHeight(this.opt.body);
			//owl slider init
			this.opt.slider.owlCarousel(this.opt.owlOptions);
			//mob button toggle
			this.toggleC(this.opt.mobButton);

			this.scrollEventListener();

			$('#main').css('max-height', main.opt.wind.height()+'px');
			$('nav a').on('click', function(){
				var mobBtn = $('.mob-button');
				if(mobBtn.is(':visible')){
					mobBtn.click();					
				};
			});
		}
	};



	$(document).ready(function(){

		main.init();

		$('.order-popup').svgpopup({
		  stepX: 6,	
		  stepY: 4,
		  figure: 'triangle',
		  fill: '#FFA800',
		  strokeFill: 'rgba(255,255,255, .6)',
		  opacity: 0.8,	
		  visible: false,
		  speed: 1,
		  randomize: false
		});

		$('.svg-progress-hexagon').svgprogress({
			figure: "hexagon",
			progressFillGradient: ['#00a655','#FFA800'],
      progressWidth: 4,
			emptyFill: '#ccc'
		});

		$('.svg-progress-rhomb').svgprogress({
			figure: "rhomb",
			progressFill: '#FFA800',
      progressWidth: 2,
			emptyFill: '#ccc'
		});

		jQuery('#advantages').waypoint({	
			handler: function(event, direction){
				if (direction === "down") {
					$('.svg-progress-hexagon').trigger("redraw");
					$('.svg-progress-rhomb').trigger("redraw");
				};
			},
			offset: '10%'
		});

		// smoof-scroll
		var navigation_links = jQuery("nav a");
		navigation_links.click( function(event) {
			event.preventDefault();
			jQuery.scrollTo(
				jQuery(this).attr("href"),
				{
					duration: 600,
					offset: { 'left':0, 'top':-0.03*jQuery(window).height() }
				}
			);
		});
		jQuery('section').waypoint({
			handler: function(event, direction) {
				var active_section = jQuery(this);			
				if (direction === "up") active_section = active_section.prev();
				var active_link = jQuery('nav a[href="#' + active_section.attr("id") + '"]');
				navigation_links.removeClass("active");
				active_link.addClass("active");
			},
			offset: '5%'
		});


		$('.send input, .send textarea').on('focusin',function(){
			$(this).prev().css('marginTop','-35px');
		}).on('focusout',function(){
			if ($(this).val()) {		
				return false;
			}else{
				$(this).prev().css('marginTop','0px');					
			};
		});

		//E-mail Ajax Send
		// $("form.send").submit(function() { 
		// 	var th = $(this);
		// 	$.ajax({
		// 		type: "POST",
		// 		url: this.action,
		// 		data: th.serialize()
		// 	}).done(function() {
		// 		alert("Thank you!");
		// 		setTimeout(function() {		
		// 			th.trigger("reset");
		// 		}, 1000);
		// 	});
		// 	return false;
		// });
		//Chrome Smooth Scroll
		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {

		};
	});
});
