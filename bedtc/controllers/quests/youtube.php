<?php

require_once './pages/bounty/'.$user->language.'.php';

//	https://www.youtube.com/watch?v=FGz_tA5yuL0

// function get_remote_data($url, $post_paramtrs = false) {
// 	$c = curl_init();
// 	curl_setopt($c, CURLOPT_URL, $url);
// 	curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
// 	if ($post_paramtrs) {
// 		curl_setopt($c, CURLOPT_POST, TRUE);
// 		curl_setopt($c, CURLOPT_POSTFIELDS, "var1=bla&" . $post_paramtrs);
// 	} curl_setopt($c, CURLOPT_SSL_VERIFYHOST, false);
// 	curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
// 	curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; rv:33.0) Gecko/20100101 Firefox/33.0");
// 	curl_setopt($c, CURLOPT_COOKIE, 'CookieName1=Value;');
// 	curl_setopt($c, CURLOPT_MAXREDIRS, 10);
// 	$follow_allowed = ( ini_get('open_basedir') || ini_get('safe_mode')) ? false : true;
// 	if ($follow_allowed) {
// 		curl_setopt($c, CURLOPT_FOLLOWLOCATION, 1);
// 	}curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 9);
// 	curl_setopt($c, CURLOPT_REFERER, $url);
// 	curl_setopt($c, CURLOPT_TIMEOUT, 60);
// 	curl_setopt($c, CURLOPT_AUTOREFERER, true);
// 	curl_setopt($c, CURLOPT_ENCODING, 'gzip,deflate');
// 	$data = curl_exec($c);
// 	$status = curl_getinfo($c);
// 	curl_close($c);
// 	preg_match('/(http(|s)):\/\/(.*?)\/(.*\/|)/si', $status['url'], $link);
// 	$data = preg_replace('/(src|href|action)=(\'|\")((?!(http|https|javascript:|\/\/|\/)).*?)(\'|\")/si', '$1=$2' . $link[0] . '$3$4$5', $data);
// 	$data = preg_replace('/(src|href|action)=(\'|\")((?!(http|https|javascript:|\/\/)).*?)(\'|\")/si', '$1=$2' . $link[1] . '://' . $link[3] . '$3$4$5', $data);
// 	if ($status['http_code'] == 200) {
// 		return $data;
// 	} elseif ($status['http_code'] == 301 || $status['http_code'] == 302) {
// 		if (!$follow_allowed) {
// 			if (empty($redirURL)) {
// 				if (!empty($status['redirect_url'])) {
// 					$redirURL = $status['redirect_url'];
// 				}
// 			} if (empty($redirURL)) {
// 				preg_match('/(Location:|URI:)(.*?)(\r|\n)/si', $data, $m);
// 				if (!empty($m[2])) {
// 					$redirURL = $m[2];
// 				}
// 			} if (empty($redirURL)) {
// 				preg_match('/href\=\"(.*?)\"(.*?)here\<\/a\>/si', $data, $m);
// 				if (!empty($m[1])) {
// 					$redirURL = $m[1];
// 				}
// 			} if (!empty($redirURL)) {
// 				$t = debug_backtrace();
// 				return call_user_func($t[0]["function"], trim($redirURL), $post_paramtrs);
// 			}
// 		}
// 	} return "ERRORCODE22 with $url!!<br/>Last status codes<b/>:" . json_encode($status) . "<br/><br/>Last data got<br/>:$data";
// }

function get_title($url) {
	$json = file_get_contents('https://www.youtube.com/oembed?url='.$url.'&format=json');
	$details = json_decode($json, true);
	return $details['title'];
}
//	Старые функция, которая использовала CURL
// function get_title($url){
// 	$str = get_remote_data($url);
// 	if (strlen($str) > 0) {
// 		$title = array();
// 		preg_match("/\<title\>(.*)\<\/title\>/i",$str,$title); // ignore case
// 		return $title[1];
// 	}
// 	return null;
// }

// function get_date($url){
// 	$str = get_remote_data($url);
// 	if (strlen($str) > 0) {
// 		$title = array();
// 		preg_match("/\<strong class=\"watch-time-text\"\>(.*)\<\/strong\>/i",$str,$title); // ignore case
// 		$title[1] = str_replace('Gepubliceerd op', '', $title[1]);
// 		return $title[1];
// 	}
// 	return null;
// }


$response['status'] = 0;

if ($user->is_logged() == true) {

	// $response['status'] = 2;
	

	$link = filter_var(clean_string($_POST['items']['link']), FILTER_SANITIZE_URL);

	if ($link) {
		if (stripos($link, 'youtube.com') !== false || stripos($link, 'm.youtube.com') !== false || stripos($link, 'youtu.be') !== false) {
			if (stripos($link, 'youtu.be') !== false) {
				$find = str_replace('/', '', parse_url($link, PHP_URL_PATH));	
			} else {
				$urlarray = array();
				parse_str(parse_url($link, PHP_URL_QUERY), $urlarray);
				$find = $urlarray['v'];
			}

			$search_link = $pdo->prepare('SELECT * FROM quest_youtube WHERE link LIKE ? LIMIT 1');
			$search_link->execute(array('%'.$find.'%'));

			if ($search_link->fetch() === false) {
				// $need_title = 'Ｔｏｕｇｅ　Ｊａｐａｎ　Ｄｒｉｆｔ';
				// $need_title2 = 'Ｔｏｕｇｅ　Ｊａｐａｎ';
				$need_title1 = 'Project Name';
				$need_title2 = 'Project Name Test';
				$need_title3 = 'ProjectName';
				$need_title4 = 'ProjectNameTest';
				$need_title5 = 'ProjectName Test';
				$need_title6 = 'Project NameTest';
				$need_title7 = 'Project-NameTest';
				$need_title8 = 'Project-Name Test';
				$need_title9 = 'ProjectNameTest.com';
				$need_title10 = 'Project NameTest.com';
				$need_title11 = 'ProjectName Test.com';
				$need_title12 = 'Project Name Test.com';
				$real_title = get_title($link);
				$response['link'] = $link;
				// $created_date = get_date($link);
				if (
					(stripos(strtolower($real_title), strtolower($need_title1)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title2)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title3)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title4)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title5)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title6)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title7)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title8)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title9)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title10)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title11)) !== false) ||
					(stripos(strtolower($real_title), strtolower($need_title12)) !== false)
				) {
					$insert_link = $pdo->prepare('INSERT INTO quest_youtube (user_id, link, date_created) VALUES (?, ?, ?)');
					$insert_link->execute(array($user->id, $link, time()));

					$response['status'] = 'ok';
					$response['print'] = '<div class="success-attr">
								<div class="success-attr__text">'.$_txt['send_success'].'</div>
							</div>';
				} else {
					$response['status'] = 'error';
					$response['placeholder'] = 'youtube_error';
					$response['display'] = '<div class="error-attr">
											<div class="error-attr__text">
												'.$_txt['youtube']['error_1'].'		
											</div>
										  </div>';
				}
			} else {
				$response['status'] = 'error';
				$response['placeholder'] = 'youtube_error';
				$response['display'] = '<div class="error-attr">
										<div class="error-attr__text">
											'.$_txt['youtube']['error_2'].'		
										</div>
									  </div>';
			}
		} else {
			$response['status'] = 'error';
			$response['placeholder'] = 'youtube_error';
			$response['display'] = '<div class="error-attr">
									<div class="error-attr__text">
										'.$_txt['youtube']['error_3'].'		
									</div>
								  </div>';
		}
	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'youtube_error';
		$response['display'] = '<div class="error-attr">
								<div class="error-attr__text">
									'.$_txt['youtube']['error_4'].'		
								</div>
							  </div>';
	}
	// $response['text'] = ;

}

echo json_encode($response);

// https://www.youtube.com/watch?v=FGz_tA5yuL0&amp;lang=en