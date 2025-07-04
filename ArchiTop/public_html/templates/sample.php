<?php
$page_title = $page_title ?? 'Рейтинг архитектурных компаний в Краснодаре ArchiTop';
$page_description = $page_description ?? 'Рейтинг архитектурных компаний в Краснодаре ArchiTop';
?>

<?php require_once 'parts/head.php'; ?>
<?php require_once 'parts/header.php'; ?>

<main id="main-block" class="main-section">
    <div class="main-section__search-services search-services">
        <div class="search-services__container container">
            <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/parts/search-form.php'; ?>
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
                        <?= htmlspecialchars($page_title); ?>
                    </span>
                </li>
            </ul>
        </div>
    </div>

    <section
        class="main-section__typical-section typical-section section-inner">
        <div class="typical-section__container container">
            <div class="typical-section__content-wrapper">
                <h1 class="typical-section__title text-hidden">
                    <?= htmlspecialchars($page_title); ?>
                </h1>
                <h2 class="typical-section__title h-1">
                    <?= htmlspecialchars($page_title); ?>
                </h2>
                <div class="typical-section__content text-default">
                    <?= $content ?? '<p class="text-default_p">Страница не найдена</p>'; ?>
                </div>
            </div>
        </div>
    </section>
</main>

<?php require_once 'parts/footer.php'; ?>