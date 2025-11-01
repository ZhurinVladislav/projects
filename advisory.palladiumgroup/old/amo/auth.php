<?php
file_put_contents('date_auth.txt', 'time:'.date('d.m.Y G:i').PHP_EOL, FILE_APPEND);
define('TOKEN_FILE', $_SERVER['DOCUMENT_ROOT'].'/amo/token_info.json');
$token_info=json_decode(file_get_contents(TOKEN_FILE));
$subdomain = 'palladiumgroup';

$client_id = '6a51757b-8be0-45ee-aa28-bcd1314bf4f1';
$secret = 'dMwxp7SmpWg5h1aqGupTMm0n3neXrXtY9MccGgZ7vHvJsgzSYZ2QmumGys12cASN';
$red_url = 'https://advisory.palladiumgroup.ae/amo/auth.php';

$cache_time = 3600; 
$stop=$_GET['stop'];

if ((time() - $cache_time) < filemtime(TOKEN_FILE) and $stop==""){
	$access_token = $token_info->access_token;
} else {	
	$link = 'https://' . $subdomain . '.amocrm.com/oauth2/access_token';
	if(isset($_GET['code'])){
		$data = [
		    'client_id' => $client_id,
		    'client_secret' => $secret,
		    'grant_type' => 'authorization_code',
		    'code' => $_GET['code'],
		    'redirect_uri' => $red_url,
		];
	}else{
		$data = array(
			'client_id' => $client_id,
			'client_secret' => $secret,
			'redirect_uri' => $red_url,
			'grant_type' => 'refresh_token',
			'refresh_token' => $token_info->refresh_token,
			
		);
	}
	
	$curl = curl_init();curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0'); 
	curl_setopt($curl,CURLOPT_URL, $link); 
	curl_setopt($curl,CURLOPT_HTTPHEADER,['Content-Type:application/json']); 
	curl_setopt($curl,CURLOPT_HEADER, false); 
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST, 'POST'); 
	curl_setopt($curl,CURLOPT_POSTFIELDS, json_encode($data)); 
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1); 
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
	$out = curl_exec($curl);
	$response = json_decode($out, true);

	$access_token = $response['access_token'];
	$refresh_token = $response['refresh_token']; 
	$token_type = $response['token_type'];
	$expires_in = $response['expires_in'];

	if ($access_token){
		$data_amocrm = array('access_token' => $access_token,'expires' => $expires_in,'refresh_token' => $refresh_token);
		file_put_contents(TOKEN_FILE, json_encode($data_amocrm));
	}
//var_dump($response);
//var_dump($data);

}