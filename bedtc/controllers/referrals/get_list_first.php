<?php

require_once './pages/referrals-user/'.$user->language.'.php';

require_once './functions/referrals.php';
require_once './functions/users.php';

$new_page = (int) $_POST['page'];
$referrals = referrals_get_list($user->id, 'first', $new_page, 15);

if ($referrals != 'empty') {
?>


	<section class="account-referrals-user" data-placeholder="result_referrals">
		<div class="container">
			<div class="content">
				<h1 class="header_1"><?= $_txt['header']; ?></h1>
				<div class="tabs-wrap">
					<div class="tabs">
						<div class="tab active">
							<button class="tab-button">1 уровень</button>
						</div>
						<div class="tab">
							<button class="tab-button">2 уровень</button>
						</div>
						<div class="tab">
							<button class="tab-button">3 уровень</button>
						</div>
					</div>
				</div>
				<div class="tables">

					<div class="table active">
						<div class="table-header">
							<div class="table-header__td"><?= $_txt['table']['header'][1]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][2]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][3]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][4]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][5]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][6]; ?></div>
						</div>
						<div class="table-body">

							<?php
								foreach ($referrals['items'] as $item) {
									if ($user->id == $item['ref_id_first']) {
										$earned = $item['money_to_first'];
									} elseif ($user->id == $item['ref_id_second']) {
										$earned = $item['money_to_second'];
									} elseif ($user->id == $item['ref_id_third']) {
										$earned = $item['money_to_third'];
									}
									$earned = format_money($earned);
									$ref_user = users_search_id($item['user_id'], 'login, reg_date, total_replenishments');
									$login = $ref_user['login'];
									$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
									$replenish = $ref_user['total_replenishments'];
							?>

									<div class="tr">
										<div class="td">
											<div class="td-title"><?= $_txt['user']; ?></div>
											<div class="td-value"><?= $login; ?></div>
										</div>
										<div class="td">
											<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
											<div class="td-value"><?= $reg_date; ?></div>
										</div>
										<div class="td">
											<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
											<div class="td-value"><?= $earned; ?></div>
										</div>
										<div class="td">
											<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
											<div class="td-value"><?= $replenish; ?></div>
										</div>
										<div class="td">
											<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
											<div class="td-value">0,00000015 coin</div>
										</div>
										<div class="td">
											<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
											<div class="td-value">0,00000015 coin</div>
										</div>
									</div>
							<?php
								}
							?>


						</div>
					</div>

					<div class="table">
						<div class="table-header">
							<div class="table-header__td"><?= $_txt['table']['header'][1]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][2]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][3]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][4]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][5]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][6]; ?></div>
						</div>
						<div class="table-body">
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">MikeMk24</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">DevilArm61</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Margaret Hamilton</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
						</div>
					</div>

					<div class="table">
						<div class="table-header">
							<div class="table-header__td"><?= $_txt['table']['header'][1]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][2]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][3]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][4]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][5]; ?></div>
							<div class="table-header__td"><?= $_txt['table']['header'][6]; ?></div>
						</div>
						<div class="table-body">
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">MikeMk24</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">DevilArm61</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Margaret Hamilton</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?= $_txt['user']; ?></div>
									<div class="td-value">Amubin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][2]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][3]; ?></div>
									<div class="td-value">23.03.22</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
									<div class="td-value">https://ya.ru/</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
								<div class="td">
									<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
									<div class="td-value">0,00000015 coin</div>
								</div>
							</div>
						</div>
					</div>

				</div>


				<div class="paginations" data-controller="referrals/get_list_first" data-result="result_referrals">
				<?php
					$pagination = $referrals['pagination'];
					if ($pagination['prev'] !== false || $pagination['next'] !== false) {
						if ($pagination['prev']) {
							//echo '<a class="prev" data-page="'.$pagination['prev'].'"></a>';
							echo '<a class="paginations-arrow left" data-page="'.$pagination['prev'].'"><svg><use xlink:href="/app/images/svg_sprite.svg#doublearrow"></use></svg></a>';
						} else {
							echo '<span class="prev_off"></span>';
						}

						echo '<ul class="paginations-list">';

						if ($pagination['minustwo']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['minustwo'].'">'.$pagination['minustwo'].'</a></li>';
						if ($pagination['minusone']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['minusone'].'">'.$pagination['minusone'].'</a></li>';
						echo '<li class="paginations-item active"><span class="btnsmall-invert">'.$pagination['current'].'</span>';
						if ($pagination['plusone']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['plusone'].'">'.$pagination['plusone'].'</a></li>';
						if ($pagination['plustwo']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['plustwo'].'">'.$pagination['plustwo'].'</a></li>';
						
						echo '</ul>';

						if ($pagination['next']) {
							//echo '<a class="next" data-page="'.$pagination['next'].'"></a>';
							echo '<a class="paginations-arrow right" data-page="'.$pagination['next'].'"><svg><use xlink:href="/app/images/svg_sprite.svg#doublearrow"></use></svg></a>';
						} else {
							echo '<span class="next_off"></span>';
						}
					}
				?>
				</div>
			</div>
		</div>
	</section>




	<!--

	<table class="table-default">
		<thead>
			<tr>
				<td><?= $_txt['table']['header'][1]; ?></td>
				<td><?= $_txt['table']['header'][2]; ?></td>
				<td><?= $_txt['table']['header'][3]; ?></td>
				<td><?= $_txt['table']['header'][4]; ?></td>
			</tr>
		</thead>

		<tbody>
		<?php
			foreach ($referrals['items'] as $item) {
				if ($user->id == $item['ref_id_first']) {
					$earned = $item['money_to_first'];
				} elseif ($user->id == $item['ref_id_second']) {
					$earned = $item['money_to_second'];
				} elseif ($user->id == $item['ref_id_third']) {
					$earned = $item['money_to_third'];
				}
				$earned = format_money($earned);
				$ref_user = users_search_id($item['user_id'], 'login, reg_date, total_replenishments');
				$login = $ref_user['login'];
				$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
				$replenish = $ref_user['total_replenishments'];
		?>
				<tr>
					<td><?= $login; ?></td>
					<td><?= $reg_date; ?></td>
					<td><?= $earned; ?></td>
					<td><?= $replenish; ?></td>
				</tr>
		<?php
			}
		?>
		</tbody>
	</table>

	<div class="paginations" data-controller="referrals/get_list_first" data-result="result_referrals">
		<?php
			$pagination = $referrals['pagination'];
			if ($pagination['prev'] !== false || $pagination['next'] !== false) {
				if ($pagination['prev']) {
					//echo '<a class="prev" data-page="'.$pagination['prev'].'"></a>';
					echo '<a class="paginations-arrow left" data-page="'.$pagination['prev'].'"><svg><use xlink:href="/app/images/svg_sprite.svg#doublearrow"></use></svg></a>';
				} else {
					echo '<span class="prev_off"></span>';
				}

				echo '<ul class="paginations-list">';

				if ($pagination['minustwo']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['minustwo'].'">'.$pagination['minustwo'].'</a></li>';
				if ($pagination['minusone']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['minusone'].'">'.$pagination['minusone'].'</a></li>';
				echo '<li class="paginations-item active"><span class="btnsmall-invert">'.$pagination['current'].'</span>';
				if ($pagination['plusone']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['plusone'].'">'.$pagination['plusone'].'</a></li>';
				if ($pagination['plustwo']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['plustwo'].'">'.$pagination['plustwo'].'</a></li>';
				
				echo '</ul>';

				if ($pagination['next']) {
					//echo '<a class="next" data-page="'.$pagination['next'].'"></a>';
					echo '<a class="paginations-arrow right" data-page="'.$pagination['next'].'"><svg><use xlink:href="/app/images/svg_sprite.svg#doublearrow"></use></svg></a>';
				} else {
					echo '<span class="next_off"></span>';
				}
			}
		?>
	</div>

	-->


<?php
}
?>