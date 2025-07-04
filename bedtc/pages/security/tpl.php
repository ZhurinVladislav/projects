<?php
require_once './functions/users.php';
global $pdo;

$get_info = $pdo->prepare('SELECT email FROM users WHERE id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

?>

<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<form class="form-add security__form" data-controller="settings/update_security" data-callback="input_errors">

	<div class="security__form-item">
		<label for="email"><img src="/app/images/icons/email.png" class="icon"><?= $_txt['label_email']; ?></label>
		<div class="input_errors" data-error="">
			<input type="text" class="default" name="email" id="email" value="<?= $info['email'] ?>" disabled>
			<div class="error-message" data-error-text=""></div>
		</div>
	</div>

	<div class="security__form-item pass">
		<label for="pm"><img src="/app/images/icons/pass.png" class="icon"><?= $_txt['label_pass']; ?></label>

		<div class="input_errors" data-error="error_old_pass">
			<input type="password" class="default" name="old_pass" id="old_pass" placeholder="<?= $_txt['placeholder_old_pass']; ?>" required>
			<div class="error-message" data-error-text="error_old_pass"></div>
		</div>
		
		<div class="input_errors" data-error="">
			<input type="password" class="default" name="new_pass" id="new_pass" placeholder="<?= $_txt['placeholder_new_pass']; ?>" required>
			<div class="error-message" data-error-text=""></div>
		</div>
		
		<div class="input_errors" data-error="error_passwords">
			<input type="password" class="default" name="pass_repeat" id="pass_repeat" placeholder="<?= $_txt['placeholder_pass_repeat']; ?>" required>
			<div class="error-message" data-error-text="error_passwords"></div>
		</div>
	</div>

	<div class="security__form-item pin">
		<label for="pin"><?= $_txt['label_pin']; ?></label>
		<div class="input_errors" data-error="error_pin">
			<input type="password" class="default" name="pin" id="pin" required>
			<div class="error-message" data-error-text="error_pin"></div>
		</div>
	</div>

	<button class="btn-default_2" id="save" data-saved="<?= $_txt['form_btn_saved']; ?>" data-save="<?= $_txt['form_btn_save']; ?>" type="submit"><span><?= $_txt['form_btn_save']; ?></span></button>

</form>