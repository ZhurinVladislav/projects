<?php
$_txt['header'] = 'FAQ';

global $coin, $settings;

$withdraw_minimum_btc = $settings->get('withdraw_minimum_btc');
$withdraw_minimum_usd = $settings->get('withdraw_minimum_usd');
$withdraw_minimum_eur = $settings->get('withdraw_minimum_eur');
$withdraw_minimum_rub = $settings->get('withdraw_minimum_rub');

$_txt['faq_items'] = array(
	1 => array(
		'title' => '什么是“买入余额”和“提款余额”',
		'text' => '“购买余额” - 您可以使用此余额来发起广告活动和参与游戏。 “购买余额”中的资金无法提取。 您可以通过“提现余额”中的 __link(\'钱包\', \'replenish\') 或 __link(\'将“提现余额”中的\', \'exchange\') 资金充值“购买余额” <br>“提款余额”-您因观看广告、参与游戏和推荐计划而收到的资金将记入此余额。 “提现余额”的资金也可以用于参加游戏。 “提款余额”资金可用于提款或 __link(\'转换\', \'exchange\') 至“余额购买”。'
	),
	2 => array(
		'title' => '__site 安全吗？',
		'text' => '是的，我们的平台是安全的，您的密码经过哈希处理。 我们使用可靠的安全系统，但安全性也取决于您的设置！ 使用强且唯一的密码。 您可以使用 __link(\'2FA\', \'personal-data\') （双因素身份验证）保护您的帐户。'
	),
	3 => array(
		'title' => '什么是双因素身份验证？',
		'text' => '使用 2FA，您可以通过添加额外的安全层来保护您的 __link(\'帐户\', \'personal-data\')。 如果启用 2FA，则每次登录网站时都必须输入移动设备上生成的 PIN。'
	),
	4 => array(
		'title' => '什么是__coin？',
		'text' => '__coin 是一种内部货币，在每次完成操作后都会记入您的账户，并且可以转换为受支持的加密货币之一。 1 个硬币的价值可能会随着时间而改变。 当前汇率为 1 __coin = 1 BTC。'
	),
	5 => array(
		'title' => '我怎样才能赚钱？',
		'text' => '1。 __link(\'查看网站\', \'viewing\') – 主要收入来源是查看网站。 您浏览的网站越多，您的收入就越多。 <br>2。 __link(\'吸引推荐\', \'referrals\') – 与您的朋友分享您的推荐链接并赚取<br>3。 __link(\'游戏\', \'games\') – 玩游戏，获得奖励。<br>我们不打算就此止步。 我们还有更多想法可以帮助您在我们的交易所中赚钱并享受乐趣。'
	),
	6 => array(
		'title' => '我可以创建多个帐户吗？',
		'text' => '不。 所有帐户都将被封锁。'
	),
	7 => array(
		'title' => '我如何提取我的硬币？',
		'text' => '您可以将您的币提取到 Payeer、Perfect Money、Bitcoin'
	),
	8 => array(
		'title' => '最低提款限额是多少？',
		'text' => '最低提款金额：<br>美元 – '.$withdraw_minimum_usd.' 美元；<br>欧元 – '.$withdraw_minimum_eur.' 欧元；<br>RUB – '.$withdraw_minimum_rub.' 卢布；<br>比特币 – '.$withdraw_minimum_btc.' BTC。'
	),
	9 => array(
		'title' => '为什么我要退出？',
		'text' => '如果您在 24 小时内未进行任何活动，您的帐户将会被注销。 这样做是为了维护您帐户的安全。 '
	),
	10 => array(
		'title' => '资金支付的速度有多快？',
		'text' => '资金支付在 24 小时内完成。'
	),
	11 => array(
		'title' => '我的比特币钱包没有收到付款',
		'text' => '比特币交易可能需要几个小时甚至几天的时间才能被网络确认。 首先，检查您在区块链网络上的比特币地址。 如果您在那里没有看到您的交易，您可以向我们发送一张票。 您可以在任何比特币浏览器中检查您的地址：<br><a href="https://www.blockchain.com/explorer" target="_blank">www.blockchain.com/explorer</a><br><a href="https://live.blockcypher.com/btc" target="_blank">live.blockcypher.com/btc</a><br><a href="https://blockchair.com/bitcoin" target="_blank">blockchair.com/bitcoin</a>'
	),
);