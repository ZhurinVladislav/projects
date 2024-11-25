<?php

function load_default() {
	define('ENGINE', true);

	//	подключаем конфиг и коннектимся к базе
	require_once './config.php';
	global $pdo;
	require_once './database.php';
	
	//	подключаем дефолтные функции и классы
	require_once './classes/settings.php';
	global $settings, $settings_payments;
	
	$settings = new settings();
	$settings_payments = new settings_payments();

	require_once './functions/default.php';

	require_once './classes/user.php';
	global $user;

	$user = new user($languages);
	

	//	проверяем реферальную ссылку
	if (isset($_GET['r'])) {
		$ref_id = (int) $_GET['r'];
		$ref_source = clean_string($_GET['s']);
		setcookie('referal', $ref_id, time() + 2592000, '/');
		setcookie('referal_source', $ref_source, time() + 2592000, '/');
		if (isset($_SERVER['HTTP_REFERER'])) {
			setcookie('referal_url', $_SERVER['HTTP_REFERER'], time() + 2592000, '/');
		}

		$updade_link_counter = $pdo->prepare('UPDATE referrals_info SET link_opened = link_opened + 1 WHERE user_id = ?');
		$updade_link_counter->execute(array($ref_id));
	}

	if (isset($_GET['l']) && in_array($_GET['l'], $languages)) {
		$user->language = $_GET['l'];
		$_SESSION['language'] = $_GET['l'];
	}
}

function load_view($path, $template = '') {
	global $user;
	
	$_txt = array();
	require_once './'.$path.'/'.$user->language.'.php';

	if (file_exists('./'.$path.'/require.php')) {

		$template = require_once './'.$path.'/require.php';

		//	не пускаем на внутренние страницы неавторизованных юзеров
		if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
			header('Location: '.$root_url.'login');
		//	если авторизованный пользователь пытается войти ещё раз - отправляем на страницу обучения
		} elseif (($path == 'pages/login' || $path == 'pages/registration' || $path == 'pages/remind') && $user->is_logged() === true) {
			header('Location: '.$root_url.'home');
		} else {
			$file = require_once './'.$path.'/tpl.php';
		}
	} else {
		$file = require_once './'.$path.'/tpl.php';
	}
	return $file;
}

function load_page($path) {
	global $user, $root_url;
	
	$_txt = array();
	require_once './pages/'.$path.'/'.$user->language.'.php';

	$template = require_once './pages/'.$path.'/require.php';

	//	не пускаем на внутренние страницы неавторизованных юзеров
	if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
		header('Location: '.$root_url.'login');
	//	если авторизованный пользователь пытается войти ещё раз - отправляем на страницу обучения
	} elseif (($path == 'login' || $path == 'registration') && $user->is_logged() === true) {
		header('Location: '.$root_url.'home');
	} else {
		$content_path = './pages/'.$path.'/tpl.php';
		require_once './templates/'.$template.'/tpl.php';
	}

	//	запись страницы и время за которое её отдал PHP
	// file_put_contents('logs/log_access.txt', 'page: '.$path. PHP_EOL .(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) . PHP_EOL, FILE_APPEND | LOCK_EX);
}



if (isset($_POST['controller'])) {

	$_POST['controller'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['controller']);

	if (file_exists('./controllers/' . $_POST['controller'] . '.php')) {

		load_default();

		require_once './controllers/' . $_POST['controller'] . '.php';

	} else {
		echo 'file not exist';
	}

} elseif (isset($_POST['get_page'])) {

	$_POST['get_page'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['get_page']);

	if ($_POST['get_page'] == '/') {
		$_POST['get_page'] = 'main';
	}
	
	if (file_exists('./pages/'.$_POST['get_page'].'/tpl.php')) {

		load_default();
		
		load_view('pages/'.$_POST['get_page'].'');
	
	} else {
		
		load_default();

		header("HTTP/1.1 404 Not Found");

		load_page('404');
	}

} else {

	if (!isset($_GET['q'])) {
		$_GET['q'] = 'main';
	}

	if (file_exists('./pages/'.$_GET['q'].'/tpl.php')) {

		load_default();

		load_page($_GET['q']);

	} else {

		load_default();

		header("HTTP/1.1 404 Not Found");

		load_page('404');
	}

}

?>