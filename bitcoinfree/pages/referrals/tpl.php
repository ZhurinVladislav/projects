<?php
require_once './functions/users.php';
require_once './functions/referrals.php';
global $pdo, $root_url, $coin;

$get_info = $pdo->prepare('SELECT * FROM referrals_info WHERE user_id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

$total_money_earned = format_money($info['money_earned_first'] + $info['money_earned_second'] + $info['money_earned_third']);

//	если будет три уровня рефералов - раскомментирова эту строку и закомментировать ниже
// $referrals_count = $info['referrals_first'] + $info['referrals_second'] + $info['referrals_third'];
$referrals_count = $info['referrals_first'];

if ($info['link_opened'] > 0) {
	//	если будет три уровня рефералов - раскомментирова эту строку и закомментировать ниже
	// $registration_percent = round(($info['referrals_first'] + $info['referrals_second'] + $info['referrals_third']) / $info['link_opened'] * 100, 2);
	$registration_percent = round(($referrals_count) / $info['link_opened'] * 100, 2);
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
<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<input type="text" id="ref_link" value="<?= $root_url; ?>?r=<?= $user->id; ?>&s=ref">

<div class="refs__stat">
	<div class="refs__stat-title"><?= $_txt['ref_stat_header']; ?></div>
	<div class="refs__stat-item"><?= $_txt['ref_count']; ?>: <?= $referrals_count; ?></div>
	<div class="refs__stat-item"><?= $_txt['ref_link_opened']; ?>: <?= $info['link_opened']; ?></div>
	<div class="refs__stat-item"><?= $_txt['ref_registration_percent']; ?>: <?= $registration_percent; ?>%</div>
	<!-- <div class="refs__stat-item"><?= $_txt['ref_last_register']; ?>: User</div> -->
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