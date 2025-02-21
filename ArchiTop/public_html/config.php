<?php

if (!defined('ENGINE')) {
    die();
}

global $dbconfig, $conn, $root_url, $allowed_ips, $languages, $pass_salt, $email_salt, $log_codes, $levels, $coin, $site_name, $replenish_description, $smtp_config, $captcha_keys;

$dbconfig = array(
    'host'        => 'localhost',
    'login'        => 'web2mail_archit',
    'pass'        => 'hFhuA4fx*oTq',
    'dbname'    => 'web2mail_archit'
);

$host = $dbconfig['host'];
$username = $dbconfig['login'];
$password = $dbconfig['pass'];
$dbname = $dbconfig['dbname'];

// Создаем подключение к БД
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//	соль, которая используется для формирования хешей паролей пользоваетелей, указывается только здесь
//	на всякий случай напишу - если её изменить, абсолютно все пароли станут недействительнымы
$pass_salt = 'adwd2134e';

//	соль, которая используется для проверки email при отписке от рассылки
$email_salt = 'feasfa212g';

//	название сайта
$site_name = 'ArchitecTop';
$coin = 'BTC';

//	базовый url сайта
$root_url = 'http://architectop.web2mail.beget.tech/';

//	ip, которым разрешен доступ в админку
$allowed_ips = array('127.0.0.1', '1.1.1.1');

$smtp_config = array(
    'info' => array(
        'host' => 'smtp.yandex.ru',
        'username' => 'info@site.com',
        'from' => 'info@site.com',
        'password' => 'pass'
    ),
    'support' => array(
        'host' => 'smtp.yandex.ru',
        'username' => 'support@site.com',
        'from' => 'support@site.com',
        'password' => 'pass'
    ),
    'mailo' => array(
        'host' => 'smtp.yandex.ru',
        'username' => 'info@site.com',
        'from' => 'info@site.com',
        'password' => 'pass'
    )
);

//	список языков, доступных для пользователей. первый в списке - дефолтный
$languages = array('en', 'ru', 'de', 'pt', 'es', 'fr', 'th', 'hi', 'zh');

$replenish_description = array(
    'en' => array(
        '1' => 'Deposit account ' . $site_name . ', payment ID: ',
        '2' => '. To enroll: ',
        '3' => 'Deposit account ' . $site_name
    ),
    'ru' => array(
        '1' => 'Пополнение счёта ' . $site_name . ', ID платежа: ',
        '2' => '. К зачислению: ',
        '3' => 'Пополнение счёта ' . $site_name
    ),
    'de' => array(
        '1' => 'Einzahlungskonto ' . $site_name . ', Zahlungs-ID: ',
        '2' => '. Einschreiben: ',
        '3' => 'Zahlen Sie ein Konto ' . $site_name . ' ein'
    ),
    'pt' => array(
        '1' => 'Depositar conta ' . $site_name . ', ID de pagamento: ',
        '2' => '. Inscrever: ',
        '3' => 'Depositar conta ' . $site_name
    ),
    'es' => array(
        '1' => 'Cuenta de depósito ' . $site_name . ', ID de pago: ',
        '2' => '. Para inscribirse: ',
        '3' => 'Cuenta de depósito ' . $site_name
    )
);

$log_codes = array(
    //	01*** - операции с деньгами
    '01001' => 'пополнение',
    '01002' => 'вывод',
    '01003' => 'обмен',
    '01004' => 'взятие кредита',
    '01005' => 'закрытие кредита',

    //	02*** - операции с тарифами
    '02011' => 'Покупка',
    '02012' => 'Сбор с',
    '02013' => 'Закрытие',
    '02014' => 'Улучшение',

    //	03*** - реферальные операции
    '03001' => 'начисление реферальных 1 уровня',
    '03002' => 'начисление реферальных 2 уровня',
    '03003' => 'начисление реферальных 3 уровня',
    '03004' => 'авторефбек',

    //	04*** - квесты
    '04011' => 'выполнение квеста с багом',
    '04021' => 'выполнение квеста с ютубом',
    '04031' => 'выполнение квеста с форумом',
    '04041' => 'выполнение квеста с репостом ВК',
    '04051' => 'выполнение квеста с Telegram чат',
    '04061' => 'выполнение квеста с Telegram канал',

    //	05*** - реклама
    '05001' => 'Размещение сайта в рекламу',
    '05002' => 'Снятие сайта с рекламы',
);

$levels = array(
    //	уровень => макс потрачено денег для этого уровня
    '1' => '0.00009999',
    '2' => '0.00049999',
    '3' => '0.00099999',
    '4' => '0.00499999',
    '5' => '0.00999999',
    '6' => '0.04999999',
    '7' => '0.09999999',
    '8' => '0.49999999',
    '9' => '0.99999999',
    '10' => '4.99999999',
    '11' => '9.99999999',
);

$captcha_keys = array(
    'public' => '6LfAzvYZAAAAAIwcJi7RxvUlVrUej43C',
    'secret' => '6LfAzvYZAAAAAPvzxCY1dfnbENPFMTUr'
);

//	включаем отображение ошибок
ini_set('display_errors', 1);

//	устанавливаем время жизни сесии в сутки
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);


session_start();

//	если пользователь обращается впервые - устанавливаем время последнего запроса к серверу
if (!isset($_SESSION['last_request'])) {
    $_SESSION['last_request'] = time();
    //	если прошли сутки с последнего запроса на сервер - делаем выход из аккаунта
} elseif ($_SESSION['last_request'] < time() - 86400) {
    session_destroy();
    session_start();
    //	обновляем дату последнего запроса
} else {
    $_SESSION['last_request'] = time();
}
