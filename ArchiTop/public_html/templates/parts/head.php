<?php
$current_page = $_GET['q'] ?? 'main'; // Определяем текущую страницу
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <base href="/" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="<?= htmlspecialchars($page_description) ?>">

    <title><?= htmlspecialchars($page_title) ?></title>

    <link href="./app/img/favicon.svg" rel="icon" type="image/svg+xml" />
    <link rel="stylesheet" href="./app/css/style.min.css?_v=20250127155512" />

    <script src="./app/js/libs/preloader.min.js?_v=20250127155512"></script>
    <script src="./app/js/libs/lightgallery-all.min.js" defer></script>
    <script src="./app/js/libs/lazy-load.min.js?_v=20250127155512"></script>
    <script src="./app/js/libs/webp.min.js?_v=20250127155512" defer></script>
    <script src="./app/js/libs/modal-window.min.js?_v=20250127155512" defer></script>
    <!-- <script src="./app/js/index.min.js?_v=20250127155512" defer></script> -->
</head>

<body <?= $current_page == 'main' ? ' class= "main"' : '' ?>>
    <div id="preloader" class="preloader">
        <div class="preloader__wrapper">
            <div class="preloader__item-wrapper">
                <div class="preloader__item"></div>
            </div>
        </div>
    </div>