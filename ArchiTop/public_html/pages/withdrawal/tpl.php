<?php
// require_once './functions/news.php';
global $pdo, $user, $coin, $settings;

$user_wallets = $pdo->query('SELECT qiwi, payeer, perfectmoney, advcash FROM users_wallets WHERE user_id = '.$user->id);
$wallets = $user_wallets->fetch();

?>

<h1 class="header-inner"><?= $_txt['header']; ?></h1>
<?php
	if ($user->credit === 0 && $user->can_withdrawal === 1) {
?>

	<div data-placeholder="withdrawal-confirm">

		<form class="form-add money__form" data-controller="money/withdrawal" data-callback="place_content" data-result="withdrawal-confirm">

			<div class="text-with-coin small"><?= $_txt['form_header']['title_1']; ?><a data-href="tickets" data-template="main_external"><?= $_txt['form_header']['link']; ?></a> <?= $_txt['form_header']['title_2']; ?></div>

			<div class="money__form-title"><?= $_txt['form']['paymethod']; ?></div>
			
			<!-- ----------| START PAYMETHOD |---------- -->
			<div class="money__form-paymethod_items" id="withdrawal">
				<label class="item active">
					<img src="/app/images/paysystems/payeer.png">
					<span class="name">Payeer</span>
					<span class="instant">instant</span>
					<input type="radio" style="display: none;" name="payment_system" value="payeer" checked="checked">
				</label>

				<!-- <label class="item">
					<img src="/app/images/paysystems/advcash.png">
					<input type="radio" style="display: none;" name="payment_system" value="advcash">
				</label> -->

				<label class="item">
					<img src="/app/images/paysystems/qiwi.png">
					<span class="name">QIWI</span>
					<input type="radio" style="display: none;" name="payment_system" value="qiwi">
				</label>

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
			</div>
			<!-- ----------|  END PAYMETHOD  |--------- -->



			<!-- ----------| START AMOUNT |---------- -->
			<div class="money__form-item">
				<label for="amount_withdraw"><?= $_txt['form']['amount']; ?> (<?= $coin; ?>)</label>
				<div class="input_errors" data-error="wrong_amount">
					<!-- <div class="coin"><?= $coin; ?></div> -->
					<input type="text" class="default" name="amount" id="amount_withdraw" value="<?= $user->balance_withdrawal; ?>" required>
					<div class="error-message" data-error-text="wrong_amount"><?= $_txt['error']['wrong_amount']; ?>
					<?= format_money(1); ?></div>
				</div>
			</div>
			<!-- ----------|  END AMOUNT  |--------- -->



			<!-- ----------| START CURRENCY |---------- -->
			<div class="money__form-item" id="withdrawal_select_currency">
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
				</div>
			</div>
			<!-- ----------|  END CURRENCY  |--------- -->
			


			<!-- ----------| START WALLET |---------- -->
			<div class="money__form-item">
				<label for="wallet"><?= $_txt['form']['wallet']; ?></label>
				<div class="input_errors" data-error="">
					<input type="text" class="default" name="wallet" id="wallet" value="<?= $wallets['payeer']; ?>" required>
					<div class="error-message" data-error-text=""></div>
				</div>
			</div>
			<!-- ----------|  END WALLET  |--------- -->
			


			<!-- ----------| START PIN |---------- -->
			<div class="money__form-item">
				<label for="pin"><?= $_txt['form']['pin']; ?></label>
				<div class="input_errors" data-error="wrong_pin">
					<input type="text" class="default" name="pin" id="pin" required>
					<div class="error-message" data-error-text="wrong_pin"></div>
				</div>
			</div>
			<!-- ----------|  END PIN  |--------- -->



			<!-- ----------| START DESC |---------- -->
			<div class="money__form-item">
				<label><?= $_txt['desc']['paymethod']; ?></label>
				<div class="money__form-item_body">
					<div class="title">Payeer</div>
					<div class="dop_title"><span>payeer</span> <?= $_txt['desc']['wallet']; ?></div>

					<div class="commission"><?= $_txt['desc']['commission']; ?> 5 %</div>

					<div class="rate">
						<?= $_txt['desc']['rate']; ?> 1 <?= $coin; ?> = <span class="amount">
						<?= number_format($settings->get('currency_ratio') * $settings->get('currency_usd'), 2, '.', '')?>
						</span>&nbsp;<span class="currency">RUB</span></div>
					<div class="commission_btc"><?= $_txt['desc']['btc_commis']; ?></div>
				</div>
			</div>
			<!-- ----------|  END DESC  |--------- -->

			<div class="money__form-item">
				<label><?= $_txt['form']['total']; ?></label>
				<div class="total" id="withdrawal-total">
					<span class="amount"><?= number_format($user->balance_withdrawal * $settings->get('currency_ratio') * $settings->get('currency_usd'), 2, '.', '')?></span>&nbsp;<span class="currency">RUB</span>
				</div>
			</div>

			<div class="money__form-btns">
				<button class="btn-default_2" type="submit"><span><?= $_txt['form']['btn']; ?></span></button>
				<!-- <a class="history" data-href="withdrawal-history" data-template="main_inner"><?= $_txt['form']['history']; ?></a> -->
			</div>
		</form>
	</div>
<?php
	} elseif ($user->credit === 1) {
?>
		<div class="error-attr">
			<div class="error-attr__text"><?= $_txt['error']['has_credit']; ?></div>
		</div>
<?php
	} elseif ($user->can_withdrawal === 0) {
?>
		<div class="error-attr">
			<div class="error-attr__text"><?= $_txt['error']['cant_withdrawal']; ?></div>
		</div>
<?php
	}
?>

<script>
	rates = {
		'money_accuracy': <?= $settings->get('money_accuracy'); ?>,
		'currency_ratio': <?= $settings->get('currency_ratio'); ?>,
		'currency_usd': <?= $settings->get('currency_usd'); ?>,
		'currency_btc_to_usd': <?= $settings->get('currency_btc_to_usd'); ?>,
		'currency_usd_to_btc': <?= $settings->get('currency_usd_to_btc'); ?>,
		'currency_btc_to_rub': <?= $settings->get('currency_btc_to_rub'); ?>,
		'currency_rub_to_btc': <?= $settings->get('currency_rub_to_btc'); ?>
	};
	wallets = {
	<?php
		$i = 0;
		foreach ($wallets as $key => $value) {
			echo "'$key': '$value'";
			if ($i < count($wallets)) {
				echo ",\n";
			}
			$i++;
		}
	?>
	}
</script>