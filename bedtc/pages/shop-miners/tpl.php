<?php

global $pdo, $coin;

?>


<div class="question-panel">
	<button class="question-button"></button>

	<div class="question-text">
		<div class="caption">Магазин</div>
		<div class="border"></div>
	</div>
</div>

<div class="shop-list">
	<div class="panel-fissure shop-item">
		<div class="shadow-left"></div>
		<div class="shadow-bottom"></div>
		<div class="bd-top"></div>
		<div class="bd-bottom">
			<div class="left"></div>
			<div class="right"></div>
		</div>
		<div class="fissure"></div>
		<div class="panel-fixed-top">
			<div class="panel-simple">
				<div class="bd"></div>
				<div class="caption">Майнер "Монетозавр"</div>
				<div class="bd-top-left"></div>
				<div class="bd-top-right"></div>
				<div class="bd-bottom-left"></div>
				<div class="bd-bottom-right"></div>
				<div class="bd-bottom"></div>
			</div>
			<div class="panel-simple">
				<div class="bd"></div>
				<div class="caption">Цена: 0.00001234 <?= $coin; ?></div>
				<div class="bd-top-left"></div>
				<div class="bd-top-right"></div>
				<div class="bd-bottom-left"></div>
				<div class="bd-bottom-right"></div>
				<div class="bd-bottom"></div>
			</div>
		</div>
		<div class="content">
			<div class="left">
				<div class="image">
					<div class="bd"></div>
					<img class="item-bg" src="/app/images/bg/shop-miners.svg">
					<img class="item-img" src="images/shop-miners/1.svg">
					<div class="bd-top-left"></div>
					<div class="bd-top-right"></div>
					<div class="bd-bottom"></div>
					<div class="bd-bottom-add"></div>
				</div>
			</div>
			<div class="right">
				<div class="text">
					Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Itaque, exercitationem odio, a velit maiores ex fugiat amet voluptate aliquid sunt placeat, laboriosam, corrupti enim! Libero vitae nesciunt minima facilis adipisci!
				</div>
				<div class="bottom">
					<div class="characteristics">
						<div class="panel-double">
							<div class="left">
								<div class="bd-left"></div>
								<div class="bd-bottom"></div>
								<div class="caption">Комфорт</div>
							</div>
							<div class="right">
								<div class="bd"></div>
								<div class="caption">+5%</div>
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
								<div class="caption">Доход</div>
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
					<a class="button-big blue dark" href="news?id=<?= $item['id']; ?>">
						<span class="bg"></span>
						<span class="bd-bot"><span></span><span></span></span>
						<span class="caption">Купить</span>
						<span class="bd-hover"></span>
						<span class="bd-black"><span></span><span></span></span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="panel-fissure shop-item">
		<div class="shadow-left"></div>
		<div class="shadow-bottom"></div>
		<div class="bd-top"></div>
		<div class="bd-bottom">
			<div class="left"></div>
			<div class="right"></div>
		</div>
		<div class="fissure"></div>
		<div class="panel-fixed-top">
			<div class="panel-simple">
				<div class="bd"></div>
				<div class="caption">Майнер "Монетозавр"</div>
				<div class="bd-top-left"></div>
				<div class="bd-top-right"></div>
				<div class="bd-bottom-left"></div>
				<div class="bd-bottom-right"></div>
				<div class="bd-bottom"></div>
			</div>
			<div class="panel-simple">
				<div class="bd"></div>
				<div class="caption">Цена: 0.00001234 <?= $coin; ?></div>
				<div class="bd-top-left"></div>
				<div class="bd-top-right"></div>
				<div class="bd-bottom-left"></div>
				<div class="bd-bottom-right"></div>
				<div class="bd-bottom"></div>
			</div>
		</div>
		<div class="content">
			<div class="left">
				<div class="image">
					<div class="bd"></div>
					<img class="item-bg" src="/app/images/bg/shop-miners.svg">
					<img class="item-img" src="images/shop-miners/1.svg">
					<div class="bd-top-left"></div>
					<div class="bd-top-right"></div>
					<div class="bd-bottom"></div>
					<div class="bd-bottom-add"></div>
				</div>
			</div>
			<div class="right">
				<div class="text">
					Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Itaque, exercitationem odio, a velit maiores ex fugiat amet voluptate aliquid sunt placeat, laboriosam, corrupti enim! Libero vitae nesciunt minima facilis adipisci!
				</div>
				<div class="bottom">
					<div class="characteristics">
						<div class="panel-double">
							<div class="left">
								<div class="bd-left"></div>
								<div class="bd-bottom"></div>
								<div class="caption">Комфорт</div>
							</div>
							<div class="right">
								<div class="bd"></div>
								<div class="caption">+5%</div>
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
								<div class="caption">Доход</div>
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
					<a class="button-big blue dark" href="news?id=<?= $item['id']; ?>">
						<span class="bg"></span>
						<span class="bd-bot"><span></span><span></span></span>
						<span class="caption">Купить</span>
						<span class="bd-hover"></span>
						<span class="bd-black"><span></span><span></span></span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>