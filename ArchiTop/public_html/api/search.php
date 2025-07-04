<?php

if (!defined('ENGINE')) {
    http_response_code(403);
    exit(json_encode(['error' => 'Access denied']));
}

$query = $_GET['query'] ?? '';

if (empty($query)) {
    echo json_encode(['error' => 'Введите поисковый запрос']);
    exit;
}

global $pdo;

$sql = "SELECT 
        s.id, 
        s.category_id, 
        s.name, 
        pr.alias AS category_alias 
    FROM services s
    LEFT JOIN categories c ON s.category_id = c.id
    LEFT JOIN page_routes pr ON c.page_id = pr.id
    WHERE s.name LIKE :query 
    LIMIT 10";

$stmt = $pdo->prepare($sql);

$stmt->execute(['query' => "%$query%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($results) {
    echo json_encode($results);
} else {
    echo json_encode(['error' => 'Ничего не найдено']);
}
exit;
