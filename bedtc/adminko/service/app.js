$(function() {

	logged_timer = setTimeout(function() {
		location.reload();
	}, 3605000);

	function update_timer() {
		clearTimeout(logged_timer);
		logged_timer = setTimeout(function() {
			location.reload();
		}, 3605000);
	}

	//	toggle menu
	$('.aside__item-header').on('click', function() {
		$(this).parent().toggleClass('active');
	});

	//	получение страниц и вставка в разметку
	$('.aside__item a').on('click', function(e) {
		e.preventDefault();
		$('.aside__item a').removeClass('active');
		$(this).addClass('active');

		$('.content-header').text($(this).text());
		currentPage = $(this).attr('data-href');
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'get_page'
			},
			success: function(data) {
				$('.content-placeholder').html(data);
				update_timer();
			}
		});
		
	});

	$('.aside__item').addClass('active');

	//	поиск
	$('body').on('submit', '.form-search', function(e) {
		e.preventDefault();
		
		let placeholder = $(this).attr('data-result');
		let search_string = $(this).find('input[name=search]').val();

		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'search',
				'string': search_string
			},
			success: function(data) {
				$('*[data-placeholder='+placeholder+']').html(data);
				update_timer();
			}
		});
	});

	$('body').on('submit', '.form-search-date', function(e) {
		e.preventDefault();
		
		let placeholder = $(this).attr('data-result');
		let from = $(this).find('input[name=from]').val();
		let to = $(this).find('input[name=to]').val();

		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'search',
				'from': from,
				'to': to
			},
			success: function(data) {
				$('*[data-placeholder='+placeholder+']').html(data);
				update_timer();
			}
		});
	});

	//	сохранение изменений в форме
	$('body').on('submit', '.form-edit', function(e) {
		e.preventDefault();
		
		// placeholder = $(this).attr('data-result');
		let items = {};
		$(this).find('input:not([disabled]), textarea:not([disabled])').each(function() {
			let type = $(this).attr('type');
			if (type != 'radio' || (type == 'radio' && $(this).prop('checked') == true)) {
				items[this.name] = $(this).val();
			}
		});

		let action = '';
		if ($(this).attr('data-action') != undefined) {
			action = $(this).attr('data-action');
		} else {
		 	action = 'edit';
		}
		let id = $(this).find('input[name=id]').val();
		let form_attributes = $(this)[0].attributes;
		let callback = form_attributes['data-callback'].value;
		let submit_button = $(this).find('button[type="submit"]');

		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': action,
				'id': id,
				'data': items
			},
			success: function(data) {
				if (data == 1) {
					if (callback == 'paint-button') {
						submit_button.addClass('complete');
					} else if (callback == 'reload' || callback == 'loadpage') {
						if (callback == 'loadpage') {
							currentPage = form_attributes['data-loadpage'].value;
						}
						$.ajax({
							url: '/adminko/',
							type: 'post',
							data: {
								'page': currentPage,
								'action': 'get_page'
							},
							success: function(data) {
								$('.content-placeholder').html(data);
								update_timer();
							}
						});
					}
				} else {
					alert('Ошибка! Что-то сломалось, зовите программиста!');
				}
				update_timer();
			}
		});
	});

	//	добавление элемента куда-либо
	$('body').on('submit', '.form-add', function(e) {
		e.preventDefault();
		
		// placeholder = $(this).attr('data-result');
		let items = {};

		$(this).find('input:not([disabled]):not([type=file]), textarea:not([disabled])').each(function() {
			items[this.name] = $(this).val();
		});

		$(this).find('input[type=file]').each(function(index, element) {
			items[this.name] = $(this)[0].files[0].name;
		});

		let images = $(this).find('input[type=file]');
		
		let button = $(this).find('button[type="submit"]');
		let page = $(this).attr('data-page-handler');

		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': page,
				'action': 'add',
				'data': items
			},
			success: function(data) {
				// if (data == 1) {
				// 	$.ajax({
				// 		url: '/adminko/',
				// 		type: 'post',
				// 		data: {
				// 			'page': currentPage,
				// 			'action': 'get_page'
				// 		},
				// 		success: function(data) {
				// 			$('.content-placeholder').html(data);
				// 		}
				// 	});
				// } else {
				// 	alert('Ошибка! Что-то сломалось, зовите программиста!');
				// }
				if (data == 1) {
					images.each(function(key) {
						let fd = new FormData();
						fd.append('file', this.files[0]);
						fd.append('path', $(this).attr('data-save-path'));
						fd.append('id', $(this).attr('data-id'));

						let xhr = new XMLHttpRequest();
						xhr.open('POST', '/adminko/upload_image.php');
						xhr.upload.onprogress = function (e) {
							console.log(e.loaded)
						}
						xhr.send(fd);
						xhr.onload = function () {
							console.log(xhr.responseText);
						}
						if (key == (images.length - 1)) {
							alert('Ready');
						}
					});
				}
				update_timer();
				// alert(data);
			}
		});
	});

	$('body').on('submit', '.form-send-message', function(e) {
		e.preventDefault();
		
		// placeholder = $(this).attr('data-result');
		let items = {};
		$(this).find('input:not([disabled]), textarea:not([disabled])').each(function() {
			let type = $(this).attr('type');
			if (type != 'radio' || (type == 'radio' && $(this).prop('checked') == true)) {
				items[this.name] = $(this).val();
			}
		});

		let id = $(this).find('input[name=id]').val();
		let submit_button = $(this).find('button[type="submit"]');
		let inputs = $(this).find('input:not([disabled]), textarea:not([disabled])');

		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'send_message',
				'id': id,
				'data': items
			},
			success: function(data) {
				if (data == 1) {
					submit_button.addClass('complete');
					submit_button.textContent('Готово');
					inputs.val('');
				} else {
					alert('Ошибка! Что-то сломалось, зовите программиста!');
				}
				update_timer();
			}
		});
	});

	//	получение страницы редактирования чего-либо
	$('body').on('click', '*[data-edit]', function(e) {
		e.preventDefault();
		// $('.content-header').text('Редактирование пользователя ' + $(this).text());
		currentPage = $(this).attr('data-edit');
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'get_page',
				'id': $(this).attr('data-id')
			},
			success: function(data) {
				$('.content-placeholder').html(data);
				if ($('.main > .container').offset().top < -50) {
					$('.main').animate({ scrollTop: $('.main > .container').offset().top - 20 }, 500);
				}
				update_timer();
			}
		});
	});

	$('body').on('input', '.form-edit input[type="text"]', function() {
		$(this).parents('.form-edit').find('button[type="submit"]').removeClass('complete');
	});
	$('body').on('focus', '.form-edit textarea', function() {
		$(this).parents('.form-edit').find('button[type="submit"]').removeClass('complete');
	});

	$('body').on('click', 'button[data-open-form]', function(e) {
		e.preventDefault();
		$(this).parents('form').find('.form-hidden-section').toggleClass('active');
	});

	$('body').on('click', 'button[data-delete]', function(e) {
		e.preventDefault();
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'delete',
				'id': $(this).attr('data-delete')
			},
			success: function(data) {
				if (data == 1) {
					$.ajax({
						url: '/adminko/',
						type: 'post',
						data: {
							'page': currentPage,
							'action': 'get_page'
						},
						success: function(data) {
							$('.content-placeholder').html(data);
							update_timer();
						}
					});
				} else {
					alert('Ошибка! Что-то сломалось, зовите программиста!');
				}
				update_timer();
			}
		});
	});

	$('body').on('click', '.pagination a', function(e) {
		e.preventDefault();
		let placeholder = $(this).parents('.pagination').attr('data-result');

		status = $(this).parents('.pagination').attr('data-status');

		// ajax({
		// 	'controller': $(this).parents('.pagination').attr('data-controller'),
		// 	'page': $(this).attr('data-page')
		// }, function(data) {
		// 	$('*[data-placeholder='+placeholder+']').html(data);
		// });

		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'get_page',
				'data': {
					'page': $(this).attr('data-page'),
					'status': status
				}
			},
			success: function(data) {
				$('*[data-placeholder='+placeholder+']').html(data);
				update_timer();
			}
		});
	});

	$('body').on('click', 'a.get-status-list', function(e) {
		e.preventDefault();
		let placeholder = $(this).attr('data-result');

		$('a.get-status-list').removeClass('active');
		$(this).addClass('active');

		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'get_page',
				'data': {
					'status': $(this).attr('data-status')
				}
			},
			success: function(data) {
				$('*[data-placeholder='+placeholder+']').html(data);
				update_timer();
			}
		});
	});

	$('body').on('click', 'button[data-set-status]', function(e) {
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'set_status',
				'data': {
					'id': $(this).attr('data-id'),
					'status': $(this).attr('data-set-status')
				}
			},
			success: function(data) {
				if (data == 1) {
					$.ajax({
						url: '/adminko/',
						type: 'post',
						data: {
							'page': currentPage,
							'action': 'get_page',
							'data': {
								'status': $('.get-status-list.active').attr('data-status')
							}
						},
						success: function(data) {
							$('*[data-placeholder=result_payments]').html(data);
							update_timer();
						}
					});
				}
				update_timer();
			}
		});
	});

	$('body').on('submit', 'form[data-accept-quest]', function(e) {
		e.preventDefault();
		let elem = $(this).parents('.table-row');
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'accept',
				'data': {
					'id': $(this).attr('data-accept-quest'),
					'reward': $(this).find('input').prop('value')
				}
			},
			success: function(data) {
				if (data == 1) {
					$.ajax({
						url: '/adminko/',
						type: 'post',
						data: {
							'page': currentPage,
							'action': 'get_page'
						},
						success: function(data) {
							// $('.content-placeholder').html(data);
							elem.remove();
							update_timer();
						}
					});
				}
				update_timer();
			}
		});
	});

	$('body').on('submit', 'form[data-accept-all-quest]', function(e) {
		e.preventDefault();
		if (confirm('Точно подтвердить?')) {
			let elem = $(this).parents('.table-row');
			$.ajax({
				url: '/adminko/',
				type: 'post',
				data: {
					'page': currentPage,
					'action': 'accept-all',
					'data': {
						'accept': 'all'
					}
				},
				success: function(data) {
					if (data == 1) {
						$.ajax({
							url: '/adminko/',
							type: 'post',
							data: {
								'page': currentPage,
								'action': 'get_page'
							},
							success: function(data) {
								$('.content-placeholder').html(data);
								update_timer();
							}
						});
					}
					update_timer();
				}
			});
		}
	});

	$('body').on('click', 'button[data-reject-quest]', function(e) {
		let elem = $(this).parents('.table-row');
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'reject',
				'data': {
					'id': $(this).attr('data-reject-quest'),
				}
			},
			success: function(data) {
				if (data == 1) {
					$.ajax({
						url: '/adminko/',
						type: 'post',
						data: {
							'page': currentPage,
							'action': 'get_page'
						},
						success: function(data) {
							// $('.content-placeholder').html(data);
							elem.remove();
							update_timer();
						}
					});
				}
				update_timer();
			}
		});
	});

	$('body').on('click', 'button[data-wait-quest]', function(e) {
		let elem = $(this).parents('.table-row');
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'wait',
				'data': {
					'id': $(this).attr('data-wait-quest'),
				}
			},
			success: function(data) {
				if (data == 1) {
					$.ajax({
						url: '/adminko/',
						type: 'post',
						data: {
							'page': currentPage,
							'action': 'get_page'
						},
						success: function(data) {
							// $('.content-placeholder').html(data);
							elem.addClass('wait');
							update_timer();
						}
					});
				}
				update_timer();
			}
		});
	});

	//	вход на сайт от имени пользователя
	$('body').on('click', 'button#user_login_as', function(e) {
		e.preventDefault();
		// $('.content-header').text('Редактирование пользователя ' + $(this).text());
		$.ajax({
			url: '/adminko/',
			type: 'post',
			data: {
				'page': currentPage,
				'action': 'login_as',
				'id': $(this).attr('data-id'),
				'login': $(this).attr('data-login')
			},
			success: function(data) {
				// $('.content-placeholder').html(data);
				// update_timer();
				location.href = '/tutorial';
			}
		});
	});


});