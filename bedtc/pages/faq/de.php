<?php
$_txt['header'] = 'FAQ';

global $coin, $settings;

$withdraw_minimum_btc = $settings->get('withdraw_minimum_btc');
$withdraw_minimum_usd = $settings->get('withdraw_minimum_usd');
$withdraw_minimum_eur = $settings->get('withdraw_minimum_eur');
$withdraw_minimum_rub = $settings->get('withdraw_minimum_rub');

$_txt['faq_items'] = array(
	1 => array(
		'title' => 'Was ist „Guthaben für Einkäufe“ und „Guthaben für Abhebungen“?',
		'text' => '„Guthaben für Einkäufe“ – mit diesem Guthaben können Sie Werbekampagnen starten und an Spielen teilnehmen. Mittel aus dem „Kaufguthaben“ können nicht abgehoben werden. Sie können das „Guthaben für Einkäufe“ über __link(\'"Wallet"\', \'replenish\') oder __link(\'Converting\', \'exchange\') mit Geldern vom "Guthaben für Abhebungen" aufladen. <br>„Guthaben zum Abheben“ – Gelder, die Sie für das Ansehen von Werbung, die Teilnahme an Spielen und das Empfehlungsprogramm erhalten, werden diesem Guthaben gutgeschrieben. Mittel aus dem „Guthaben für Auszahlung“ können auch für die Teilnahme an Spielen verwendet werden. „Guthaben zum Abheben“ steht zum Abheben oder __link(\'Konvertierung\', \'exchange\') zum „Guthaben für Einkäufe“ zur Verfügung.'
	),
	2 => array(
		'title' => 'Ist __site sicher?',
		'text' => 'Ja, unsere Plattform ist sicher und Ihre Passwörter werden gehasht. Wir verwenden ein zuverlässiges Sicherheitssystem, aber die Sicherheit hängt auch von Ihren Einstellungen ab! Verwenden Sie ein sicheres und EINZIGARTIGES Passwort. Sie können Ihr Konto mit __link(\'2FA\', \'personal-data\') (Zwei-Faktor-Authentifizierung) schützen.'
	),
	3 => array(
		'title' => 'Was ist Zwei-Faktor-Authentifizierung?',
		'text' => 'Mit 2FA können Sie Ihren __link(\'Konto\', \'personal-data\') schützen, indem Sie eine zusätzliche Sicherheitsebene hinzufügen. Wenn Sie 2FA aktivieren, müssen Sie bei jeder Anmeldung auf einer Website die auf Ihrem Mobilgerät generierte PIN eingeben.'
	),
	4 => array(
		'title' => 'Was ist __coin?',
		'text' => '__coin ist eine interne Währung, die Ihnen nach jeder abgeschlossenen Aktion gutgeschrieben wird und in eine der unterstützten Kryptowährungen umgewandelt werden kann. Der Wert einer Münze kann sich im Laufe der Zeit ändern. Der aktuelle Kurs beträgt 1 __coin = 1 btc.'
	),
	5 => array(
		'title' => 'Wie kann ich Geld verdienen?',
		'text' => '1. __link(\'Anzeigen von Websites\', \'viewing\') – die Haupteinnahmequelle ist das Anzeigen von Websites. Je mehr Websites Sie sich ansehen, desto höher wird Ihr Einkommen sein. <br>2. __link(\'Empfehlungen anziehen\', \'referrals\') – Teilen Sie Ihren Empfehlungslink mit Ihren Freunden und verdienen Sie<br>3. __link(\'Games\', \'games\') – Spiele spielen, Belohnungen erhalten.<br>Wir haben nicht vor, damit aufzuhören. Wir haben viele weitere Ideen, die Ihnen helfen werden, mit unserer Börse Geld zu verdienen und Spaß zu haben.'
	),
	6 => array(
		'title' => 'Kann ich mehrere Konten erstellen?',
		'text' => 'Nein. Alle Konten werden gesperrt.'
	),
	7 => array(
		'title' => 'Wie kann ich meine Münzen abheben?',
		'text' => 'Sie können Ihre Münzen auf Payeer, Perfect Money, Bitcoin abheben'
	),
	8 => array(
		'title' => 'Wie hoch ist das Mindestauszahlungslimit?',
		'text' => 'Mindestauszahlungsbetrag für:<br>USD – '.$withdraw_minimum_usd.' US-Dollar;<br>EUR – '.$withdraw_minimum_eur.' euro;<br>RUB – '.$withdraw_minimum_rub.' Rubel;<br>Bitcoin – '.$withdraw_minimum_btc.' BTC.'
	),
	9 => array(
		'title' => 'Warum melde ich mich ab?',
		'text' => 'Wenn Sie 24 Stunden lang nicht aktiv waren, werden Sie von Ihrem Konto abgemeldet. Dies geschieht, um die Sicherheit Ihres Kontos zu gewährleisten.'
	),
	10 => array(
		'title' => 'Wie schnell werden die Mittel ausgezahlt?',
		'text' => 'Die Auszahlung des Geldes erfolgt innerhalb von 24 Stunden.'
	),
	11 => array(
		'title' => 'Ich habe keine Zahlung auf mein Bitcoin-Wallet erhalten',
		'text' => 'Es kann mehrere Stunden oder sogar Tage dauern, bis eine Bitcoin-Transaktion vom Netzwerk bestätigt wird. Überprüfen Sie zunächst Ihre Bitcoin-Adresse im Blockchain-Netzwerk. Wenn Ihre Transaktion dort nicht angezeigt wird, können Sie uns ein Ticket senden. Sie können Ihre Adresse in jedem Bitcoin-Browser überprüfen:<br><a href="https://www.blockchain.com/explorer" target="_blank">www.blockchain.com/explorer</a><br><a href="https://live.blockcypher.com/btc" target="_blank">live.blockcypher.com/btc</a><br><a href="https://blockchair.com/bitcoin" target="_blank">blockchair.com/bitcoin</a>'
	),
);