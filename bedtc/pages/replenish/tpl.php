<?php
// require_once './functions/news.php';
global $coin, $settings;

?>


<section class="account-balance">
	<div class="container">
		<div class="content" data-placeholder="replenish-confirm">
			<h1 class="header_1"><?= $_txt['header']; ?></h1>

			<form class="form-add money__form" data-controller="money/replenish" data-callback="place_content" data-result="replenish-confirm">

				<div class="method">
					<div class="method-title">
						<span class="method-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#method"></use></svg>
						</span>
						<span class="method-title__text"><?= $_txt['form']['paymethod']; ?></span>
					</div>
					<div class="method-content">
						<div class="method-list" id="paymethod">
							<label class="method-item active">
								<img src="/app/images/payment1.svg" alt="payeer">
								<input type="radio" style="display: none;" name="payment_system" value="payeer" checked="checked">
							</label>
							
							<!--
							<label class="method-item">
								<img src="/app/images/payment2.svg" alt="qiwi">
								<input type="radio" style="display: none;" name="payment_system" value="qiwi">
							</label>
							-->

							<label class="method-item">
								<img src="/app/images/payment3.svg" alt="bitcoin">
								<input type="radio" style="display: none;" name="payment_system" value="bitcoin">
							</label>

							<label class="method-item">
								<img src="/app/images/payment4.svg" alt="litecoin">
								<input type="radio" style="display: none;" name="payment_system" value="litecoin">
							</label>

							<label class="method-item">
								<img src="/app/images/payment5.svg" alt="ethereum">
								<input type="radio" style="display: none;" name="payment_system" value="ethereum">
							</label>

							<label class="method-item">
								<img src="/app/images/payment6.svg" alt="perfectmoney">
								<input type="radio" style="display: none;" name="payment_system" value="perfectmoney">
							</label>

							<label class="method-item">
								<img src="/app/images/payment7.svg" alt="dogecoin">
								<input type="radio" style="display: none;" name="payment_system" value="dogecoin">
							</label>

							<label class="method-item">
								<img src="/app/images/payment8.svg" alt="monero">
								<input type="radio" style="display: none;" name="payment_system" value="monero">
							</label>

							<label class="method-item">
								<img src="/app/images/payment9.svg" alt="tether">
								<input type="radio" style="display: none;" name="payment_system" value="tether">
							</label>

							<label class="method-item">
								<img src="/app/images/payment10.svg" alt="dash">
								<input type="radio" style="display: none;" name="payment_system" value="dash">
							</label>

							<label class="method-item">
								<img src="/app/images/payment11.svg" alt="ripple">
								<input type="radio" style="display: none;" name="payment_system" value="ripple">
							</label>

							<label class="method-item">
								<img src="/app/images/payment12.svg" alt="binancecoin">
								<input type="radio" style="display: none;" name="payment_system" value="binancecoin">
							</label>
							
						</div>
					</div>
				</div>

				<div class="deposit">
					<div class="deposit-title">
						<span class="deposit-title__icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#deposit"></use></svg>
						</span>
						<span class="deposit-title__text"><?= $_txt['form']['amount']; ?></span>
					</div>
					<div class="deposit-content">
						<div class="deposit-info">
							<div class="deposit-info__wrap">
								<div class="deposit-info__image">
									<img src="/app/images/deposit-info.png" alt="">
								</div>
								<div class="deposit-info__text">
									<?= $_txt['form']['info']; ?>
									<span class="color"><?= $_txt['form']['info_color']; ?></span>
								</div>
							</div>
							<div class="deposit-info__list">
								<div class="deposit-info__item">
									<div class="deposit-info__number">+10%</div>
									<div class="deposit-info__value"><?= $_txt['form']['from']; ?> 0,00010000 coin</div>
								</div>
								<div class="deposit-info__item">
									<div class="deposit-info__number">+8%</div>
									<div class="deposit-info__value"><?= $_txt['form']['from']; ?> 0,00005000 coin</div>
								</div>
								<div class="deposit-info__item">
									<div class="deposit-info__number">+6%</div>
									<div class="deposit-info__value"><?= $_txt['form']['from']; ?> 0,00003000 coin</div>
								</div>
								<div class="deposit-info__item">
									<div class="deposit-info__number">+5%</div>
									<div class="deposit-info__value"><?= $_txt['form']['from']; ?> 0,00002000 coin</div>
								</div>
							</div>
						</div>


						<div class="form-item">
							<div class="label-wrap">
								<label for="amount"><?= $_txt['form']['sum']; ?></label>
							</div>
							<div class="input-wrap input_errors" data-error="wrong_amount">
								<input type="text" class="default" name="amount" id="replenishment_amount" placeholder="<?= $_txt['form']['wrong_amount']; ?>" required>
								<div class="error-message" data-error-text="wrong_amount"><?= $_txt['error']['wrong_amount']; ?> 
								<?= format_money(1); ?></div>
							</div>
						</div>


						<div class="checkboxs" id="replenish_select_currency">

							<div class="checkbox-wrap currencys_item active" id="currency-usd">
								<label>
									<input type="radio" name="currency" value="USD" id="dollar" checked >
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">USD</div>
							</div>
							<!-- <div class="checkbox-wrap currencys_item">
								<label>
									<input type="radio" name="currency">
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">EUR</div>
							</div> -->
							<div class="checkbox-wrap currencys_item active" id="currency-rub">
								<label>
									<input type="radio" name="currency" value="RUB" id="ruble">
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">RUB</div>
							</div>

							<div class="checkbox-wrap currencys_item" id="currency-btc">
								<label>
									<input type="radio" name="currency" value="BTC" id="btc">
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">BTC</div>
							</div>

							<div class="checkbox-wrap currencys_item" id="currency-litecoin">
								<label>
									<input type="radio" name="currency" value="LTC" id="litecoin">
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">LTC</div>
							</div>

							<div class="checkbox-wrap currencys_item" id="currency-dash">
								<label>
									<input type="radio" name="currency" value="DASH" id="dash">
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">DASH</div>
							</div>

							<div class="checkbox-wrap currencys_item" id="currency-doge">
								<label>
									<input type="radio" name="currency" value="DOGE" id="doge">
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">DOGE</div>
							</div>

							<div class="checkbox-wrap currencys_item" id="currency-ethereum">
								<label>
									<input type="radio" name="currency" value="ETH" id="ethereum">
									<div class="custom-checkbox">
										<svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
									</div>
								</label>
								<div class="checkbox-text">ETH</div>
							</div>

						</div>

						<div class="deposit-form-title">
							<span class="deposit-form-title__icon">
								<svg><use xlink:href="/app/images/svg_sprite.svg#depositform"></use></svg>
							</span>
							<span class="deposit-form-title__text"><?= $_txt['desc']['title']; ?></span>
						</div>

						<div class="deposit-form__list">
							<div class="deposit-form__item">
								<div class="deposit-form__sub"><?= $_txt['desc']['replenish']; ?></div>
								<div class="deposit-form__title"><span id="replenishment_get">0.0000</span>&nbsp;<?= $coin; ?></div>
								
							</div>
							<div class="deposit-form__item">
								<div class="deposit-form__sub"><?= $_txt['desc']['action']; ?></div>
								<div class="deposit-form__title">
									<i>+</i>
									<span id="replenishment_action">0.0000</span>&nbsp;<?= $coin; ?>
								</div>
							</div>
							<div class="deposit-form__item">
								<div class="deposit-form__sub"><?= $_txt['desc']['total']; ?></div>
								<div class="deposit-form__title color"><span id="replenishment_total_sum"><?= format_money(0); ?></span>&nbsp;<?= $coin; ?></div>
							</div>
						</div>

						<button type="submit" class="button <?= $user->language; ?>"><span><?= $_txt['form']['btn']; ?></span></button>

					</div>
				</div>

			</form>

		</div>
	</div>
</section>













<!--

<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<div data-placeholder="replenish-confirm">
	<form class="form-add money__form" data-controller="money/replenish" data-callback="place_content" data-result="replenish-confirm">

		<div class="money__form-title"><?= $_txt['form']['paymethod']; ?></div>
		

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





		<div class="money__form-item">
			<label for="amount"><?= $_txt['form']['amount']; ?></label>
			<div class="input_errors" data-error="wrong_amount">
				<input type="text" class="default" name="amount" id="replenishment_amount" placeholder="Сумма" required>
				<div class="error-message" data-error-text="wrong_amount"><?= $_txt['error']['wrong_amount']; ?> 
				<?= format_money(1); ?></div>
			</div>
		</div>





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
		
		<div class="money__form-btns">
			<button type="submit" class="btn-default_2 <?= $user->language; ?>"><span><?= $_txt['form']['btn']; ?></span></button>
		</div>
	</form>
	
</div>

-->




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
