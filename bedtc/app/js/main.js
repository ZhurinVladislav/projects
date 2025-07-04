//
//core
//

//для анимации
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('body').classList.add('loading');
	document.querySelectorAll('[data-animations]').forEach(element => {
		element.classList.add('animations');
	});
});

window.onpopstate = _popState;

current_page = location.pathname.slice(1);
if (current_page == '') {
	current_page = 'main';
}

$(
	'a[data-href="' +
		current_page +
		'"], *[data-navigation][data-href="' +
		current_page +
		'"]'
).addClass('active');
$(
	'a[data-href="' +
		current_page +
		'"], *[data-navigation][data-href="' +
		current_page +
		'"]'
)
	.parents('.aside-menu__item')
	.addClass('active');
$(
	'a[data-href="' +
		current_page +
		'"], *[data-navigation][data-href="' +
		current_page +
		'"]'
)
	.parents('.menu2-item')
	.addClass('active');

// $('a[data-href="' + current_page + '"], *[data-navigation][data-href="' + current_page + '"]')
// 	.parents('.aside-menu__item')
// 	.addClass('open');

// $('a[data-href="' + current_page + '"], *[data-navigation][data-href="' + current_page + '"]')
// 	.parents('.aside-menu__item')
// 	.children('ul')
// 	.css('display', 'block');

//	таймаут активности для авторизованных пользователей
/*
if (user_logged === true) {
	logged_timer = setTimeout(function () {
		location.href = '/login';
	}, 3605000);
}
*/

if (localStorage['news_total_readed'] == undefined) {
	$('#unreaded_news').addClass('active');
	$('#unreaded_news').text('+1');
} else {
	let unreaded_news = total_news - localStorage['news_total_readed'];
	if (unreaded_news > 0) {
		$('#unreaded_news').addClass('active');
		$('#unreaded_news').text(unreaded_news);
	}
}

function update_online_users() {
	$.ajax({
		url: '/users_online.txt?_=' + new Date().getTime(),
		type: 'get',
		success: function (data) {
			data = parseInt(data / 12);
			$('.aside__phone-menu a[data-href="chat"] span span').text(data);
			$('.header__menu-content a[data-href="chat"] span').text(data);
		},
	});
}

// update_online_users();
// setInterval(function () {
// 	update_online_users();
// }, 60000);

server_time = $('.user-panel__item-time').attr('data-time');
function update_time_header() {
	let dateobj = new Date(server_time * 1000);
	let hours = dateobj.getUTCHours();
	let minutes = dateobj.getUTCMinutes();
	let seconds = dateobj.getUTCSeconds();
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	$('.user-panel__item-time span').text(hours + ':' + minutes + ':' + seconds);
	$('.aside__phone-time').text(hours + ':' + minutes + ':' + seconds);
	server_time++;
}

update_time_header();
setInterval(function () {
	update_time_header();
}, 1000);

//	делает ajax-запрос с указанными параметрами, по завершении вызывает callback
//	пример obj:
//	('controller': 'login', 'login': 'asd')
function ajax(obj, callback) {
	$.ajax({
		url: '/',
		type: 'post',
		data: obj,
		success: function (data) {
			callback(data);
		},
	});

	//	обновляем таймаут активности для авторизованных пользователей
	/*
	if (user_logged === true) {
		clearTimeout(logged_timer);
		logged_timer = setTimeout(function () {
			location.href = '/login';
		}, 901000);
	}
	*/
}

//	Клик по ссылке
function _navigate(e, loadpath) {
	e.stopPropagation();
	e.preventDefault();

	var page = loadpath;

	ajax({ get_page: page }, function (data) {
		$('#main-placeholder').html(data);

		// кастомное событие клика
		let navigate = new Event('navigate', { bubbles: true });
		document.dispatchEvent(navigate);
	});
	current_page = page;
	history.pushState({ page: page }, '', '/' + page);

	$(
		'a[data-href="' +
			current_page +
			'"], *[data-navigation][data-href="' +
			current_page +
			'"]'
	).addClass('active');
	$(
		'a[data-href="' +
			current_page +
			'"], *[data-navigation][data-href="' +
			current_page +
			'"]'
	)
		.parents('.aside-menu__item')
		.addClass('active');
	$(
		'a[data-href="' +
			current_page +
			'"], *[data-navigation][data-href="' +
			current_page +
			'"]'
	)
		.parents('.menu2-item')
		.addClass('active');
}

//	Кнопки Назад/Вперед
function _popState(e) {
	var page = (e.state && e.state.page) || 'main';

	ajax({ get_page: page }, function (data) {
		$('#main-placeholder').html(data);
	});
	current_page = page;
}

function update_chat() {
	if (current_page == 'chat' && chat_last_message > 0) {
		$.ajax({
			url: '/counters.json?_=' + new Date().getTime(),
			type: 'get',
			success: function (data) {
				let language = $('.chat__form-wrap input[name=chat]').prop('value');
				if (data['chat_' + language + '_last_message'] > chat_last_message) {
					chat_last_message = data['chat_' + language + '_last_message'];
					ajax(
						{
							controller: 'chat/get',
						},
						function (data) {
							$('.chat').html(data);
							$('.chat').scrollTop($('.chat').prop('scrollHeight'));
						}
					);
				} else {
					console.log('nothing to do');
				}
			},
		});
	}
}
setInterval(function () {
	update_chat();
}, 3000);

function check_view(items) {
	let check_can_continue = false;

	if (site_views == 0) {
		setTimeout(function () {
			check_count_interval = setInterval(function () {
				ajax(
					{
						controller: 'check_collect_count',
					},
					function (data) {
						data = JSON.parse(data);
						if (data.status == 'ok') {
							if (site_views < data.collect_views) {
								location.reload();
							}
						}
					}
				);
			}, 1500);
		}, 26000);
		window.open('collect/?deposit_id=' + items.id);
	} else {
		check_can_continue = true;
	}

	return check_can_continue;
}

$('body').on('click', 'a[data-href], *[data-navigation]', function (e) {
	closeMenu();

	if (
		$(this).attr('data-href') !== current_page ||
		current_page == 'messages' ||
		current_page == 'tickets'
	) {
		let get_template = $(this).attr('data-template');
		let get_page_url = $(this).attr('data-href');

		if (get_template == current_template) {
			$('a[data-href], *[data-navigation]').removeClass('active');
			$('a[data-href], *[data-navigation]')
				.parents('.aside-menu__item')
				.removeClass('active');
			$('a[data-href], *[data-navigation]')
				.parents('.aside-menu__item')
				.removeClass('open');
			$('a[data-href], *[data-navigation]')
				.parents('.menu2-item')
				.removeClass('active');
			$('a[data-href], *[data-navigation]')
				.parents('.menu2-item')
				.removeClass('open');

			$(this).addClass('active');
			$(this).parents('.aside-menu__item').addClass('active');
			$(this).parents('.menu2-item').addClass('active');

			$('.aside__phone').removeClass('active');
			$('.header__menu-phone').removeClass('active');
			$('.update').addClass('active');
			$('body').removeClass('overlay-active');

			_navigate(e, get_page_url);
		} else {
			history.pushState({ page: get_page_url }, '', '/' + get_page_url);
			location.href = get_page_url;
		}
	}
});

$('body').on('submit', '#login', function (e) {
	e.preventDefault();
	$('#login .have-error').removeClass('have-error');
	ajax(
		{
			controller: 'login',
			email: $('#login_email').prop('value'),
			password: $('#login_password').prop('value'),
			g_code: 'false',
			// 'captcha': grecaptcha.getResponse()
		},
		function (data) {
			data = JSON.parse(data);
			if (data.status == 'ok') {
				location.href = '/' + data.location;
			} else if (data.status == 'need_g_auth') {
				$('#login').addClass('hidden');
				$('#login_g_auth').addClass('active');
			} else {
				$('*[data-error="' + data.placeholder + '"]').addClass('have-error');
				if (data.print != '') {
					$('*[data-error-text="' + data.placeholder + '"]').text(data.print);
				}
			}
		}
	);
});

$('body').on('submit', '#login_g_auth', function (e) {
	e.preventDefault();
	$('#login_g_auth .have-error').removeClass('have-error');
	ajax(
		{
			controller: 'login',
			email: $('#login_email').prop('value'),
			password: $('#login_password').prop('value'),
			g_code: $('#login_g_code').prop('value'),
			// 'captcha': grecaptcha.getResponse()
		},
		function (data) {
			data = JSON.parse(data);
			if (data.status == 'ok') {
				location.href = '/' + data.location;
			} else {
				$('*[data-error="' + data.placeholder + '"]').addClass('have-error');
				if (data.print != '') {
					$('*[data-error-text="' + data.placeholder + '"]').text(data.print);
				}
			}
		}
	);
});

$('body').on('submit', '#register', function (e) {
	e.preventDefault();
	$('#register .have-error').removeClass('have-error');
	ajax(
		{
			controller: 'register',
			login: $('#register_login').prop('value'),
			password: $('#register_password').prop('value'),
			password_confirm: $('#register_password_confirm').prop('value'),
			email: $('#register_email').prop('value'),
			pin: $('#register_pin').prop('value'),
			pin_confirm: $('#register_pin_confirm').prop('value'),
		},
		function (data) {
			data = JSON.parse(data);
			if (data.status == 'ok') {
				location.href = '/home';
			} else {
				$('#register *[data-error]').removeClass('have-error');
				$('#register *[data-error-text]').text('');
				$('#register *[data-error="' + data.placeholder + '"]').addClass(
					'have-error'
				);
				if (data.print != '') {
					$('#register *[data-error-text="' + data.placeholder + '"]').text(
						data.print
					);
				}
			}
		}
	);
});

$('body').on('click', '#logout', function (e) {
	e.preventDefault();
	ajax(
		{
			controller: 'logout',
		},
		function (data) {
			if (data == 1) {
				location.href = '/';
			}
		}
	);
});

$('body').on('submit', '#remind', function (e) {
	e.preventDefault();
	ajax(
		{
			controller: 'remind_pass',
			login: $('#remind_login').prop('value'),
			email: $('#remind_email').prop('value'),
			// 'captcha': grecaptcha.getResponse()
		},
		function (data) {
			data = JSON.parse(data);
			console.log(data);
			if (data.status == 'ok') {
				$('#remind').html(data.print);
			} else {
				$('*[data-error="' + data.placeholder + '"]').addClass('have-error');
				if (data.print != '') {
					$('*[data-error-text="' + data.placeholder + '"]').text(data.print);
				}
			}
		}
	);
});

$('body').on('click', '#language button, #language-chat button', function (e) {
	e.preventDefault();
	ajax(
		{
			controller: 'change_language',
			language: $(this).prop('value'),
		},
		function (data) {
			location.reload();
		}
	);
});

$('body').on('focus', '.have-error', function () {
	$(this).removeClass('have-error');
});

$('body').on('submit', '.form-add', function (e) {
	e.preventDefault();

	$(this).find('.have-error').removeClass('have-error');
	let items = {};

	let callback = $(this).attr('data-callback');
	let content_placeholder = $(this).attr('data-result');
	let submit_button = $(this).find('button[type="submit"]');
	let before_send = $(this).attr('data-before-send');

	$(this)
		.find(
			'input:not([disabled]):not([type=file]), textarea:not([disabled]), select:not([disabled])'
		)
		.each(function () {
			let type = $(this).attr('type');

			// if (type != 'radio' || (type == 'radio' && $(this).prop('checked') == true) ) {
			// 	items[this.name] = $(this).val();
			// }

			if (type == 'radio' && $(this).prop('checked') == true) {
				items[this.name] = $(this).val();
			} else if (type == 'checkbox' && $(this).prop('checked') == true) {
				items[this.name] = $(this).val();
			} else if (type != 'radio' && type != 'checkbox') {
				items[this.name] = $(this).val();
			}
		});

	// 	if (callback == 'add-chat-message' || callback == 'add-message' || callback == 'add-ticket-message') {
	// 		items.text = $('#textarea').html();
	// 	}

	let can_continue = true;

	if (before_send !== undefined) {
		switch (before_send) {
			case 'check_view':
				can_continue = check_view(items);
				break;
		}
	}

	if (can_continue == true) {
		ajax(
			{
				controller: $(this).attr('data-controller'),
				items: items,
				button: e.originalEvent.submitter.getAttribute('data-button'),
			},
			function (data) {
				data = JSON.parse(data);

				if (data.status == 'ok') {
					if (callback == 'paint-button') {
						submit_button.addClass('complete');
					} else if (callback == 'place_content') {
						$('body')
							.find('*[data-placeholder=' + content_placeholder + ']')
							.html(data.print);
					} else if (callback == 'collect_redirect') {
						window.location.replace(data.redirect_to);
					} else if (callback == 'add-message') {
						$('.dialog__items').append(data.message);
						$('.dialog__items').scrollTop(
							$('.dialog__items').prop('scrollHeight')
						);
						$('.messages-form .textarea').text('');
					} else if (callback == 'add-chat-message') {
						$('.chat').append(data.message);
						$('.chat__form .textarea').text('');
						$('.chat').scrollTop($('.chat').prop('scrollHeight'));
						//$('.chat__form').css('display', 'none');
						$('.chat__form-btn').attr('disabled', true); // Отключаем кнопку отправить
						$('#next_message_info').addClass('active');
						let tick = 4;
						let ticker = setInterval(function () {
							if (tick > 0) {
								$('#next_message_ticker').text(tick);
							} else {
								clearInterval(ticker);
								$('#next_message_info').removeClass('active');
								$('.chat__form').removeAttr('style');
								$('.chat__form-btn').attr('disabled', false);
							}
							tick--;
						}, 1000);
					} else if (callback == 'add-ticket-message') {
						$('.chat .chat-list').append(data.message);
						$('.chat').scrollTop($('.chat').prop('scrollHeight'));
						$('body #textarea').val('');
					} else {
						$('*[data-error="' + data.placeholder + '"]').addClass(
							'have-success'
						);
						setTimeout(function () {
							$('*[data-error="' + data.placeholder + '"]').removeClass(
								'have-success'
							);
						}, 1500);
					}

					if ('replenish_system' in data) {
						if (data.replenish_system == 'qiwi') {
							$('#success_qiwi').addClass('active');
							$('#success_not_qiwi').addClass('inactive');
						}
					}
				} else {
					$('*[data-error="' + data.placeholder + '"]').addClass('have-error');
					if (data.print != '') {
						$('*[data-error-text="' + data.placeholder + '"]').text(data.print);
					}
					if (data.display != '') {
						$('*[data-error="' + data.placeholder + '"]').html(data.display);
					}
				}

				if ('balance_buy' in data) {
					$('#balance_buy').text(data.balance_buy);
					$('#balance_buy_phone').text(data.balance_buy);
				}
				if ('balance_withdrawal' in data) {
					$('#balance_withdrawal').text(data.balance_withdrawal);
					$('#balance_withdrawal_phone').text(data.balance_withdrawal);
				}
				if ('network_power' in data) {
					$('#user-panel__item-power .value').text(data.network_power);
				}
			}
		);
	}
});

$('body').on('change', '.form-change-image input', function (e) {
	e.preventDefault();
	let image = $(this)[0];

	let callback = $(this).attr('data-callback');
	let content_placeholder = $(this).attr('data-result');
	let submit_button = $(this).find('button[type="submit"]');

	let fd = new FormData();
	fd.append('file', image.files[0]);
	fd.append('controller', $(this).attr('data-controller'));

	$('#avatar_load_success').removeClass('active');
	$('#avatar_error_type').removeClass('active');
	$('#avatar_error_size').removeClass('active');
	$('#avatar_load_progress').addClass('active');
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/');
	xhr.upload.onprogress = function (e) {
		$('#avatar_load_progress .kbytes_loaded').text(
			(e.loaded / 1000).toFixed(2)
		);
		$('#avatar_load_progress .kbytes_total').text((e.total / 1000).toFixed(2));
	};
	xhr.send(fd);
	xhr.onload = function () {
		data = JSON.parse(xhr.responseText);
		if (data.status == 'ok') {
			$('.settings__form-img_avatar img').attr(
				'src',
				$('.settings__form-img_avatar img').attr('src') + '?_=' + +new Date()
			);
			$('.aside__avatar-frame img').attr(
				'src',
				$('.aside__avatar-frame img').attr('src') + '?_=' + +new Date()
			);
			$('#avatar_load_success').addClass('active');
		} else if (data.status == 'fail') {
			if (data.error == 'type') {
				$('#avatar_error_type').addClass('active');
			} else if (data.error == 'size') {
				$('#avatar_error_size').addClass('active');
			}
		}
		$('#avatar_load_progress').removeClass('active');
	};
});

$('body').on('click', '.pagination a', function (e) {
	e.preventDefault();
	let placeholder = $(this).parents('.pagination').attr('data-result');

	let scroll_to_top = $(this).parents('.pagination').attr('data-scroll-top');

	ajax(
		{
			controller: $(this).parents('.pagination').attr('data-controller'),
			page: $(this).attr('data-page'),
		},
		function (data) {
			$('*[data-placeholder=' + placeholder + ']').html(data);
			if (scroll_to_top == 'true') {
				$('html, body').animate(
					{
						scrollTop:
							$('*[data-placeholder=' + placeholder + ']').offset().top - 200,
					},
					1000
				);
			}
		}
	);
});
