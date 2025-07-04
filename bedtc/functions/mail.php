<?php

function send_mail($to, $subject, $body, $sender = 'info') {
	global $root_url, $site_name, $smtp_config, $email_salt;

	$email_hash = md5($to.$email_salt);
	$unsubscribe_link = $root_url.'unsubscribe.php?email='.$to.'&hash='.$email_hash;

	$markup_header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml" lang="ru">
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				<title></title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</head>
			<body style="margin: 0; padding: 0; box-sizing: border-box;">
				<img src="'.$root_url.'app/images/logo/logo_footer.png" alt="logo">
	';

	$markup_footer = '
				<a href="'.$unsubscribe_link.'" style="text-decoration: underline;">Unsubscribe<a>
				<p>
					<a href="'.$root_url.'" style="text-decoration: none;">'.$site_name.'</a>
				</p>
			</body>
		</html>
	';

	$markup = $markup_header.$body.$markup_footer;
	file_put_contents('logs/mail.html', $markup);

	$mail = new PHPMailer\PHPMailer\PHPMailer();
	$mail->isSMTP();
	$mail->Host = $smtp_config[$sender]['host'];
	$mail->SMTPAuth = true;
	$mail->Username = $smtp_config[$sender]['username']; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
	$mail->Password = $smtp_config[$sender]['password']; // Ваш пароль
	$mail->SMTPSecure = 'ssl';
	$mail->SMTPAutoTLS = false;
	$mail->Port = 465;
	$mail->setFrom($smtp_config[$sender]['from'], $site_name); // Ваш Email
	$mail->addAddress($to); // Email получателя
	
	// Письмо
	$mail->isHTML(true);
	$mail->Subject = $subject;
	$mail->Body = $markup; // Текст письма

	// Результат
	if(!$mail->send()) {
		// file_put_contents('/var/www/html/site/public_html/logs/mail_log.txt', $mail->ErrorInfo);
		return false;
	} else {
		return true;
	}
}