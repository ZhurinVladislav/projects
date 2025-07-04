<?php
require_once './functions/users.php';
require_once './functions/referrals.php';
global $pdo, $root_url, $coin;

$get_info = $pdo->prepare('SELECT * FROM referrals_info WHERE user_id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

$total_money_earned = format_money($info['money_earned_first'] + $info['money_earned_second'] + $info['money_earned_third']);


//	тут ниже какая-то хуйня, если честно
// //	если будет три уровня рефералов - раскомментирова эту строку и закомментировать ниже
// $referrals_count = $info['referrals_first'] + $info['referrals_second'] + $info['referrals_third'];
// // $referrals_count = $info['referrals_first'];

// if ($info['link_opened'] > 0) {
// 	//	если будет три уровня рефералов - раскомментирова эту строку и закомментировать ниже
// 	$registration_percent = round(($info['referrals_first'] + $info['referrals_second'] + $info['referrals_third']) / $info['link_opened'] * 100, 2);
// 	// $registration_percent = round(($referrals_count) / $info['link_opened'] * 100, 2);
// } else {
// 	$registration_percent = 0;
// }

//	а тут вроде норм сделал
if ($info['link_opened'] > 0) {
	$registration_percent = round($info['referrals_first'] / $info['link_opened'] * 100, 2);
} else {
	$registration_percent = 0;
}

$referrals = referrals_get_list($user->id, 'all', 1, 15);

switch ($info['type']) {
	case '1':
		$ref_percent = '7';
		break;
	case '2':
		$ref_percent = '15';
		break;
}

?>


<section class="account-referrals">
	<div class="container">
		<div class="content">
			<h1 class="header_1"><?= $_txt['header']; ?></h1>
			<div class="statistics">
				<div class="referrals-title">
					<span class="referrals-title__icon">
						<svg><use xlink:href="/app/images/svg_sprite.svg#statistics"></use></svg>
					</span>
					<span class="referrals-title__text"><?= $_txt['ref_stat_header']; ?></span>
				</div>
				<div class="statistics-content">
					<div class="blocks-wrap">
						<div class="block-ref">
							<div class="form-item last">
								<div class="label-wrap">
									<label for="withdraw-wallet"><?= $_txt['ref_link']; ?></label>
								</div>
								<div class="input-wrap">
									<input type="text" id="ref_link" value="<?= $root_url; ?>?r=<?= $user->id; ?>&s=ref">
								</div>
							</div>
							<button class="btnsmall orange" data-button-copy>
								<span class="icon"><svg><use xlink:href="/app/images/svg_sprite.svg#copy"></use></svg></span>
							</button>
						</div>
						<div class="block-rang">
							<div class="block-rang__number"><?= $info['type'] ?></div>
							<div class="block-rang__text"><?= $_txt['ref_rank']; ?></div>
						</div>
					</div>

					<div class="statistics-content-title">
						<span class="statistics-content-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#statistics"></use></svg>
						</span>
						<span class="statistics-content-title__text"><?= $_txt['ref_stat_header']; ?></span>
					</div>

					<div class="statistics-content__list">
						<div class="statistics-content__item">
							<div class="statistics-content__sub">1 <?= $_txt['ref_level']; ?></div>
							<div class="statistics-content__title orange"><?= $info['referrals_first'] ?></div>
						</div>
						<div class="statistics-content__item">
							<div class="statistics-content__sub">2 <?= $_txt['ref_level']; ?></div>
							<div class="statistics-content__title green"><?= $info['referrals_second'] ?></div>
						</div>
						<div class="statistics-content__item">
							<div class="statistics-content__sub">3 <?= $_txt['ref_level']; ?></div>
							<div class="statistics-content__title"><?= $info['referrals_third'] ?></div>
						</div>
					</div>

					<div class="statistics-content-title">
						<span class="statistics-content-title__text"><?= $_txt['ref_percent']; ?>:</span>
					</div>
					
				<?php
					switch ($info['type']) {
						case '1':
				?>
							<div class="statistics-info__list">
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong1']; ?></strong> - <?= $_txt['ref_percent_level1'][1]; ?>;</div>
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong2']; ?></strong> - <?= $_txt['ref_percent_level2'][1]; ?>;</div>
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong3']; ?></strong> - <?= $_txt['ref_percent_level3'][1]; ?>.</div>
							</div>
				<?php
							break;
						case '2':
				?>
							<div class="statistics-info__list">
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong1']; ?></strong> - <?= $_txt['ref_percent_level1'][2]; ?>;</div>
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong2']; ?></strong> - <?= $_txt['ref_percent_level2'][2]; ?>;</div>
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong3']; ?></strong> - <?= $_txt['ref_percent_level3'][2]; ?>.</div>
							</div>
				<?php
							break;
						case '3':
				?>
							<div class="statistics-info__list">
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong1']; ?></strong> - <?= $_txt['ref_percent_level1'][3]; ?>;</div>
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong2']; ?></strong> - <?= $_txt['ref_percent_level2'][3]; ?>;</div>
								<div class="statistics-info__item"><strong><?= $_txt['ref_percent_level_strong3']; ?></strong> - <?= $_txt['ref_percent_level3'][3]; ?>.</div>
							</div>
				<?php
							break;
					}

				?>
					

					<div class="statistics-content__list">
						<div class="statistics-content__item">
							<div class="statistics-content__sub"><?= $_txt['ref_link_opened']; ?>:</div>
							<div class="statistics-content__title"><?= $info['link_opened']; ?></div>
						</div>
						<div class="statistics-content__item">
							<div class="statistics-content__sub"><?= $_txt['ref_registration_percent']; ?>: </div>
							<div class="statistics-content__title"><?= $registration_percent; ?>%</div>
						</div>
						<div class="statistics-content__item">
							<div class="statistics-content__sub"><?= $_txt['ref_earned']; ?>:</div>
							<div class="statistics-content__title"><?= $total_money_earned; ?>&nbsp;<?= $coin; ?></div>
						</div>
					</div>

				</div>
			</div>
			<div class="autorefback">
				<div class="referrals-title">
					<span class="referrals-title__icon">
						<svg><use xlink:href="/app/images/svg_sprite.svg#autorefback1"></use></svg>
					</span>
					<span class="referrals-title__text"><?= $_txt['form_auto_ref_back']; ?></span>
				</div>
				<div class="autorefback-content">
					<div class="autorefback-text text-default">
						<p>
							<?= $_txt['form_auto_ref_back_text1']; ?>
						</p>
						<p>
							<?= $_txt['form_auto_ref_back_text2']; ?>
						</p>
					</div>

					<form class="block-ref form-add" data-controller="referrals/settings" data-callback="paint-button">
						<div class="form-item last">
							<div class="label-wrap">
								<label for="withdraw-wallet"><?= $_txt['form_auto_ref_back']; ?></label>
							</div>
							<div class="custom-select">
								<input type="hidden" name="auto_ref_back" id="refback" value="<?= $info['auto_ref_back']; ?>" required>
								<div class="select-input">
									<div class="select-input__value"><span><?= $info['auto_ref_back']; ?></span>%</div>
									<div class="select-input__arrow">
										<svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
									</div>
								</div>
								<div class="select-list">
									<div class="select-item" data-value="0">0%</div>
									<div class="select-item" data-value="25">25%</div>
									<div class="select-item" data-value="50">50%</div>
									<div class="select-item" data-value="75">75%</div>
								</div>
							</div>
						</div>
						<button class="btnsmall orange" type="submit">
							<span class="icon"><svg><use xlink:href="/app/images/svg_sprite.svg#save"></use></svg></span>
						</button>
					</form>
				</div>
			</div>
			<div class="autorefback">
				<img src="/app/images/services-p2.png" alt="services" class="autorefback-image">
				<div class="referrals-title">
					<span class="referrals-title__icon">
						<svg><use xlink:href="/app/images/svg_sprite.svg#autorefback2"></use></svg>
					</span>
					<span class="referrals-title__text"><?= $_txt['form_auto_ref_back']; ?></span>
				</div>
				<div class="autorefback-content">
					<div class="autorefback-list">
						<div class="autorefback-item">
							<div class="autorefback-item__title">1. <?= $_txt['form_auto_ref_back_item1']; ?></div>
							<div class="socials">
								<a href="#" class="social">
									<span class="social-icon">
										<img src="/app/images/svg/insta.svg" alt="insta">
									</span>
								</a>
								<a href="#" class="social">
									<span class="social-icon">
										<img src="/app/images/svg/telegram.svg" alt="telegram">
									</span>
								</a>
								<a href="#" class="social">
									<span class="social-icon">
										<img src="/app/images/svg/vk.svg" alt="vk">
									</span>
								</a>
								<a href="#" class="social">
									<span class="social-icon">
										<img src="/app/images/svg/youtube.svg" alt="youtube">
									</span>
								</a>
							</div>
						</div>
						<div class="autorefback-item">
							<div class="autorefback-item__title">2. <?= $_txt['form_auto_ref_back_item2']; ?></div>
							<a href="#" class="autorefback-item__link">(<?= $_txt['form_auto_ref_back_link']; ?>)</a>
						</div>
						<div class="autorefback-item">
							<div class="autorefback-item__title">3. <?= $_txt['form_auto_ref_back_item3']; ?></div>
							<a href="#" class="autorefback-item__link">(<?= $_txt['form_auto_ref_back_link']; ?>)</a>
						</div>
						<div class="autorefback-item">
							<div class="autorefback-item__title">4. <?= $_txt['form_auto_ref_back_item4']; ?></div>
							<a href="https://www.youtube.com/" class="autorefback-item__link" target="_blank">Youtube.com</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>




<!--
<h1 class="header_1"><?= $_txt['header']; ?></h1>

<input type="text" id="ref_link" value="<?= $root_url; ?>?r=<?= $user->id; ?>&s=ref">

<div class="refs__stat">
	<div class="refs__stat-title"><?= $_txt['ref_stat_header']; ?></div>
	<div class="refs__stat-item"><?= $_txt['ref_count']; ?>: <?= $referrals_count; ?></div>
	<div class="refs__stat-item"><?= $_txt['ref_link_opened']; ?>: <?= $info['link_opened']; ?></div>
	<div class="refs__stat-item"><?= $_txt['ref_registration_percent']; ?>: <?= $registration_percent; ?>%</div>
	<div class="refs__stat-item"><?= $_txt['ref_last_register']; ?>: User</div>
	<div class="refs__stat-item"><?= $_txt['ref_percent']; ?>: <?= $ref_percent; ?>%</div>
	<div class="refs__stat-item"><?= $_txt['ref_earned']; ?>: <?= $total_money_earned; ?>&nbsp;<?= $coin; ?></div>
</div>

<form class="form-add" data-controller="referrals/settings" data-callback="paint-button">
	<div class="title"><?= $_txt['form_auto_ref_back']; ?>:</div>

	<div class="select" id="select_refback">
		<div class="select__head"><?= $info['auto_ref_back']; ?>%</div>
		<div class="select__body">
			<div class="item" data-value="0">0%</div>
			<div class="item" data-value="25">25%</div>
			<div class="item" data-value="50">50%</div>
			<div class="item" data-value="75">75%</div>
		</div>

		<input type="hidden" name="auto_ref_back" id="refback" value="1" required>
	</div>

	<button type="submit"><?= $_txt['form_save']; ?></button>

</form>

-->
