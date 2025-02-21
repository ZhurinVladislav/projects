<?php
global $pdo;

require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Rating.php';

$ratingObj = new Rating($pdo);
$page_title = $page_title ?? 'Рейтинг архитектурных компаний в Краснодаре ArchiTop';
$page_description = $page_description ?? 'Рейтинг архитектурных компаний в Краснодаре ArchiTop';

$ratingList = $ratingObj->getList();
?>

<?php require_once 'parts/head.php'; ?>
<?php require_once 'parts/header.php'; ?>

<main id="main-block" class="main-section">
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
                        Рейтинг услуг в Краснодарском крае
                    </span>
                </li>
            </ul>
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