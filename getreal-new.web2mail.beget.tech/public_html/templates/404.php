<?php
require_once 'parts/head.php';
require_once 'parts/header.php';
?>

<main id="main-block" class="main-section">
    <section class="main-section__not-found not-found">
        <div class="not-found__container container">
            <div class="not-found__content content">
                <h1 class="content__title-hidden text-hidden">
                    Страница не найдена
                </h1>
                <h2 class="content__title h-2">
                    <span class="content__color color">404</span> -
                    страница не найдена
                </h2>
                <p class="content__text">
                    К&nbsp;сожалению, страница
                    <span class="content__color color">не&nbsp;была обнаружена.</span>
                </p>
                <p class="content__text content__text_last">
                    Пожалуйста, проверьте корректность веденного
                    <span class="content__color color">URL-адреса.</span>
                </p>
            </div>
        </div>
    </section>
</main>

<?php require_once 'parts/footer.php'; ?>