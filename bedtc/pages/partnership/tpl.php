<?php

global $pdo, $coin;

?>

<section class="partnership">
	<div class="container">
		<div class="content">
			<h1 class="header_0"><?= $_txt['partnership_header'] ?></h1>
			<div class="text-default subtitle"><?= $_txt['partnership_subtitle'] ?></div>
			<div class="blocks">
				<div class="block">
					<div class="block-title"><?= $_txt['partnership_block_title1'] ?></div>
					<div class="block-text text-default"><?= $_txt['partnership_block_text1'] ?></div>
					<a data-href="referrals" data-template="main_inner" class="button"><?= $_txt['partnership_button'] ?></a>
					<img src="/app/images/partnership1.png" alt="" class="image">
				</div>
				<div class="block">
					<div class="block-title"><?= $_txt['partnership_block_title2'] ?></div>
					<div class="block-text text-default"><?= $_txt['partnership_block_text2'] ?></div>
					<a data-href="referrals" data-template="main_inner" class="button"><?= $_txt['partnership_button'] ?></a>
					<img src="/app/images/partnership2.png" alt="" class="image">
				</div>
			</div>
		</div>
	</div>
</section>

<section class="services2">
	<div class="container">
		<div class="content">

			<h2 class="header_1"><?= $_txt['1-services_header'] ?></h2>
			<div class="content-text text-default"></div>

			<div class="row">
				<div class="col-left">
					<div class="list"><?= $_txt['1-services_text'] ?></div>
					<a data-href="referrals" data-template="main_inner" class="button"><?= $_txt['services_button'] ?></a>
				</div>
				<div class="col-right">
					<div class="image-wrapper">
						<img src="/app/images/services-p1.png" alt="services">
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="services2 even">
	<div class="container">
		<div class="content">
			<h2 class="header_1"><?= $_txt['2-services_header'] ?></h2>
			<div class="content-text text-default">
				<?= $_txt['2-services_text'] ?>
			</div>
			<div class="row">
				<div class="col-left">
					<ul class="list">
						<li class="item">
							<div class="item-rang"><?= $_txt['2-services_rang1'] ?></div>
							<div class="item-text text-default">
								<span class="color"><?= $_txt['2-services_item1_c'] ?></span>
								<?= $_txt['2-services_item1'] ?>
							</div>
						</li>
						<li class="item">
							<div class="item-rang"><?= $_txt['2-services_rang2'] ?></div>
							<div class="item-text text-default">
								<span class="color"><?= $_txt['2-services_item2_c'] ?></span>
								<?= $_txt['2-services_item2'] ?>
							</div>
						</li>
						<li class="item">
							<div class="item-rang"><?= $_txt['2-services_rang3'] ?></div>
							<div class="item-text text-default">
								<span class="color"><?= $_txt['2-services_item3_c'] ?></span>
								<?= $_txt['2-services_item3'] ?>
							</div>
						</li>
					</ul>

					<a data-href="referrals" data-template="main_inner" class="button"><?= $_txt['services_button'] ?></a>

				</div>
				<div class="col-right">
					<div class="image-wrapper">
						<img src="/app/images/services-p2.png" alt="services">
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="services2">
	<div class="container">
		<div class="content">
			<h2 class="header_1"><?= $_txt['3-services_header'] ?></h2>
			<div class="content-text text-default"></div>
			<div class="row">
				<div class="col-left">
					<div class="list"><?= $_txt['3-services_text'] ?></div>
					<div class="buttons">
						<a data-href="referrals" data-template="main_inner" class="button"><?= $_txt['services_button'] ?></a>
					</div>
				</div>
				<div class="col-right">
					<div class="image-wrapper">
						<img src="/app/images/services-p3.png" alt="services">
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="reward">
	<div class="container">
		<div class="content">
			<h2 class="header_1"><?= $_txt['reward_header'] ?></h2>
			<div class="text"><?= $_txt['reward_text'] ?></div>
			<div class="table">
				<div class="table-header">
					<div class="table-header__td"><?= $_txt['table_header1'] ?></div>
					<div class="table-header__td"><?= $_txt['table_header2'] ?></div>
					<div class="table-header__td"><?= $_txt['table_header3'] ?></div>
					<div class="table-header__td"><?= $_txt['table_header4'] ?></div>
				</div>
				<div class="table-body">
					<div class="tr">
						<div class="td">
							<div class="td-title"><?= $_txt['table_header1'] ?></div>
							<div class="td-value">1</div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header2'] ?></div>
							<div class="td-value">5% <?= $_txt['table_ref_1'] ?> / 5% <?= $_txt['table_ref_2'] ?></div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header3'] ?></div>
							<div class="td-value">3% <?= $_txt['table_ref_1'] ?> / 3% <?= $_txt['table_ref_2'] ?></div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header4'] ?></div>
							<div class="td-value">1% <?= $_txt['table_ref_1'] ?> / 1% <?= $_txt['table_ref_2'] ?></div>
						</div>
					</div>
					<div class="tr">
						<div class="td">
							<div class="td-title"><?= $_txt['table_header1'] ?></div>
							<div class="td-value">2</div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header2'] ?></div>
							<div class="td-value">7% <?= $_txt['table_ref_1'] ?> / 7% <?= $_txt['table_ref_2'] ?></div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header3'] ?></div>
							<div class="td-value">4% <?= $_txt['table_ref_1'] ?> / 4% <?= $_txt['table_ref_2'] ?></div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header4'] ?></div>
							<div class="td-value">1,5% <?= $_txt['table_ref_1'] ?> / 1,5% <?= $_txt['table_ref_2'] ?></div>
						</div>
					</div>
					<div class="tr">
						<div class="td">
							<div class="td-title"><?= $_txt['table_header1'] ?></div>
							<div class="td-value">3</div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header2'] ?></div>
							<div class="td-value">10% <?= $_txt['table_ref_1'] ?> / 10% <?= $_txt['table_ref_2'] ?></div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header3'] ?></div>
							<div class="td-value">5% <?= $_txt['table_ref_1'] ?> / 5% <?= $_txt['table_ref_2'] ?></div>
						</div>
						<div class="td">
							<div class="td-title"><?= $_txt['table_header4'] ?></div>
							<div class="td-value">2% <?= $_txt['table_ref_1'] ?> / 2% <?= $_txt['table_ref_2'] ?></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>