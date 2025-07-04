<?php

// define('ENGINE', true);
// require '../config.php';
// global $pdo;
// require '../database.php';

// function show_404()
// {
//     header('HTTP/1.0 404 Not Found');
//     header('Accept-Ranges: bytes');
//     header('Connection: Keep-Alive');
//     header('Keep-Alive: timeout=5, max=100');
//     header('ETag: "2b6-5644af9bfb000"');
//     header('Last-Modified: Sat, 03 Feb 2018 08:54:24 GMT');
//     header_remove('X-Powered-By');
//     // readfile('../errors/404.html');
//     echo 'access denied';
//     die;
// }

// if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
//     show_404();
// }

// if (!isset($_SESSION['admin_logged'])) {
//     show_404();
// } else {
//     if (
//         $_SERVER['REQUEST_METHOD'] === 'POST'
//     ) {
//         $maxFileSize = 2 * 1024 * 1024 * 1024; // Максимальный размер файла (2 ГБ)
//         $uploadDir = '../' . $_POST['path'] . '/'; // Директория для загрузки файлов

//         // Проверяем, существует ли директория, если нет — создаем
//         if (!is_dir($uploadDir)) {
//             mkdir($uploadDir, 0777, true);
//         }

//         // Разрешенные расширения файлов
//         $allowedExtensions = [
//             'jpg',
//             'jpeg',
//             'png',
//             'gif',
//             'svg'
//         ];

//         // Перебираем все файлы из $_FILES
//         foreach ($_FILES as $inputName => $file) {
//             // Проверяем, был ли файл загружен корректно
//             if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
//                 echo "Файл из поля {$inputName} не загружен корректно.<br>";
//                 continue;
//             }

//             // Проверяем размер файла
//             if ($file['size'] > $maxFileSize) {
//                 echo "Файл из поля {$inputName} слишком большой. Максимальный размер — 2 ГБ.<br>";
//                 continue;
//             }

//             // Определяем MIME-тип файла
//             $finfo = new finfo(FILEINFO_MIME_TYPE);
//             $mimeType = $finfo->file($file['tmp_name']);

//             // Проверяем расширение файла
//             $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
//             if (!in_array(strtolower($fileExtension), $allowedExtensions)) {
//                 echo "Недопустимый формат файла из поля {$inputName}.<br>";
//                 continue;
//             }

//             // Генерируем уникальное имя для файла, чтобы избежать конфликтов
//             // $uniqueFileName = uniqid() . '_' . $file['name'];
//             // $destination = $uploadDir . $uniqueFileName;
//             $destination = $uploadDir . $file['name'];

//             // Перемещаем файл в директорию
//             if (move_uploaded_file($file['tmp_name'], $destination)) {
//                 echo "Файл из поля {$inputName} успешно загружен как '" . $file['name'] . "'<br>";
//             } else {
//                 echo "Ошибка при сохранении файла из поля {$inputName}.<br>";
//             }
//         }
//     } else {
//         echo "Файлы не были загружены.";
//     }
// }

if (
    $_SERVER['REQUEST_METHOD'] === 'POST'
) {
    $maxFileSize = 2 * 1024 * 1024 * 1024; // Максимальный размер файла (2 ГБ)
    $uploadDir = '../' . $_POST['path'] . '/'; // Директория для загрузки файлов

    // Проверяем, существует ли директория, если нет — создаем
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Разрешенные расширения файлов
    $allowedExtensions = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'svg'
    ];

    // Перебираем все файлы из $_FILES
    foreach ($_FILES as $inputName => $file) {
        // Проверяем, был ли файл загружен корректно
        if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
            echo "Файл из поля {$inputName} не загружен корректно.<br>";
            continue;
        }

        // Проверяем размер файла
        if ($file['size'] > $maxFileSize) {
            echo "Файл из поля {$inputName} слишком большой. Максимальный размер — 2 ГБ.<br>";
            continue;
        }

        // Определяем MIME-тип файла
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);

        // Проверяем расширение файла
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
        if (!in_array(strtolower($fileExtension), $allowedExtensions)) {
            echo "Недопустимый формат файла из поля {$inputName}.<br>";
            continue;
        }

        // Генерируем уникальное имя для файла, чтобы избежать конфликтов
        // $uniqueFileName = uniqid() . '_' . $file['name'];
        // $destination = $uploadDir . $uniqueFileName;
        $destination = $uploadDir . $file['name'];

        // Перемещаем файл в директорию
        if (move_uploaded_file($file['tmp_name'], $destination)) {
            echo "Файл из поля {$inputName} успешно загружен как '" . $file['name'] . "'<br>";
        } else {
            echo "Ошибка при сохранении файла из поля {$inputName}.<br>";
        }
    }
} else {
    echo "Файлы не были загружены.";
}
