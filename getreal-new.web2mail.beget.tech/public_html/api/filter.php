<?php

try {
    global $pdo;

    require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Rating.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Company.php';

    // Получаем GET параметры
    $type = isset($_GET['type']) ? urldecode(trim($_GET['type'])) : '';
    $rating = isset($_GET['rating']) ? (float)$_GET['rating'] : 0;

    if (!defined('ENGINE')) {
        http_response_code(403);
        exit(json_encode(['error' => 'Access denied']));
    }

    $page_id = $_GET['page_id'] ?? $_COOKIE['page_id'] ?? null;

    // Получаем ID категории по page_id
    $ratingObj = new Rating($pdo);
    $category = $ratingObj->getCategoryByPageId($page_id);

    // Базовый SQL-запрос с JOIN для получения alias и количества отзывов
    $sql = "SELECT DISTINCT c.*, pr.alias, 
                   (SELECT COUNT(*) FROM company_reviews cr WHERE cr.company_id = c.id) AS review_count
            FROM companies c
            LEFT JOIN page_routes pr ON c.page_id = pr.id";

    $conditions = [];
    $params = [];

    // Если указан параметр type (услуга), добавляем нужные JOIN и WHERE
    if (!empty($type)) {
        $sql .= " INNER JOIN company_service_main csm ON c.id = csm.company_id
                  INNER JOIN services s ON csm.service_id = s.id";
        $conditions[] = "s.name = :type";
        $params[':type'] = $type;
    }

    // Если указан параметр rating (рейтинг), добавляем фильтр
    if ($rating > 0) {
        $conditions[] = "c.rating >= :rating";
        $params[':rating'] = $rating;
    }

    // Если **нет фильтров**, то выводим только компании нужной категории
    if (empty($type) && $rating == 0 && !empty($category)) {
        $conditions[] = "c.category_id = :category_id";
        $params[':category_id'] = $category['id'];
    }

    // Добавляем условия WHERE, если они есть
    if (!empty($conditions)) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    // Подготовка и выполнение запроса
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Получаем результат
    $companies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Выводим JSON с компаниями, их алиасами и количеством отзывов
    echo json_encode($companies);
} catch (PDOException $e) {
    echo json_encode(["error" => "Ошибка подключения: " . $e->getMessage()]);
}
