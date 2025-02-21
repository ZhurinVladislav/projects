<?php
	load_view('templates/base/head', $template);

	global $settings;
	$action_percent = $settings->get('action_percent');

	$online_counter = file_get_contents('./users_online.txt');
	$online_counter = intval($online_counter / 12);
?>

Текущий язык: <?= $user->language; ?>

<br><br>

<div class="header__panel-lang_list" id="language">
	<button value="en">En</button>
	<button value="ru">Ru</button>
	<button value="de">De</button>
	<button value="pt">Pt</button>
	<button value="es">Es</button>
	<button value="fr">Fr</button>
	<button value="th">Th</button>
	<button value="hi">Hi</button>
	<button value="zh">Zh</button>
</div>

<br><br>

<a data-href="main" data-template="main">Главная</a>
<a data-href="news" data-template="main_external">Новости</a>
<a data-href="tutorial" data-template="main_inner">Обучение</a>
<a data-href="partnership" data-template="main_external">Реферальная программа</a>
<a data-href="statistics" data-template="main_external">Статистика</a>
<a data-href="reviews" data-template="main_external">Отзывы</a>
<a data-href="faq" data-template="main_external">FAQ</a>

<br><br>

<a data-href="home" data-template="main_inner">Стартовая</a>
<br>
<a data-href="replenish" data-template="main_inner">Пополнить</a>
<a data-href="withdrawal" data-template="main_inner">Вывести</a>
<a data-href="exchange" data-template="main_inner">Обменять</a>
<br>
<a data-href="login-history" data-template="main_inner">История входов</a>
<a data-href="replenish-history" data-template="main_inner">История пополнений</a>
<a data-href="withdrawal-history" data-template="main_inner">История выводов</a>
<a data-href="balance-history" data-template="main_inner">История баланса</a>
<br>
<a data-href="personal-data" data-template="main_inner">Личные данные</a>
<a data-href="security" data-template="main_inner">Безопасность</a>
<a data-href="paysystems" data-template="main_inner">Платежные системы</a>
<br>
<a data-href="referrals" data-template="main_inner">Рефералы</a>
<a data-href="banners" data-template="main_inner">Баннеры</a>
<a data-href="referrals-user" data-template="main_inner">Мои рефералы</a>
<br>
<a data-href="404" data-template="main_external">404</a>
<a data-href="partnership" data-template="main_external">Партнерская программа</a>
<a data-href="terms" data-template="main_external">Пользовательское соглашение</a>
<a data-href="tickets" data-template="main_external">Тикеты</a>