<?php
global $root_url, $user;
?>
<!DOCTYPE html>
<html lang="<?= $user->language; ?>">

<head>
    <meta charset="UTF-8">
    <base href="/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./app/img/favicon.svg" rel="icon" type="image/svg+xml" />
    <title>Архитектурные бюро Краснодарского края</title>

    <link rel="stylesheet" href="/app/css/style.min.css">
    <link rel="preconnect" href="http://architectop.web2mail.beget.tech/">
    <link rel="dns-prefetch" href="http://architectop.web2mail.beget.tech/">

    <script>
        if (window.location.search.indexOf('r=') != -1 || window.location.search.indexOf('s=') != -1) {
            window.location.href = window.location.href.replace(window.location.search, '');
        }
    </script>
    <script src="/app/js/libs/preloader.min.js"></script>
    <script src="/app/js/libs/lazy-load.min.js"></script>
    <script src="/app/js/libs/lightgallery-all.min.js" defer></script>
    <script src="/app/js/libs/webp.min.js" defer></script>
    <script src="/app/js/libs/select.min.js" defer></script>
    <script src="/app/js/libs/modal-window.min.js" defer></script>
</head>

<body class="home-page <?= $template; ?>">
    <div id="preloader" class="preloader">
        <div class="preloader__wrapper">
            <div class="preloader__item-wrapper">
                <div class="preloader__item"></div>
            </div>
        </div>
    </div>