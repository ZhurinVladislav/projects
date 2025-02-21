<?php

define('ENGINE', true);
require_once './config.php';
require_once './database.php';

global $pdo;

// Получаем параметр q из URL (alias страницы или API-запрос)
$q = $_GET['q'] ?? 'main';
$isApiRequest = isset($_GET['api']) || $_SERVER['REQUEST_METHOD'] === 'POST';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $q = $data['q'] ?? 'main';
}

// Отладка входящих данных
// error_log("Запрос q: " . $q);

// Поиск страницы в БД перед обработкой API-запросов
$stmt = $pdo->prepare("SELECT * FROM page_routes WHERE alias = :alias");
$stmt->execute(['alias' => $q]);
$page = $stmt->fetch(PDO::FETCH_ASSOC);

// Отладка найденной страницы
// error_log("Найденная страница: " . print_r($page, true));

$page_id = $page['id'] ?? null;
$page_alias = $page['alias'] ?? null;
$page_title = $page['title'] ?? null;
$page_description = $page['description'] ?? null;
$content = $page['content'] ?? null;

// Если найден page_id, сохраняем его в куки
if ($page_id) {
    setcookie('page_id', $page_id, time() + 3600, '/', '', false, true); // HttpOnly, кука на 1 час
}

// Если API-запрос, передаем page_id в API-файл
$apiPath = "./api/{$q}.php";
if ($isApiRequest) {
    if (file_exists($apiPath)) {
        $_GET['page_id'] = $_GET['page_id'] ?? $_COOKIE['page_id'] ?? null; // Берем из запроса или куки

        // Отладка перед передачей в API
        // error_log("Передача в API: page_id=" . ($_GET['page_id'] ?? 'null'));

        require $apiPath;
        exit;
    } else {
        header('HTTP/1.0 404 Not Found');
        echo json_encode(['error' => 'API endpoint not found']);
        exit;
    }
}

// Если страница найдена, загружаем её данные
if ($page) {
    require "./templates/{$page['type']}.php";
} elseif (file_exists("./pages/{$q}/tpl.php")) {
    $page_title = '';
    $page_description = '';

    ob_start();
    require "./pages/{$q}/tpl.php";
    $content = ob_get_clean();

    require './templates/default.php';
} else {
    $page_title = '404 - Страница не найдена';
    $page_description = 'Запрашиваемая страница не существует';
    require './templates/404.php';
}


// define('ENGINE', true);
// require_once './config.php';
// require_once './database.php';

// global $pdo;

// // Получаем параметр q из URL (alias страницы или API-запрос)
// $q = $_GET['q'] ?? 'main';
// $isApiRequest = isset($_GET['api']) || $_SERVER['REQUEST_METHOD'] === 'POST';

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $data = json_decode(file_get_contents('php://input'), true);
//     $q = $data['q'] ?? 'main';
// }

// // Отладка входящих данных
// error_log("Запрос q: " . $q);

// // Поиск страницы в БД перед обработкой API-запросов
// $stmt = $pdo->prepare("SELECT * FROM page_routes WHERE alias = :alias");
// $stmt->execute(['alias' => $q]);
// $page = $stmt->fetch(PDO::FETCH_ASSOC);

// // Отладка найденной страницы
// error_log("Найденная страница: " . print_r($page, true));

// $page_id = $page['id'] ?? null;
// $page_alias = $page['alias'] ?? null;
// $page_title = $page['title'] ?? null;
// $page_description = $page['description'] ?? null;
// $content = $page['content'] ?? null;

// // Если API-запрос, передаем page_id в API-файл
// $apiPath = "./api/{$q}.php";
// if ($isApiRequest) {
//     if (file_exists($apiPath)) {
//         $_GET['page_id'] = $page_id; // Передача в API

//         // Отладка перед передачей в API
//         error_log("Передача в API: page_id=" . $page_id);

//         require $apiPath;
//         exit;
//     } else {
//         header('HTTP/1.0 404 Not Found');
//         echo json_encode(['error' => 'API endpoint not found']);
//         exit;
//     }
// }

// // Если страница найдена, загружаем её данные
// if ($page) {
//     require "./templates/{$page['type']}.php";
// } elseif (file_exists("./pages/{$q}/tpl.php")) {
//     $page_title = '';
//     $page_description = '';

//     ob_start();
//     require "./pages/{$q}/tpl.php";
//     $content = ob_get_clean();

//     require './templates/default.php';
// } else {
//     $page_title = '404 - Страница не найдена';
//     $page_description = 'Запрашиваемая страница не существует';
//     require './templates/404.php';
// }






// define('ENGINE', true);
// require_once './config.php';
// require_once './database.php';

// global $pdo;

// $q = $_GET['q'] ?? 'main';

// // Поиск страницы в БД
// $stmt = $pdo->prepare("SELECT * FROM page_routes WHERE alias = :alias");
// $stmt->execute(['alias' => $q]);
// $page = $stmt->fetch(PDO::FETCH_ASSOC);

// if ($page) {
//     // Если страница найдена в БД
//     $page_title = $page['title'];
//     $page_description = $page['description'];
//     $content = $page['content'];

//     if ($page['type'] == 'rating') {
//         require './templates/rating.php';
//     } elseif ($page['type'] == 'company') {
//         require './templates/company.php';
//     } elseif ($page['type'] == 'sample') {
//         require './templates/sample_page.php';
//     } else {
//         require './templates/default.php';
//     }
// } elseif (file_exists("./pages/{$q}/tpl.php")) {
//     // Если страница представлена файлом в папке pages/
//     $page_title = '';
//     $page_description = '';

//     ob_start();
//     require "./pages/{$q}/tpl.php";
//     $content = ob_get_clean();

//     require './templates/default.php';
// } else {
//     // Страница не найдена
//     $page_title = '404 - Страница не найдена';
//     $page_description = 'Запрашиваемая страница не существует';
//     require './templates/404.php';
// }



// define('ENGINE', true);

// // Подключаем конфигурацию и БД
// require_once './const/index.php';
// require_once './config.php';
// require_once './database.php';

// global $pdo;

// // Загружаем основные функции и классы
// require_once './classes/settings.php';
// require_once './functions/default.php';
// require_once './classes/user.php';

// global $settings, $settings_payments, $user;

// $settings = new settings();
// $settings_payments = new settings_payments();
// $user = new user($languages);

// // Проверяем реферальную ссылку
// if (isset($_GET['r'])) {
//     $ref_id = (int) $_GET['r'];
//     $ref_source = clean_string($_GET['s']);
//     setcookie('referal', $ref_id, time() + 2592000, '/');
//     setcookie('referal_source', $ref_source, time() + 2592000, '/');
//     if (isset($_SERVER['HTTP_REFERER'])) {
//         setcookie('referal_url', $_SERVER['HTTP_REFERER'], time() + 2592000, '/');
//     }
//     $pdo->prepare('UPDATE referrals_info SET link_opened = link_opened + 1 WHERE user_id = ?')->execute([$ref_id]);
// }

// // Устанавливаем язык
// if (isset($_GET['l']) && in_array($_GET['l'], $languages)) {
//     $user->language = $_GET['l'];
//     $_SESSION['language'] = $_GET['l'];
// }

// // Получаем запрашиваемый URL
// $q = $_GET['q'] ?? 'main';
// $q_parts = explode('/', $q);

// // Проверяем, есть ли такая страница в файлах
// $page_found = false;
// if (file_exists("./pages/{$q}/tpl.php")) {
//     $page_found = true;
//     require "./pages/{$q}/tpl.php";
// } elseif (isset($q_parts[1]) && file_exists("./pages/{$q_parts[0]}/{$q_parts[1]}/tpl.php")) {
//     $page_found = true;
//     require "./pages/{$q_parts[0]}/{$q_parts[1]}/tpl.php";
// }

// // Если страница не найдена в файлах, проверяем БД
// if (!$page_found) {
//     $stmt = $pdo->prepare("SELECT * FROM page_routes WHERE alias = :alias");
//     $stmt->execute(['alias' => $q]);
//     $page = $stmt->fetch(PDO::FETCH_ASSOC);

//     if ($page) {
//         $title = $page['title'];
//         $description = $page['description'];
//         $content = $page['content'];
//         require "./templates/{$page['template']}.php";
//     } else {
//         // 404
//         header("HTTP/1.1 404 Not Found");
//         require './templates/404.php';
//     }
// }


// define('ENGINE', true);
// require_once './config.php';
// require_once './database.php';

// global $pdo;

// $q = $_GET['q'] ?? 'main';

// $stmt = $pdo->prepare("SELECT * FROM page_routes WHERE alias = :alias");
// $stmt->execute(['alias' => $q]);
// $page = $stmt->fetch(PDO::FETCH_ASSOC);

// if ($page) {
//     $page_title = $page['title'];
//     $page_description = $page['description'];
//     $content = $page['content'];

//     if ($page['type'] == 'rating') {
//         require './templates/rating.php';
//     } elseif ($page['type'] == 'company') {
//         require './templates/company.php';
//     } else {
//         require './templates/default.php';
//     }
// } elseif (file_exists("./pages/{$q}/tpl.php")) {
//     ob_start();
//     require "./pages/{$q}/tpl.php";
//     $content = ob_get_clean();
//     $page_title = ucfirst($q);
//     require './templates/default.php';
// } else {
//     header("HTTP/1.1 404 Not Found");
//     require './templates/404.php';
// }



// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// session_start();

// // Подключаем конфиг и базу данных
// require_once './config.php';
// require_once './database.php';

// // Подключаем классы и функции
// require_once './classes/settings.php';
// // require_once './classes/user.php';
// require_once './functions/default.php';

// global $pdo, $settings, $user;

// $settings = new settings();
// // $user = new user();

// // Получаем запрошенный URL
// $q = $_GET['q'] ?? ''; // Если пусто — грузим главную страницу
// $q_parts = explode('/', $q);

// $section = $q_parts[0] ?? '';
// $subpage = $q_parts[1] ?? null;

// // Проверяем, есть ли страница в БД
// $stmt = $pdo->prepare("SELECT * FROM page_routes WHERE alias = :alias");
// $stmt->execute(['alias' => $q]);
// $page = $stmt->fetch(PDO::FETCH_ASSOC);

// // Отладка: смотрим, что передаётся в $q и найден ли маршрут в БД
// // var_dump($q, $page);

// if ($page) {
//     // Если страница найдена в БД
//     $page_title = $page['title'];
//     $page_description = $page['description'];
//     $content = $page['content'];

//     require './templates/default.php';
// } elseif ($subpage && file_exists("./pages/$section/$subpage/tpl.php")) {
//     // Если это подстраница и файл существует
//     $page_title = ucfirst($subpage);
//     $page_description = "Описание $subpage";

//     ob_start();
//     require "./pages/$section/$subpage/tpl.php";
//     $content = ob_get_clean();

//     require './templates/default.php';
// } elseif (file_exists("./pages/$section/tpl.php")) {
//     // Если основной файл страницы существует
//     $page_title = ucfirst($section);
//     $page_description = "Описание $section";

//     ob_start();
//     require "./pages/$section/tpl.php";
//     $content = ob_get_clean();

//     require './templates/default.php';
// } else {
//     // Если страница не найдена
//     header("HTTP/1.1 404 Not Found");
//     $page_title = "Страница не найдена";
//     $page_description = "Ошибка 404 — страница не найдена.";

//     ob_start();
//     require './pages/404/tpl.php';
//     $content = ob_get_clean();

//     require './templates/default.php';
// }



// function load_default()
// {
//     define('ENGINE', true);

//     // Подключаем конфиг и коннектимся к базе
//     require_once './const/index.php';
//     require_once './config.php';
//     global $pdo;
//     require_once './database.php';

//     // Подключаем дефолтные функции и классы
//     require_once './classes/settings.php';
//     global $settings, $settings_payments;

//     $settings = new settings();
//     $settings_payments = new settings_payments();

//     require_once './functions/default.php';

//     require_once './classes/user.php';
//     global $user;

//     $user = new user($languages);

//     // Проверяем реферальную ссылку
//     if (isset($_GET['r'])) {
//         $ref_id = (int)$_GET['r'];
//         $ref_source = clean_string($_GET['s']);
//         setcookie('referal', $ref_id, time() + 2592000, '/');
//         setcookie('referal_source', $ref_source, time() + 2592000, '/');
//         if (isset($_SERVER['HTTP_REFERER'])) {
//             setcookie('referal_url', $_SERVER['HTTP_REFERER'], time() + 2592000, '/');
//         }

//         $update_link_counter = $pdo->prepare('UPDATE referrals_info SET link_opened = link_opened + 1 WHERE user_id = ?');
//         $update_link_counter->execute(array($ref_id));
//     }

//     if (isset($_GET['l']) && in_array($_GET['l'], $languages)) {
//         $user->language = $_GET['l'];
//         $_SESSION['language'] = $_GET['l'];
//     }
// }

// function load_view($path, $template = '')
// {
//     global $user;

//     $_txt = array();
//     require_once './' . $path . '/' . $user->language . '.php';

//     if (file_exists('./' . $path . '/require.php')) {

//         $template = require_once './' . $path . '/require.php';

//         if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//             header('Location: ' . $root_url . 'login');
//         } elseif (($path == 'pages/login' || $path == 'pages/registration' || $path == 'pages/remind') && $user->is_logged() === true) {
//             header('Location: ' . $root_url . 'home');
//         } else {
//             $file = require_once './' . $path . '/tpl.php';
//         }
//     } else {
//         $file = require_once './' . $path . '/tpl.php';
//     }
//     return $file;
// }

// function load_page($path)
// {
//     global $user, $root_url;

//     $_txt = array();
//     require_once './pages/' . $path . '/' . $user->language . '.php';

//     $template = require_once './pages/' . $path . '/require.php';

//     if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//         header('Location: ' . $root_url . 'login');
//     } elseif (($path == 'login' || $path == 'registration') && $user->is_logged() === true) {
//         header('Location: ' . $root_url . 'home');
//     } else {
//         $content_path = './pages/' . $path . '/tpl.php';
//         require_once './templates/' . $template . '/tpl.php';
//     }
// }

// if (isset($_POST['controller'])) {

//     $_POST['controller'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['controller']);

//     if (file_exists('./controllers/' . $_POST['controller'] . '.php')) {
//         load_default();
//         require_once './controllers/' . $_POST['controller'] . '.php';
//     } else {
//         echo 'file not exist';
//     }
// } elseif (isset($_POST['get_page'])) {

//     $_POST['get_page'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['get_page']);

//     if ($_POST['get_page'] == '/') {
//         $_POST['get_page'] = 'main';
//     }

//     if (file_exists('./pages/' . $_POST['get_page'] . '/tpl.php')) {
//         load_default();
//         load_view('pages/' . $_POST['get_page'] . '');
//     } else {
//         load_default();
//         header("HTTP/1.1 404 Not Found");
//         load_page('404');
//     }
// } else {
//     if (!isset($_GET['q']) || empty($_GET['q'])) {
//         $_GET['q'] = 'main'; // Стартовая страница
//     }

//     $q = $_GET['q']; // Алиас страницы
//     $q_parts = explode('/', $q); // Разбиваем путь на части

//     load_default();

//     $section = $q_parts[0];
//     $subpage = $q_parts[1] ?? null;
//     $subsubpage = $q_parts[2] ?? null;

//     // Проверка третьего уровня вложения
//     if ($subsubpage && file_exists('./pages/' . $section . '/' . $subpage . '/' . $subsubpage . '/tpl.php')) {
//         load_page($section . '/' . $subpage . '/' . $subsubpage);
//     } elseif ($subpage && file_exists('./pages/' . $section . '/' . $subpage . '/tpl.php')) {
//         // Проверка второго уровня вложения
//         load_page($section . '/' . $subpage);
//     } elseif (file_exists('./pages/' . $section . '/tpl.php')) {
//         // Проверка первого уровня вложения
//         load_page($section);
//     } else {
//         // Проверяем алиасы в базе данных
//         $stmt = $pdo->prepare("SELECT * FROM pages_site WHERE alias = :alias");
//         $stmt->execute(['alias' => $q]);
//         $page = $stmt->fetch(PDO::FETCH_ASSOC);

//         if ($page) {
//             $title = $page['name'];
//             $description = $page['description'];
//             $content = $page['content'];
//             require './templates/default_page.php';
//         } else {
//             header("HTTP/1.1 404 Not Found");
//             load_page('404');
//         }
//     }
// }





// function load_default()
// {
//     define('ENGINE', true);

//     // Подключаем конфиг и коннектимся к базе
//     require_once './const/index.php';
//     require_once './config.php';
//     global $pdo;
//     require_once './database.php';

//     // Подключаем дефолтные функции и классы
//     require_once './classes/settings.php';
//     global $settings, $settings_payments;

//     $settings = new settings();
//     $settings_payments = new settings_payments();

//     require_once './functions/default.php';

//     require_once './classes/user.php';
//     global $user;

//     $user = new user($languages);

//     // Проверяем реферальную ссылку
//     if (isset($_GET['r'])) {
//         $ref_id = (int) $_GET['r'];
//         $ref_source = clean_string($_GET['s']);
//         setcookie('referal', $ref_id, time() + 2592000, '/');
//         setcookie('referal_source', $ref_source, time() + 2592000, '/');
//         if (isset($_SERVER['HTTP_REFERER'])) {
//             setcookie('referal_url', $_SERVER['HTTP_REFERER'], time() + 2592000, '/');
//         }

//         $updade_link_counter = $pdo->prepare('UPDATE referrals_info SET link_opened = link_opened + 1 WHERE user_id = ?');
//         $updade_link_counter->execute(array($ref_id));
//     }

//     if (isset($_GET['l']) && in_array($_GET['l'], $languages)) {
//         $user->language = $_GET['l'];
//         $_SESSION['language'] = $_GET['l'];
//     }
// }

// function load_view($path, $template = '')
// {
//     global $user;

//     $_txt = array();
//     require_once './' . $path . '/' . $user->language . '.php';

//     if (file_exists('./' . $path . '/require.php')) {

//         $template = require_once './' . $path . '/require.php';

//         if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//             header('Location: ' . $root_url . 'login');
//         } elseif (($path == 'pages/login' || $path == 'pages/registration' || $path == 'pages/remind') && $user->is_logged() === true) {
//             header('Location: ' . $root_url . 'home');
//         } else {
//             $file = require_once './' . $path . '/tpl.php';
//         }
//     } else {
//         $file = require_once './' . $path . '/tpl.php';
//     }
//     return $file;
// }

// function load_page($path)
// {
//     global $user, $root_url;

//     $_txt = array();
//     require_once './pages/' . $path . '/' . $user->language . '.php';

//     $template = require_once './pages/' . $path . '/require.php';

//     if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//         header('Location: ' . $root_url . 'login');
//     } elseif (($path == 'login' || $path == 'registration') && $user->is_logged() === true) {
//         header('Location: ' . $root_url . 'home');
//     } else {
//         $content_path = './pages/' . $path . '/tpl.php';
//         require_once './templates/' . $template . '/tpl.php';
//     }
// }

// if (isset($_POST['controller'])) {

//     $_POST['controller'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['controller']);

//     if (file_exists('./controllers/' . $_POST['controller'] . '.php')) {
//         load_default();
//         require_once './controllers/' . $_POST['controller'] . '.php';
//     } else {
//         echo 'file not exist';
//     }
// } elseif (isset($_POST['get_page'])) {

//     $_POST['get_page'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['get_page']);

//     if ($_POST['get_page'] == '/') {
//         $_POST['get_page'] = 'main';
//     }

//     if (file_exists('./pages/' . $_POST['get_page'] . '/tpl.php')) {
//         load_default();
//         load_view('pages/' . $_POST['get_page'] . '');
//     } else {
//         load_default();
//         header("HTTP/1.1 404 Not Found");
//         load_page('404');
//     }
// } else {
//     if (!isset($_GET['q']) || empty($_GET['q'])) {
//         $_GET['q'] = 'main'; // Стартовая страница
//     }

//     $q = $_GET['q']; // Алиас страницы
//     $q_parts = explode('/', $q); // Разбиваем путь на части


//     load_default();

//     $section = $q_parts[0];
//     $subpage = $q_parts[1] ?? null;


//     // Если это подстраница, проверяем ее наличие
//     if ($subpage && file_exists('./pages/' . $section . '/' . $subpage . '/tpl.php')) {
//         load_page($section . '/' . $subpage);
//     } elseif (file_exists('./pages/' . $section . '/tpl.php')) {
//         load_page($section);
//     } else {
//         // Проверяем алиасы в базе данных
//         $stmt = $pdo->prepare("SELECT * FROM pages_site WHERE alias = :alias");
//         $stmt->execute(['alias' => $q]);
//         $page = $stmt->fetch(PDO::FETCH_ASSOC);

//         if ($page) {
//             $title = $page['name'];
//             $description = $page['description'];
//             $content = $page['content'];
//             require './templates/default_page.php';
//         } else {
//             header("HTTP/1.1 404 Not Found");
//             load_page('404');
//         }
//     }
// }






// function load_default()
// {
//     define('ENGINE', true);

//     // Подключаем конфиг и коннектимся к базе
//     require_once './const/index.php';
//     require_once './config.php';
//     global $pdo;
//     require_once './database.php';

//     // Подключаем дефолтные функции и классы
//     require_once './classes/settings.php';
//     global $settings, $settings_payments;

//     $settings = new settings();
//     $settings_payments = new settings_payments();

//     require_once './functions/default.php';

//     require_once './classes/user.php';
//     global $user;

//     $user = new user($languages);

//     // Проверяем реферальную ссылку
//     if (isset($_GET['r'])) {
//         $ref_id = (int) $_GET['r'];
//         $ref_source = clean_string($_GET['s']);
//         setcookie('referal', $ref_id, time() + 2592000, '/');
//         setcookie('referal_source', $ref_source, time() + 2592000, '/');
//         if (isset($_SERVER['HTTP_REFERER'])) {
//             setcookie('referal_url', $_SERVER['HTTP_REFERER'], time() + 2592000, '/');
//         }

//         $updade_link_counter = $pdo->prepare('UPDATE referrals_info SET link_opened = link_opened + 1 WHERE user_id = ?');
//         $updade_link_counter->execute(array($ref_id));
//     }

//     if (isset($_GET['l']) && in_array($_GET['l'], $languages)) {
//         $user->language = $_GET['l'];
//         $_SESSION['language'] = $_GET['l'];
//     }
// }

// function load_view($path, $template = '')
// {
//     global $user;

//     $_txt = array();
//     require_once './' . $path . '/' . $user->language . '.php';

//     if (file_exists('./' . $path . '/require.php')) {

//         $template = require_once './' . $path . '/require.php';

//         if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//             header('Location: ' . $root_url . 'login');
//         } elseif (($path == 'pages/login' || $path == 'pages/registration' || $path == 'pages/remind') && $user->is_logged() === true) {
//             header('Location: ' . $root_url . 'home');
//         } else {
//             $file = require_once './' . $path . '/tpl.php';
//         }
//     } else {
//         $file = require_once './' . $path . '/tpl.php';
//     }
//     return $file;
// }

// function load_page($path)
// {
//     global $user, $root_url;

//     $_txt = array();
//     require_once './pages/' . $path . '/' . $user->language . '.php';

//     $template = require_once './pages/' . $path . '/require.php';

//     if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//         header('Location: ' . $root_url . 'login');
//     } elseif (($path == 'login' || $path == 'registration') && $user->is_logged() === true) {
//         header('Location: ' . $root_url . 'home');
//     } else {
//         $content_path = './pages/' . $path . '/tpl.php';
//         require_once './templates/' . $template . '/tpl.php';
//     }
// }

// if (isset($_POST['controller'])) {

//     $_POST['controller'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['controller']);

//     if (file_exists('./controllers/' . $_POST['controller'] . '.php')) {
//         load_default();
//         require_once './controllers/' . $_POST['controller'] . '.php';
//     } else {
//         echo 'file not exist';
//     }
// } elseif (isset($_POST['get_page'])) {

//     $_POST['get_page'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['get_page']);

//     if ($_POST['get_page'] == '/') {
//         $_POST['get_page'] = 'main';
//     }

//     if (file_exists('./pages/' . $_POST['get_page'] . '/tpl.php')) {
//         load_default();
//         load_view('pages/' . $_POST['get_page'] . '');
//     } else {
//         load_default();
//         header("HTTP/1.1 404 Not Found");
//         load_page('404');
//     }
// } else {
//     if (!isset($_GET['q']) || empty($_GET['q'])) {
//         $_GET['q'] = 'main'; // Стартовая страница
//     }

//     $q = $_GET['q']; // Алиас страницы

//     load_default();

//     // Проверяем, существует ли страница с таким алиасом
//     $stmt = $pdo->prepare("SELECT * FROM pages_site WHERE alias = :alias");
//     $stmt->execute(['alias' => $q]);
//     $page = $stmt->fetch(PDO::FETCH_ASSOC);

//     if ($page) {
//         // Если страница найдена, используем общий шаблон для отображения
//         $title = $page['name']; // Название страницы
//         $description = $page['description']; // Meta-тег description
//         $content = $page['content']; // Содержимое страницы

//         // Подключаем общий шаблон
//         require './templates/default_page.php';
//     } else {
//         // Если страницы нет, проверяем существующий путь
//         if (file_exists('./pages/' . $q . '/tpl.php')) {
//             load_page($q);
//         } else {
//             header("HTTP/1.1 404 Not Found");
//             load_page('404');
//         }
//     }
// }

// function load_default()
// {
//     define('ENGINE', true);

//     //	подключаем конфиг и коннектимся к базе
//     require_once './const/index.php';
//     require_once './config.php';
//     global $pdo;
//     require_once './database.php';

//     //	подключаем дефолтные функции и классы
//     require_once './classes/settings.php';
//     global $settings, $settings_payments;

//     $settings = new settings();
//     $settings_payments = new settings_payments();

//     require_once './functions/default.php';

//     require_once './classes/user.php';
//     global $user;

//     $user = new user($languages);

//     //	проверяем реферальную ссылку
//     if (isset($_GET['r'])) {
//         $ref_id = (int) $_GET['r'];
//         $ref_source = clean_string($_GET['s']);
//         setcookie('referal', $ref_id, time() + 2592000, '/');
//         setcookie('referal_source', $ref_source, time() + 2592000, '/');
//         if (isset($_SERVER['HTTP_REFERER'])) {
//             setcookie('referal_url', $_SERVER['HTTP_REFERER'], time() + 2592000, '/');
//         }

//         $updade_link_counter = $pdo->prepare('UPDATE referrals_info SET link_opened = link_opened + 1 WHERE user_id = ?');
//         $updade_link_counter->execute(array($ref_id));
//     }

//     if (isset($_GET['l']) && in_array($_GET['l'], $languages)) {
//         $user->language = $_GET['l'];
//         $_SESSION['language'] = $_GET['l'];
//     }
// }

// function load_view($path, $template = '')
// {
//     global $user;

//     $_txt = array();
//     require_once './' . $path . '/' . $user->language . '.php';

//     if (file_exists('./' . $path . '/require.php')) {

//         $template = require_once './' . $path . '/require.php';

//         //	не пускаем на внутренние страницы неавторизованных юзеров
//         if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//             header('Location: ' . $root_url . 'login');
//             //	если авторизованный пользователь пытается войти ещё раз - отправляем на страницу обучения
//         } elseif (($path == 'pages/login' || $path == 'pages/registration' || $path == 'pages/remind') && $user->is_logged() === true) {
//             header('Location: ' . $root_url . 'home');
//         } else {
//             $file = require_once './' . $path . '/tpl.php';
//         }
//     } else {
//         $file = require_once './' . $path . '/tpl.php';
//     }
//     return $file;
// }

// function load_page($path)
// {
//     global $user, $root_url;

//     $_txt = array();
//     require_once './pages/' . $path . '/' . $user->language . '.php';

//     $template = require_once './pages/' . $path . '/require.php';

//     //	не пускаем на внутренние страницы неавторизованных юзеров
//     if (($template == 'develop' || $template == 'main_inner') && $user->is_logged() === false) {
//         header('Location: ' . $root_url . 'login');
//         //	если авторизованный пользователь пытается войти ещё раз - отправляем на страницу обучения
//     } elseif (($path == 'login' || $path == 'registration') && $user->is_logged() === true) {
//         header('Location: ' . $root_url . 'home');
//     } else {
//         $content_path = './pages/' . $path . '/tpl.php';
//         require_once './templates/' . $template . '/tpl.php';
//     }

//     //	запись страницы и время за которое её отдал PHP
//     // file_put_contents('logs/log_access.txt', 'page: '.$path. PHP_EOL .(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) . PHP_EOL, FILE_APPEND | LOCK_EX);
// }



// if (isset($_POST['controller'])) {

//     $_POST['controller'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['controller']);

//     if (file_exists('./controllers/' . $_POST['controller'] . '.php')) {

//         load_default();

//         require_once './controllers/' . $_POST['controller'] . '.php';
//     } else {
//         echo 'file not exist';
//     }
// } elseif (isset($_POST['get_page'])) {

//     $_POST['get_page'] = str_ireplace(array('../', './', '/adminko', 'adminko/', 'adminko'), '', $_POST['get_page']);

//     if ($_POST['get_page'] == '/') {
//         $_POST['get_page'] = 'main';
//     }

//     if (file_exists('./pages/' . $_POST['get_page'] . '/tpl.php')) {

//         load_default();

//         load_view('pages/' . $_POST['get_page'] . '');
//     } else {

//         load_default();

//         header("HTTP/1.1 404 Not Found");

//         load_page('404');
//     }
// } else {

//     if (!isset($_GET['q']) || empty($_GET['q'])) {
//         $_GET['q'] = 'main';
//     }

//     $q = explode('/', $_GET['q']);
//     $section = $q[0];
//     $subpage = $q[1] ?? null;

//     if (file_exists('./pages/' . $section . '/tpl.php')) {
//         load_default();
//         load_page($section);
//     } elseif ($subpage && file_exists('./pages/' . $section . '/' . $subpage . '/tpl.php')) {
//         load_default();
//         load_page($section . '/' . $subpage);
//     } else {
//         load_default();
//         header("HTTP/1.1 404 Not Found");
//         load_page('404');
//     }

//     // if (!isset($_GET['q'])) {
//     // 	$_GET['q'] = 'main';
//     // }

//     // if (file_exists('./pages/' . $_GET['q'] . '/tpl.php')) {

//     // 	load_default();

//     // 	load_page($_GET['q']);
//     // } else {

//     // 	load_default();

//     // 	header("HTTP/1.1 404 Not Found");

//     // 	load_page('404');
//     // }
// }
