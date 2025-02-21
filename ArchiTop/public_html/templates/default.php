<?php
$page_title = $page_title ?? 'Рейтинг архитектурных компаний в Краснодаре ArchiTop';
$page_description = $page_description ?? 'Рейтинг архитектурных компаний в Краснодаре ArchiTop';
?>

<?php require_once 'parts/head.php'; ?>
<?php require_once 'parts/header.php'; ?>

<main id="main-block" class="main-section">
    <?= $content ?? '<p>Страница не найдена</p>'; ?>
</main>

<?php require_once 'parts/footer.php'; ?>