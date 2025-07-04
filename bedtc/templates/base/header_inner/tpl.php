<?php
	load_view('templates/base/head', $template);

	global $settings;
	$action_percent = $settings->get('action_percent');

	$online_counter = file_get_contents('./users_online.txt');
	$online_counter = intval($online_counter / 12);
?>

<div class="header header-inner">
	<div class="container">
		
		<div class="bg">
			<img src="/app/images/bg/header.svg">
		</div>

		<div class="content">
			
			<a class="logo" href="/">
				<img src="/app/images/logo-header.svg">
			</a>

			<div class="panel">

				<div class="user-icon">
					<img src="/app/images/icons/header-user.svg">
				</div>

				<div class="user-name">
					<span class="background"></span>
					<span class="caption">
						<span class="decor-left"></span>
						Привет, <?= $user->login; ?>
						<span class="decor-right"></span>
					</span>
				</div>

				<div class="settings">
					<img src="/app/images/buttons/settings.svg">
				</div>

				<div class="logout">
					<a id="logout" class="button-small pink">
						<span class="bg"></span>
						<span class="bd-top"></span>
						<span class="bd-bottom"></span>
						<span class="bd-left"></span>
						<span class="bd-right"></span>
						<span class="caption">
							<img src="/app/images/icons/logout.svg">
						</span>
					</a>
				</div>

				<div class="menu">
					<button class="button-small blue">
						<span class="bg"></span>
						<span class="bd-top"></span>
						<span class="bd-bottom"></span>
						<span class="bd-left"></span>
						<span class="bd-right"></span>
						<span class="caption">
							<span class="line"></span>
							<span class="line"></span>
							<span class="line"></span>
						</span>
					</button>
				</div>
				
			</div>

		</div>

	</div>
</div>

<div class="top-menu-overlay"></div>

<div class="top-menu">

	<div class="top-menu-wrapper">

		<button class="button-small blue close">
			<span class="bg"></span>
			<span class="bd-top"></span>
			<span class="bd-bottom"></span>
			<span class="bd-left"></span>
			<span class="bd-right"></span>
			<span class="caption">
				<span class="line-wrap">
					<span class="line"></span>
					<span class="line"></span>
				</span>
			</span>
		</button>

		<div class="list">
			<a href="/" class="link">
				<span class="caption">Главная</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="news" class="link">
				<span class="caption">Новости</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="tutorial" class="link">
				<span class="caption">Обучение</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="statistics" class="link">
				<span class="caption">Статистика</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="partnership" class="link">
				<span class="caption">Реферальная программа</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="crowdfunding" class="link">
				<span class="caption">Краудфандинг</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="faq" class="link">
				<span class="caption">FAQ</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="reviews" class="link">
				<span class="caption">Отзывы</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			<a href="guarantees" class="link">
				<span class="caption">Гарантии</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>

			<div class="separator"></div>

			<a href="home" class="link">
				<span class="caption">Жильё</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>

			<div class="dropdown">
				<span class="bd-black"><span></span><span></span></span>
				<div class="caption">
					Магазин
					<span class="arrow"></span>
				</div>
				
				<div class="dropdown-list">
					<a href="home" class="item">Майнеры</a>
					<a href="home" class="item">Пункт 2</a>
					<a href="home" class="item">Пункт 3</a>
				</div>

				<span class="bd-hover"></span>
			</div>

			<div class="dropdown">
				<span class="bd-black"><span></span><span></span></span>
				<div class="caption">
					Банк
					<span class="arrow"></span>
				</div>
				
				<div class="dropdown-list">
					<a href="replenish" class="item">Пополнение</a>
					<a href="withdrawal" class="item">Вывод</a>
					<a href="exchange" class="item">Обмен</a>
				</div>

				<span class="bd-hover"></span>
			</div>

			<div class="separator"></div>

			<a href="support" class="link">
				<span class="caption">Тех. поддержка</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>

			<a href="personal-data" class="link">
				<span class="caption">Настройки аккаунта</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
		</div>
	</div>

	<div class="bd-bottom">
		<div class="left"></div>
		<div class="right"></div>
	</div>
</div>