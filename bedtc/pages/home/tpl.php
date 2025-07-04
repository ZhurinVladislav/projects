<?php

global $pdo, $coin;

?>


<div class="question-panel">
	<button class="question-button"></button>

	<div class="question-text">
		<div class="caption">Моя комната</div>
		<div class="border"></div>
	</div>
</div>

<!-- <div class="panel-purple panel-top-room">
	<div class="wrapper">
		<div class="decor-left">
			<span></span>
		</div>
		<div class="decor-right">
			<span></span>
		</div>

		<div class="content">
			<div class="conveyor">
				<img src="/app/images/top-room-conveyor.svg">
			</div>

			<button class="button-big blue">
				<span class="bg"></span>
				<span class="bd-bot"><span></span><span></span></span>
				<span class="caption">Купить комнату +</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</button>
		</div>
	</div>
</div> -->

<div class="room-wrapper">
	<img src="/app/images/room-1.svg" style="max-width: 100%;">
</div>

<div class="panel-purple panel-income">
	<div class="wrapper">
		<div class="decor-left">
			<span></span>
		</div>
		<div class="decor-right">
			<span></span>
		</div>

		<div class="content">
			
			<div class="panel-double-wrapper">

				<div class="panel-double">
					<div class="left">
						<div class="bd-left"></div>
						<div class="bd-bottom"></div>
						<div class="caption">Доход</div>
					</div>
					<div class="right">
						<div class="bd"></div>
						<div class="caption">0.00000015 BedTC/s</div>
						<div class="bd-top-left"></div>
						<div class="bd-top-right"></div>
						<div class="bd-bottom-left"></div>
						<div class="bd-bottom-right"></div>
						<div class="bd-bottom"></div>
					</div>
				</div>

				<div class="panel-double">
					<div class="left">
						<div class="bd-left"></div>
						<div class="bd-bottom"></div>
						<div class="caption">На вывод</div>
					</div>
					<div class="right">
						<div class="bd"></div>
						<div class="caption">0.00150331 BedTC</div>
						<div class="bd-top-left"></div>
						<div class="bd-top-right"></div>
						<div class="bd-bottom-left"></div>
						<div class="bd-bottom-right"></div>
						<div class="bd-bottom"></div>
					</div>
				</div>

			</div>

			<button class="button-big blue">
				<span class="bg"></span>
				<span class="bd-bot"><span></span><span></span></span>
				<span class="caption">Собрать прибыль</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</button>
		</div>
	</div>
</div>

<div class="panel-fissure-inside panel-stats">
	<div class="wrapper">
		<div class="bd-top"></div>
		<div class="bd-bottom"></div>
		<div class="bg"></div>

		<div class="content">
			<div class="room-stats-item">
				<div class="bar-colored yellow">
					<div class="number">
						<div class="bg"></div>
						<div class="caption">50</div>
						<div class="bd-top-left"></div>
						<div class="bd-top-right"></div>
						<div class="bd-bottom-1"></div>
						<div class="bd-bottom-2"></div>
					</div>
					<div class="right">
						<div class="bd-right"></div>
						<div class="bg-border"></div>
						<div class="bd-left-top"></div>
						<div class="bd-left-bottom"></div>
						<div class="bd-shadow"></div>
						<div class="caption">
							<div class="bar-width" style="width: 100%;"></div>
							<div class="bd-bar"></div>
							<span>Настроение</span>
						</div>
					</div>
				</div>
			</div>

			<div class="room-stats-item">
				<div class="bar-colored red">
					<div class="number">
						<div class="bg"></div>
						<div class="caption">50</div>
						<div class="bd-top-left"></div>
						<div class="bd-top-right"></div>
						<div class="bd-bottom-1"></div>
						<div class="bd-bottom-2"></div>
					</div>
					<div class="right">
						<div class="bd-right"></div>
						<div class="bg-border"></div>
						<div class="bd-left-top"></div>
						<div class="bd-left-bottom"></div>
						<div class="bd-shadow"></div>
						<div class="caption">
							<div class="bar-width" style="width: 60%;"></div>
							<div class="bd-bar"></div>
							<span>Здоровье</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="room-stats-item">
				<div class="bar-colored green">
					<div class="number">
						<div class="bg"></div>
						<div class="caption">50</div>
						<div class="bd-top-left"></div>
						<div class="bd-top-right"></div>
						<div class="bd-bottom-1"></div>
						<div class="bd-bottom-2"></div>
					</div>
					<div class="right">
						<div class="bd-right"></div>
						<div class="bg-border"></div>
						<div class="bd-left-top"></div>
						<div class="bd-left-bottom"></div>
						<div class="bd-shadow"></div>
						<div class="caption">
							<div class="bar-width" style="width: 45%;"></div>
							<div class="bd-bar"></div>
							<span>Энергия</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="room-stats-item">
				<div class="bar-colored blue">
					<div class="number">
						<div class="bg"></div>
						<div class="caption">50</div>
						<div class="bd-top-left"></div>
						<div class="bd-top-right"></div>
						<div class="bd-bottom-1"></div>
						<div class="bd-bottom-2"></div>
					</div>
					<div class="right">
						<div class="bd-right"></div>
						<div class="bg-border"></div>
						<div class="bd-left-top"></div>
						<div class="bd-left-bottom"></div>
						<div class="bd-shadow"></div>
						<div class="caption">
							<div class="bar-width" style="width: 75%;"></div>
							<div class="bd-bar"></div>
							<span>Сытость</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="room-stats-item wide">
				<div class="bar-colored pink">
					<div class="number">
						<div class="bg"></div>
						<div class="caption">50</div>
						<div class="bd-top-left"></div>
						<div class="bd-top-right"></div>
						<div class="bd-bottom-1"></div>
						<div class="bd-bottom-2"></div>
					</div>
					<div class="right">
						<div class="bd-right"></div>
						<div class="bg-border"></div>
						<div class="bd-left-top"></div>
						<div class="bd-left-bottom"></div>
						<div class="bd-shadow"></div>
						<div class="caption">
							<div class="bar-width" style="width: 20%;"></div>
							<div class="bd-bar"></div>
							<span>Комфорт комнаты</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="panel-purple panel-home-buttons">
	<div class="wrapper">
		<div class="decor-left">
			<span></span>
		</div>
		<div class="decor-right">
			<span></span>
		</div>

		<div class="content">
			<div class="left-buttons">
				<button class="button-big pink">
					<span class="bg"></span>
					<span class="bd-bot"><span></span><span></span></span>
					<span class="caption">Магазин</span>
					<span class="bd-hover"></span>
					<span class="bd-black"><span></span><span></span></span>
				</button>
				<button class="button-big pink">
					<span class="bg"></span>
					<span class="bd-bot"><span></span><span></span></span>
					<span class="caption">Играть</span>
					<span class="bd-hover"></span>
					<span class="bd-black"><span></span><span></span></span>
				</button>
				<button class="button-big pink">
					<span class="bg"></span>
					<span class="bd-bot"><span></span><span></span></span>
					<span class="caption">Кормить</span>
					<span class="bd-hover"></span>
					<span class="bd-black"><span></span><span></span></span>
				</button>
				<button class="button-big pink">
					<span class="bg"></span>
					<span class="bd-bot"><span></span><span></span></span>
					<span class="caption">Лечить</span>
					<span class="bd-hover"></span>
					<span class="bd-black"><span></span><span></span></span>
				</button>
			</div>

			<button class="button-big blue">
				<span class="bg"></span>
				<span class="bd-bot"><span></span><span></span></span>
				<span class="caption">Улучшить комнату</span>
				<span class="bd-hover"></span>
				<span class="bd-black"><span></span><span></span></span>
			</button>
		</div>
	</div>
</div>