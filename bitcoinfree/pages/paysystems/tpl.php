<?php
require_once './functions/users.php';
global $pdo;

$get_info = $pdo->prepare('SELECT * FROM users_wallets WHERE user_id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

?>

<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<form class="form-add paysystem__form" data-controller="settings/update_wallets" data-callback="input_errors">
	<div class="paysystem__form-item payeer">
		<img src="/app/images/paysystems/payeer.png">
		<label for="payeer">Payeer <?= $_txt['wallet_withraw']; ?></label>
		<div class="input_errors" data-error="">
			<input type="text" class="default" pattern="[P][0-9]*" title="P0000000" name="wallet_payeer" id="payeer" value="<?= $info['payeer'] ?>" placeholder="<?= $_txt['wallet_placeholder']; ?>">
			<div class="error-message" data-error-text=""></div>
		</div>
	</div>

	<div class="paysystem__form-item pm">
		<img src="/app/images/paysystems/pm.png">
		<label for="pm">PM <?= $_txt['wallet_withraw']; ?></label>
		<div class="input_errors" data-error="">
			<input type="text" class="default" name="wallet_pm" id="perfectmoney" value="<?= $info['perfectmoney'] ?>" placeholder="<?= $_txt['wallet_placeholder']; ?>">
			<div class="error-message" data-error-text=""></div>
		</div>
	</div>

	<div class="paysystem__form-item qiwi">
		<img src="/app/images/paysystems/qiwi.png">
		<label for="qiwi">Qiwi <?= $_txt['wallet_withraw']; ?></label>
		<div class="input_errors" data-error="">
			<input type="text" class="default" name="wallet_qiwi" id="qiwi" value="<?= $info['qiwi'] ?>" placeholder="<?= $_txt['wallet_placeholder']; ?>">
			<div class="error-message" data-error-text=""></div>
		</div>
	</div>

	<button class="btn-default_2" id="save" data-saved="<?= $_txt['form_btn_saved']; ?>" data-save="<?= $_txt['form_btn_save']; ?>" type="submit"><span><?= $_txt['form_btn_save']; ?></span></button>
</form>