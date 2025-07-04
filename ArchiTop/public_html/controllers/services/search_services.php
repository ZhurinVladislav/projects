<?php

global $pdo;

if (isset($_POST['query'])) {
    $query = $_POST['query'];

    $sql = "SELECT name, category_id FROM services WHERE name LIKE :query LIMIT 10";
    $stmt = $pdo->prepare($sql);

    $stmt->execute(['query' => '%' . $query . '%']);

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($results);
} else {
    echo 'Параметр query не задан.';
}
