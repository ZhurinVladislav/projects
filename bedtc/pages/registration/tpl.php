
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

				<form class="form" id="register">

					<div class="form-item">
						<div class="label-wrap">
							<label for="register_login"><?= $_txt['login_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_login">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="text" class="login_error" class="default" name="login" id="register_login" placeholder="<?= $_txt['login_input']; ?>" required>
								<span class="bd-corner"></span>
							</div>
							<div class="error-message" data-error-text="error_login"></div>
						</div>
					</div>

					<div class="form-item">
						<div class="label-wrap">
							<label for="register_email"><?= $_txt['email_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_email">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="email" class="login_error" class="default" name="email" id="register_email" placeholder="<?= $_txt['email_input']; ?>" required>
								<span class="bd-corner"></span>
							</div>
							<div class="error-message" data-error-text="error_email"></div>
						</div>
					</div>

					<div class="form-item">
						<div class="label-wrap">
							<label for="register_password"><?= $_txt['password_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_password_match">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="password" class="login_error" class="default" name="password" id="register_password" placeholder="<?= $_txt['password_input']; ?>" required>
								<span class="bd-corner"></span>
								<div class="eye"></div>
							</div>
							<div class="error-message" data-error-text="error_password"></div>
						</div>
					</div>

					<div class="form-item">
						<div class="label-wrap">
							<label for="register_password_confirm"><?= $_txt['password_confirm_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_password_match">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="password" class="login_error" class="default" name="register_password_confirm" id="register_password_confirm" placeholder="<?= $_txt['confirm_password_input']; ?>" required>
								<span class="bd-corner"></span>
								<div class="eye"></div>
							</div>
							<div class="error-message" data-error-text="error_password_match"></div>
						</div>
					</div>

					<div class="form-item">
						<div class="label-wrap">
							<label for="register_pin"><?= $_txt['pin_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_pin_match">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="password" class="login_error" class="default" name="pin" id="register_pin" placeholder="<?= $_txt['pin_input']; ?>" required>
								<span class="bd-corner"></span>
								<div class="eye"></div>
							</div>
							<div class="error-message" data-error-text="error_pin_type"></div>
						</div>
					</div>

					<div class="form-item">
						<div class="label-wrap">
							<label for="register_pin_confirm"><?= $_txt['pin_confirm_label']; ?></label>
						</div>
						<div class="input_errors" data-error="error_pin_match">
							<div class="input-wrapper">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<input type="password" class="login_error" class="default" name="pin_confirm" id="register_pin_confirm" placeholder="<?= $_txt['confirm_pin_input']; ?>" required>
								<span class="bd-corner"></span>
								<div class="eye"></div>
							</div>
							<div class="error-message" data-error-text="error_pin_match"></div>
						</div>
					</div>

					<div class="form-item-checkbox">
						<div class="input-wrapper">
							<input type="checkbox" name="terms" id="terms" required checked>
						</div>
						<div class="caption"><?= $_txt['form_terms_text']; ?> <a class="link" href="terms"><?= $_txt['form_terms_link']; ?></a></div>
					</div>

					<button class="button-big blue dark">
						<span class="bg"></span>
						<span class="bd-bot"><span></span><span></span></span>
						<span class="caption"><?= $_txt['form_btn']; ?></span>
						<span class="bd-hover"></span>
						<span class="bd-black"><span></span><span></span></span>
					</button>

					<div class="note">
						<div class="register">
							<?= $_txt['form_login_text']; ?><br><a class="link" href="login"><?= $_txt['form_login_link']; ?></a>
						</div>
					</div>

				</form>
			</div>
		</div>
	</div>
</div>
<!--
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
-->
<!-- 

<section class="registration">
	<div class="container">
		<div class="content">
			<form action="" class="form" id="register">
				<h1 class="header_1"><?= $_txt['header']; ?></h1>

				<div class="form-item">
					<div class="label-wrap">
						<label for="register_email"><?= $_txt['email_label']; ?></label>
					</div>
					<div class="input_errors" data-error="error_email">
						<div class="input-wrap">
							<input type="email" class="login_error default" name="email" id="register_email" placeholder="<?= $_txt['email_input']; ?>" required>
						</div>
						<div class="error-message" data-error-text="error_email"></div>
					</div>
				</div>
				
				<div class="form-item">
					<div class="label-wrap">
						<label for="register_password"><?= $_txt['password_label']; ?></label>
					</div>
					<div class="input_errors" data-error="error_password_match">
						<div class="input-wrap">
							<input type="password" class="login_error default" name="password" id="register_password" placeholder="<?= $_txt['password_input']; ?>" required>
							<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
						</div>
					</div>
				</div>

				<div class="form-item">
					<div class="label-wrap">
						<label for="register_password_confirm"><?= $_txt['password_confirm_label']; ?></label>
					</div>
					<div class="input_errors" data-error="error_password_match">
						<div class="input-wrap">
							<input type="password" class="login_error default" name="confirm_password" id="register_password_confirm" placeholder="<?= $_txt['confirm_password_input']; ?>" required>
							<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
						</div>
						<div class="error-message" data-error-text="error_password_match"></div>
					</div>
				</div>

				<div class="form-item">
					<div class="label-wrap">
						<label for="register_pin"><?= $_txt['pin_label']; ?></label>
						<a href="#" class="hint">
							<span class="hint-icon">?</span>
							<div class="hint-desc"><?= $_txt['pin_attr']; ?></div>
						</a>
					</div>
					<div class="input_errors" data-error="error_pin_type">
						<div class="input-wrap">
							<input type="password" class="login_error default" name="pin" id="register_pin" placeholder="<?= $_txt['pin_input']; ?>"  required>
							<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
						</div>
						<div class="error-message" data-error-text="error_pin_type"></div>
					</div>
				</div>

				<div class="form-item">
					<div class="label-wrap">
						<label for="register_pin_confirm"><?= $_txt['pin_confirm_label']; ?></label>
					</div>
					<div class="input_errors" data-error="error_pin_match">
						<div class="input-wrap">
							<input type="password" class="login_error default" name="pin_confirm" id="register_pin_confirm" placeholder="<?= $_txt['confirm_pin_input']; ?>" required>
							<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
						</div>
						<div class="error-message" data-error-text="error_pin_match"></div>
					</div>
				</div>

				<div class="form-note">
					<label>
						<input type="checkbox" name="terms" id="terms" checked required>
						<div class="custom-checkbox">
							<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
						</div>
					</label>
					<div class="form-note-text">
						<?= $_txt['form_terms_text']; ?>
						<a data-href="terms" data-template="main_external"><?= $_txt['form_terms_link']; ?></a>
					</div>
				</div>

				<button class="button"><?= $_txt['form_btn']; ?></button>

				<div class="note">
					<?= $_txt['form_login_text']; ?> <a data-href="login" data-template="login"><?= $_txt['form_login_link']; ?></a>
				</div>

			</form>
		</div>
	</div>
</section>
 -->