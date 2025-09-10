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
$place = $_POST['place'];

$fl_title = 'log/log-Response.txt';
$filename = dirname(__FILE__).'/'.$fl_title;
file_put_contents($fl_title, PHP_EOL.'************************'.PHP_EOL.'Дата лида: '.date('d.m.Y G:i:s').PHP_EOL, FILE_APPEND);
if (!empty($_POST)) {
    $dh = fopen ($filename,'a+');
    fwrite($dh, var_export($_POST,true));
    fclose($dh);
}
/*
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

            // status id
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
*/


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
        if(!empty($amo_phone)){
            $searchPhone = preg_replace("/[^0-9]/", '', $amo_phone);
            $searchdata['626064'] = $searchPhone;
        }
        if(!empty($amo_email)){
            $searchdata['626066'] = $amo_email;
        }
        /*if(!empty($telegram)){
            $searchdata['630033'] = $telegram;
        }*/

        $conts = searchContacts($searchdata);
        if(count($conts)>0){//есть такие контакты
            $allLeads = searchAllLeads($conts);
            $activeLeads = $allLeads['activeLeads'];
            $closedLeads = $allLeads['closedLeads'];
            if(count($activeLeads)>0){ //есть активные сделки
                foreach ($activeLeads as $activeLeadId => $userId) {
                    $response = addLeadTask($activeLeadId, $userId);
                    if($response['responseCode']==200){
                        $return['status']  = 'ok';
                        $return['title']   = check_lang('Спасибо! <br> Ваша заявка отправлена.', 'Thank you! <br> Your request has been sent.');
                        $return['message'] = check_lang('В ближайшее время мы с Вами свяжемся!', 'We will contact you shortly');
                        $return['id'] = $activeLeadId;
                        file_put_contents($fl_title, PHP_EOL.'есть контакт, активные сделки, создана задача'.PHP_EOL, FILE_APPEND);
                    }
                }
            }
            elseif(count($closedLeads)>0){ //сделки закрыты
                /*
                $response = addLead();
                $newLeadId = $response['responseData']['_embedded']['unsorted'][0]['_embedded']['leads'][0]['id'];
                if($response['responseCode']==200){
                    foreach ($closedLeads as $closedLead) {
                        $message = 'Повторное обращение, сделка: https://palladiumgroup.amocrm.com/leads/detail/'.$closedLead;
                        addLeadNotes($newLeadId, $message);
                    }
                */
                foreach ($closedLeads as $closedLeadId => $userId) {
                    $response = addLeadTask($closedLeadId, $userId);

                    if($response['responseCode']==200){
                        $return['status']  = 'ok';
                        $return['title']   = check_lang('Спасибо! <br> Ваша заявка отправлена.', 'Thank you! <br> Your request has been sent.');
                        $return['message'] = check_lang('В ближайшее время мы с Вами свяжемся!', 'We will contact you shortly');
                        $return['id'] = $closedLeadId;
                        file_put_contents($fl_title, PHP_EOL.'есть контакт, закрытые сделки, создана задача'.PHP_EOL, FILE_APPEND);
                    }
                }
            }
        }
        else{//нет таких контактов
            $response = addLead();
            if($response['responseCode']==200){
                $return['status']  = 'ok';
                $return['title']   = check_lang('Спасибо! <br> Ваша заявка отправлена.', 'Thank you! <br> Your request has been sent.');
                $return['message'] = check_lang('В ближайшее время мы с Вами свяжемся!', 'We will contact you shortly');
                $return['id'] = $response['responseData']['_embedded']['unsorted'][0]['_embedded']['leads'][0]['id'];
                file_put_contents($fl_title, PHP_EOL.'Создан лид'.PHP_EOL, FILE_APPEND);
            }
        }
    } else {
        $return['message'] = check_lang('Вы не прошли проверку на бота.', "You didn't pass the bot check.");
    }
}else{
    $return['message'] = check_lang('Проблемы с прохождением капчи.', 'Problems with passing captcha.');
}

print_r(json_encode($return));
/******************************************************************************/


/**
 * @param $data
 * @return array
 */
function searchContacts($data){
    $result = [];

    foreach($data as $dataID=>$dataVal){
        $contacts = sendRequest('/api/v4/contacts?query='.$dataVal.'&with=leads', 'GET');
        if($contacts['responseCode'] == 200) {
            foreach ($contacts['responseData']['_embedded']['contacts'] as $contact) {
                foreach ($contact['custom_fields_values'] as $custom_fields_value) {
                    if($custom_fields_value['field_id'] == $dataID){
                        foreach ($custom_fields_value['values'] as $value) {
                            $phoneVal = preg_replace("/[^0-9]/", '', $value['value']);
                            $val = ($dataID == 626064 ? $phoneVal : $value['value']);
                            if($val==$dataVal){
                                $resCont = [
                                    'id' => $contact['id'],
                                    'name' => $contact['name'],
                                    'leads' => $contact['_embedded']['leads']
                                ];
                                $result[$contact['id']] = $resCont;
                                //$result[] = $contact;
                            }
                        }
                    }
                }
            }
        }
    }

    return $result;
}

/**
 * @param array $contacts
 * @return array
 */
function searchActiveLeads (array $contacts){
    $activeLeads = [];
    foreach ($contacts as $contact) {
        foreach ($contact['leads'] as $lead){
            $fullLead = sendRequest('/api/v4/leads/'.$lead['id'], 'GET');
            if($fullLead['responseCode'] == 200) {
                if(!in_array($fullLead['responseData']['status_id'], [142, 143])){
                    $activeLeads[] = $lead['id'];
                }
            }
        }
    }

    return $activeLeads;
}

/**
 * @param array $contacts
 * @return array
 */
function searchAllLeads (array $contacts){
    $activeLeads = [];
    $closedLeads = [];
    $allLeads = [];

    foreach ($contacts as $contact) {
        foreach ($contact['leads'] as $lead){
            $fullLead = sendRequest('/api/v4/leads/'.$lead['id'], 'GET');
            if($fullLead['responseCode'] == 200) {
                if(!in_array($fullLead['responseData']['status_id'], [142, 143])){
                    //$activeLeads[] = $lead['id'];
                    $activeLeads[$lead['id']] = $fullLead['responseData']['responsible_user_id'];
                }
                else{
                    //$closedLeads[] = $lead['id'];
                    $closedLeads[$lead['id']] = $fullLead['responseData']['responsible_user_id'];
                }
            }
        }
    }
    $allLeads = [
        'activeLeads' => $activeLeads,
        'closedLeads' => $closedLeads,
    ];

    return $allLeads;
}

/**
 * @param $leadId
 * @param $message
 * @return array
 */
function addLeadNotes($leadId, $message){
    $notes["_embedded"]['note_type'] = "common";
    $notes["_embedded"]['params'] = array( "text" => $message );
    $ret = sendRequest('/api/v4/leads/'.$leadId.'/notes', 'POST', $notes);
    return $ret;
}

/**
 * @param $leadId
 * @return array
 */
function addLeadTask($leadId, $userId){
    $task = [[
        "text" => "Attention! The client sent a repeat message ".date("Y/m/d H:i").", you need to contact him!",
        "complete_till" => time() + 86400, //24часа
        "entity_type" => "leads",
        "entity_id" => $leadId,
        "task_type_id" => 1,
        "responsible_user_id" => $userId,
    ]];
    $ret = sendRequest('/api/v4/tasks', 'POST', $task);
    return $ret;
}

/**
 * @param $contactId
 * @return array
 */
function addLead ($contactId=null){
    global $amo_name;
    global $amo_phone;
    global $amo_email;
    //global $contact_type;
    //global $lang;
    //global $message;
    //global $roistatVisitId;
    global $amo_url;
    global $place;

    $form_name = "Заявка c сайта advisory.palladiumgroup.ae";
    $ip = $_SERVER['REMOTE_ADDR'];
    $form_page=$_SERVER['SERVER_NAME'];

    $unsorted = [[
        "source_name" => $form_name,
        "source_uid" => uniqid(),
        "pipeline_id" => 5411084,
        //status_id
        //custom_fields_values
        "created_at" => time(),
        "metadata" => [
            "ip" => $ip,
            "form_id" => "1",
            "form_sent_at" => time(),
            "form_name" => $form_name,
            "form_page"=> $form_page,
            "referer"=> $form_page,
        ],
        "_embedded" => []
    ]];
    $tag = [];
   /* $place = $_POST['indubai'];
    if ($place == 'yes') {
        array_push($tag, ["name"=>'indubai']);
        //$tag[] = ["name"=>'indubai'];
    }
    if ($_POST['datestart']) {
        array_push($tag, ["name"=>'planedubai']);
        //$tag[] = ["name"=>'planedubai'];
    }*/
    $lead = [
        'name' => $form_name,
        "_embedded"=>[
            //"tags"=>$tag,
        ],
    ];

    /* start custom fields */
   /* if ($lang){
        $lead['custom_fields_values'][]=array('field_id'=>669425,'values'=>array(array('value'=>$lang)));
    }
    if ($contact_type){
        $lead['custom_fields_values'][]=array('field_id'=>670085,'values'=>array(array('value'=>$contact_type)));
    }
    if ($message){
        $lead['custom_fields_values'][]=array('field_id'=>641975,'values'=>array(array('value'=>$message)));
    }
    if ($roistatVisitId){
        $lead['custom_fields_values'][]=array('field_id'=>669193,'values'=>array(array('value'=>$roistatVisitId)));
    }*/

    if ($place){ //поле 681145 Product multiselect
        if($place == 'advisorymain'){
            //enum_id 760061 value Company formation IFZA - Eugene Bazhan
            $lead['custom_fields_values'][]=array('field_id'=>681145,'values'=>array(array('enum_id'=>760061)));
        }
        elseif($place == 'advisorybank'){
            //enum_id 760065 value Bank service - Kirill Goncharov
            $lead['custom_fields_values'][]=array('field_id'=>681145,'values'=>array(array('enum_id'=>760065)));
        }

    }

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
            $lead['custom_fields_values'][]=array('field_id'=>626078,'values'=>array(array('value'=>$get_array['utm_source'])));
        }
        if (array_key_exists('utm_medium', $get_array)) {
            $lead['custom_fields_values'][]=array('field_id'=>626074,'values'=>array(array('value'=>$get_array['utm_medium'])));
        }
        if (array_key_exists('utm_content', $get_array)) {
            $lead['custom_fields_values'][]=array('field_id'=>626072,'values'=>array(array('value'=>$get_array['utm_content'])));
        }
    }

    $cutUrl = substr($amo_url, 0, 250);

    $lead['custom_fields_values'][]=array('field_id'=>679024,'values'=>array(array('value'=>$cutUrl)));
    /* end custom fields */

    $unsorted[0]["_embedded"]['leads'][] = $lead;

    if(!empty($contactId)){
        $unsorted[0]["_embedded"]['contacts'][0]['id'] = $contactId;
    }
    else{
        /* $name = $_POST['name'];
         $phone = $_POST['phone'];
         $email = $_POST['email'];
         $telegram = $_POST['telegram'];*/
        if(!empty($amo_name)){
            $contname = $amo_name;
        }
        elseif(!empty($amo_phone)){
            $contname = $amo_phone;
        }
        elseif(!empty($amo_email)){
            $contname = $amo_email;
        }
        /*  elseif(!empty($telegram)){
               $name = $telegram;
           }*/
        else{
            //какая-то фигня, должно быть хоть 1 поле заполнено
        }
        $contact = ['name' => $contname];
        if ($amo_phone){
            $contact['custom_fields_values'][]=['field_code'=>"PHONE",'values'=>[['value'=>$amo_phone]]];
        }
        if ($amo_email){
            $contact['custom_fields_values'][]=['field_code'=>"EMAIL",'values'=>[['value'=>$amo_email]]];
        }
        /*  if ($telegram){
              $contact['custom_fields_values'][]=['field_id'=>630033,'values'=>[['value'=>$telegram]]];
          }*/
        $unsorted[0]["_embedded"]['contacts'][] = $contact;
    }



    $ret = sendRequest('/api/v4/leads/unsorted/forms', 'POST', $unsorted);
    $leadId = $ret['responseData']['_embedded']['unsorted'][0]['_embedded']['leads'][0]['id'];

    /* status id */
    //$data["status_id"] = 48027989;
    //$ret2 = sendRequest('/api/v4/leads/'.$leadId, 'POST', $data);


    return $ret;
}

/**
 * @param $url
 * @param $method
 * @param string $data
 * @return array
 */
function sendRequest ($url, $method, $data=''){
    global $access_token;
    $headers = array('Authorization: Bearer ' . $access_token,"Content-Type: application/json");
    $link='https://palladiumgroup.amocrm.com'.$url;
    $curl=curl_init();
    curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
    curl_setopt($curl,CURLOPT_URL,$link);
    if($method === 'POST'){
        curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
        curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($data));
    }
    curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
    curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl,CURLOPT_HEADER,false);
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
    $out=curl_exec($curl);
    $responseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    $responseCode = intval($responseCode);
    $responseData = json_decode($out,true);

    if(!in_array($responseCode, [200, 204])){
        //логи
        file_put_contents(__DIR__ . "/log/request_error_log.txt", date("Y/m/d H:i:s")." ".$url." ".$responseCode." ".json_encode($responseData) . PHP_EOL, FILE_APPEND);
        file_put_contents(__DIR__ . "/log/request_error_log.txt", date("Y/m/d H:i:s")." ".json_encode($_POST) . PHP_EOL, FILE_APPEND);
        tgNotify(date("Y/m/d H:i:s")." ошибка при запросе на сайте advisory.palladiumgroup.ae ".$url." код ответа ".$responseCode);
    }
    else {
        file_put_contents(__DIR__ . "/log/request_log.txt", date("Y/m/d H:i:s")." ".$url." ".$responseCode." ".json_encode($responseData) . PHP_EOL, FILE_APPEND);
    }

    return ['responseData' => $responseData, 'responseCode' => $responseCode];
}

function tgNotify ($message) {
    $token = '548903779:AAGXnpfOB4fXvD30XA3z3HWt4VBKYBje4og';
    $data = array(
        'chat_id' => '-1001841863924',
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
