<?php
?>


<div class="aside">

	<div class="aside-menu">
	
		<div class="border-bottom">
			<div class="left"></div>
			<div class="right"></div>
		</div>

		<div class="list">

			<a href="home" class="link">
				<span class="caption">Жильё</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>

			<div class="dropdown">
				<span class="bd-black"><span></span><span></span></span>
				<div class="caption">
					Магазин <br> Майнеров
					<span class="arrow"></span>
				</div>
				
				<div class="dropdown-list">
					<a href="shop-miners" class="item">Майнеры</a>
					<a href="home" class="item">Пункт 2</a>
					<a href="home" class="item">Пункт 3</a>
				</div>

				<span class="bd-hover"></span>
			</div>

			<div class="dropdown">
				<span class="bd-black"><span></span><span></span></span>
				<div class="caption">
					Игровой клуб
					<span class="arrow"></span>
				</div>
				
				<div class="dropdown-list">
					<a href="home" class="item">Майнеры</a>
					<a href="home" class="item">Пункт 2</a>
					<a href="home" class="item">Пункт 3</a>
				</div>

				<span class="bd-hover"></span>
			</div>
			
			<a href="exchange" class="link">
				<span class="caption">Банк</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			
			<a href="exchange" class="link">
				<span class="caption">Новости</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>
			
			<a href="exchange" class="link">
				<span class="caption">Задания</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</a>

		</div>
	</div>

	<div class="aside-tutorial">
		<button class="button-big blue">
			<span class="bg"></span>
			<span class="bd-bot"><span></span><span></span></span>
			<span class="caption">Обучение</span>
			<span class="bd-hover"></span>
			<span class="bd-black"><span></span><span></span></span>
		</button>
	</div>

	<div class="aside-buttons">
		<a href="chat" class="item">
			<span class="bg"><span></span></span>
			<span class="caption">Чат</span>
			<span class="counter">
				<span class="bd"></span>
				<span class="bd-hover"></span>
				<span class="number">134</span>
			</span>
		</a>
		<a href="messages" class="item">
			<span class="bg"><span></span></span>
			<span class="caption">Сообщения</span>
			<span class="counter">
				<span class="bd"></span>
				<span class="bd-hover"></span>
				<span class="number">10</span>
			</span>
		</a>
		<div class="item disabled">
			<div class="bg"><span></span></div>
			<span class="caption">Время</span>
			<span class="counter">
				<span class="bd"></span>
				<span class="bd-hover"></span>
				<span class="number"><?= date('H:i:s', time()); ?></span>
			</span>
		</div>
	</div>

</div>