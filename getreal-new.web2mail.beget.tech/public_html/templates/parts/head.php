<?php
$currentPage = $_GET['q'] ?? 'main';
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <base href="/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= htmlspecialchars($pageDescription) ?>">

    <title><?= htmlspecialchars($pageTitle) ?></title>

    <link href="./app/img/favicon.svg" rel="icon" type="image/svg+xml">
    <link rel="stylesheet" href="./app/css/style.css">

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('body').classList.add('loading');
            document.querySelectorAll('[data-animations]').forEach(el => {
                el.classList.add('animations');
            });
        });
    </script>

    <style>
        .visually-hidden {
            position: absolute;
            margin: -1px;
            padding: 0;
            width: 1px;
            height: 1px;
            border: 0;
            white-space: nowrap;
            clip-path: inset(100%);
            clip: rect(0 0 0 0);
            overflow: hidden;
        }
    </style>
</head>

<body <?= $currentPage == 'main' ? ' class= "home-page"' : '' ?>>