<h1 class="header-external min"><?= $_txt['header'] ?></h1>

<div class="add-header">
	<?= $_txt['dop_header']; ?>
</div>

<div class="container">
	<div class="tickets bg-offset big blue">
		<div class="tickets__header"><?= $_txt['new_ticket']; ?></div>

		<div class="tickets__steps">
			<div class="tickets__step">
				<div class="tickets__step-img">
					<img src="/app/images/lists/1.png" alt="">
				</div>
				<div class="tickets__step-text">
					<?= $_txt['attr'][1]; ?>
				</div>
			</div>

			<div class="tickets__step">
				<div class="tickets__step-img">
					<img src="/app/images/lists/2.png" alt="">
				</div>
				<div class="tickets__step-text">
					<?= $_txt['attr'][2]; ?>
				</div>
			</div>

			<div class="tickets__step">
				<div class="tickets__step-img">
					<img src="/app/images/lists/3.png" alt="">
				</div>
				<div class="tickets__step-text">
					<?= $_txt['attr'][3]; ?>
				</div>
			</div>
		</div>

		<?php
			global $pdo, $captcha_keys, $user, $root_url;

			if ($user->is_logged() === true) {

			require_once './functions/users.php';
			require_once './functions/tickets.php';

			$users_tickets_list = tickets_get_list_user($user->id);

			$can_send_ticket = true;

			$get_tickets_sended = $pdo->query('SELECT COUNT(id) AS total FROM tickets WHERE user_id = '.$user->id.' AND date > '.(time() - 86400));
			if (!is_bool($user_tickets = $get_tickets_sended->fetch())) {
				if ($user_tickets['total'] >= 2) {
					$can_send_ticket = false;
				}
			}

			if ($can_send_ticket == true) { 

		?>

		<div class="tickets__btn">
			<button id="ticket_add"><?= $_txt['new_ticket']; ?></button>
		</div>

		<?php } else { ?>

		<div class="error-attr">
			<div class="error-attr__text"><?= $_txt['error_limit']; ?></div>
		</div>

		<?php } ?>

		<?php
			if (!empty($users_tickets_list)) {
		?>
		<div class="tickets__my">
			<div class="tickets__my-title"><?= $_txt['tickets_title']; ?></div>
			
			<div class="wrap">
				<div class="stat__table nopadding">
					<div class="table__heads">
						<div style="width: 10%">ID</div>
						<div style="width: 50%"><?= $_txt['table_head_2']; ?></div>
						<div style="width: 20%"><?= $_txt['table_head_3']; ?></div>
						<div style="width: 20%"><?= $_txt['table_head_4']; ?></div>
					</div>

				<?php
					foreach ($users_tickets_list as $item) {
				?>

					<div class="table__item">
						<div style="width: 10%"><?= $item['id']; ?></div>
						<div style="width: 50%" class="overflow"><div><?= stripslashes($item['subject']); ?></div></div>
						<div style="width: 20%">
							<?php
								if ($item['status'] == 2) {
							?>
								<button class="have-answer" data-open-ticket="<?= $item['id']; ?>"><?= $_txt['tickets_btn']; ?></button>

							<?php
								} elseif ($item['status'] == 4) {
							?>
								<button class="closed" data-open-ticket="<?= $item['id']; ?>"><?= $_txt['tickets_btn']; ?></button>
							
							<?php
								} else {
							?>
									<button data-open-ticket="<?= $item['id']; ?>"><?= $_txt['tickets_btn']; ?></button>

							<?php
								}
							?>
									
						</div>
						<div style="width: 20%"><?= $_txt['created']; ?> <?= date('H:i d.m.y', $item['date']); ?></div>
					</div>
				<?php
					}
				?>
			</div>
		</div>
		</div>
		<?php
			}
		?>
		
		<div class="tickets__form-wrap">
			<div data-placeholder="send_ticket_success">
				<form class="form-add tickets__form" data-controller="tickets/add_ticket" data-callback="place_content" data-result="send_ticket_success">
					<div class="tickets__header"><?= $_txt['new_ticket']; ?></div>
					<div class="tickets__form-item">
						<!-- <label for=""><?= $_txt['theme']; ?><sup> *</sup></label> -->
						<div class="select" id="select">
							<div class="select__head"><?= $_txt['theme_item'][1]; ?></div>
							<div class="select__body">
								<div class="item" data-value="1"><?= $_txt['theme_item'][1]; ?></div>
								<div class="item" data-value="2"><?= $_txt['theme_item'][2]; ?></div>
								<div class="item" data-value="3"><?= $_txt['theme_item'][3]; ?></div>
								<div class="item" data-value="4"><?= $_txt['theme_item'][4]; ?></div>
							</div>
							<input type="hidden" name="category" value="1" required>
						</div>
					</div>

					<div class="tickets__form-item">
						<!-- <label for="subject"><?= $_txt['form_subject']; ?><sup> *</sup></label> -->
						<input type="text" id="subject" name="subject" placeholder="<?= $_txt['subject']['placeholder']; ?>" required>
					</div>

					<div class="tickets__form-item">
						<!-- <label for="text"><?= $_txt['form_desc']; ?><sup> *</sup></label> -->
						<textarea name="text" id="text" placeholder="<?= $_txt['desc']['placeholder']; ?>" required></textarea>
					</div>
					
					<div class="tickets__form-captcha captcha-wrap">
						<div id="captcha"></div>
					</div>

					<div data-placeholder="send_ticket_error"></div>

					<input type="hidden" id="login" name="login" value="<?= $user->login; ?>">
					<input type="hidden" id="email" name="email" value="<?= $user->email; ?>">
					
					<button type="submit"><?= $_txt['form_button']; ?></button>
				</form>
			</div>
		</div>
	<?php } else { ?>

		<div class="tickets__form-wrap_1">
			<div data-placeholder="send_ticket_success">
				<form class="form-add tickets__form" data-controller="tickets/add_ticket" data-callback="place_content" data-result="send_ticket_success">
					<div class="tickets__form-item">
						<!-- <label for=""><?= $_txt['theme']; ?><sup> *</sup></label> -->
						<div class="select" id="select">
							<div class="select__head"><?= $_txt['theme_item'][1]; ?></div>
							<div class="select__body">
								<div class="item" data-value="1"><?= $_txt['theme_item'][1]; ?></div>
								<div class="item" data-value="2"><?= $_txt['theme_item'][2]; ?></div>
								<div class="item" data-value="3"><?= $_txt['theme_item'][3]; ?></div>
								<div class="item" data-value="4"><?= $_txt['theme_item'][4]; ?></div>
							</div>
							<input type="hidden" name="category" value="1" required>
						</div>
					</div>

					<div class="tickets__form-item">
						<input type="text" id="login" name="login" placeholder="<?= $_txt['login']['placeholder']; ?>" required>
					</div>

					<div class="tickets__form-item">
						<input type="email" id="email" name="email" placeholder="<?= $_txt['email']['placeholder']; ?>" required>
					</div>

					<div class="tickets__form-item">
						<!-- <label for="subject"><?= $_txt['form_subject']; ?><sup> *</sup></label> -->
						<input type="text" id="subject" name="subject" placeholder="<?= $_txt['subject']['placeholder']; ?>" required>
					</div>

					<div class="tickets__form-item">
						<!-- <label for="text"><?= $_txt['form_desc']; ?><sup> *</sup></label> -->
						<textarea name="text" id="text" placeholder="<?= $_txt['desc']['placeholder']; ?>" required></textarea>
					</div>
					
					<div class="tickets__form-captcha captcha-wrap">
						<div id="captcha"></div>
					</div>

					<div data-placeholder="send_ticket_error"></div>
					
					<button class="btn-default" type="submit"><?= $_txt['form_button']; ?></button>
				</form>
			</div>
		</div>

	<?php } ?>
	</div>
</div>

<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=<?= $user->language ?>" async defer></script>
<script>
	var onloadCallback = function() {
        grecaptcha.render('captcha', {
          'sitekey' : '<?= $captcha_keys['public']; ?>'
        });
      };
</script>
