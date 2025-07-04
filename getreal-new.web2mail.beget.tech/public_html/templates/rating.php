<?php
require_once 'parts/head.php';
require_once 'parts/header.php';
?>

<main>
    <div class="breadcrumbs">
        <div class="container">
            <div class="content">
                <ul class="list">
                    <li class="item">
                        <a href="/" class="link">
                            Главная&nbsp;&mdash;&nbsp;
                        </a>
                    </li>
                    <li class="item">
                        Рейтинг агентств недвижимости в Сочи
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <section class="main-section__categories categories section-reset">
        <div class="categories__container container">
            <h2 class="categories__title h-2">
                Рейтинг услуг в
                <span class="categories__title-color text-color">
                    Краснодарском крае
                </span>
            </h2>
            <?php if (empty($companies)): ?>
                <ul class="categories__list links-list">
                    <?php foreach ($ratingList as $rating): ?>
                        <li class="links-list__item">
                            <a
                                class="links-list__item-link link-list"
                                href="<?= htmlspecialchars($rating['alias']); ?>"
                                aria-label="Перейти на страницу <?= htmlspecialchars($rating['title']); ?>">
                                <span class="link-list__text">
                                    <?= htmlspecialchars($rating['name']); ?>
                                </span>
                                <span class="link-list__line"></span>
                                <span class="link-list__num">
                                    <?= $rating['count']; ?>
                                </span>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p class="categories__text">Список категорий пуст</p>
            <?php endif ?>
        </div>
    </section>
</main>

<?php require_once 'parts/footer.php'; ?>