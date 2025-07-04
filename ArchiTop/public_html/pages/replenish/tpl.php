<?php
// require_once './functions/news.php';
global $coin, $settings;

?>

<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<div data-placeholder="replenish-confirm">
	<form class="form-add money__form" data-controller="money/replenish" data-callback="place_content" data-result="replenish-confirm">

		<div class="money__form-title"><?= $_txt['form']['paymethod']; ?></div>
		
		<!-- ----------| START PAYMETHOD |---------- -->
		<div class="money__form-paymethod_items" id="paymethod">
			<label class="item active">
				<img src="/app/images/paysystems/payeer.png">
				<span class="name">Payeer</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="payeer" checked="checked">
			</label>

			<label class="item">
				<img src="/app/images/paysystems/qiwi.png">
				<span class="name">QIWI</span>
				<input type="radio" style="display: none;" name="payment_system" value="qiwi">
			</label>

			<!-- <label class="item">
				<img src="/app/images/paysystems/yandex.png">
				<span class="name">Yandex.Money</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="yandex">
			</label> -->

			<!-- <label class="item">
				<img src="/app/images/paysystems/advcash.png">
				<input type="radio" style="display: none;" name="payment_system" value="advcash">
			</label> -->

			<label class="item">
				<img src="/app/images/paysystems/pm.png">
				<span class="name">Perfect Money</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="perfectmoney">
			</label>
			
			<label class="item">
				<img src="/app/images/paysystems/bitcoin.png">
				<span class="name">Bitcoin</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="bitcoin">
			</label>

			<label class="item">
				<img src="/app/images/paysystems/litecoin.png">
				<span class="name">Litecoin</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="litecoin">
			</label>

			<label class="item">
				<img src="/app/images/paysystems/dash.png">
				<span class="name">Dash</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="dash">
			</label>

			<label class="item">
				<img src="/app/images/paysystems/doge.png">
				<span class="name">Dogecoin</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="doge">
			</label>

			<label class="item">
				<img src="/app/images/paysystems/ethereum.png">
				<span class="name">Ethereum</span>
				<span class="instant">instant</span>
				<input type="radio" style="display: none;" name="payment_system" value="ethereum">
			</label>
		</div>
		<!-- ----------|  END PAYMETHOD  |--------- -->



		<!-- ----------| START AMOUNT |---------- -->
		<div class="money__form-item">
			<label for="amount"><?= $_txt['form']['amount']; ?></label>
			<div class="input_errors" data-error="wrong_amount">
				<input type="text" class="default" name="amount" id="replenishment_amount" placeholder="Сумма" required>
				<div class="error-message" data-error-text="wrong_amount"><?= $_txt['error']['wrong_amount']; ?> 
				<?= format_money(1); ?></div>
			</div>
		</div>
		<!-- ----------|  END AMOUNT  |--------- -->



		<!-- ----------| START CURRENCY |---------- -->
		<div class="money__form-item" id="replenish_select_currency">
			<label><?= $_txt['form']['currency']; ?></label>
			<div class="currencys">
				<div class="currencys_item active" id="currency-rub">
					<input type="radio" name="currency" value="RUB" id="ruble" checked="checked">
					<label for="ruble">RUB</label>
				</div>

				<div class="currencys_item active" id="currency-usd">
					<input type="radio" name="currency" value="USD" id="dollar">
					<label for="dollar">USD</label>
				</div>

				<div class="currencys_item" id="currency-btc">
					<input type="radio" name="currency" value="BTC" id="btc">
					<label for="btc">BTC</label>
				</div>

				<div class="currencys_item" id="currency-litecoin">
					<input type="radio" name="currency" value="LTC" id="litecoin">
					<label for="litecoin">LTC</label>
				</div>

				<div class="currencys_item" id="currency-dash">
					<input type="radio" name="currency" value="DASH" id="dash">
					<label for="dash">DASH</label>
				</div>

				<div class="currencys_item" id="currency-doge">
					<input type="radio" name="currency" value="DOGE" id="doge">
					<label for="doge">DOGE</label>
				</div>

				<div class="currencys_item" id="currency-ethereum">
					<input type="radio" name="currency" value="ETH" id="ethereum">
					<label for="ethereum">ETH</label>
				</div>
			</div>
		</div>
		<!-- ----------|  END CURRENCY  |--------- -->
		


		<!-- ----------| START DESC |---------- -->
		<div class="money__form-item">
			<label><?= $_txt['desc']['title']; ?></label>
			<ul>
				<li>
					<i>+</i>
					<span id="replenishment_get">0.0000</span>&nbsp;<?= $coin; ?> <?= $_txt['desc']['replenish']; ?>
				</li>

				<li>
					<i>+</i>
					<span id="replenishment_action">0.0000</span>&nbsp;<?= $coin; ?> <?= $_txt['desc']['action']; ?>
				</li>

				<li class="total">
					<span><?= $_txt['desc']['total']; ?></span> <span id="replenishment_total_sum"><?= format_money(0); ?></span>&nbsp;<?= $coin; ?>
				</li>
			</ul>
		</div>
		<!-- ----------|  END DESC  |--------- -->
		<div class="money__form-btns">
			<button type="submit" class="btn-default_2 <?= $user->language; ?>"><span><?= $_txt['form']['btn']; ?></span></button>
		</div>
	</form>
	
</div>

<script>
	rates = {
		'money_accuracy': <?= $settings->get('money_accuracy'); ?>,
		'currency_ratio': <?= $settings->get('currency_ratio'); ?>,
		'currency_usd': <?= $settings->get('currency_usd'); ?>,
		'currency_btc_to_usd': <?= $settings->get('currency_btc_to_usd'); ?>,
		'currency_usd_to_btc': <?= $settings->get('currency_usd_to_btc'); ?>,
		'currency_btc_to_rub': <?= $settings->get('currency_btc_to_rub'); ?>,
		'currency_rub_to_btc': <?= $settings->get('currency_rub_to_btc'); ?>,
		'currency_ltc_to_btc': <?= $settings->get('currency_ltc_to_btc'); ?>,
		'currency_doge_to_btc': <?= $settings->get('currency_doge_to_btc'); ?>,
		'currency_dash_to_btc': <?= $settings->get('currency_dash_to_btc'); ?>,
		'currency_eth_to_btc': <?= $settings->get('currency_eth_to_btc'); ?>
	};
	action_percent = <?= $settings->get('action_percent'); ?>;
</script>
