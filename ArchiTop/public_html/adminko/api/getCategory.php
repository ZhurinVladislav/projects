<?php

try {
    global $pdo;

    require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Category.php';

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=UTF-8');

    if (!defined('ENGINE')) {
        http_response_code(403);
        exit(json_encode(['error' => 'Access denied']));
    }

    $categoryIds = isset($_GET['category_ids']) ?? $_GET['category_ids'] ?? null;

    echo json_encode($categoryIds);
} catch (PDOException $error) {
    http_response_code(500);
    echo json_encode(["error" => "Ошибка подключения: " . $e->getMessage()]);
}
