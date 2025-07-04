<?php

define('ENGINE', true);
require_once './config.php';
require_once './config/Config.php';
require_once './database.php';

global $pdo;

// Получаем параметр q из URL (alias страницы или API-запрос)
$q = $_GET['q'] ?? 'main';
$isApiRequest = isset($_GET['api']) || $_SERVER['REQUEST_METHOD'] === 'POST';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $q = $data['q'] ?? 'main';
}

// Поиск страницы в БД перед обработкой API-запросов
$stmt = $pdo->prepare("SELECT * FROM page_routes WHERE alias = :alias");
$stmt->execute(['alias' => $q]);
$page = $stmt->fetch(PDO::FETCH_ASSOC);

$page_id = $page['id'] ?? null;
$page_alias = $page['alias'] ?? null;
$appName = Config::APP_NAME;
$appUrl = Config::APP_URL;
$pageTitle = $page['title'] ?? null;
$pageDescription = $page['description'] ?? null;
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
        error_log("Передача в API: page_id=" . ($_GET['page_id'] ?? 'null'));

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
    $pageTitle = '';
    $pageDescription = '';

    ob_start();
    require "./pages/{$q}/tpl.php";
    $content = ob_get_clean();

    require './templates/default.php';
} else {
    $pageTitle = '404 - Страница не найдена';
    $pageDescription = 'Запрашиваемая страница не существует';
    require './templates/404.php';
}
