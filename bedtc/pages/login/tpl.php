<style>
	#login.hidden {
		display: none;
	}
	#login_g_auth:not(.active) {
		display: none;
	}
</style>

<div class="login-block">
	<div class="container">
		<div class="panel-fissure-vertical">

			<div class="shadow-left"></div>
			<div class="shadow-bottom"></div>
			<div class="bd-top"></div>
			<div class="bd-bottom"><div class="left"></div><div class="right"></div></div>
			<div class="fissure"></div>

			<div class="content">

				<h1 class="header_1 white"><?= $_txt['header']; ?></h1>

				<form class="form" id="login">

					<div class="form-item">
						<div class="label-wrap">
							<label for="login_email"><?= $_txt['email_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_email">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="email" class="login_error" class="default" name="email" id="login_email" placeholder="<?= $_txt['email_input']; ?>" required>
								<span class="bd-corner"></span>
							</div>
							<div class="error-message" data-error-text="error_email"></div>
						</div>
					</div>

					<div class="form-item">
						<div class="label-wrap">
							<label for="login_password"><?= $_txt['password_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_password_match">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="password" class="login_error" class="default" name="password" id="login_password" placeholder="<?= $_txt['password_input']; ?>" required>
								<span class="bd-corner"></span>
								<div class="eye"></div>
							</div>
							<div class="error-message" data-error-text="error_password"></div>
						</div>
					</div>

					<button class="button-big blue dark">
						<span class="bg"></span>
						<span class="bd-bot"><span></span><span></span></span>
						<span class="caption"><?= $_txt['btn_login']; ?></span>
						<span class="bd-hover"></span>
						<span class="bd-black"><span></span><span></span></span>
					</button>

					<div class="note">
						<div class="register">
							<?= $_txt['form_reg_text']; ?><br><a class="link" href="registration"><?= $_txt['form_reg_link']; ?></a>
						</div>
						<div class="remind">
							<a class="link" href="remind"><?= $_txt['form_forget_link']; ?></a>
						</div>
					</div>

				</form>
			</div>
			
			<!-- <form class="form" id="login_g_auth">
				<h1 class="header_1"><?= $_txt['header']; ?></h1>

				<div class="form-item">
					<div class="label-wrap">
						<label for="login_g_code"><?= $_txt['g_auth_label']; ?></label>
					</div>
					<div class="input_errors" data-error="error_g_code">
						<div class="input-wrap">
							<input type="text" class="login_error" class="default" name="g_code" id="login_g_code" placeholder="000000" required>
						</div>
						<div class="error-message" data-error-text="error_g_code"></div>
					</div>
				</div>

				<button class="button"><?= $_txt['btn_login']; ?></button>
			</form> -->

		</div>
	</div>
</div>