<?php
$_txt['header'] = 'FAQ';

global $coin, $settings;

$withdraw_minimum_btc = $settings->get('withdraw_minimum_btc');
$withdraw_minimum_usd = $settings->get('withdraw_minimum_usd');
$withdraw_minimum_eur = $settings->get('withdraw_minimum_eur');
$withdraw_minimum_rub = $settings->get('withdraw_minimum_rub');

$_txt['faq_items'] = array(
	1 => array(
		'title' => 'O que é “Saldo para compras” e “Saldo para saques”',
		'text' => '“Saldo para compras” - deste saldo você pode utilizar recursos para lançar campanhas publicitárias e participar de jogos. Os fundos do “saldo de compra” não podem ser retirados. Você pode recarregar o "Saldo para compras" através de __link(\'"Wallet"\', \'replenish\') ou __link(\'converting\', \'exchange\') fundos do "Saldo para retirada" <br>"Saldo para retirada" - os fundos que você recebe para visualizar publicidade, participar de jogos e do programa de indicações são creditados neste saldo. Os fundos do “Saldo para saque” também podem ser usados para participar de jogos. Os fundos do "Saldo para saque" estão disponíveis para saque ou __link(\'conversion\', \'exchange\') para "Saldo para compras".'
	),
	2 => array(
		'title' => '__site é seguro?',
		'text' => 'Sim, nossa plataforma é segura e suas senhas possuem hash. Usamos um sistema de segurança confiável, mas a segurança também depende das suas configurações! Use uma senha forte e ÚNICA. Você pode proteger sua conta usando __link(\'2FA\', \'personal-data\') (autenticação de dois fatores).'
	),
	3 => array(
		'title' => 'O que é autenticação de dois fatores?',
		'text' => 'Com 2FA, você pode proteger seu __link(\'account\', \'personal-data\') adicionando uma camada extra de segurança. Se você ativar o 2FA, terá que inserir o PIN gerado no seu dispositivo móvel sempre que fizer login em um site.'
	),
	4 => array(
		'title' => 'O que é __coin?',
		'text' => '__coin é uma moeda interna que é creditada a você após cada ação concluída e pode ser convertida em uma das criptomoedas suportadas. O valor de 1 moeda pode mudar com o tempo. A taxa atual é 1 __coin = 1 BTC.'
	),
	5 => array(
		'title' => 'Como posso ganhar dinheiro?',
		'text' => '1. __link(\'Visualizando sites\', \'viewing\') – a principal fonte de ganhos é a visualização de sites. Quanto mais sites você visitar, maior será sua receita. <br>2. __link(\'Atraindo referências\', \'referrals\') – compartilhe seu link de indicação com seus amigos e ganhe<br>3. __link(\'Games\', \'games\') – jogue e ganhe recompensas.<br>Não planejamos parar por aí. Temos muito mais ideias que vão te ajudar a ganhar dinheiro com nosso intercâmbio e se divertir.'
	),
	6 => array(
		'title' => 'Posso criar várias contas?',
		'text' => 'Não. Todas as contas serão bloqueadas.'
	),
	7 => array(
		'title' => 'Como posso retirar minhas moedas?',
		'text' => 'Você pode sacar suas moedas para Payeer, Perfect Money, Bitcoin'
	),
	8 => array(
		'title' => 'Qual é o limite mínimo de retirada?',
		'text' => 'Valor mínimo de saque para:<br>USD – '.$withdraw_minimum_usd.' Dólar americano;<br>EUR – '.$withdraw_minimum_eur.' euro;<br>RUB – '.$withdraw_minimum_rub.' rublos;<br>Bitcoin – '.$withdraw_minimum_btc.' BTC.'
	),
	9 => array(
		'title' => 'Por que estou saindo?',
		'text' => 'Se você não estiver ativo por 24 horas, você será desconectado da sua conta. Isso é feito para manter a segurança da sua conta.'
	),
	10 => array(
		'title' => 'Com que rapidez os fundos são pagos?',
		'text' => 'O pagamento dos fundos é realizado em 24 horas.'
	),
	11 => array(
		'title' => 'Não recebi pagamento na minha carteira Bitcoin',
		'text' => 'Pode levar várias horas ou até dias para que uma transação Bitcoin seja confirmada pela rede. Primeiro, verifique o seu endereço Bitcoin na rede blockchain. Se você não vir sua transação lá, você pode nos enviar um ticket. Você pode verificar seu endereço em qualquer navegador Bitcoin:<br><a href="https://www.blockchain.com/explorer" target="_blank">www.blockchain.com/explorer</a><br><a href="https://live.blockcypher.com/btc" target="_blank">live.blockcypher.com/btc</a><br><a href="https://blockchair.com/bitcoin" target="_blank">blockchair.com/bitcoin</a>'
	),
);