<?php

require_once './pages/work/'.$user->language.'.php';
require_once './functions/bot.php';
require_once './functions/users.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	//	ссылка, которую дал пользователь
	$sharelink = clean_string($_POST['items']['link']);

	$search_for_double = $pdo->prepare('SELECT link_sended FROM quest_vk_repost WHERE link_sended LIKE ? LIMIT 1');
	$search_for_double->execute(array('%'.$sharelink.'%'));

	if ($search_for_double->fetch() === false) {

		//	ссылка, которой надо было поделиться
		$oplink = $settings->get('quest_vk_link');

		$shared = 0;
		$fcount = '';
		$daysonline = '';
		$par = parse_url($sharelink);

		if (!$par['query']) {
			$valiants = array('https://vk.com/wall', 'https://m.vk.com/wall', '/wall', 'wall-');
			$vkuID = preg_replace('/_[\d,.]+/s', '', str_replace($valiants, '', $par['path']));
			$vkuID = preg_replace('/\%.+/', '', $vkuID);
			$vkPostID = preg_replace('/[\d,.]+_/s', '', str_replace($valiants, '', $par['path']));
			$vkPostID = preg_replace('/\%.+/', '', $vkPostID);
		} else {
			$vals = array('w=wall', '/wall', 'wall-');
			$vkuID = preg_replace('/_[\d,.]+/s', '', str_replace($vals, '', $par['query']));
			$vkuID = preg_replace('/\%.+/', '', $vkuID);
			$vkPostID = preg_replace('/[\d,.]+_/s', '', str_replace($vals, '', $par['query']));
			$vkPostID = preg_replace('/\%.+/', '', $vkPostID);
		}


		$friends = 'https://api.vk.com/method/friends.get?user_id='.$vkuID.'&order=name&count=1&offset=0&v=5.73&access_token=71character';
		$json = file_get_contents($friends);
		$data = json_decode($json, true);
		foreach ($data as $inf) {
			$fcount = $inf['count'];	
		}


		$getregdate = 'https://vk.com/foaf.php?id='.$vkuID;
		$xml = simpleXML_load_file($getregdate);
		$regdate = substr((string) $xml->xpath('//ya:created/@dc:date')[0], 0, 10);
		$today = time();
		$fdate = mktime(0, 0, 0, date("m", strtotime($regdate)), date("d", strtotime($regdate)), date("Y", strtotime($regdate)));
		$daysonline = floor(($today - $fdate) / 86400);


		$vkuID_link = str_replace('-', '', $vkuID);
		$vkPostID_link = str_replace('-', '', $vkPostID);

		$getinfurl = 'https://api.vk.com/method/wall.getById?posts='.$vkuID_link.'_'.$vkPostID_link.'&extended=0&v=5.73&access_token=71character';
		$json = file_get_contents($getinfurl);
		$data = json_decode($json, true);

		$orp = parse_url($oplink);
		if (!$orp['query']) {
			$valiants = array('https://vk.com/wall', 'https://m.vk.com/wall', '/wall');
			$orvkuID = preg_replace('/_[\d,.]+/s', '', str_replace($valiants, '', $orp['path']));
			$orvkPostID = preg_replace('/[\d,.]+_/s', '', str_replace($valiants, '', $orp['path']));
		} else {
			$orvkuID = preg_replace('/_[\d,.]+/s', '', str_replace('w=wall', '', $orp['query']));
			$orvkPostID = preg_replace('/[\d,.]+_/s', '', str_replace('w=wall', '', $orp['query']));
		}


		$vk_response = $data['response'];

		// if ($fcount >= 50) {
			if ($daysonline >= 31) {
				foreach ($vk_response as $item) {
					$chist = $item['copy_history'];
					foreach ($chist as $opinf) {
						if ($orvkuID == $opinf['owner_id'] and $opinf['id'] == str_replace('-', '', $orvkPostID)) {

							$insert_link = $pdo->prepare('INSERT INTO quest_vk_repost (user_id, link_sended, link_original, date_created) VALUES (?, ?, ?, ?)');
							$insert_link->execute(array($user->id, $sharelink, $oplink, time()));

							$last_quest_sql = $pdo->query('SELECT * FROM quest_vk_repost ORDER BY id DESC LIMIT 1');
							$last_quest = $last_quest_sql->fetch();

							$find_user = users_search_id($last_quest['user_id'], 'login');

							$quest_info['id'] = $last_quest['id'];
							$quest_info['link'] = $sharelink;
							$quest_info['login'] = $find_user['login'];


							notify_new_vk_quest($quest_info);

							$response['status'] = 'ok';
							$response['print'] = '<div class="success-attr">
										<div class="success-attr__text">'.$_txt['send_success'].'</div>
									  </div>';
							
						} else {
							$response['status'] = 'error';
							$response['placeholder'] = 'promoter_error';
							$response['display'] = '<div class="error-attr">
													<div class="error-attr__text">
														'.$_txt['promoter']['error_1'].'		
													</div>
												  </div>';
						}
					}
				}
			} else {
				$response['status'] = 'error';
				$response['placeholder'] = 'promoter_error';
				$response['display'] = '<div class="error-attr">
										<div class="error-attr__text">
											'.$_txt['promoter']['error_2'].'		
										</div>
									  </div>';
			}
		// } else {
		// 	$response['status'] = 'error';
		// 	$response['placeholder'] = 'promoter_error';
		// 	$response['display'] = '<div class="error-attr">
		// 							<div class="error-attr__text">
		// 								'.$_txt['promoter']['error_3'].'		
		// 							</div>
		// 						  </div>';
		// }


	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'promoter_error';
		$response['display'] = '<div class="error-attr">
								<div class="error-attr__text">
									'.$_txt['promoter']['error_4'].'		
								</div>
							  </div>';
	}

}

echo json_encode($response);