<?php

global $pdo;

include_once './classes/Services.php';

$services = new Services($pdo);

$categories = $services->getCategories();

?>

<section class="main-section__services services section-reset">
    <div class="services__container container">
        <h2 class="services__title h-2">
            Услуги архитектурных бюро в&nbsp;<a href="./rating" class="services__title-color text-color">Краснодарском крае</a>
        </h2>
        <ul class="services__list links-list">
            <?php foreach ($categories as $category): ?>
                <li class="links-list__item">
                    <a
                        class="links-list__item-link link-list"
                        href="./rating?id=<?= $category['category_id']; ?>"
                        aria-label="Перейти на страницу <?= htmlspecialchars($category['category_name']); ?>">
                        <span class="link-list__text">
                            <?= htmlspecialchars($category['category_name']); ?>
                        </span>
                        <span class="link-list__line"></span>
                        <span class="link-list__num">
                            <?= $category['services_count']; ?>
                        </span>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>