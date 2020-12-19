$(document).ready(function() {
	document.createElement('picture');
	function AdjustMasonryItems()
	{
		var baseWidth = $('.mas-item.mi-w-1').width();
		var baseMargin = parseInt($('.mas-item.mi-w-1').css('margin-right'));
		$('.mas-item').each(function() {
			$(this).height($(this).data('height') * (baseWidth + baseMargin) - baseMargin);
			$(this).css('top', $(this).data('row') * (baseWidth + baseMargin) - baseMargin - baseWidth);
		});
	}
	function SetMasonryContainerHeight() {
		var cHeight = $('.mas-item').last().offset().top - $('.mas-item').eq(0).offset().top + $('.mas-item').last().height();
		$('.mas-container').height(cHeight);
	}
	AdjustMasonryItems();
	setTimeout(function() {
		SetMasonryContainerHeight();
	}, 300);
	$(window).on('resize', function() {
		AdjustMasonryItems();
		setTimeout(function() {
			SetMasonryContainerHeight();
		}, 300);
	});
	$('.nav-ul > li').each(function() {
		if ($(this).find('ul').is('ul')) {
			$(this).addClass('has-children');
		}
	});
	$('.nav-ul > li > a').click(function(event) {
		if ($(this).parent('li').find('ul').is('ul')) {
			event.preventDefault();
			$(this).parent('li').find('ul').fadeIn(100);
		}
	});
	$('.main-overlay').on('click', function() {
		$('.close-on-main-overlay').toggleClass('active');
		$('.main-overlay').toggleClass('active');
		$('.inactive-on-overlay').fadeOut();
	});
	$('.show-menu').on('click', function() {
		$('.main-overlay').toggleClass('active');
		$('.mob-menu').toggleClass('active');
	});
	$('.show-mob-mnu').on('click', function() {
		$('.mob-menu').toggleClass('active');
		$('.main-overlay').toggleClass('active');
	});
	$('.close-mob-mnu').on('click', function() {
		$('.mob-nav').toggleClass('active');
		$('.main-overlay').toggleClass('active');
	});
	$('.mob-menu__city').html($('.mob-menu__city').next('ul').find('.current').find('a').html());
	$('.missclick-action').click(function(e){
		e.stopPropagation();
	});
	$('.missclick-action ul').click(function(e){
		e.stopPropagation();
	});
	$(document).click(function(){
		$('.missclick-action ul').fadeOut(100);
	});

	$('.select-form-1').change(function() {
		var pool = '';
		var club = $(this).find('.select-form__club').val();
		var time = $(this).find('.select-form__time').val();
		if ($(this).find('.opt12_isset').is(':checked')) {
			pool = '&opt12_isset=checked';
		}
		var url = 'https://store.fitnesshouse.ru/search-kupit-abonement.html?afid=af&opt7_select='+club+pool+'&opt9_select=&opt8_select='+time+'&opt5_minmax%5B0%5D=700&opt5_minmax%5B1%5D=99000';
		$(this).attr('action', url);
	});
	$('.select-form-2').change(function() {
		var club = $(this).find('.select-form__club').val();
		var time = $(this).find('.select-form__time').val();
		var url = 'https://store.fitnesshouse.ru/search-kupit-dopolnitelnyie-uslugi.html?afid=dy&opt7_select='+club+'&opt26_select='+time+'&opt5_minmax%5B0%5D=100&opt5_minmax%5B1%5D=99000';
		$(this).attr('action', url);
	});
	$('.select-form-3').change(function() {
		var club = $(this).find('.select-form__club').val();
		var time = $(this).find('.select-form__time').val();
		var url = 'https://store.fitnesshouse.ru/kupit-abonement-v-detskie-sekczii.html?afid=ds&opt7_select='+club+'&opt26_select='+time+'&opt5_minmax%5B0%5D=420&opt5_minmax%5B1%5D=99000';
		$(this).attr('action', url);
	});
	$('.select-form').submit(function(e) {
		e.preventDefault();
		location.href=$(this).attr('action');
	});
	$('.main-nav__city').html($('.main-nav__city').next('ul').find('.current').find('a').html());
	$('.region-select').click(function(e) {
		e.preventDefault();
		$('.region-form').attr('action', location.href);
		$('.region-form__input').val($(this).data('region'));
		setTimeout(function(){
			$('.region-form').submit();
		}, 100);
	});
	$('.mp-tour-open').click(function(e) {
		e.preventDefault();
		$('.main-overlay').addClass('active');
		$('.mp-tour-modal').fadeIn();
		$('.mp-tour-close').click(function(e) {
			$('.main-overlay').removeClass('active');
			$('.mp-tour-modal').fadeOut();
		});
	});
	if ($('.prestige-slider').is('.prestige-slider')) {
		$('.prestige-slider').slick({
			arrows: false,
			fade: true,
			autoplay: true,
			autoplaySpeed: 4000
		});
	}

	$('#checkform').submit(function() {
		$.ajax({
			type: "POST",
			url: "/assets/snippets/ajaxForm/mpTour.php",
			data: $(this).serialize()
		}).done(function(data) {
			if (data != 'done') {
				$('[name="'+data+'"]').addClass('error');
			}
			if (data == 'done') {
				$('.mp-tour-modal').fadeOut();
				$('.resp-modal').html('Ваше сообщение отправлено.');
				$('.resp-modal').fadeIn();
				setTimeout(function() {
					$('.resp-modal').fadeOut();
					$('.main-overlay').removeClass('active');
				}, 1000);
			}
		});
		return false;
	});

});