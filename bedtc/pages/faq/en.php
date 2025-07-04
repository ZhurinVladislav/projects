<?php
$_txt['header'] = 'FAQ';

global $coin, $settings;

$withdraw_minimum_btc = $settings->get('withdraw_minimum_btc');
$withdraw_minimum_usd = $settings->get('withdraw_minimum_usd');
$withdraw_minimum_eur = $settings->get('withdraw_minimum_eur');
$withdraw_minimum_rub = $settings->get('withdraw_minimum_rub');

$_txt['faq_items'] = array(
	1 => array(
		'title' => 'What is "Balance for purchases" and "Balance for withdrawal"',
		'text' => '“Balance for purchases” - from this balance you can use funds to launch advertising campaigns and participate in games. Funds from the “purchase balance” cannot be withdrawn. You can top up the "Balance for purchases" through __link(\'"Wallet"\', \'replenish\') or __link(\'converting\', \'exchange\') funds from the "Balance for withdrawal" <br>" Balance for withdrawal" - funds that you receive for viewing advertising, participating in games and the referral program are credited to this balance. Funds from the “Balance for withdrawal” can also be used to participate in games. "Balance for withdrawal" funds are available for withdrawal or __link(\'conversion\', \'exchange\') to "Balance for purchases".'
	),
	2 => array(
		'title' => 'Is __site safe?',
		'text' => 'Yes, our platform is secure and your passwords are hashed. We use a reliable security system, but security also depends on your settings! Use a strong and UNIQUE password. You can protect your account using __link(\'2FA\', \'personal-data\') (two-factor authentication).'
	),
	3 => array(
		'title' => 'What is two-factor authentication?',
		'text' => 'With 2FA, you can protect your __link(\'account\', \'personal-data\') by adding an extra layer of security. If you enable 2FA, you will have to enter the PIN generated on your mobile device every time you log into a website.'
	),
	4 => array(
		'title' => 'What is __coin?',
		'text' => '__coin is an internal currency that is credited to you after each completed action and can be converted into one of the supported cryptocurrencies. The value of 1 coin may change over time. The current rate is 1 __coin = 1 btc.'
	),
	5 => array(
		'title' => 'How can I earn money?',
		'text' => '1. __link(\'Viewing websites\', \'viewing\') – the main source of earnings is viewing websites. The more sites you look at, the more your income will be. <br>2. __link(\'Attracting referrals\', \'referrals\') – share your referral link with your friends and earn<br>3. __link(\'Games\', \'games\') – play games, get rewards.<br>We don’t plan to stop there. We have many more ideas that will help you make money on our exchange and have fun.'
	),
	6 => array(
		'title' => 'Can I create multiple accounts?',
		'text' => 'No. All accounts will be blocked.'
	),
	7 => array(
		'title' => 'How can I withdraw my coins?',
		'text' => 'You can withdraw your coins to Payeer, Perfect Money, Bitcoin'
	),
	8 => array(
		'title' => 'What is the minimum withdrawal limit?',
		'text' => 'Minimum withdrawal amount for:<br>USD – '.$withdraw_minimum_usd.' US dollar;<br>EUR – '.$withdraw_minimum_eur.' euro;<br>RUB – '.$withdraw_minimum_rub.' rubles;<br>Bitcoin – '.$withdraw_minimum_btc.' BTC.'
	),
	9 => array(
		'title' => 'Why am I logging out?',
		'text' => 'If you have not been active for 24 hours, you will be logged out of your account. This is done to maintain the security of your account.'
	),
	10 => array(
		'title' => 'How quickly are funds paid out?',
		'text' => 'Payment of funds is carried out within 24 hours.'
	),
	11 => array(
		'title' => 'I didn\'t receive payment to my Bitcoin wallet',
		'text' => 'It can take several hours or even days for a Bitcoin transaction to be confirmed by the network. First, check your Bitcoin address on the blockchain network. If you don\'t see your transaction there, you can send us a ticket. You can check your address in any Bitcoin browser:<br><a href="https://www.blockchain.com/explorer" target="_blank">www.blockchain.com/explorer</a><br><a href="https://live.blockcypher.com/btc" target="_blank">live.blockcypher.com/btc</a><br><a href="https://blockchair.com/bitcoin" target="_blank">blockchair.com/bitcoin</a>'
	),
);