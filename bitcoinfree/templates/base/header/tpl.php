<?php
	load_view('templates/base/head', $template);

	//global $settings;
	//$action_percent = $settings->get('action_percent');

	//$online_counter = file_get_contents('./users_online.txt');
	//$online_counter = intval($online_counter / 12);
?>

<a data-href="main" data-template="main">Главная</a>
<br><br>

<?php
	if ($user->is_logged() == true) {
?>
	<a data-href="home" data-template="main_inner"><?= $user->login; ?></a>
	<a class="header__panel-exit" id="logout"><span><?= $_txt['logout']; ?></span></a>
<?php
	} else {
?>
	<a data-href="registration" data-template="login"><?= $_txt['reg']; ?></a>
	<a data-href="login" data-template="login"><?= $_txt['login']; ?></a>
	<a data-href="remind" data-template="login"><?= $_txt['remind']; ?></a>
<?php } ?>

<br><br>

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

<a data-href="main" data-template="main"><?= $_txt['main']; ?></a>
<a data-href="news" data-template="main_external"><?= $_txt['news']; ?></a>
<a data-href="tutorial" data-template="main_inner"><?= $_txt['tutorial']; ?></a>
<a data-href="partnership" data-template="main_external"><?= $_txt['ref']; ?></a>
<a data-href="statistics" data-template="main_external"><?= $_txt['stat']; ?></a>
<a data-href="reviews" data-template="main_external"><?= $_txt['reviews']; ?></a>
<a data-href="faq" data-template="main_external"><?= $_txt['faq']; ?></a>