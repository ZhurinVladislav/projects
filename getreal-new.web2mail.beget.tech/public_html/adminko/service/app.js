$(function () {
  logged_timer = setTimeout(function () {
    location.reload();
  }, 3605000);

  function update_timer() {
    clearTimeout(logged_timer);
    logged_timer = setTimeout(function () {
      location.reload();
    }, 3605000);
  }

  //	toggle menu
  $('.aside__item-header').on('click', function () {
    $(this).parent().toggleClass('active');
  });

  //	получение страниц и вставка в разметку
  $('.aside__item a').on('click', function (e) {
    e.preventDefault();

    $('.aside__item a').removeClass('active');
    $(this).addClass('active');

    $('.content-header').text($(this).text());
    currentPage = $(this).attr('data-href');
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'get_page',
      },
      success: function (data) {
        $('.content-placeholder').html(data);
        update_timer();
      },
    });
  });

  $('.aside__item').addClass('active');

  //	поиск
  $('body').on('submit', '.form-search', function (e) {
    e.preventDefault();

    let placeholder = $(this).attr('data-result');
    let search_string = $(this).find('input[name=search]').val();

    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'search',
        string: search_string,
      },
      success: function (data) {
        $('*[data-placeholder=' + placeholder + ']').html(data);
        update_timer();
      },
    });
  });

  $('body').on('submit', '.form-search-date', function (e) {
    e.preventDefault();

    let placeholder = $(this).attr('data-result');
    let from = $(this).find('input[name=from]').val();
    let to = $(this).find('input[name=to]').val();

    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'search',
        from: from,
        to: to,
      },
      success: function (data) {
        $('*[data-placeholder=' + placeholder + ']').html(data);
        update_timer();
      },
    });
  });

  //	сохранение изменений в форме
  $('body').on('submit', '.form-edit', function (e) {
    e.preventDefault();

    // placeholder = $(this).attr('data-result');
    let items = {};
    $(this)
      .find('input:not([disabled]), textarea:not([disabled])')
      .each(function () {
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
        page: currentPage,
        action: action,
        id: id,
        data: items,
      },
      success: function (data) {
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
                page: currentPage,
                action: 'get_page',
              },
              success: function (data) {
                $('.content-placeholder').html(data);
                update_timer();
              },
            });
          }
        } else {
          alert('Ошибка! Что-то сломалось, зовите программиста!');
        }
        update_timer();
      },
    });
  });

  //	сохранение изменений в форме
  $('body').on('submit', '.form-edit-new', function (e) {
    e.preventDefault();

    let items = {};

    $(this)
      .find('select, input:not([disabled]):not([type=file]), textarea:not([disabled])')
      .each(function () {
        items[this.name] = $(this).val();
      });

    $(this)
      .find('input[type=file]')
      .each(function (index, element) {
        if (element.files && element.files.length > 0) {
          // Если файл выбран, добавляем его имя в объект items
          items[element.name] = element.files[0].name;
        } else {
          // Если файл не выбран, можно добавить обработку или оставить пустым
          items[element.name] = null; // Или другое значение по умолчанию
        }
      });

    const imageInputs = document.querySelectorAll('input[type="file"]');
    let id = $(this).find('input[name=id]').val();
    const page = $(this).attr('data-page-handler');

    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: page,
        action: 'edit',
        data: items,
        id: id,
      },
      success: function (data) {
        if (data) {
          // Функция для обработки всех файлов
          const processFiles = () => {
            imageInputs.forEach(input => {
              // Проверяем, выбраны ли файлы
              if (!input.files || input.files.length === 0) {
                console.error(`Файлы не выбраны для input с именем ${input.name}.`);
                return;
              }

              // Создаем FormData для отправки данных
              const formData = new FormData();

              // Добавляем выбранные файлы в FormData
              for (let i = 0; i < input.files.length; i++) {
                formData.append(input.name, input.files[i]); // Используем имя input как ключ
              }

              // Добавляем другие данные (например, id, путь сохранения)
              formData.append('id', input.dataset.id || '');
              formData.append('path', input.dataset.savePath || '');

              // Создаем и настраиваем XMLHttpRequest
              const xhr = new XMLHttpRequest();
              xhr.open('POST', '/adminko/uploadImage.php', true);

              // Обработчик прогресса загрузки
              xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                  console.log(`Загружено: ${e.loaded} из ${e.total} байт`);
                }
              };

              // Обработчик успешной загрузки
              xhr.onload = function () {
                if (xhr.status === 200) {
                  console.log(`Файлы из input ${input.name} успешно загружены:`, xhr.responseText);
                } else {
                  console.error(`Ошибка загрузки для input ${input.name}:`, xhr.status, xhr.statusText);
                }
              };

              // Обработчик ошибки
              xhr.onerror = function () {
                console.error(`Ошибка при отправке запроса для input ${input.name}`);
              };

              // Отправляем запрос
              xhr.send(formData);
            });
          };

          alert('Успешное обновление компании!');
          $.ajax({
            url: '/adminko/',
            type: 'post',
            data: {
              page: currentPage,
              action: 'get_page',
              id: id,
            },
            success: function (data) {
              $('.content-placeholder').html(data);
              update_timer();
            },
          });
          // Вызываем функцию для обработки файлов
          // processFiles();

          // document.querySelectorAll('.btn_edit').forEach(btn => {
          //   btn.style.display = 'inline-block' ? 'none' : 'inline-block';
          // });
        } else {
          alert('При обновление компании произошла ошибка!');
        }
        update_timer();
      },
    });
  });

  // добавление элемента куда-либо
  $('body').on('submit', '.form-add', function (e) {
    e.preventDefault();

    let items = {};

    $(this)
      .find('select, input:not([disabled]):not([type=file]), textarea:not([disabled])')
      .each(function () {
        items[this.name] = $(this).val();
      });

    $(this)
      .find('input[type=file]')
      .each(function (index, element) {
        if (element.files && element.files.length > 0) {
          // Если файл выбран, добавляем его имя в объект items
          items[element.name] = element.files[0].name;
        } else {
          // Если файл не выбран, можно добавить обработку или оставить пустым
          items[element.name] = null; // Или другое значение по умолчанию
        }
      });

    const imageInputs = document.querySelectorAll('input[type="file"]');

    const page = $(this).attr('data-page-handler');

    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: page,
        action: 'add',
        data: items,
      },
      success: function (data) {
        if (data) {
          // Функция для обработки всех файлов
          const processFiles = () => {
            imageInputs.forEach(input => {
              // Проверяем, выбраны ли файлы
              if (!input.files || input.files.length === 0) {
                console.error(`Файлы не выбраны для input с именем ${input.name}.`);
                return;
              }

              // Создаем FormData для отправки данных
              const formData = new FormData();

              // Добавляем выбранные файлы в FormData
              for (let i = 0; i < input.files.length; i++) {
                formData.append(input.name, input.files[i]); // Используем имя input как ключ
              }

              // Добавляем другие данные (например, id, путь сохранения)
              formData.append('id', input.dataset.id || '');
              formData.append('path', input.dataset.savePath || '');

              // Создаем и настраиваем XMLHttpRequest
              const xhr = new XMLHttpRequest();
              xhr.open('POST', '/adminko/uploadImage.php', true);

              // Обработчик прогресса загрузки
              xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                  console.log(`Загружено: ${e.loaded} из ${e.total} байт`);
                }
              };

              // Обработчик успешной загрузки
              xhr.onload = function () {
                if (xhr.status === 200) {
                  console.log(`Файлы из input ${input.name} успешно загружены:`, xhr.responseText);
                } else {
                  console.error(`Ошибка загрузки для input ${input.name}:`, xhr.status, xhr.statusText);
                }
              };

              // Обработчик ошибки
              xhr.onerror = function () {
                console.error(`Ошибка при отправке запроса для input ${input.name}`);
              };

              // Отправляем запрос
              xhr.send(formData);
            });
          };

          // Вызываем функцию для обработки файлов
          processFiles();

          alert('Успешное добавление компании!');
          $.ajax({
            url: '/adminko/',
            type: 'post',
            data: {
              page: 'companies/index',
              action: 'get_page',
            },
            success: function (data) {
              $('.content-placeholder').html(data);
              update_timer();
            },
          });
        } else {
          alert(`Произошла ошибка во время обновления компании! ${data}`);
        }
        update_timer();
      },
    });
  });

  // $('body').on('submit', '.form-add', function (e) {
  //   e.preventDefault();

  //   // placeholder = $(this).attr('data-result');
  //   let items = {};

  //   // $(this)
  //   //   .find('input:not([disabled]):not([type=file]), textarea:not([disabled])')
  //   //   .each(function () {
  //   //     items[this.name] = $(this).val();
  //   //   });

  //   $(this)
  //     .find('input:not([disabled]):not([type=file]), textarea')
  //     .each(function () {
  //       let name = $(this).attr('name');

  //       // Проверяем, есть ли у элемента `name`
  //       if (!name) return;

  //       // Обрабатываем множественные поля (phones[], services[])
  //       if (name.endsWith('[]')) {
  //         if (!items[name]) {
  //           items[name] = [];
  //         }
  //         items[name].push($(this).val());
  //       } else {
  //         items[name] = $(this).val();
  //       }
  //     });

  //   // $(this)
  //   //   .find('input[type=file]')
  //   //   .each(function () {
  //   //     let name = $(this).attr('name');
  //   //     // items[this.name] = $(this)[0].files[0].name;
  //   //   });
  //   $(this)
  //     .find('input[type=file]')
  //     .each(function (index, element) {
  //       if (!items[this.name]) return;

  //       items[this.name] = $(this)[0].files[0].name;
  //     });

  //   let images = $(this).find('input[type=file]');

  //   let button = $(this).find('button[type="submit"]');
  //   let page = $(this).attr('data-page-handler');

  //   $.ajax({
  //     url: '/adminko/',
  //     type: 'post',
  //     data: {
  //       page: page,
  //       action: 'add',
  //       data: items,
  //     },
  //     success: function (data) {
  //       // if (data == 1) {
  //       // 	$.ajax({
  //       // 		url: '/adminko/',
  //       // 		type: 'post',
  //       // 		data: {
  //       // 			'page': currentPage,
  //       // 			'action': 'get_page'
  //       // 		},
  //       // 		success: function(data) {
  //       // 			$('.content-placeholder').html(data);
  //       // 		}
  //       // 	});
  //       // } else {
  //       // 	alert('Ошибка! Что-то сломалось, зовите программиста!');
  //       // }
  //       if (data == 1) {
  //         images.each(function (key) {
  //           let fd = new FormData();
  //           fd.append('file', this.files[0]);
  //           fd.append('path', $(this).attr('data-save-path'));
  //           fd.append('id', $(this).attr('data-id'));

  //           let xhr = new XMLHttpRequest();
  //           xhr.open('POST', '/adminko/upload_image.php');
  //           xhr.upload.onprogress = function (e) {
  //             console.log(e.loaded);
  //           };
  //           xhr.send(fd);
  //           xhr.onload = function () {
  //             console.log(xhr.responseText);
  //           };
  //           if (key == images.length - 1) {
  //             alert('Ready');
  //           }
  //         });
  //       }
  //       update_timer();
  //       // alert(data);
  //     },
  //   });
  // });

  // $('.form-add').on('submit', function (e) {
  //   e.preventDefault();

  //   let formData = new FormData();
  //   let items = {};

  //   $(this)
  //     .find('input:not([disabled]):not([type=file]), textarea')
  //     .each(function () {
  //       let name = $(this).attr('name');

  //       // Проверяем, есть ли у элемента `name`
  //       if (!name) return;

  //       // Если поле является массивом (например, phones[] или services[])
  //       if (name.endsWith('[]')) {
  //         if (!items[name]) {
  //           items[name] = [];
  //         }
  //         items[name].push($(this).val());
  //       } else {
  //         items[name] = $(this).val();
  //       }
  //     });

  //   // Добавляем файлы
  //   $(this)
  //     .find('input[type=file]')
  //     .each(function () {
  //       let name = $(this).attr('name');
  //       if (!name) return;
  //       formData.append(name, this.files[0]);
  //     });

  //   // Переносим все данные в `FormData`
  //   for (let key in items) {
  //     if (Array.isArray(items[key])) {
  //       items[key].forEach(value => formData.append(`${key}[]`, value)); // 🔥 Добавляем `[]` в ключ
  //     } else {
  //       formData.append(key, items[key]);
  //     }
  //   }

  //   // Добавляем дополнительные параметры
  //   const page = $(this).attr('data-page-handler');
  //   formData.append('page', `${page}`);
  //   formData.append('action', 'add');

  //   $.ajax({
  //     url: '/adminko/',
  //     type: 'POST',
  //     data: formData,
  //     processData: false,
  //     contentType: false,
  //     success: function (data) {
  //       alert(data == 1 ? 'Компания успешно добавлена!' : 'Ошибка добавления!');
  //     },
  //   });
  // });

  // удаление элемента
  $('body').on('submit', '.form-delete', function (e) {
    e.preventDefault();

    let items = {};

    $(this)
      .find('input:not([disabled]):not([type=file]), textarea:not([disabled])')
      .each(function () {
        items[this.name] = $(this).val();
      });

    const page = $(this).attr('data-page-handler');
    let isBoss = confirm('Вы уверены в том, что хотите удалить компанию?');

    if (isBoss) {
      $.ajax({
        url: '/adminko/',
        type: 'post',
        data: {
          page: page,
          action: 'delete',
          data: items,
        },
        success: function (data) {
          if (data) {
            alert('Успешное удаление компании!');
            $.ajax({
              url: '/adminko/',
              type: 'post',
              data: {
                page: 'companies/index',
                action: 'get_page',
              },
              success: function (data) {
                $('.content-placeholder').html(data);
                update_timer();
              },
            });
          } else {
            alert(`Произошла ошибка во время удаления компании! ${data}`);
          }
          update_timer();
        },
      });
    }
  });

  $('body').on('submit', '.form-delete-item', function (e) {
    e.preventDefault();

    let items = {};

    $(this)
      .find('input:not([disabled]):not([type=file]), textarea:not([disabled])')
      .each(function () {
        items[this.name] = $(this).val();
      });

    let id = $(this).find('input[name=id]').val();
    const page = $(this).attr('data-page-handler');
    let isBoss = confirm('Вы уверены в том, что хотите удалить элемент?');

    if (isBoss) {
      $.ajax({
        url: '/adminko/',
        type: 'post',
        data: {
          page: page,
          action: 'delete',
          data: items,
          id: id,
        },
        success: function (data) {
          if (data) {
            alert('Успешное удаление элемента!');
            $.ajax({
              url: '/adminko/',
              type: 'post',
              data: {
                page: currentPage,
                action: 'get_page',
                id: id,
              },
              success: function (data) {
                $('.content-placeholder').html(data);
                update_timer();
              },
            });
          } else {
            alert(`Произошла ошибка во время удаления элемента! ${data}`);
          }
          update_timer();
        },
      });
    }
  });

  $('body').on('submit', '.form-send-message', function (e) {
    e.preventDefault();

    // placeholder = $(this).attr('data-result');
    let items = {};
    $(this)
      .find('input:not([disabled]), textarea:not([disabled])')
      .each(function () {
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
        page: currentPage,
        action: 'send_message',
        id: id,
        data: items,
      },
      success: function (data) {
        if (data == 1) {
          submit_button.addClass('complete');
          submit_button.textContent('Готово');
          inputs.val('');
        } else {
          alert('Ошибка! Что-то сломалось, зовите программиста!');
        }
        update_timer();
      },
    });
  });

  //	получение страницы редактирования чего-либо
  $('body').on('click', '*[data-edit]', function (e) {
    e.preventDefault();
    // $('.content-header').text('Редактирование пользователя ' + $(this).text());
    currentPage = $(this).attr('data-edit');
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'get_page',
        id: $(this).attr('data-id'),
      },
      success: function (data) {
        $('.content-placeholder').html(data);
        if ($('.main > .container').offset().top < -50) {
          $('.main').animate({ scrollTop: $('.main > .container').offset().top - 20 }, 500);
        }
        update_timer();
      },
    });
  });

  //	получение страницы удаления чего-либо
  $('body').on('click', '*[data-delete-new]', function (e) {
    e.preventDefault();
    currentPage = $(this).attr('data-delete-new');
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'get_page',
        id: $(this).attr('data-id'),
      },
      success: function (data) {
        $('.content-placeholder').html(data);
        if ($('.main > .container').offset().top < -50) {
          $('.main').animate({ scrollTop: $('.main > .container').offset().top - 20 }, 500);
        }
        update_timer();
      },
    });
  });

  //	получение страницы создания чего-либо
  $('body').on('click', '*[data-store]', function (e) {
    e.preventDefault();
    currentPage = $(this).attr('data-store');

    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'get_page',
      },
      success: function (data) {
        $('.content-placeholder').html(data);
        if ($('.main > .container').offset().top < -50) {
          $('.main').animate({ scrollTop: $('.main > .container').offset().top - 20 }, 500);
        }
        update_timer();
      },
    });
  });

  $('body').on('input', '.form-edit input[type="text"]', function () {
    $(this).parents('.form-edit').find('button[type="submit"]').removeClass('complete');
  });
  $('body').on('focus', '.form-edit textarea', function () {
    $(this).parents('.form-edit').find('button[type="submit"]').removeClass('complete');
  });

  $('body').on('click', 'button[data-open-form]', function (e) {
    e.preventDefault();
    $(this).parents('form').find('.form-hidden-section').toggleClass('active');
  });

  $('body').on('click', 'button[data-delete]', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'delete',
        id: $(this).attr('data-delete'),
      },
      success: function (data) {
        if (data == 1) {
          $.ajax({
            url: '/adminko/',
            type: 'post',
            data: {
              page: currentPage,
              action: 'get_page',
            },
            success: function (data) {
              $('.content-placeholder').html(data);
              update_timer();
            },
          });
        } else {
          alert('Ошибка! Что-то сломалось, зовите программиста!');
        }
        update_timer();
      },
    });
  });

  $('body').on('click', '.pagination a', function (e) {
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
        page: currentPage,
        action: 'get_page',
        data: {
          page: $(this).attr('data-page'),
          status: status,
        },
      },
      success: function (data) {
        $('*[data-placeholder=' + placeholder + ']').html(data);
        update_timer();
      },
    });
  });

  $('body').on('click', 'a.get-status-list', function (e) {
    e.preventDefault();
    let placeholder = $(this).attr('data-result');

    $('a.get-status-list').removeClass('active');
    $(this).addClass('active');

    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'get_page',
        data: {
          status: $(this).attr('data-status'),
        },
      },
      success: function (data) {
        $('*[data-placeholder=' + placeholder + ']').html(data);
        update_timer();
      },
    });
  });

  $('body').on('click', 'button[data-set-status]', function (e) {
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'set_status',
        data: {
          id: $(this).attr('data-id'),
          status: $(this).attr('data-set-status'),
        },
      },
      success: function (data) {
        if (data == 1) {
          $.ajax({
            url: '/adminko/',
            type: 'post',
            data: {
              page: currentPage,
              action: 'get_page',
              data: {
                status: $('.get-status-list.active').attr('data-status'),
              },
            },
            success: function (data) {
              $('*[data-placeholder=result_payments]').html(data);
              update_timer();
            },
          });
        }
        update_timer();
      },
    });
  });

  $('body').on('submit', 'form[data-accept-quest]', function (e) {
    e.preventDefault();
    let elem = $(this).parents('.table-row');
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'accept',
        data: {
          id: $(this).attr('data-accept-quest'),
          reward: $(this).find('input').prop('value'),
        },
      },
      success: function (data) {
        if (data == 1) {
          $.ajax({
            url: '/adminko/',
            type: 'post',
            data: {
              page: currentPage,
              action: 'get_page',
            },
            success: function (data) {
              // $('.content-placeholder').html(data);
              elem.remove();
              update_timer();
            },
          });
        }
        update_timer();
      },
    });
  });

  $('body').on('submit', 'form[data-accept-all-quest]', function (e) {
    e.preventDefault();
    if (confirm('Точно подтвердить?')) {
      let elem = $(this).parents('.table-row');
      $.ajax({
        url: '/adminko/',
        type: 'post',
        data: {
          page: currentPage,
          action: 'accept-all',
          data: {
            accept: 'all',
          },
        },
        success: function (data) {
          if (data == 1) {
            $.ajax({
              url: '/adminko/',
              type: 'post',
              data: {
                page: currentPage,
                action: 'get_page',
              },
              success: function (data) {
                $('.content-placeholder').html(data);
                update_timer();
              },
            });
          }
          update_timer();
        },
      });
    }
  });

  $('body').on('click', 'button[data-reject-quest]', function (e) {
    let elem = $(this).parents('.table-row');
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'reject',
        data: {
          id: $(this).attr('data-reject-quest'),
        },
      },
      success: function (data) {
        if (data == 1) {
          $.ajax({
            url: '/adminko/',
            type: 'post',
            data: {
              page: currentPage,
              action: 'get_page',
            },
            success: function (data) {
              // $('.content-placeholder').html(data);
              elem.remove();
              update_timer();
            },
          });
        }
        update_timer();
      },
    });
  });

  $('body').on('click', 'button[data-wait-quest]', function (e) {
    let elem = $(this).parents('.table-row');
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'wait',
        data: {
          id: $(this).attr('data-wait-quest'),
        },
      },
      success: function (data) {
        if (data == 1) {
          $.ajax({
            url: '/adminko/',
            type: 'post',
            data: {
              page: currentPage,
              action: 'get_page',
            },
            success: function (data) {
              // $('.content-placeholder').html(data);
              elem.addClass('wait');
              update_timer();
            },
          });
        }
        update_timer();
      },
    });
  });

  //	вход на сайт от имени пользователя
  $('body').on('click', 'button#user_login_as', function (e) {
    e.preventDefault();
    // $('.content-header').text('Редактирование пользователя ' + $(this).text());
    $.ajax({
      url: '/adminko/',
      type: 'post',
      data: {
        page: currentPage,
        action: 'login_as',
        id: $(this).attr('data-id'),
        login: $(this).attr('data-login'),
      },
      success: function (data) {
        // $('.content-placeholder').html(data);
        // update_timer();
        location.href = '/tutorial';
      },
    });
  });
});
