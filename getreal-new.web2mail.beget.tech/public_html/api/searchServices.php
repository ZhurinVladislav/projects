<?php

if (!defined('ENGINE')) {
    http_response_code(403);
    echo json_encode(['error' => 'Доступ запрещен']);
    exit;
}

global $pdo;

// Получаем поисковый запрос из GET-параметра
$query = $_GET['query'] ?? '';

// Проверяем, что запрос не пустой
if (empty($query)) {
    echo json_encode(['error' => 'Пустой поисковый запрос']);
    exit;
}

// Выполняем поиск в БД
$stmt = $pdo->prepare("SELECT name, category_id FROM services WHERE name LIKE :query LIMIT 10");
$stmt->execute(['query' => "%$query%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Возвращаем результат в JSON
header('Content-Type: application/json');
echo json_encode($results);
exit;
