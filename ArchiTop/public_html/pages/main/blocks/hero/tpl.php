<?php

global $pdo;

include_once './classes/Services.php';
include_once './classes/Company.php';

$servicesObj = new Services($pdo);
$companyObj = new Company($pdo);

$totalServices = $servicesObj->count();
$totalCompanies = $companyObj->count();

?>

<section class="main-section__hero hero section-reset">
    <div
        class="hero__bg-img"
        data-image="./app/img/hero/bg-img.webp"></div>
    <div class="hero__container container">
        <div class="hero__content-top">
            <div
                class="hero__bg-img hero__bg-img_ph"
                data-image="./app/img/hero/bg-img.webp"></div>
            <h1 class="hero__title h-1">
                Архитектурные бюро Краснодарского края
            </h1>
            <p class="hero__text">
                Рейтинг лучших, проверенных архитектурных компаний
                и&nbsp;проектных организаций с&nbsp;высокой
                экспертизой в&nbsp;отрасли
            </p>
            <?php
            load_view('templates/base/search', $template);
            ?>
        </div>

        <ul class="hero__advantages">
            <li class="hero__advantages-item advantages-item">
                <span class="advantages-item__num">
                    <?php echo htmlspecialchars($totalCompanies); ?>
                </span>
                <p class="advantages-item__text">
                    Архитектурных бюро Краснодарского края
                </p>
            </li>
            <li class="hero__advantages-item advantages-item">
                <span class="advantages-item__num">
                    0
                </span>
                <p class="advantages-item__text">
                    Отзывов от&nbsp;пользователей
                </p>
            </li>
            <li class="hero__advantages-item advantages-item">
                <span class="advantages-item__num">
                    <?php echo htmlspecialchars($totalServices); ?>
                </span>
                <p class="advantages-item__text">
                    Архитектурных направления
                </p>
            </li>
        </ul>
    </div>
</section>