<h1 class="header-external"><?= $_txt['header']; ?></h1>

<div class="login-wrapper">
    <form class="login__form" id="login">
		<div class="login__form-item">
			<label for="login_email"><?= $_txt['email_label']; ?></label>
			<div class="input_errors" data-error="error_email">
				<input type="email" class="email_error" name="email" id="login_email" placeholder="<?= $_txt['email_input']; ?>" autofocus required>
				<div class="error-message" data-error-text="error_email"></div>
			</div>
		</div>
		


		<div class="login__form-item">
			<label for="login_password"><?= $_txt['password_label']; ?></label>
			<div class="input_errors" data-error="error_password">
				<input type="password" class="login_error" name="password" id="login_password" placeholder="<?= $_txt['password_input']; ?>" required>
				<div class="error-message" data-error-text="error_password"></div>
			</div>
		</div>
		


		<div class="login__form-btn">
			<button><?= $_txt['btn_login']; ?></button>
		</div>


		
		<div class="login__form-helps">
			<div class="register">
				<?= $_txt['form_reg_text']; ?> <a data-href="registration" data-template="login"><?= $_txt['form_reg_link']; ?></a>
			</div>
			<div class="remind">
				<a data-href="remind" data-template="login"><?= $_txt['form_forget_link']; ?></a>
			</div>
		</div>
	</form>
</div>

