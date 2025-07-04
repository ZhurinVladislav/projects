<?php

require_once './functions/users.php';

global $pdo, $coin;

$get_info = $pdo->prepare('SELECT * FROM users_wallets WHERE user_id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

$user_reg_date = users_search_id($user->id, 'reg_date');
$user_day_in_game = abs(floor(($user_reg_date['reg_date'] - time()) / 86400));

//	ниже код для того чтобы вывести слово 'день', 'дня', 'дней', в зависимости от количества дней, прошедших с момента регистрации
//	но так как он больше не нужен, решил его просто закомментировать
// $days = $user_day_in_game % 100;

// if ($days >= 5 && $days <= 20) {
// 	$day_word = 'дней';

// } else {
// 	$days = $days % 10;
// 	if ($days == 1) {
// 		$day_word = 'день';

// 	} elseif ($days >= 2 && $days <= 4) {
// 		$day_word = 'дня';

// 	} else {
// 		$day_word = 'дней';
// 	}
// }

?>


<!--
<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<div class="username">
	<?= $_txt['player']; ?>: <span><?= $user->login; ?></span>
</div>

<div class="days">
	<?= $_txt['days_in_game']; ?>: <?= $user_day_in_game; ?>
	<br>
	<?= $_txt['reg_date']; ?>: <?= date('d.m.Y', $user_reg_date['reg_date']); ?>
</div>

-->



<section class="account-settings">
	<div class="container">
		<div class="content">
			<h2 class="header_1"><?= $_txt['header']; ?></h2>
			<div class="blocks">
				<div class="block">
					<div class="block-title">
						<span class="block-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#person"></use></svg>
						</span>
						<span class="block-title__text"><?= $_txt['my_data']; ?></span>
					</div>
					<div class="persondata-list">
						<div class="persondata-item">
							<span class="persondata-item__title"><?= $_txt['my_id']; ?>:</span>
							<span class="persondata-item__value"><?= $user->id; ?></span>
						</div>
						<div class="persondata-item">
							<span class="persondata-item__title"><?= $_txt['my_login']; ?>:</span>
							<span class="persondata-item__value"><?= $user->login; ?></span>
						</div>
						<div class="persondata-item">
							<span class="persondata-item__title"><?= $_txt['my_email']; ?>:</span>
							<span class="persondata-item__value"><?= $user->email; ?></span>
						</div>
						<div class="persondata-item">
							<span class="persondata-item__title"><?= $_txt['reg_date']; ?>:</span>
							<span class="persondata-item__value"><?= date('d.m.y H:i', $user->reg_date); ?></span>
						</div>
						<div class="persondata-item">
							<span class="persondata-item__title"><?= $_txt['my_referrer']; ?>:</span>
							<span class="persondata-item__value"></span>
						</div>
					</div>
				</div>
				<div class="block">
					<div class="block-title">
						<span class="block-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#key"></use></svg>
						</span>
						<span class="block-title__text"><?= $_txt['label_pass']; ?></span>
					</div>
					<div class="block-content">

						<form class="form form-add" data-controller="settings/update_security" data-callback="paint-button">
							<div class="form-item">
								<div class="label-wrap">
									<label for="old_pass"><?= $_txt['old_pass']; ?></label>
								</div>
								
								<div class="input_errors" data-error="error_old_pass">
								    <div class="input-wrap">
										<input type="password" class="default" name="old_pass" id="old_pass" placeholder="<?= $_txt['placeholder_old_pass']; ?>" required>
										<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
									</div>
                                    <div class="error-message" data-error-text="error_old_pass"></div>
								</div>
							</div>

							<div class="form-item-wrap">
								<div class="form-item">
									<div class="label-wrap">
										<label for="new_pass"><?= $_txt['new_pass']; ?></label>
									</div>
									<div class="input_errors" data-error="">
									    <div class="input-wrap">
											<input type="password" class="default" name="new_pass" id="new_pass" placeholder="<?= $_txt['placeholder_new_pass']; ?>" required>
											<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
										</div>
                                        <div class="error-message" data-error-text=""></div>
									</div>
								</div>

								<div class="form-item">
									<div class="label-wrap">
										<label for="pass_repeat"><?= $_txt['pass_repeat']; ?></label>
									</div>
									
									<div class="input_errors" data-error="error_passwords">
									    <div class="input-wrap">
											<input type="password" class="default" name="pass_repeat" id="pass_repeat" placeholder="<?= $_txt['placeholder_pass_repeat']; ?>" required>
											<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
										</div>
                                        <div class="error-message" data-error-text="error_passwords"></div>
									</div>
								</div>
							</div>

							<div class="form-item">
								<div class="label-wrap">
									<label for="pin"><?= $_txt['label_pin']; ?></label>
								</div>
								<div class="input_errors" data-error="error_pin">
								    <div class="input-wrap">
										<input type="password" class="default" name="pin" id="pin" placeholder="<?= $_txt['placeholder_label_pin']; ?>" required>
										<div class="eye"><svg><use xlink:href="/app/images/svg_sprite.svg#eye"></use></svg></div>
									</div>
                                    <div class="error-message" data-error-text="error_pin"></div>
								</div>
							</div>

							<button class="button-invert button-big" id="save" data-saved="<?= $_txt['form_btn_saved']; ?>" data-save="<?= $_txt['form_btn_save']; ?>" type="submit"><span><?= $_txt['form_btn_save']; ?></span></button>

						</form>

					</div>
				</div>
				<div class="block">
					<div class="block-title">
						<span class="block-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#googleauth"></use></svg>
						</span>
						<span class="block-title__text"><?= $_txt['google_auth']; ?></span>
					</div>
					<div class="block-content">
						<div class="text-default"><?= $_txt['google_auth_text']; ?></div>
					<?php
						if ($user->g_auth == 0) {
					?>
							<div class="googleauth-list" data-placeholder="g_auth_placeholder">
								<div class="googleauth-item">
									<div class="googleauth-title">1. <?= $_txt['google_auth_title1']; ?></div>
									<div class="googleauth-links">
										<a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" class="googleauth-link" target="_blank">
											<img src="/app/images/googleplay.png" alt="googleplay">
										</a>
										<a href="#" class="googleauth-link">
											<img src="/app/images/appstore.png" alt="appstore">
										</a>
									</div>
								</div>
								<div class="googleauth-item">
									<div class="googleauth-title">2. <?= $_txt['google_auth_title2']; ?></div>
									<form class="form-small form-add" data-controller="settings/g_auth_add" data-callback="place_content" data-result="g_auth_secret">
										<div class="form-item last">
											<div class="label-wrap">
												<label for="googleauth-email"><?= $_txt['google_email']; ?></label>
											</div>
											<div class="input-wrap">
												<input type="email" name="email" id="googleauth-email" placeholder="Введите Gmail-адрес" required>
											</div>
										</div>
										<button class="button-invert"><?= $_txt['form_btn_add']; ?></button>
									</form>
								</div>
								<div class="googleauth-item">
									<div class="googleauth-title">3. <?= $_txt['google_auth_title3']; ?></div>
									<div data-placeholder="g_auth_secret"></div>
								</div>
								<div class="googleauth-item">
									<div class="googleauth-title">4. <?= $_txt['google_auth_title4']; ?></div>
									<form class="form-small form-add" data-controller="settings/g_auth_check" data-callback="place_content" data-result="g_auth_placeholder">
										<div class="form-item last">
											<div class="label-wrap">
												<label for="googleauth-code"><?= $_txt['google_auth_code']; ?></label>
											</div>
											<div class="input-wrap">
												<input type="text" name="code" id="googleauth-code" placeholder="Введите код" required>
											</div>
										</div>
										<button class="button-invert"><?= $_txt['form_btn_add']; ?></button>
									</form>
								</div>
							</div>
					<?php
						} else {
					?>
						<div class="googleauth-list" data-placeholder="g_auth_placeholder">
							<br>
							<div class="googleauth-item"><?= $_txt['google_auth_ready']; ?></div>
							<br>
							<div class="googleauth-item">
									<div class="googleauth-title"><?= $_txt['google_auth_delete']; ?></div>
									<form class="form-small form-add" data-controller="settings/g_auth_delete" data-callback="place_content" data-result="g_auth_placeholder">
										<div class="form-item last">
											<!-- <div class="label-wrap">
												<label for="googleauth-code"></label>
											</div> -->
											<div class="input-wrap">
												<input type="password" name="password" id="googleauth-password" placeholder="<?= $_txt['google_auth_password']; ?>" required>
											</div>
										</div>
										<button class="button-invert"><?= $_txt['form_btn_delete']; ?></button>
									</form>
								</div>
						</div>
					<?php
						}
					?>
					</div>
				</div>
				<div class="block">
					<div class="block-title">
						<span class="block-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#payments"></use></svg>
						</span>
						<span class="block-title__text"><?= $_txt['payments_header']; ?></span>
					</div>
					<div class="block-content">

                        <form class="form-payments form-add" data-controller="settings/update_wallets" data-callback="paint-button">
							<div class="text-default"><?= $_txt['payments_text']; ?></div>
							<div class="form-item-wrap">
								<div class="form-item">
									<div class="label-wrap">
										<label for="payeer">Payeer</label>
									</div>
									<div class="input-wrap">
										<img src="/app/images/payeer.png" alt="" class="input-image">
										<div class="input_errors" data-error="">
											<input type="text" class="default" pattern="[P][0-9]*" title="P0000000" name="wallet_payeer" id="payeer" value="<?= $info['payeer'] ?>" placeholder="<?= $_txt['wallet_placeholder']; ?>">
											<div class="error-message" data-error-text=""></div>
										</div>
									</div>
								</div>
								<div class="form-item">
									<div class="label-wrap">
										<label for="qiwi">QIWI</label>
									</div>
									<div class="input-wrap">
										<img src="/app/images/qiwi.png" alt="" class="input-image">
										<div class="input_errors" data-error="">
											<input type="text" class="default" name="wallet_qiwi" id="qiwi" value="<?= $info['qiwi'] ?>" placeholder="<?= $_txt['wallet_placeholder']; ?>">
											<div class="error-message" data-error-text=""></div>
										</div>
									</div>
								</div>
								<div class="form-item">
									<div class="label-wrap">
										<label for="perfectmoney">Perfect Money</label>
									</div>
									<div class="input-wrap">
										<img src="/app/images/perfect.png" alt="" class="input-image">
										<div class="input_errors" data-error="">
											<input type="text" class="default" name="wallet_pm" id="perfectmoney" value="<?= $info['perfectmoney'] ?>" placeholder="<?= $_txt['wallet_placeholder']; ?>">
											<div class="error-message" data-error-text=""></div>
										</div>
									</div>
								</div>
								<div class="form-item">
									<div class="label-wrap">
										<label for="bitcoin">Bitcoin</label>
									</div>
									<div class="input-wrap">
										<img src="/app/images/bitcoin.png" alt="" class="input-image">
										<input type="text" name="wallet_bitcoin" id="bitcoin" value="<?= $info['bitcoin'] ?>" placeholder="<?= $_txt['wallet_placeholder']; ?>">
									</div>
								</div>
							</div>

							<button class="button-invert button-big" id="save" data-saved="<?= $_txt['form_btn_saved']; ?>" data-save="<?= $_txt['form_btn_save']; ?>" type="submit"><span><?= $_txt['form_btn_save']; ?></span></button>
							
						</form>
					
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
