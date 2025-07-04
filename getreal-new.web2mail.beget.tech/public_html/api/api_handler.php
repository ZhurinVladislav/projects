<?php

if (isset($_GET['search'])) {
    try {
        global $pdo;

        header('Content-Type: application/json');

        $query = $_GET['search'];

        $sql = "SELECT name, category_id FROM services WHERE name LIKE :query LIMIT 10";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['query' => '%' . $query . '%']);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($results, JSON_UNESCAPED_UNICODE);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ошибка базы данных: ' . $e->getMessage()]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Произошла ошибка: ' . $e->getMessage()]);
    }
}
