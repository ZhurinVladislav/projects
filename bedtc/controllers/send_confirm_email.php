<?php

require_once './pages/home/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() === false) {

	if ($user->email_confirmed == 0) {

		$subject = 'Welcome to '.$site_name;

		$email_hash = md5($user->email.'emailconfirm'.$email_salt);
		$confirm_link = $root_url.'email_confirm.php?email='.$user->email.'&hash='.$email_hash;
		$body = '
			<h1 style="margin-bottom: 37px; color: #ffc90d; font-size: 30px; text-align: center; letter-spacing: 0.13em;">Welcome to<br>'.$site_name.'</h1>
				
			<p style="margin-top: 0; margin-bottom: 0; color: #f5f4eb; font-size: 14px; font-weight: 700; line-height: 25px; font-family: Courier, arial;">
				Congratulations on your successful registration in <a style="color: #ffc90d; text-decoration: underline;" href="'.$root_url.'">'.$site_name.'</a>
				<br><br>
				To become a full member of the project, please confirm your mail
			</p>
			
			<a href="'.$confirm_link.'" style="display: block; width: 235px; margin-top: 55px; margin-bottom: 60px; color: #f5f4eb; font-size: 14px; font-weight: 700; font-family: Courier, arial; line-height: 13px; text-decoration: none;">
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="235">
					<tr>
						<td width="5" height="5"></td>
						<td width="5" height="5" style="background-color: #265276; border-top-left-radius: 5px;"></td>
						<td width="210" height="5" style="background-color: #265276;"></td>
						<td width="5" height="5" style="background-color: #265276;"></td>
						<td width="5" height="5" style="background-color: #265276; border-top-right-radius: 5px;"></td>
					</tr>
					<tr>
						<td width="5" height="5" style="background-color: #318dbf; border-top-left-radius: 5px;"></td>
						<td width="5" height="5" style="background-color: #318dbf;"></td>
						<td width="210" height="5" style="background-color: #318dbf;"></td>
						<td width="5" height="5" style="background-color: #265276;">
							<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="5">
								<tr>
									<td width="5" height="5" style="background-color: #318dbf; border-top-right-radius: 5px;"></td>
								</tr>
							</table>
						</td>
						<td width="5" height="5" style="background-color: #265276;"></td>
					</tr>
					<tr>
						<td width="5" height="18" border="0" style="background-color: #318dbf;"></td>
						<td width="5" height="18" border="0" style="background-color: #318dbf;"></td>
						<td width="5" height="18" border="0" align="center" style="-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; padding-top: 5px; color: #f5f4eb; font-size: 14px; font-weight: 700; font-family: Courier, arial; line-height: 13px; text-decoration: none; background-color: #318dbf;">Let&apos;s go!</td>
						<td width="5" height="18" border="0" style="background-color: #318dbf;"></td>
						<td width="5" height="18" border="0" style="background-color: #265276;"></td>
					</tr>
					<tr>
						<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
						<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
						<td width="5" height="5" border="0" align="center" style="background-color: #318dbf;"></td>
						<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
						<td width="5" height="5" border="0" style="background-color: #265276; border-bottom-right-radius: 5px;"></td>
					</tr>
					<tr>
						<td width="5" height="5" border="0" style="background-color: #318dbf; border-bottom-left-radius: 5px;"></td>
						<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
						<td width="5" height="5" border="0" align="center" style="background-color: #318dbf;"></td>
						<td width="5" height="5" border="0" style="background-color: #318dbf; border-bottom-right-radius: 5px;"></td>
						<td width="5" height="5" border="0"></td>
					</tr>
				</table>
			</a>

			<p>
				Can\'t see the button? Follow this link:<br>
				<a href="'.$confirm_link.'"></a>
			</p>

			<h2 style="font-size: 20px;">Login details:</h2>
			<p style="margin-top: 0; margin-bottom: 0; color: #f5f4eb; font-size: 14px; font-weight: 700; line-height: 25px; font-family: Courier, arial;">
				Login: <span style="color: #ffc90d">'.$login.'</span>
				<br>
				Password: <span style="color: #ffc90d">'.$password_for_email.'</span>
				<br>
				PIN-code: <span style="color: #ffc90d">'.$pin.'</span>
				<br><br>
				<span style="color: #ffc90d">Please keep your username, password and PIN-code specified during registration in a safe place. PIN-code recovery is impossible!</span>
			</p>
		';

		require_once './classes/PHPmailer.php';
		require_once './classes/Exception.php';
		require_once './classes/SMTP.php';
		require_once './functions/mail.php';

		if (send_mail($user->email, $subject, $body)) {
			$response['status'] = 'ok';
			$response['print'] = '
				<div class="remind__form-success_img"></div>

				<div class="remind__form-success_text">
					'.$_txt['email_send_again'].'
				</div>

				<div class="remind__form-success_btn">
					<a data-href="main" data-template="main">'.$_txt['btn_to_main'].'</a>
				</div>
			';
		} else {
			$response['status'] = 'ok';
			$pdo->query('UPDATE project_statistics SET value = value + 1 WHERE name LIKE "mails_unsended_register" LIMIT 1');
		}
	}
}


echo json_encode($response);