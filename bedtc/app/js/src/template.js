// console.log('template');

$('body').on('click', '.header .menu button', function() {
	$('body').addClass('menu-open');
	$('.top-menu, .top-menu-overlay').addClass('active');
});

$('body').on('click', '.top-menu .close, .top-menu-overlay', function() {
	$('body').removeClass('menu-open');
	$('.top-menu, .top-menu-overlay').removeClass('active');
});

$('body').on('click', '.aside .dropdown, .top-menu .dropdown', function() {
	$(this).toggleClass('active');
});

$('body').on('click', '.form-item .eye', function() {
	$(this).toggleClass('cross');
	if ($(this).parent().find('input').attr('type') == 'password') {
		$(this).parent().find('input').attr('type', 'text');
	} else {
		$(this).parent().find('input').attr('type', 'password');
	}
});

$('body').on('click', '.tabs .tab-item', function() {
	let tab_name = $(this).attr('data-tab');

	$('.tabs .tab-item').removeClass('active');
	$('.tab-content[data-tab="'+tab_name+'"]').parent().find('.tab-content').removeClass('active');

	$(this).addClass('active');
	$('.tab-content[data-tab="'+tab_name+'"]').addClass('active');
});

$('body').on('click', '.faq-button', function() {
	$(this).blur();
	$(this).parents('.faq-item').toggleClass('active');
	let text = $(this).find('.caption').text();
	
	if (text == '+') {
		$(this).find('.caption').text('-');
	} else {
		$(this).find('.caption').text('+');
	}
});