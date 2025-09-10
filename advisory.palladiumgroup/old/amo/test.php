<?php
include($_SERVER['DOCUMENT_ROOT']."/amo/auth.php");
//var_dump($access_token);
$headers = array('Authorization: Bearer ' . $access_token,"Content-Type: application/json");

function tgNotify ($message) {
	$token = '';
	$data = array(
        'chat_id' => '',
        'text' => $message,
        'parse_mode' => 'html',
        'disable_web_page_preview' => true,
        'disable_notification' => false
    );
	$ch = curl_init('https://api.telegram.org/bot'.$token.'/sendMessage');
      curl_setopt_array($ch, array(
          CURLOPT_HEADER => 0,
          CURLOPT_RETURNTRANSFER => 1,
          CURLOPT_POST => 1,
          CURLOPT_POSTFIELDS => $data
      ));
      curl_exec($ch);
      curl_close($ch);
}

//$link='https://'.$subdomain.'.amocrm.com/api/v4/tasks';
//$link='https://'.$subdomain.'.amocrm.com/api/v4/contacts?query=ALSAHRAAA&with=leads';
//$link='https://'.$subdomain.'.amocrm.com/api/v4/contacts?query=@testcom&with=leads';
//$link='https://'.$subdomain.'.amocrm.com/api/v4/leads/pipelines/5411084/statuses';
//$link='https://'.$subdomain.'.amocrm.com/api/v4/leads/custom_fields';
//$link='https://'.$subdomain.'.amocrm.com/api/v4/contacts/custom_fields';
//$link='https://'.$subdomain.'.amocrm.com/api/v4/leads/23259965';
//$link='https://'.$subdomain.'.amocrm.com/api/v4/contacts/27359855';//deadmad-xxxx
$link='https://'.$subdomain.'.amocrm.com/api/v4/contacts/27538749';

$curl=curl_init();
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
curl_setopt($curl,CURLOPT_URL,$link);
curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl,CURLOPT_HEADER,false);
curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
$out=curl_exec($curl);
$responseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);
$responseCode = intval($responseCode);
$contact_response = json_decode($out,true);

//file_put_contents('logs/testlog.txt', date("Y/m/d H:i:s").json_encode($contact_response) . PHP_EOL, FILE_APPEND);
//var_dump($responseCode);
echo '<pre>';
//var_dump($contact_response);
print_r($contact_response);
echo '</pre>';

