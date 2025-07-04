<?php

$get_unreaded_tickets = $pdo->query('SELECT COUNT(id) AS count FROM tickets WHERE status = 1 OR status = 3');
$get_unreaded_tickets = $get_unreaded_tickets->fetch();
$unreaded_tickets = $get_unreaded_tickets['count'];

$get_unreaded_bugs = $pdo->query('SELECT COUNT(id) AS count FROM quest_bug WHERE status = 0');
$get_unreaded_bugs = $get_unreaded_bugs->fetch();
$unreaded_bugs = $get_unreaded_bugs['count'];

$get_unreaded_youtube = $pdo->query('SELECT COUNT(id) AS count FROM quest_youtube WHERE status = 0');
$get_unreaded_youtube = $get_unreaded_youtube->fetch();
$unreaded_youtube = $get_unreaded_youtube['count'];

$get_unreaded_vk = $pdo->query('SELECT COUNT(id) AS count FROM quest_vk_repost WHERE status = 0');
$get_unreaded_vk = $get_unreaded_vk->fetch();
$unreaded_vk = $get_unreaded_vk['count'];

$get_unreaded_forum = $pdo->query('SELECT COUNT(id) AS count FROM quest_forum WHERE status = 0');
$get_unreaded_forum = $get_unreaded_forum->fetch();
$unreaded_forum = $get_unreaded_forum['count'];

// $get_unreaded_article = $pdo->query('SELECT COUNT(id) AS count FROM quest_article WHERE status = 0');
// $get_unreaded_article = $get_unreaded_article->fetch();
// $unreaded_article = $get_unreaded_article['count'];

// $get_unreaded_forum_subject = $pdo->query('SELECT COUNT(id) AS count FROM quest_forum_subject WHERE status = 0');
// $get_unreaded_forum_subject = $get_unreaded_forum_subject->fetch();
// $unreaded_forum_subject = $get_unreaded_forum_subject['count'];

$get_unreaded_telegram_channel = $pdo->query('SELECT COUNT(id) AS count FROM quest_telegram_channel WHERE status = 0');
$get_unreaded_telegram_channel = $get_unreaded_telegram_channel->fetch();
$unreaded_telegram_channel = $get_unreaded_telegram_channel['count'];

$get_unreaded_telegram_chat = $pdo->query('SELECT COUNT(id) AS count FROM quest_telegram_chat WHERE status = 0');
$get_unreaded_telegram_chat = $get_unreaded_telegram_chat->fetch();
$unreaded_telegram_chat = $get_unreaded_telegram_chat['count'];

// $get_unreaded_review = $pdo->query('SELECT COUNT(id) AS count FROM quest_review WHERE status = 0');
// $get_unreaded_review = $get_unreaded_review->fetch();
// $unreaded_review = $get_unreaded_review['count'];

function print_counter($number) {
	if ($number > 0) {
		return '&nbsp;<span class="aside__counter">'.$number.'</span>';
	}
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Adminko | <?= $site_name; ?></title>
	<base href="<?= $root_url; ?>adminko/">
	<link rel="stylesheet" href="/adminko/service/style.css?_=<?= time(); ?>">
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
					<div class="aside__subitem"><a data-href="users/ref_top">Топ рефоводов</a></div>
					<div class="aside__subitem"><a data-href="users/statistics">Статистика</a></div>
					<div class="aside__subitem"><a data-href="users/fake">Фейки</a></div>
				</div>
				<div class="aside__item">
					<span class="aside__item-header">Финансы</span>
					<div class="aside__subitem"><a data-href="payments/replenishments">Пополнения</a></div>
					<div class="aside__subitem"><a data-href="payments/withdrawals">Выплаты</a></div>
					<div class="aside__subitem"><a data-href="payments/date_report">Отчёт по датам</a></div>
				</div>
				<div class="aside__item">
					<span class="aside__item-header">Квесты</span>
					<div class="aside__subitem"><a data-href="quests/bug">Баг баунти<?= print_counter($unreaded_bugs); ?></a></div>
					<div class="aside__subitem"><a data-href="quests/youtube">Youtube<?= print_counter($unreaded_youtube); ?></a></div>
					<div class="aside__subitem"><a data-href="quests/vk">VK<?= print_counter($unreaded_vk); ?></a></div>
					<div class="aside__subitem"><a data-href="quests/forum">Forum<?= print_counter($unreaded_forum); ?></a></div>
					<!-- <div class="aside__subitem"><a data-href="quests/article">Статьи< ?= print_counter($unreaded_article); ?></a></div> -->
					<!-- <div class="aside__subitem"><a data-href="quests/forum_subject">Тема на форуме< ?= print_counter($unreaded_forum_subject); ?></a></div> -->
					<div class="aside__subitem"><a data-href="quests/telegram_channel">Telegram канал<?= print_counter($unreaded_telegram_channel); ?></a></div>
					<div class="aside__subitem"><a data-href="quests/telegram_chat">Telegram чат<?= print_counter($unreaded_telegram_chat); ?></a></div>
					<!-- <div class="aside__subitem"><a data-href="quests/review">Отзыв< ?= print_counter($unreaded_review); ?></a></div> -->
				</div>
				<!-- <div class="aside__item">
					<span class="aside__item-header">Серфинг (Спонсоры)</span>
					<div class="aside__subitem"><a data-href="surfing/site_add">Добавить сайт</a></div>
					<div class="aside__subitem"><a data-href="surfing/sites">Список сайтов</a></div>
					<div class="aside__subitem"><a data-href="surfing/statistics">Статистика</a></div>
					<div class="aside__subitem"><a data-href="surfing/complains">Жалобы</a></div>
				</div> -->
				<div class="aside__item">
					<span class="aside__item-header">Настройки</span>
					<div class="aside__subitem"><a data-href="settings/core">Ядро</a></div>
					<div class="aside__subitem"><a data-href="settings/paysystems">Платежки</a></div>
					<div class="aside__subitem"><a data-href="settings/action">Акция</a></div>
					<div class="aside__subitem"><a data-href="settings/fake_statistics">Фейковая статистика</a></div>
				</div>
				<div class="aside__item">
					<span class="aside__item-header">Остальное</span>
					<div class="aside__subitem"><a data-href="other/faq">FAQ</a></div>
					<div class="aside__subitem"><a data-href="other/news">Новости</a></div>
					<div class="aside__subitem"><a data-href="other/news_etf">Новости ETF</a></div>
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
				<h1 class="content-header header-1">Adminko</h1>
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