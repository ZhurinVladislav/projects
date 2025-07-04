<?php

if (!defined('ENGINE')) {
    http_response_code(403);
    exit(json_encode(['error' => 'Access denied']));
}

global $pdo;
$page_title = 'Поиск по услуге архитектурные бюро Краснодарского края';
$page_description = 'Поиск';

$query = $_GET['query'] ?? '';

$services = [];
// Если запрос не пустой
if ($query !== '') {
    // Получение услуг, которые соответствуют запросу
    $sql = "SELECT s.id, s.name, c.id as category_id, pr.alias AS category_alias FROM services s
            LEFT JOIN categories c ON s.category_id = c.id
            LEFT JOIN page_routes pr ON c.page_id = pr.id
            WHERE s.name LIKE :query";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['query' => '%' . $query . '%']);
    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

?>

<div class="main-section__search-services search-services">
    <div class="search-services__container container">
        <?php
        require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/parts/search-form.php';
        ?>
    </div>
</div>

<div class="main-section__breadcrumb breadcrumb">
    <div class="breadcrumb__container container">
        <ul class="breadcrumb__list breadcrumb-list">
            <li class="breadcrumb-list__item">
                <a class="breadcrumb-list__item-link" href="/">
                    Главная
                </a>
            </li>
            <li class="breadcrumb-list__item">
                <span
                    class="breadcrumb-list__item-link breadcrumb-list__item-link_nolink">
                    Поиск
                </span>
            </li>
        </ul>
    </div>
</div>

<section class="main-section__news search-section section-inner">
    <div class="search-section__container container">
        <h1 class="search-section__title-hidden text-hidden">
            Поиск по услугам
        </h1>
        <?php if (count($services) > 0): ?>
            <h2 class="search-section__title h-2">
                Результаты поиска по запросу: <span class="search-section__title-color text-color"><?= htmlspecialchars($query); ?></span>
            </h2>
            <ul class="search-section__list">
                <?php foreach ($services as $service): ?>
                    <li class="search-section__list-item">
                        <a
                            class="search-section__list-link"
                            href="/<?= htmlspecialchars($service['category_alias']); ?>?type=<?= htmlspecialchars($service['name']); ?>">
                            <?= htmlspecialchars($service['name']); ?>
                        </a>
                    </li>
                <?php endforeach ?>
            </ul>
        <?php else: ?>
            <p class="search-section__no-result">
                Услуги по запросу не найдены.
            </p>
        <?php endif ?>
    </div>
</section>