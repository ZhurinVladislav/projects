<?php

global $coin;

?>


<h1 class="header-inner"><?= $_txt['header'] ?></h1>

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