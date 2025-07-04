<?php

global $pdo, $coin;

$get_collected_game_tiles = $pdo->query('SELECT * FROM game_tiles_sessions WHERE user_id = '.$user->id.' AND date > '.(time() - 86400).' AND result = 1 LIMIT 1');
$collected_game_tiles = $get_collected_game_tiles->fetch();

if (is_bool($collected_game_tiles)) {
	$collected_game_tiles = format_money(0);
} else {
	$collected_game_tiles = format_money(0.00000040);
}


?>




<section class="account-start games-list">
	<div class="container">
		<div class="content">
			<div class="balances">
				<div class="balances-title">
					<span class="balances-title__icon">
						<svg><use xlink:href="/app/images/svg_sprite.svg#games"></use></svg>
					</span>
					<span class="balances-title__text"><?= $_txt['games_header']; ?></span>
				</div>
				<div class="balances-list">
					<div class="list-anchor">
						<div class="item-anchor">
							<span class="link-anchor__title"><?= $_txt['games'][1]['title']; ?></span>
							<span class="link-anchor__text"><?= $_txt['games'][1]['description']; ?></span>
							<ul class="link-anchor__list">
								<li><?= $_txt['games']['list']['reward']; ?>: <span class="colored"><?= format_money(0.00000040); ?>&nbsp;<?= $coin; ?></span></li>
								<li><?= $_txt['games']['list']['collected']; ?>: <span class="colored"><?= $collected_game_tiles; ?>&nbsp;<?= $coin; ?></span></li>
								<li><?= $_txt['games']['list']['max_reward']; ?>: <span class="colored"><?= format_money(0.00000040); ?>&nbsp;<?= $coin; ?>/<?= $_txt['games']['list']['day']; ?></span></li>
							</ul>
							<a data-href="game-tiles" data-template="main_inner" class="button"><?= $_txt['games']['play']; ?></a>
							<span class="link-anchor__image">
								<img src="/app/images/games/game_1.png" alt="game1">
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>



