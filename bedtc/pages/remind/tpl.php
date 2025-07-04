<?php global $captcha_keys; ?>

<!--
<h1 class="header-external"><?= $_txt['header']; ?></h1>

<div class="remind">
	<form class="remind__form" id="remind">
		<div class="remind__form-item">
			<label for="remind_login"><?= $_txt['login_label']; ?></label>
			<div class="input_errors" data-error="error_login">
				<input type="text" class="login_error" name="login" id="remind_login" placeholder="<?= $_txt['login_input']; ?>" autofocus>
				<div class="error-message" data-error-text="error_login"></div>
			</div>
		</div>
		
		<div class="remind__form-item">
			<label for="remind_email"><?= $_txt['email_label']; ?></label>
			<div class="input_errors" data-error="error_login">
				<input type="email" class="login_error" name="email" id="remind_email" placeholder="<?= $_txt['email_input']; ?>">
				<div class="error-message" data-error-text="error_login"></div>
			</div>
		</div>

		<div class="remind__form-btn">
			<button><?= $_txt['btn_remind']; ?></button>
		</div>

		<div class="remind__form-helps">
			<div class="register">
				<?= $_txt['form_reg_text']; ?> <a data-href="registration" data-template="login"><?= $_txt['form_reg_link']; ?></a>
			</div>
			<div class="login">
				<a data-href="login" data-template="login"><?= $_txt['form_login_link']; ?></a>
			</div>
		</div>

	</form>
</div>
-->


<div class="registration">
	<div class="container">
		<div class="content">
			<form class="form" id="remind">
				<h1 class="header_1"><?= $_txt['header']; ?></h1>

				<div class="form-item">
					<div class="label-wrap">
						<label for="remind_login"><?= $_txt['login_label']; ?></label>
					</div>
					<div class="input_errors" data-error="error_login">
						<div class="input-wrap">
							<input type="text" class="login_error" name="login" id="remind_login" placeholder="<?= $_txt['login_input']; ?>" autofocus>
						</div>
						<div class="error-message" data-error-text="error_login"></div>
					</div>
				</div>

				<div class="form-item">
					<div class="label-wrap">
						<label for="remind_email"><?= $_txt['email_label']; ?></label>
					</div>
					<div class="input_errors" data-error="error_login">
						<div class="input-wrap">
							<input type="email" class="login_error" name="email" id="remind_email" placeholder="<?= $_txt['email_input']; ?>">
						</div>
						<div class="error-message" data-error-text="error_login"></div>
					</div>
				</div>

				<div class="note">
					<div class="register">
						<?= $_txt['form_reg_text']; ?> <a data-href="registration" data-template="login"><?= $_txt['form_reg_link']; ?></a>
					</div>
					<div class="remind">
						<a data-href="login" data-template="login"><?= $_txt['form_login_link']; ?></a>
					</div>
				</div>

				<button class="button"><?= $_txt['btn_remind']; ?></button>

			</form>
		</div>
	</div>
</div>


<!-- <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=<?= $user->language ?>" async defer></script> -->
<!-- <script>
	var onloadCallback = function() {
				grecaptcha.render('captcha', {
					'sitekey': '<?= $captcha_keys['public']; ?>'
				});
			};
</script> -->