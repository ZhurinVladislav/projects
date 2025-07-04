<?php
$_txt['header'] = 'FAQ';

global $coin, $settings;

$withdraw_minimum_btc = $settings->get('withdraw_minimum_btc');
$withdraw_minimum_usd = $settings->get('withdraw_minimum_usd');
$withdraw_minimum_eur = $settings->get('withdraw_minimum_eur');
$withdraw_minimum_rub = $settings->get('withdraw_minimum_rub');

$_txt['faq_items'] = array(
	1 => array(
		'title' => 'Qu\'est-ce que le «Solde des achats» et le «Solde des retraits»',
		'text' => '"Solde pour les achats" - à partir de ce solde, vous pouvez utiliser les fonds pour lancer des campagnes publicitaires et participer à des jeux. Les fonds du « solde d’achat » ne peuvent pas être retirés. Vous pouvez recharger le «Solde pour les achats» via les fonds __link(\'"Wallet"\', \'replenish\') ou __link(\'converting\', \'exchange\') à partir du «Solde pour le retrait» <br>" Solde pour le retrait " - les fonds que vous recevez pour visionner des publicités, participer à des jeux et au programme de parrainage sont crédités sur ce solde. Les fonds du « Solde pour retrait » peuvent également être utilisés pour participer à des jeux. Les fonds du « Solde pour retrait » sont disponibles pour le retrait ou __link(\'conversion\', \'exchange\') vers « Solde pour achats ».'
	),
	2 => array(
		'title' => 'Le __site est-il sûr?',
		'text' => 'Oui, notre plateforme est sécurisée et vos mots de passe sont hachés. Nous utilisons un système de sécurité fiable, mais la sécurité dépend aussi de vos paramètres ! Utilisez un mot de passe fort et UNIQUE. Vous pouvez protéger votre compte en utilisant __link(\'2FA\', \'personal-data\') (authentification à deux facteurs).'
	),
	3 => array(
		'title' => 'Qu\'est-ce que l\'authentification à deux facteurs?',
		'text' => 'Avec 2FA, vous pouvez protéger votre __link(\'account\', \'personal-data\') en ajoutant une couche de sécurité supplémentaire. Si vous activez 2FA, vous devrez saisir le code PIN généré sur votre appareil mobile à chaque fois que vous vous connecterez à un site Web.'
	),
	4 => array(
		'title' => 'Qu\'est-ce que __coin?',
		'text' => '__coin est une monnaie interne qui vous est créditée après chaque action effectuée et qui peut être convertie en l\'une des crypto-monnaies prises en charge. La valeur d\'une pièce peut changer avec le temps. Le taux actuel est de 1 __coin = 1 BTC.'
	),
	5 => array(
		'title' => 'Comment puis-je gagner de l’argent ?',
		'text' => '1. __link(\'Visualisation de sites Web\', \'viewing\') – la principale source de revenus est la consultation de sites Web. Plus vous consultez de sites, plus vos revenus seront élevés. <br>2. __link(\'Attirer des références\', \'referrals\') – partagez votre lien de parrainage avec vos amis et gagnez<br>3. __link(\'Games\', \'games\') – jouez à des jeux, obtenez des récompenses.<br>Nous ne prévoyons pas de nous arrêter là. Nous avons bien d\'autres idées qui vous aideront à gagner de l\'argent sur notre échange et à vous amuser.'
	),
	6 => array(
		'title' => 'Puis-je créer plusieurs comptes ?',
		'text' => 'Non. Tous les comptes seront bloqués.'
	),
	7 => array(
		'title' => 'Comment puis-je retirer mes pièces ?',
		'text' => 'Vous pouvez retirer vos pièces sur Payeer, Perfect Money, Bitcoin'
	),
	8 => array(
		'title' => 'Quelle est la limite minimale de retrait ?',
		'text' => 'Montant minimum de retrait pour:<br>USD – '.$withdraw_minimum_usd.' Dollar américain;<br>EUR – '.$withdraw_minimum_eur.' euro;<br>RUB – '.$withdraw_minimum_rub.' roubles;<br>Bitcoin – '.$withdraw_minimum_btc.' BTC.'
	),
	9 => array(
		'title' => 'Pourquoi je me déconnecte ?',
		'text' => 'Si vous n\'avez pas été actif pendant 24 heures, vous serez déconnecté de votre compte. Ceci est fait pour maintenir la sécurité de votre compte.'
	),
	10 => array(
		'title' => 'À quelle vitesse les fonds sont-ils versés?',
		'text' => 'Le paiement des fonds est effectué dans les 24 heures.'
	),
	11 => array(
		'title' => 'Je n\'ai pas reçu de paiement sur mon portefeuille Bitcoin',
		'text' => 'La confirmation d’une transaction Bitcoin par le réseau peut prendre plusieurs heures, voire plusieurs jours. Tout d’abord, vérifiez votre adresse Bitcoin sur le réseau blockchain. Si vous n\'y voyez pas votre transaction, vous pouvez nous envoyer un ticket. Vous pouvez vérifier votre adresse dans n’importe quel navigateur Bitcoin:<br><a href="https://www.blockchain.com/explorer" target="_blank">www.blockchain.com/explorer</a><br><a href="https://live.blockcypher.com/btc" target="_blank">live.blockcypher.com/btc</a><br><a href="https://blockchair.com/bitcoin" target="_blank">blockchair.com/bitcoin</a>'
	),
);