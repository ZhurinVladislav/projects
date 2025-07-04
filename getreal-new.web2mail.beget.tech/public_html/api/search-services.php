<?php

if (!defined('ENGINE')) {
    http_response_code(403);
    exit(json_encode(['error' => 'Access denied']));
}

$q = $_GET['q'] ?? '';

$stmt = $pdo->prepare("SELECT name, category_id FROM services WHERE name LIKE :query LIMIT 10");
$stmt->execute(['query' => "%$q%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($results) {
    echo json_encode($results);
} else {
    echo json_encode(['error' => 'Ничего не найдено']);
}
exit;
