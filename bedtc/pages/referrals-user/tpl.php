<?php
require_once './functions/users.php';
require_once './functions/referrals.php';
global $pdo;

$get_info = $pdo->prepare('SELECT * FROM referrals_info WHERE user_id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

// $total_money_earned = $info['money_earned_first'] + $info['money_earned_second'] + $info['money_earned_third'];
$total_money_earned = $info['money_earned_first'];

//	если будет три уровня рефералов - раскомментирова эту строку и закомментировать ниже
$referrals_count = $info['referrals_first'] + $info['referrals_second'] + $info['referrals_third'];
// $referrals_count = $info['referrals_first'];

if ($info['link_opened'] > 0) {
	// $registration_percent = round(($info['referrals_first'] + $info['referrals_second'] + $info['referrals_third']) / $info['link_opened'] * 100, 2);
	$registration_percent = round($info['referrals_first'] / $info['link_opened'] * 100, 2);
} else {
	$registration_percent = 0;
}

$referrals_1 = referrals_get_list($user->id, 'first', 1, 15);
$referrals_2 = referrals_get_list($user->id, 'second', 1, 15);
$referrals_3 = referrals_get_list($user->id, 'third', 1, 15);

switch ($info['type']) {
	case '1':
		$ref_percent = '7';
		break;
	case '2':
		$ref_percent = '15';
		break;
}

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

						<?php
							if ($referrals_1 != 'empty') {
						?>

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
										foreach ($referrals_1['items'] as $item) {
											if ($user->id == $item['ref_id_first']) {
												$earned = $item['money_to_first'];
											} elseif ($user->id == $item['ref_id_second']) {
												$earned = $item['money_to_second'];
											} elseif ($user->id == $item['ref_id_third']) {
												$earned = $item['money_to_third'];
											}
											$earned = format_money($earned);
											$ref_user = users_search_id($item['user_id'], 'login, access_date, reg_date, total_replenishments');
											$login = $ref_user['login'];
											$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
											$access_date = date('d.m.y H:i', $ref_user['access_date']);
											$replenish = format_money($ref_user['total_replenishments']);
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
													<div class="td-value"><?= $access_date; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
													<div class="td-value"><?= $ref_user['url']; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
													<div class="td-value"><?= $earned; ?>&nbsp;<?= $coin; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
													<div class="td-value"><?= $replenish; ?>&nbsp;<?= $coin; ?></div>
												</div>
											</div>
									<?php
										}
									?>


								</div>
							</div>

						<?php
							} else {
						?>
							<div class="table">
								<h2 class="header_3"><?= $_txt['empty']; ?></h2>
							</div>

						<?php
							}
						?>



						<?php
							if ($referrals_2 != 'empty') {
						?>

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

									<?php
										foreach ($referrals_2['items'] as $item) {
											if ($user->id == $item['ref_id_first']) {
												$earned = $item['money_to_first'];
											} elseif ($user->id == $item['ref_id_second']) {
												$earned = $item['money_to_second'];
											} elseif ($user->id == $item['ref_id_third']) {
												$earned = $item['money_to_third'];
											}
											$earned = format_money($earned);
											$ref_user = users_search_id($item['user_id'], 'login, access_date, reg_date, total_replenishments');
											$login = $ref_user['login'];
											$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
											$access_date = date('d.m.y H:i', $ref_user['access_date']);
											$replenish = format_money($ref_user['total_replenishments']);
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
													<div class="td-value"><?= $access_date; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
													<div class="td-value"><?= $ref_user['url']; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
													<div class="td-value"><?= $earned; ?>&nbsp;<?= $coin; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
													<div class="td-value"><?= $replenish; ?>&nbsp;<?= $coin; ?></div>
												</div>
											</div>
									<?php
										}
									?>


								</div>
							</div>

						<?php
							} else {
						?>
							<div class="table">
								<h2 class="header_3"><?= $_txt['empty']; ?></h2>
							</div>
							
						<?php
							}
						?>




						<?php
							if ($referrals_3 != 'empty') {
						?>

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

									<?php
										foreach ($referrals_3['items'] as $item) {
											if ($user->id == $item['ref_id_first']) {
												$earned = $item['money_to_first'];
											} elseif ($user->id == $item['ref_id_second']) {
												$earned = $item['money_to_second'];
											} elseif ($user->id == $item['ref_id_third']) {
												$earned = $item['money_to_third'];
											}
											$earned = format_money($earned);
											$ref_user = users_search_id($item['user_id'], 'login, access_date, reg_date, total_replenishments');
											$login = $ref_user['login'];
											$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
											$access_date = date('d.m.y H:i', $ref_user['access_date']);
											$replenish = format_money($ref_user['total_replenishments']);
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
													<div class="td-value"><?= $access_date; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][4]; ?></div>
													<div class="td-value"><?= $ref_user['url']; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][5]; ?></div>
													<div class="td-value"><?= $earned; ?>&nbsp;<?= $coin; ?></div>
												</div>
												<div class="td">
													<div class="td-title"><?= $_txt['table']['header'][6]; ?></div>
													<div class="td-value"><?= $replenish; ?>&nbsp;<?= $coin; ?></div>
												</div>
											</div>
									<?php
										}
									?>


								</div>
							</div>

						<?php
							} else {
						?>
							<div class="table">
								<h2 class="header_3"><?= $_txt['empty']; ?></h2>
							</div>
							
						<?php
							}
						?>

						

					</div>


					<!--
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
				</div>
			</div>
		</section>

