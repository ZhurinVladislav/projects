<?php
$_txt['header'] = 'FAQ';

global $coin, $settings;

$withdraw_minimum_btc = $settings->get('withdraw_minimum_btc');
$withdraw_minimum_usd = $settings->get('withdraw_minimum_usd');
$withdraw_minimum_eur = $settings->get('withdraw_minimum_eur');
$withdraw_minimum_rub = $settings->get('withdraw_minimum_rub');

$_txt['faq_items'] = array(
	1 => array(
		'title' => '¿Qué es “Saldo para compras” y “Saldo para retiro”?',
		'text' => '“Saldo para compras”: desde este saldo puede utilizar fondos para lanzar campañas publicitarias y participar en juegos. Los fondos del “saldo de compra” no se pueden retirar. Puede recargar el "Saldo para compras" a través de __link(\'"Wallet"\', \'replenish\') o __link(\'converting\', \'exchange\') fondos del "Saldo para retiro" <br>"Saldo para retiro": los fondos que recibe por ver publicidad, participar en juegos y el programa de referencias se acreditan a este saldo. Los fondos del “Saldo para retiro” también se pueden utilizar para participar en juegos. Los fondos del "Saldo para retiro" están disponibles para retiro o __link(\'conversion\', \'exchange\') al "Saldo para compras".'
	),
	2 => array(
		'title' => '¿Es __site seguro?',
		'text' => 'Sí, nuestra plataforma es segura y sus contraseñas están codificadas. Utilizamos un sistema de seguridad confiable, ¡pero la seguridad también depende de su configuración! Utilice una contraseña segura y ÚNICA. Puede proteger su cuenta usando __link(\'2FA\', \'personal-data\') (autenticación de dos factores).'
	),
	3 => array(
		'title' => '¿Qué es la autenticación de dos factores?',
		'text' => 'Con 2FA, puede proteger su __link(\'account\', \'personal-data\') agregando una capa adicional de seguridad. Si habilita 2FA, deberá ingresar el PIN generado en su dispositivo móvil cada vez que inicie sesión en un sitio web.'
	),
	4 => array(
		'title' => '¿Qué es __coin?',
		'text' => '__coin es una moneda interna que se le acredita después de cada acción completada y se puede convertir en una de las criptomonedas admitidas. El valor de 1 moneda puede cambiar con el tiempo. La tasa actual es 1 __coin = 1 btc.'
	),
	5 => array(
		'title' => '¿Cómo puedo ganar dinero?',
		'text' => '1. __link(\'Visualización de sitios web\', \'viewing\'): la principal fuente de ingresos es la visualización de sitios web. Cuantos más sitios visite, mayores serán sus ingresos. <br>2. __link(\'Atrayendo referencias\', \'referrals\') – comparte tu enlace de referencia con tus amigos y gana<br>3. __link(\'Games\', \'games\') – juega y obtén recompensas.<br>No planeamos detenernos ahí. Tenemos muchas más ideas que te ayudarán a ganar dinero en nuestro intercambio y divertirte.'
	),
	6 => array(
		'title' => '¿Puedo crear varias cuentas?',
		'text' => 'No. Todas las cuentas serán bloqueadas.'
	),
	7 => array(
		'title' => '¿Cómo puedo retirar mis monedas?',
		'text' => 'Puedes retirar tus monedas a Payeer, Perfect Money, Bitcoin'
	),
	8 => array(
		'title' => '¿Cuál es el límite mínimo de retiro?',
		'text' => 'Monto mínimo de retiro para:<br>USD – '.$withdraw_minimum_usd.' Dólar estadounidense;<br>EUR – '.$withdraw_minimum_eur.' euro;<br>RUB – '.$withdraw_minimum_rub.' rublos;<br>Bitcoin – '.$withdraw_minimum_btc.' BTC.'
	),
	9 => array(
		'title' => '¿Por qué me desconecto?',
		'text' => 'Si no ha estado activo durante 24 horas, se cerrará la sesión de su cuenta. Esto se hace para mantener la seguridad de su cuenta.'
	),
	10 => array(
		'title' => '¿Qué tan rápido se pagan los fondos?',
		'text' => 'El pago de los fondos se realiza dentro de las 24 horas.'
	),
	11 => array(
		'title' => 'No recibí el pago en mi billetera Bitcoin',
		'text' => 'Pueden pasar varias horas o incluso días hasta que la red confirme una transacción de Bitcoin. Primero, verifique su dirección de Bitcoin en la red blockchain. Si no ve su transacción allí, puede enviarnos un ticket. Puedes comprobar tu dirección en cualquier navegador Bitcoin:<br><a href="https://www.blockchain.com/explorer" target="_blank">www.blockchain.com/explorer</a><br><a href="https://live.blockcypher.com/btc" target="_blank">live.blockcypher.com/btc</a><br><a href="https://blockchair.com/bitcoin" target="_blank">blockchair.com/bitcoin</a>'
	),
);