<h1 class="header-external"><?= $_txt['header']; ?></h1>

<div class="reg">
	<form class="reg__form" id="register">
		<div class="reg__form-item">
			<label for="register_login"><?= $_txt['login_label']; ?></label>
			<div class="input_errors" data-error="error_login">
				<input type="text" class="login_error" class="default" name="login" id="register_login" placeholder="<?= $_txt['login_input']; ?>" autofocus required>
				<div class="error-message" data-error-text="error_login"></div>
			</div>
		</div>



		<div class="reg__form-item">
			<label for="register_email"><?= $_txt['email_label']; ?></label>
			<div class="input_errors" data-error="error_email">
				<input type="email" class="login_error" class="default" name="email" id="register_email" placeholder="<?= $_txt['email_input']; ?>" required>
				<div class="error-message" data-error-text="error_email"></div>
			</div>
		</div>



		<div class="reg__form-item">
			<label for="register_password"><?= $_txt['password_label']; ?></label>
			<div class="input_errors" data-error="error_password_match">
				<input type="password" class="login_error" class="default" name="password" id="register_password" placeholder="<?= $_txt['password_input']; ?>" required>
				<span class="toggle-type"></span>
			</div>
		</div>



		<div class="reg__form-item">
			<label for="register_password_confirm"><?= $_txt['password_confirm_label']; ?></label>
			<div class="input_errors" data-error="error_password_match">
				<input type="password" class="login_error" class="default" name="confirm_password" id="register_password_confirm" placeholder="<?= $_txt['confirm_password_input']; ?>" required>
				<span class="toggle-type"></span>
				<div class="error-message" data-error-text="error_password_match"></div>
			</div>
		</div>



		<div class="reg__form-item">
			<label for="register_pin"><?= $_txt['pin_label']; ?>
				<span data-toggle="tooltip" data-placement="right" title="<?= $_txt['pin_attr']; ?>"></span>
			</label>
			<div class="input_errors" data-error="error_pin_type">
				<input type="password" class="login_error" class="default" name="pin" id="register_pin" placeholder="<?= $_txt['pin_input']; ?>"  required>
				<span class="toggle-type"></span>
				<div class="error-message" data-error-text="error_pin_type"></div>
			</div>
		</div>



		<div class="reg__form-item">
			<label for="register_pin_confirm"><?= $_txt['pin_confirm_label']; ?></label>
			<div class="input_errors" data-error="error_pin_match">
				<input type="password" class="login_error" class="default" name="pin_confirm" id="register_pin_confirm" placeholder="<?= $_txt['confirm_pin_input']; ?>" required>
				<span class="toggle-type"></span>
				<div class="error-message" data-error-text="error_pin_match"></div>
			</div>
		</div>



		<div class="reg__form-terms">
			<input type="checkbox" name="terms" id="terms" required checked>
			<div><?= $_txt['form_terms_text']; ?> <a data-href="terms" data-template="main_external"><?= $_txt['form_terms_link']; ?></a></div>
		</div>


		<div class="reg__form-btn">
			<button><?= $_txt['form_btn']; ?></button>
		</div>



		<div class="reg__form-login">
			<?= $_txt['form_login_text']; ?> <a data-href="login" data-template="login"><?= $_txt['form_login_link']; ?></a>
		</div>
	</form>

</div>