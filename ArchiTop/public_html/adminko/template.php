<?php

$get_unreaded_tickets = $pdo->query('SELECT COUNT(id) AS count FROM tickets WHERE status = 1 OR status = 3');
$get_unreaded_tickets = $get_unreaded_tickets->fetch();
$unreaded_tickets = $get_unreaded_tickets['count'];

$get_unreaded_bugs = $pdo->query('SELECT COUNT(id) AS count FROM quest_bug WHERE status = 0');
$get_unreaded_bugs = $get_unreaded_bugs->fetch();
$unreaded_bugs = $get_unreaded_bugs['count'];

$get_unreaded_forum = $pdo->query('SELECT COUNT(id) AS count FROM quest_forum WHERE status = 0');
$get_unreaded_forum = $get_unreaded_forum->fetch();
$unreaded_forum = $get_unreaded_forum['count'];

function print_counter($number)
{
    if ($number > 0) {
        return '&nbsp;<span class="aside__counter">' . $number . '</span>';
    }
}

?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Административная панель | <?= $site_name; ?></title>
    <base href="<?= $root_url; ?>adminko/">
    <link rel="stylesheet" href="/adminko/service/style.css?_=<?= time(); ?>">
    <link rel="stylesheet" href="/adminko/service/quill/style.css?_=<?= time(); ?>">
    <script src="/adminko/service/quill/index.js?_=<?= time(); ?>"></script>
</head>

<body>
    <div class="main-wrapper">
        <div class="aside">
            <div class="aside__head-block">
                <a class="button-d aside__head-link exit" href="logout.php">Выйти</a>
                <a class="button-d aside__head-link home" href="<?= $root_url; ?>" target="_blank">На сайт</a>
            </div>

            <div class="aside__wrapper">
                <div class="aside__item">
                    <span class="aside__item-header">Пользователи</span>
                    <div class="aside__subitem"><a data-href="users/users">Список пользователей</a></div>
                    <!-- <div class="aside__subitem"><a data-href="users/ref_top">Топ рефоводов</a></div> -->
                    <div class="aside__subitem"><a data-href="users/statistics">Статистика</a></div>
                    <div class="aside__subitem"><a data-href="users/fake">Фейки</a></div>
                </div>
                <div class="aside__item">
                    <span class="aside__item-header">Компании</span>
                    <div class="aside__subitem">
                        <a data-href="companies/index">Список компаний</a>
                    </div>
                </div>
                <div class="aside__item">
                    <span class="aside__item-header">Остальное</span>
                    <div class="aside__subitem"><a data-href="other/faq">FAQ</a></div>
                    <div class="aside__subitem"><a data-href="other/news">Новости</a></div>
                    <div class="aside__subitem"><a data-href="other/mail">Рассылка</a></div>
                    <div class="aside__subitem"><a data-href="other/reviews">Отзывы</a></div>
                    <div class="aside__subitem"><a data-href="other/suggestions">Предложения</a></div>
                    <div class="aside__subitem"><a data-href="other/tickets">Тикеты<?= print_counter($unreaded_tickets); ?></a></div>
                    <div class="aside__subitem"><a data-href="other/help_text">Помощь по разделам</a></div>
                    <div class="aside__subitem"><a data-href="other/terms">Пользов. соглашение</a></div>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="container">
                <h1 class="content-header header-1">Административная панель <?= $site_name; ?></h1>
                <div class="content-placeholder">
                    <p class="description">Панель управления движком</p>
                </div>
            </div>
        </div>
    </div>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
    <script src="../app/js/jquery.min.js"></script>
    <script src="/adminko/service/app.js?_=<?= time(); ?>"></script>
</body>

</html>