<?php

global $coin;

?>


<section class="account-exchange ">
	<div class="container">
		<div class="content">
			<h1 class="header_1"><?= $_txt['header'] ?></h1>
			<div class="exchange">

				<form class="form-add exchange__form" data-controller="money/exchange" data-callback="input_errors">

					<div class="exchange-title">
						<span class="exchange-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#exchange"></use></svg>
						</span>
						<span class="exchange-title__text"><?= $_txt['exchange_title'] ?></span>
					</div>
					<div class="exchange-content">

						<div class="exchange-list">
							<div class="exchange-item">
								<?= $_txt['exchange_item_1'] ?>
							</div>
							<div class="exchange-item">
								<?= $_txt['exchange_item_2'] ?>
							</div>
						</div>

						<div class="exchange-content__title"><?= $_txt['exchange_content_title'] ?>: <span class="color"> <?= $user->balance_withdrawal; ?> <?= $coin; ?></span></div>

						<div class="form-item">
							<div class="label-wrap">
								<label for="exchenge_give">
									<?= $_txt['get_text'] ?>
									(<span id="exchange_input_currency"><?= $coin; ?></span>)
								</label>
							</div>
							<div class="input-wrap input_errors" data-error="give_error">
								<input class="default" type="text" name="amount" id="exchange_give" value="<?= $user->balance_withdrawal; ?>" required>
								<div class="error-message" data-error-text="give_error"></div>
							</div>
						</div>

						
						<div class="exchange-form-title">
							<span class="exchange-form-title__icon">
								<svg><use xlink:href="/app/images/svg_sprite.svg#depositform"></use></svg>
							</span>
							<span class="exchange-form-title__text"><?= $_txt['exchange_form_title'] ?></span>
						</div>

						<div class="exchange-form__list">
							<div class="exchange-form__item">
								<div class="exchange-form__sub"><?= $_txt['exchange_form_item_1'] ?>:</div>
								<div class="exchange-form__title">
									<span id="exchange_get_base"><?= $user->balance_withdrawal; ?></span> <?= $coin; ?>
								</div>
							</div>
							<div class="exchange-form__item">
								<div class="exchange-form__sub"><?= $_txt['exchange_form_item_2'] ?>:</div>
								<div class="exchange-form__title">
									<span id="exchange_get_action">+ <?= format_money(round_money($user->balance_withdrawal * 0.01)); ?></span> <?= $coin; ?>
								</div>
							</div>
							<div class="exchange-form__item">
								<div class="exchange-form__sub"><?= $_txt['exchange_form_item_3'] ?>:</div>
								<div class="exchange-form__title color" id="exchenge_get_wrapper">
									<span id="exchange_get"><?= format_money(round_money($user->balance_withdrawal * 1.01)); ?></span>&nbsp;<?= $coin; ?>
								</div>
							</div>
						</div>

						<button class="button" type="submit"><span><?= $_txt['form_btn']; ?></span></button>

					</div>
				</form>

			</div>
		</div>
	</div>
</section>




<!--
<form class="form-add exchange__form" data-controller="money/exchange" data-callback="input_errors">
	<div class="exchange__form-items">

		<div class="exchange__title"><?= $_txt['get_text']; ?></div>

		<div class="exchange__form-item">
			<div class="exchange__form-item-input input_errors" data-error="give_error">
				<input class="default" type="text" name="amount" id="exchenge_give" value="<?= $user->balance_withdrawal; ?>">
				<span id="exchange_input_currency"><?= $coin; ?></span>
				<div class="error-message" data-error-text="give_error"></div>
			</div>
		</div>
		
		<div class="exchange__form-item">
			<span id="exchenge_get_wrapper"><?= $_txt['total_get_text']; ?>: <span id="exchenge_get"><?= format_money(round_money($user->balance_withdrawal * 1.01)); ?></span>&nbsp;<?= $coin; ?></span>
		</div>
	</div>

	<div>
		<button class="btn-default_2" type="submit"><span><?= $_txt['form_btn']; ?></span></button>
	</div>
</form>

-->