<?php
function check_lang($ru, $en){
    $title = $_POST['lang'] === 'en' ? $en : $ru;
    return $title;
}

$return = array(
	'status' => 'false',
    'title'  => check_lang('Ошибка', 'Error'),
    'message' => check_lang('Попробуйте позже', 'Try it later'),
);

$amo_phone = $_POST['phone'];
$amo_name = $_POST['name'];
$amo_email = $_POST['email'];
$amo_url = $_POST['url'];

$fl_title = 'log/log-Response.txt';
$filename = dirname(__FILE__).'/'.$fl_title;
file_put_contents($fl_title, PHP_EOL.'************************'.PHP_EOL.'Дата лида: '.date('d.m.Y G:i').PHP_EOL, FILE_APPEND);
if (!empty($_POST)) {
    $dh = fopen ($filename,'a+');
    fwrite($dh, var_export($_POST,true));
    fclose($dh);
}

if ($amo_phone && isset($_POST['g_recaptcha_response'])) {

    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6LdjubYiAAAAAMm6V9I7D16n2W-D_tjsOyY3nOa_';
    $recaptcha_response = $_POST['g_recaptcha_response'];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $recaptcha_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => $recaptcha_secret, 'response' => $recaptcha_response)));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    $recaptcha = json_decode($response, true);

    if ($recaptcha['score'] >= 0.5) {
        include($_SERVER['DOCUMENT_ROOT']."/amo/auth.php");
        $headers = array('Authorization: Bearer ' . $access_token,"Content-Type: application/json");

        $form_name = "Заявка c сайта advisory.palladiumgroup.ae";
        $ip = $_SERVER['REMOTE_ADDR'];
        $form_page=$_SERVER['SERVER_NAME'];

        $leads = array(array(
            "source_name" => $form_name,
            "source_uid" => uniqid(),
            "pipeline_id" => 5411084,
            "created_at" => time(),
            "metadata" => array(
                "ip" => $ip,
                "form_id" => "1",
                "form_sent_at" => time(),
                "form_name" => $form_name,
                "form_page"=> $form_page,
                "referer"=> $form_page,
            ),
            "_embedded" => array()
        ));
        $tag = '';
        $sdelka = array(
            'name' => $form_name,
            "_embedded"=>array(
                "tags"=>array(array("name"=>$tag)),
            ),
        );

        $get_string = $amo_url;
        $mystring = $get_string;
        $findme   = '?';
        $pos = strpos($mystring, $findme);
        if ($pos === 0) {
            $get_string = substr($get_string, 1);
        }
        parse_str($get_string, $get_array);
        if (is_array($get_array)) {
            if (array_key_exists('utm_source', $get_array)) {
                $sdelka['custom_fields_values'][]=array('field_id'=>626078,'values'=>array(array('value'=>$get_array['utm_source'])));
            }
            if (array_key_exists('utm_medium', $get_array)) {
                $sdelka['custom_fields_values'][]=array('field_id'=>626074,'values'=>array(array('value'=>$get_array['utm_medium'])));
            }
            if (array_key_exists('utm_content', $get_array)) {
                $sdelka['custom_fields_values'][]=array('field_id'=>626072,'values'=>array(array('value'=>$get_array['utm_content'])));
            }
        }

        $sdelka['custom_fields_values'][]=array('field_id'=>679024,'values'=>array(array('value'=>$amo_url)));

        $link='https://'.$subdomain.'.amocrm.com/api/v4/contacts?query='.preg_replace("/[^0-9]/", '', $amo_phone);
        $curl=curl_init();
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
        curl_setopt($curl,CURLOPT_URL,$link);
        curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
        curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl,CURLOPT_HEADER,false);curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);$out=curl_exec($curl);
        $contact_response = json_decode($out,true);

        if (!$contact_response) {

            $leads[0]["_embedded"]['leads'][] = $sdelka;

            $contact = array('name' => $amo_name);
            if ($amo_phone){
                $contact['custom_fields_values'][]=array('field_code'=>"PHONE",'values'=>array(array('value'=>$amo_phone)));
            }
            if ($amo_email){
                $contact['custom_fields_values'][]=array('field_code'=>"EMAIL",'values'=>array(array('value'=>$amo_email)));
            }

            $leads[0]["_embedded"]['contacts'][] = $contact;

            $link='https://'.$subdomain.'.amocrm.com/api/v4/leads/unsorted/forms';
            $curl=curl_init();
            curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
            curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
            curl_setopt($curl,CURLOPT_URL,$link);
            curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
            curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($leads));
            curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
            curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
            curl_setopt($curl,CURLOPT_HEADER,false);curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);$out=curl_exec($curl);
            $Response=json_decode($out,true);

            $id_leads = $Response['_embedded']['unsorted'][0]['_embedded']['leads'][0]['id'];

            /* status id */
            $data["status_id"] = 48027989;

            $link='https://'.$subdomain.'.amocrm.com/api/v4/leads/'.$id_leads;
            $curl=curl_init();
            curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
            curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
            curl_setopt($curl,CURLOPT_URL,$link);
            curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'PATCH');
            curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($data));
            curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
            curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
            curl_setopt($curl,CURLOPT_HEADER,false);curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);$out=curl_exec($curl);

            $return['status']  = 'ok';
            $return['title']   = check_lang('Спасибо! <br> Ваша заявка отправлена.', 'Thank you! <br> Your request has been sent.');
            $return['message'] = check_lang('В ближайшее время мы с Вами свяжемся!', 'We will contact you shortly');
            $return['id'] = $id_leads;
        }else{
            $return['message'] = check_lang('Ваши данные уже есть в системе! Спасибо за проявленый интерес, в ближайшее время с Вами свяжется наш эксперт.', 'Your data is already in the system! Thank you for your interest, our expert will contact you shortly.');
        }
    } else {
        $return['message'] = check_lang('Вы не прошли проверку на бота.', "You didn't pass the bot check.");
    }
}else{
    $return['message'] = check_lang('Проблемы с прохождением капчи.', 'Problems with passing captcha.');
}

print_r(json_encode($return));