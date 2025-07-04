<?php

global $site_name;

?>
<div class="footer">
	<div class="container">
		<div class="wrapper">
		
			<div class="bg">
				<!-- <img src="/app/images/bg/footer.svg"> -->

				<div class="bg-color"></div>

				<div class="shadow">
					<div class="bottom"></div>
					<div class="left"></div>
					<div class="corner"></div>
				</div>

				<div class="border-top"></div>
				<div class="border-bottom"></div>
				<div class="border-right"></div>
				<div class="border-left"></div>

				<div class="side"></div>
				<div class="side-responsive"></div>

				<div class="fissure-big"></div>
				<div class="fissure-small"></div>

				<div class="corner-top-left"></div>
				<div class="corner-top-right"></div>
				<div class="corner-bottom-right"></div>
				<div class="corner-bottom-left"></div>

				<div class="glow">
					<div class="top">
						<span class="left"></span>
						<span class="right"></span>
					</div>
					<div class="bottom">
						<span class="left"></span>
						<span class="right"></span>
					</div>
				</div>


			</div>

			<div class="content">

				<div class="footer-top">

					<a class="logo" href="/">
						<img src="/app/images/logo-header.svg">
					</a>

					<div class="menu">
						<div class="left">
							<a href="/">Главная</a>
							<a href="news">Новости</a>
							<a href="tutorial">Обучение</a>
							<a href="statistics">Статистика</a>
						</div>
						<div class="center">
							<a href="partnership">Реферальная программа</a>
							<a href="crowdfunding">Краудфандинг</a>
							<a href="faq">FAQ</a>
						</div>
						<div class="right">
							<a href="reviews">Отзывы</a>
							<a href="guarantees">Гарантии</a>
							<a href="support">Тех. поддержка</a>
						</div>
					</div>

					<div class="social">
						<div class="caption">Мы в соц. сетях</div>
						<div class="list">
							<a href="/" class="button-small item green bg-blue">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<span class="caption">
									<img src="/app/images/icons/social-tg.svg">
								</span>
							</a>
							<a href="/" class="button-small item green bg-blue">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<span class="caption">
									<img src="/app/images/icons/social-ig.svg">
								</span>
							</a>
							<a href="/" class="button-small item green bg-blue">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<span class="caption">
									<img src="/app/images/icons/social-yt.svg">
								</span>
							</a>
							<a href="/" class="button-small item green bg-blue">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<span class="caption">
									<img src="/app/images/icons/social-vk.svg">
								</span>
							</a>
							<a href="/" class="button-small item green bg-blue">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<span class="caption">
									<img src="/app/images/icons/social-fb.svg">
								</span>
							</a>
						</div>
					</div>

				</div>

				<div class="footer-bottom">

					<div class="copyright">
						Copyright © 2024 все права защищены. <br>
						Входя на сайт, вы принимаете Пользовательское соглашение. <br><br>
						Экономический симулятор - <a href="/"><?= $site_name; ?></a>
					</div>

					<div class="mirrors">
						<div class="caption">Зеркала проекта:</div>
						<div class="list">
							<a href="/">sitename.com</a>
							<a href="/">sitename.com</a>
							<a href="/">sitename.com</a>
						</div>
					</div>

				</div>

			</div>

		</div>
	</div>
</div>

<?php
	load_view('templates/base/foot', $template);
?>