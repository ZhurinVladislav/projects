window.onpopstate = _popState;

current_page = location.pathname.slice(1);
if (current_page == '') {
  current_page = 'main';
}

$('a[data-href="' + current_page + '"], *[data-navigation][data-href="' + current_page + '"]').addClass('active');

//	таймаут активности для авторизованных пользователей
// FIXME: Закомментировал, т.к. не работал код ниже
// if (user_logged === true) {
// 	logged_timer = setTimeout(function () {
// 		location.href = '/login';
// 	}, 3605000);
// }
// FIXME: Закомментировал, т.к. не работал код ниже
// if (localStorage['news_total_readed'] == undefined) {
// 	$('#unreaded_news').addClass('active');
// 	$('#unreaded_news').text('+1');
// } else {
// 	let unreaded_news = total_news - localStorage['news_total_readed'];
// 	if (unreaded_news > 0) {
// 		$('#unreaded_news').addClass('active');
// 		$('#unreaded_news').text(unreaded_news);
// 	}
// }

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
  // FIXME: Закомментировал, т.к. не работал код ниже
  // if (user_logged === true) {
  // 	clearTimeout(logged_timer);
  // 	logged_timer = setTimeout(function () {
  // 		location.href = '/login';
  // 	}, 901000);
  // }
}

//	Клик по ссылке
function _navigate(e, loadpath) {
  e.stopPropagation();
  e.preventDefault();

  var page = loadpath;

  ajax({ get_page: page }, function (data) {
    $('#main-placeholder').html(data);
  });
  current_page = page;
  history.pushState({ page: page }, '', '/' + page);
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
  if ($(this).attr('data-href') !== current_page || current_page == 'messages' || current_page == 'tickets') {
    let get_template = $(this).attr('data-template');
    let get_page_url = $(this).attr('data-href');

    if (get_template == current_template) {
      $('a[data-href], *[data-navigation]').removeClass('active');
      $(this).addClass('active');

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
      // 'captcha': grecaptcha.getResponse()
    },
    function (data) {
      data = JSON.parse(data);
      if (data.status == 'ok') {
        location.href = '/home';
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
        $('*[data-error="' + data.placeholder + '"]').addClass('have-error');
        if (data.print != '') {
          $('*[data-error-text="' + data.placeholder + '"]').text(data.print);
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
    .find('input:not([disabled]):not([type=file]), textarea:not([disabled]), select:not([disabled])')
    .each(function () {
      let type = $(this).attr('type');
      if (type != 'radio' || (type == 'radio' && $(this).prop('checked') == true)) {
        items[this.name] = $(this).val();
      }
    });

  if (callback == 'add-chat-message' || callback == 'add-message' || callback == 'add-ticket-message') {
    items.text = $('#textarea').html();
  }

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
            window.open(data.redirect_to);
          } else if (callback == 'add-message') {
            $('.dialog__items').append(data.message);
            $('.dialog__items').scrollTop($('.dialog__items').prop('scrollHeight'));
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
            $('.chat').append(data.message);
            $('.chat').scrollTop($('.chat').prop('scrollHeight'));
            $('body #textarea').text('');
          } else {
            $('*[data-error="' + data.placeholder + '"]').addClass('have-success');
            setTimeout(function () {
              $('*[data-error="' + data.placeholder + '"]').removeClass('have-success');
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
          $('#balance_buy').text(data.balance_buy + ' ' + coin);
          $('#balance_buy_phone').text(data.balance_buy + ' ' + coin);
        }
        if ('balance_withdrawal' in data) {
          $('#balance_withdrawal').text(data.balance_withdrawal + ' ' + coin);
          $('#balance_withdrawal_phone').text(data.balance_withdrawal + ' ' + coin);
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
    $('#avatar_load_progress .kbytes_loaded').text((e.loaded / 1000).toFixed(2));
    $('#avatar_load_progress .kbytes_total').text((e.total / 1000).toFixed(2));
  };
  xhr.send(fd);
  xhr.onload = function () {
    data = JSON.parse(xhr.responseText);
    if (data.status == 'ok') {
      $('.settings__form-img_avatar img').attr('src', $('.settings__form-img_avatar img').attr('src') + '?_=' + +new Date());
      $('.aside__avatar-frame img').attr('src', $('.aside__avatar-frame img').attr('src') + '?_=' + +new Date());
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

  let scroll_to_top = $(this).parent().attr('data-scroll-top');

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
            scrollTop: $('*[data-placeholder=' + placeholder + ']').offset().top - 200,
          },
          1000
        );
      }
    }
  );
});

$('body').on('click', 'button[data-poll]', function (e) {
  e.preventDefault();

  let currentReviewId = $(this).attr('data-id');

  ajax(
    {
      controller: $(this).attr('data-poll'),
      id: currentReviewId,
      opinion: $(this).attr('data-opinion'),
    },
    function (data) {
      if (data != 0) {
        // $('.poll-item[data-poll-id=' + currentReviewId + '] .rating').html('<button class="plus active"></button><span>' + data + '</span>');
        $('.poll-item[data-poll-id=' + currentReviewId + '] .reviews__item-rating button').remove();
        $('#rating_count_' + currentReviewId).text(data);
      }
    }
  );
});

$('body').on('click', '*[data-open-ticket]', function (e) {
  e.preventDefault();

  let ticketId = $(this).attr('data-open-ticket');

  ajax(
    {
      controller: 'tickets/get_ticket',
      id: ticketId,
    },
    function (data) {
      if (data != 0) {
        $('#main-placeholder').html(data);
      }
    }
  );
});

$('body').on('click', '#paymethod .item:not(.active)', function () {
  $('#paymethod .item').removeClass('active');
  $(this).addClass('active');
  let payment_system = $(this).find('input').prop('value');
  if (payment_system == 'payeer' || payment_system == 'advcash') {
    $('#select_currency').addClass('active');
  } else {
    $('#select_currency').removeClass('active');
  }
});

// var get = parseFloat($('#exchenge_give').val());
// var give = get + (get * 0.1);
// $('#exchenge_get').val(give.toFixed(4));

$('body').on('change', '#exchenge_give', function () {
  exchenge_give.value = exchenge_give.value.replace(/,/g, '.');
  give = parseFloat($(this).val()) + parseFloat($(this).val()) * 0.01;
  console.log(parseFloat($(this).val()) + parseFloat($(this).val()) * 0.01);
  $('#exchenge_get').text(give.toFixed(8));
});

$('body').on('mouseenter', '.select, .select label', function () {
  $(this).addClass('active');
});

$('body').on('mouseleave', '.select', function () {
  $(this).removeClass('active');
});

$('body').on('click', '.select .item', function () {
  let select_item = '#' + $(this).parent().parent('.select').attr('id');
  $(select_item + ' .select__head').text($(this).text());
  $(select_item + ' input[type="hidden"]').val($(this).attr('data-value'));
  $('.select').removeClass('active');
  // if (select_item == '#select_tariff' || select_item == '#select_unlim') {
  // 	calcPriceSurfAdd();
  // } else if (select_item == '#select_tariff_edit' || select_item == '#select_unlim_edit') {
  // 	calcPriceSurfEdit();
  // } else if (select_item == '#select_wallet_tariff') {
  // 	let amount = parseFloat($('body #deposit_amount').val());
  // 	selectDepositTariff(amount.toFixed(4));
  // }
});

$('body').on('click', '#select-currency .select__head', function () {
  $('#select-currency').toggleClass('active');
});

$('body').on('click', '#select-currency .select__body .item', function () {
  $('#select-currency').removeClass('active');
});

function calculateReplenishmentResultSum(current_currency) {
  replenishment_amount.value = replenishment_amount.value.replace(/,/g, '.');

  current_currency = $('#replenish_select_currency input[type="radio"]:checked').val();

  let enter_money = parseFloat(replenishment_amount.value.replace(/,/g, '.'));
  if (isNaN(enter_money)) {
    enter_money = 0;
  }
  let money_get = 0;

  if (current_currency == 'USD') {
    money_get = (enter_money / rates.currency_ratio).toFixed(rates.money_accuracy);
  } else if (current_currency == 'RUB') {
    money_get = (enter_money / rates.currency_ratio / rates.currency_usd).toFixed(rates.money_accuracy);
  } else if (current_currency == 'BTC') {
    // money_get = (enter_money / rates.currency_ratio * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
    money_get = enter_money.toFixed(rates.money_accuracy);
  } else if (current_currency == 'LTC') {
    money_get = ((enter_money / rates.currency_ratio / rates.currency_ltc_to_btc) * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
  } else if (current_currency == 'DASH') {
    money_get = ((enter_money / rates.currency_ratio / rates.currency_dash_to_btc) * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
  } else if (current_currency == 'DOGE') {
    money_get = ((enter_money / rates.currency_ratio / rates.currency_doge_to_btc) * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
  } else if (current_currency == 'ETH') {
    money_get = ((enter_money / rates.currency_ratio / rates.currency_eth_to_btc) * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
  }

  if (action_percent != 0) {
    money_get_action = ((money_get * action_percent) / 100).toFixed(rates.money_accuracy);
    money_get_total = (Number(money_get) + Number(money_get_action)).toFixed(rates.money_accuracy);

    $('#replenishment_action').text(money_get_action);
  } else {
    money_get_total = money_get;
  }

  $('#replenishment_get').text(money_get);
  $('#replenishment_total_sum').text(money_get_total);
}

$('body').on('click', '#replenish_select_currency input[type="radio"]', function () {
  calculateReplenishmentResultSum();
});

$('body').on('change', '#replenishment_amount', function () {
  replenishment_amount.value = replenishment_amount.value.replace(/,/g, '.');
  let amount = parseFloat($(this).val());
  if (amount > 0) {
    $('*[data-error="wrong_amount"]').removeClass('have-error');
    $('*[data-error="wrong_amount"]').addClass('have-success');
    calculateReplenishmentResultSum();
  } else {
    $('*[data-error="wrong_amount"]').removeClass('have-success');
    $('*[data-error="wrong_amount"]').addClass('have-error');
  }
});

$('body').on('change', '#amount_withdraw', function () {
  let amount = parseFloat($(this).val());
  if (amount > 0) {
    $('*[data-error="wrong_amount"]').removeClass('have-error');
    $('*[data-error="wrong_amount"]').addClass('have-success');
    calculateWithdrawalResultSum();
  } else {
    $('*[data-error="wrong_amount"]').removeClass('have-success');
    $('*[data-error="wrong_amount"]').addClass('have-error');
  }
});

$('body').on('click', '#paymethod .item', function () {
  $('#paymethod .item').removeClass('active');
  $('#paymethod .item input').prop('checked', false);
  $(this).toggleClass('active');
  $('.currencys_item').removeClass('active');

  $(this).find('input').prop('checked', true);
  let system = $(this).find('input').val();
  if (system == 'payeer') {
    $('#currency-rub').addClass('active');
    $('#currency-usd').addClass('active');
    $('#currency-rub input').prop('checked', true);
  } else if (system == 'qiwi') {
    $('#currency-rub').addClass('active');
    $('#currency-rub input').prop('checked', true);
  } else if (system == 'yandex') {
    $('#currency-rub').addClass('active');
    $('#currency-rub input').prop('checked', true);
  } else if (system == 'perfectmoney') {
    $('#currency-usd').addClass('active');
    $('#currency-usd input').prop('checked', true);
  } else if (system == 'advcash') {
    $('#currency-rub').addClass('active');
    $('#currency-usd').addClass('active');
    $('#currency-rub input').prop('checked', true);
  } else if (system == 'bitcoin') {
    $('#currency-btc').addClass('active');
    $('#currency-btc input').prop('checked', true);
  } else if (system == 'litecoin') {
    $('#currency-litecoin').addClass('active');
    $('#currency-litecoin input').prop('checked', true);
  } else if (system == 'dash') {
    $('#currency-dash').addClass('active');
    $('#currency-dash input').prop('checked', true);
  } else if (system == 'doge') {
    $('#currency-doge').addClass('active');
    $('#currency-doge input').prop('checked', true);
  } else if (system == 'ethereum') {
    $('#currency-ethereum').addClass('active');
    $('#currency-ethereum input').prop('checked', true);
  }
  calculateReplenishmentResultSum();
});

function calculateWithdrawalResultSum(current_currency) {
  amount_withdraw.value = amount_withdraw.value.replace(/,/g, '.');

  current_currency = $('#withdrawal_select_currency input[type="radio"]:checked').val();

  let enter_money = parseFloat(amount_withdraw.value.replace(/,/g, '.'));
  if (isNaN(enter_money)) {
    enter_money = 0;
  }
  let total_money = 0;

  if (current_currency == 'USD') {
    total_money = (enter_money * rates.currency_ratio).toFixed(2);
    $('.money__form-item .rate .amount').text((1 * rates.currency_ratio).toFixed(2));
  } else if (current_currency == 'RUB') {
    total_money = (enter_money * rates.currency_ratio * rates.currency_usd).toFixed(2);
    $('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
  } else if (current_currency == 'BTC') {
    // total_money = (enter_money * rates.currency_ratio * rates.currency_usd_to_btc).toFixed(4);
    total_money = enter_money.toFixed(8);
    // $('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd_to_btc).toFixed(4));
    $('.money__form-item .rate .amount').text((1).toFixed(8));
  }

  if (current_currency == 'BTC') {
    var money_comission = (total_money * 0.05 + 0.0004).toFixed(8);
    console.log(total_money - money_comission);
    var total_get = (total_money - money_comission).toFixed(8);
    if (total_get > 0) {
      $('#withdrawal-total span.amount').text(total_get);
    } else {
      $('#withdrawal-total span.amount').text((0).toFixed(8));
    }
  } else {
    var money_comission = (total_money * 0.05).toFixed(2);
    var total_get = (total_money - money_comission).toFixed(2);
    if (total_get > 0) {
      $('#withdrawal-total span.amount').text(total_get);
    } else {
      $('#withdrawal-total span.amount').text(0);
    }
  }

  $('.money__form-item .rate .currency, #withdrawal-total span.currency').text(current_currency);
}

$('body').on('click', '#withdrawal_select_currency input[type="radio"]', function () {
  calculateWithdrawalResultSum();
});

// $('body').on('change', '#amount_withdraw', function() {
// 	calculateWithdrawalResultSum();
// });

$('body').on('click', '#withdrawal .item', function () {
  $('#withdrawal .item').removeClass('active');
  $('#withdrawal .item input').prop('checked', false);
  $(this).toggleClass('active');
  $('.currencys_item').removeClass('active');

  $(this).find('input').prop('checked', true);
  let system = $(this).find('input').val();
  $('#wallet').prop('value', '');
  $('.money__form-item_body .title, .money__form-item_body .dop_title span').text(system);

  $('.money__form-item .commission_btc').removeClass('active');

  if (system == 'payeer') {
    $('#currency-rub').addClass('active');
    $('#currency-usd').addClass('active');
    $('#currency-rub input').prop('checked', true);
    $('.money__form-item .rate .currency, #withdrawal-total span.currency').text('RUB');
    $('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
    $('#wallet').prop('value', wallets.payeer);
  } else if (system == 'advcash') {
    $('#currency-rub').addClass('active');
    $('#currency-usd').addClass('active');
    $('#currency-rub input').prop('checked', true);
    $('.money__form-item .rate .currency, #withdrawal-total span.currency').text('RUB');
    $('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
    $('#wallet').prop('value', wallets.advcash);
  } else if (system == 'qiwi') {
    $('#currency-rub').addClass('active');
    $('#currency-rub input').prop('checked', true);
    $('.money__form-item .rate .currency, #withdrawal-total span.currency').text('RUB');
    $('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
    $('#wallet').prop('value', wallets.qiwi);
  } else if (system == 'bitcoin') {
    $('#currency-btc').addClass('active');
    $('#currency-btc input').prop('checked', true);
    $('.money__form-item .rate .currency, #withdrawal-total span.currency').text('BTC');
    $('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd_to_btc).toFixed(8));
    $('.money__form-item .commission_btc').addClass('active');
  } else if (system == 'perfectmoney') {
    $('#currency-usd').addClass('active');
    $('#currency-usd input').prop('checked', true);
    $('.money__form-item .rate .currency, #withdrawal-total span.currency').text('USD');
    $('.money__form-item .rate .amount').text((1 * rates.currency_ratio).toFixed(2));
    $('#wallet').prop('value', wallets.perfectmoney);
  }

  calculateWithdrawalResultSum();
});

//	custom code
const searchServices = () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || searchInput === null) return;
  if (!searchResults || searchResults === null) return;

  searchResults.style.display = 'none';

  searchInput.addEventListener('input', function () {
    const query = this.value.trim();

    ajax(
      {
        controller: 'services/search_services',
        query: query,
      },
      data => {
        if (data.length > 0 && query !== '') {
          searchResults.innerHTML = '';
          searchResults.style.display = 'flex';
          data.forEach(el => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            item.classList.add('search-result__item');
            link.classList.add('search-result__item-link');
            link.href = `./rating?id=${el.category_id}`;

            link.textContent = el.name;

            item.append(link);
            searchResults.append(item);
          });
        } else {
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
        }
      }
    );
  });
};

searchServices();

const feedbackMainPage = () => {
  const form = document.getElementById('feedback-form');
  const resultWrap = document.getElementById('feedback-result');

  if (!form || form === null) return;
  if (!resultWrap || resultWrap === null) return;

  const radioInputs = Array.from(form.querySelectorAll('input[name^="vote"]'));

  if (radioInputs.length === 0 || !radioInputs || radioInputs === null) return;

  form.addEventListener('submit', ev => {
    ev.preventDefault();

    let value;

    radioInputs.forEach(input => {
      if (input.checked) value = input.value;
    });

    ajax(
      {
        controller: 'feedback/feedback',
        vote: value,
      },
      data => {
        if (data.length > 0 && data !== '' && data !== null && data) {
          console.log(data);

          resultWrap.innerHTML = '';
          const result = document.createElement('div');
          const title = document.createElement('h3');
          const text = document.createElement('p');
          const list = document.createElement('ul');

          result.classList.add('feedback__result');
          title.classList.add('feedback__title', 'h-2');
          text.classList.add('feedback__text');
          list.classList.add('feedback__result-list');

          title.textContent = 'На что больше всего обращают внимание при выборе архитектурного бюро';
          text.textContent = 'Спасибо за ваше мнение!';

          const totalVotes = data.reduce((sum, vote) => sum + vote.count, 0);

          data.forEach(el => {
            const percentage = totalVotes ? Math.round((el.count / totalVotes) * 100) : 0;

            const listItem = document.createElement('li');
            const infoItem = document.createElement('div');
            const titleItem = document.createElement('h4');
            const lineWrapItem = document.createElement('div');
            const lineItem = document.createElement('div');
            const statsItem = document.createElement('div');
            const iconItem = '<svg class="feedback-result-item__stats-icon"><use xlink:href="./app/img/icons/icons.svg#men"></use></svg>';
            const statItem = document.createElement('p');

            listItem.classList.add('feedback__result-list-item', 'feedback-result-item');
            infoItem.classList.add('feedback-result-item__left');
            titleItem.classList.add('feedback-result-item__title');
            lineWrapItem.classList.add('feedback-result-item__line-wrap');
            lineItem.classList.add('feedback-result-item__line');
            lineItem.style.width = `${percentage}%`;
            statsItem.classList.add('feedback-result-item__stats');
            statItem.classList.add('feedback-result-item__stats-text');

            titleItem.textContent = el.option_name;
            statItem.textContent = `${el.count} (${percentage}%)`;

            listItem.append(infoItem);
            infoItem.append(titleItem);
            infoItem.append(lineWrapItem);
            lineWrapItem.append(lineItem);
            listItem.append(statsItem);
            statsItem.innerHTML = iconItem;
            statsItem.append(statItem);
            list.append(listItem);
          });

          result.append(title);
          result.append(text);
          result.append(list);
          resultWrap.append(result);
        }
        // else {
        // 	searchResults.innerHTML = '';
        // 	searchResults.style.display = 'none';
        // }
      }
    );
  });
};

feedbackMainPage();

const ratingReview = () => {
  const wrap = document.getElementById('rating-review');
  const input = document.getElementById('rating-value');

  if (!wrap || wrap === null) return;
  if (!input || input === null) return;

  const itemsArr = Array.from(wrap.querySelectorAll('.js-review-star'));

  if (itemsArr.length === 0 || !itemsArr || itemsArr === null) return;

  itemsArr.forEach(el => {
    el.classList.add('selected');
  });

  itemsArr.forEach(el => {
    el.addEventListener('click', () => {
      const value = el.getAttribute('data-value');

      itemsArr.forEach(s => s.classList.remove('selected'));

      itemsArr.forEach(s => {
        if (parseInt(s.getAttribute('data-value')) <= value) {
          s.classList.add('selected');
        }
      });

      input.value = value;
    });
  });
};

ratingReview();

// const validateFormReview = (arrInput, btn) => {
// 	if (arrInput.length === 0 || !arrInput || arrInput === null) return;
// 	if (!btn || btn == null) return;

// 	btn.addEventListener('click', () => {
// 		console.log('asd');
// 		arrInput.forEach(el => {
// 			console.log(el);

// 			el.classList.add('error');
// 		});
// 	});
// };

const createReview = () => {
  const form = document.getElementById('form-review');
  const content = document.getElementById('popup-reviews-content');

  if (!form || content === null) return;

  // const btn = document.getElementById('btn-submit');

  // if (btn) btn.disabled = true;

  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const companyName = document.getElementById('company-name');
    const rating = document.getElementById('rating-value');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const message = document.getElementById('comment');
    const honeypot = document.getElementById('honeypot');
    const formStartTime = document.getElementById('form-start-time');

    // validateFormReview([rating, firstName, lastName, email, message], btn);

    if (companyName.value === '' && rating.value === '' && firstName.value === '' && lastName === '' && email === '' && message.value === '') {
      return;
    }

    const data = {
      companyName: companyName.value,
      rating: rating.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
      honeypot: honeypot.value,
      formStartTime: formStartTime.value,
    };

    ajax(
      {
        controller: 'reviewsCompany/createReview',
        data: data,
      },
      data => {
        if (data && (content || content !== null)) {
          content.innerHTML = '';
          const title = document.createElement('h3');
          const text = document.createElement('p');

          title.classList.add('popup__title');
          text.classList.add('popup__text');

          title.textContent = 'Спасибо за отзыв!';
          text.textContent = 'Отзыв был отправлен на модерацию.';

          content.append(title);
          content.append(text);
        }
      }
    );
  });
};

createReview();
