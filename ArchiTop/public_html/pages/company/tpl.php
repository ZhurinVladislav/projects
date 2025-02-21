<?php

global $pdo;

require_once './classes/Company.php';
require_once './functions/isUserReview.php';
require_once './functions/getUserIP.php';
require_once './functions/normalizeStringCount.php';

$WORDS_REVIEWS = ['отзыв', 'отзывы', 'отзывов'];

$companyObj = new Company($pdo);

$id = isset($_GET['id']) ? intval($_GET['id']) : 1;

$company = $companyObj->get($id);
$phones = $companyObj->getPhones($id);
$services = $companyObj->getServices($id);
$portfolios = $companyObj->getPortfolio($id);
$reviews = $companyObj->getReviews($id);
$rating = $companyObj->getRating($id);

$ipUser = getUserIP();
$isReview = isUserReview($ipUser, $id);

?>

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
                <a class="breadcrumb-list__item-link" href="./rating">
                    Рейтинг
                </a>
            </li>
            <li class="breadcrumb-list__item">
                <span
                    class="breadcrumb-list__item-link breadcrumb-list__item-link_nolink">
                    <?= htmlspecialchars($company['name']) ?>
                </span>
            </li>
        </ul>
    </div>
</div>

<div class="main-section__page-menu page-menu">
    <div class="page-menu__container container">
        <nav class="page-menu__list-nav">
            <ul class="page-menu__list">
                <li class="page-menu__list-item">
                    <a
                        class="page-menu__list-link"
                        href="#about">
                        О компании
                    </a>
                </li>
                <li class="page-menu__list-item">
                    <a
                        class="page-menu__list-link"
                        href="#contacts">
                        Контакты
                    </a>
                </li>
                <?php if (count($services) > 0): ?>
                    <li class="page-menu__list-item">
                        <a
                            class="page-menu__list-link"
                            href="#services">
                            Услуги
                        </a>
                    </li>
                <?php endif; ?>
                <?php if (count($portfolios) > 0): ?>
                    <li class="page-menu__list-item">
                        <a
                            class="page-menu__list-link"
                            href="#portfolio">
                            Портфолио
                        </a>
                    </li>
                <?php endif; ?>
                <li class="page-menu__list-item">
                    <a class="page-menu__list-link" href="#reviews">
                        Отзывы
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>

<section
    id="about"
    class="main-section__project-info project-info section-inner">
    <h1 class="project-info__title-hidden text-hidden">
        Архитектурное бюро «<?= htmlspecialchars($company['name']) ?>» | ArchiTop
    </h1>
    <div class="project-info__container container">
        <div class="project-info__card card-inner">
            <div class="card-inner__column-left">
                <div class="card-inner__img-wrap">
                    <img
                        class="card-inner__img"
                        data-src="./app/img/projects/<?= htmlspecialchars($company['img']) ?>"
                        alt="Фото проекта <?= htmlspecialchars($company['name']) ?>" />
                </div>

                <div class="card-inner__reviews-info reviews-info">
                    <div class="reviews-info__rating">
                        <span class="reviews-info__stars-count">
                            <?= htmlspecialchars($rating) ?>
                        </span>
                        <ul
                            class="reviews-info__rating-stars stars-list">
                            <?php
                            for ($i = 0; $i < 5; $i++) {
                            ?>
                                <?php
                                if ($i < ($rating - 1)) {
                                ?>
                                    <li
                                        class="stars-list__item stars-list__item_active">
                                        <svg class="stars-list__item-icon">
                                            <use
                                                xlink:href="./app/img/icons/icons.svg#star"></use>
                                        </svg>
                                    </li>
                                <?php
                                } else {
                                ?>
                                    <li
                                        class="stars-list__item">
                                        <svg class="stars-list__item-icon">
                                            <use
                                                xlink:href="./app/img/icons/icons.svg#star"></use>
                                        </svg>
                                    </li>
                                <?php
                                }
                                ?>
                            <?php
                            }
                            ?>
                        </ul>
                    </div>
                    <div class="reviews-info__counts">
                        <span class="reviews-info__counts-num text-color">
                            <?= htmlspecialchars(count($reviews)) ?>
                        </span>
                        <?= normalizeStringCount(count($reviews), $WORDS_REVIEWS) ?>
                    </div>
                </div>

                <ul class="card-inner__btn-list btn-list">
                    <li class="btn-list__item">
                        <a class="btn-list__item-btn btn-inv" href="#reviews">
                            <svg class="btn-inv__icon">
                                <use
                                    href="./app/img/icons/icons.svg#review"></use>
                            </svg>
                            <span class="btn-inv__text">
                                Оставить отзыв
                            </span>
                        </a>
                    </li>
                    <!-- <li class="btn-list__item">
                        <button class="btn-list__item-btn btn-inv">
                            <svg class="btn-inv__icon">
                                <use
                                    href="./app/img/icons/icons.svg#star-empty"></use>
                            </svg>
                            <span class="btn-inv__text">
                                Добавить в избранное
                            </span>
                        </button>
                    </li> -->
                    <li class="btn-list__item">
                        <button
                            id="copy-btn"
                            class="btn-list__item-btn btn-inv">
                            <svg class="btn-inv__icon">
                                <use
                                    href="./app/img/icons/icons.svg#share"></use>
                            </svg>
                            <span class="btn-inv__text">
                                Поделиться
                            </span>
                        </button>
                        <div
                            id="copy-message"
                            class="btn-list__message message">
                            <p class="message__text">
                                Ссылка скопирована в буфер обмена!
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="card-inner__column-right">
                <div
                    class="card-inner__title-wrap card-heading card-heading_inner">
                    <img
                        class="card-heading__img"
                        data-src="./app/img/projects/<?= htmlspecialchars($company['logo']) ?>"
                        alt="Фотография профиля" />
                    <h2 class="card-heading__title">
                        Архитектурное бюро «<?= htmlspecialchars($company['name']) ?>»
                    </h2>
                </div>

                <ul class="card-inner__text-list text-list">
                    <li class="text-list__item text-info">
                        <span class="text-info__title text-color">
                            Сайт:
                        </span>
                        <a
                            class="text-info__link text-link"
                            href="http://<?= htmlspecialchars($company['site_url']) ?>"
                            target="_blank"
                            aria-label="Перейти на сайт <?= htmlspecialchars($company['name']) ?>">
                            <?= htmlspecialchars($company['site_url']) ?>
                        </a>
                    </li>
                    <li class="text-list__item text-info">
                        <span class="text-info__title text-color">
                            Город:
                        </span>
                        <span class="text-info__descr">
                            <?= htmlspecialchars($company['city']) ?>
                        </span>
                    </li>
                    <li class="text-list__item text-info">
                        <span class="text-info__title text-color">
                            Опыт работы:
                        </span>
                        <span class="text-info__descr">
                            <?= htmlspecialchars($company['experience']) ?> лет
                        </span>
                    </li>
                </ul>

                <div
                    class="card-inner__descr text-more js-more-wrap">

                    <?php echo $company['description']; ?>
                    <button class="text-more__btn btn-text js-more-btn">
                        <span class="btn-text__text js-more-btn-text">
                            Читать полностью
                        </span>
                        <svg class="btn-text__icon">
                            <use
                                xlink:href="./app/img/icons/icons.svg#arrow"></use>
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    </div>
    </div>
</section>

<section
    id="contacts"
    class="main-section__project-contacts project-contacts section-inner">
    <div class="project-contacts__container container">
        <h2 class="project-contacts__title h-2">Контакты</h2>
        <ul class="project-contacts__list">
            <li class="project-contacts__list-item">
                <ul class="project-contacts__item-list text-list">
                    <li class="text-list__item text-info">
                        <svg class="text-info__icon">
                            <use
                                href="./app/img/icons/icons.svg#home"></use>
                        </svg>
                        <span class="text-info__title text-color">
                            Компания:
                        </span>
                        <span class="text-info__descr">
                            ООО «<?= htmlspecialchars($company['name']) ?>»
                        </span>
                    </li>
                    <li class="text-list__item text-info">
                        <svg class="text-info__icon">
                            <use
                                href="./app/img/icons/icons.svg#compass"></use>
                        </svg>
                        <span class="text-info__title text-color">
                            Сайт:
                        </span>
                        <a
                            class="text-info__link text-link"
                            href="https://<?= htmlspecialchars($company['site_url']) ?>"
                            target="_blank"
                            aria-label="Перейти на сайт artwind.ru">
                            <?= htmlspecialchars($company['site_url']) ?>
                        </a>
                    </li>
                    <li class="text-list__item text-info">
                        <svg class="text-info__icon">
                            <use
                                href="./app/img/icons/icons.svg#mark"></use>
                        </svg>
                        <div class="text-info__more">
                            <p class="text-info__more-descr">
                                <span
                                    class="text-info__more-title text-color">
                                    Адрес:
                                </span>
                                <?= htmlspecialchars($company['address']) ?>
                                <a
                                    class="text-info__more-link"
                                    href="https://yandex.ru/maps/-/CHAC5IPo"
                                    target="_blank">
                                    Смотреть на карте
                                </a>
                            </p>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="project-contacts__list-item">
                <ul class="project-contacts__item-list text-list">
                    <li class="text-list__item text-info">
                        <svg class="text-info__icon">
                            <use
                                href="./app/img/icons/icons.svg#email"></use>
                        </svg>
                        <span class="text-info__title text-color">
                            Email:
                        </span>
                        <a
                            class="text-info__link text-link"
                            href="mailto:<?= htmlspecialchars($company['email']) ?>">
                            <?= htmlspecialchars($company['email']) ?>
                        </a>
                    </li>
                    <?php if (count($phones) > 0): ?>
                        <li
                            class="text-list__item text-info text-info_list">
                            <svg class="text-info__icon">
                                <use
                                    href="./app/img/icons/icons.svg#phone"></use>
                            </svg>
                            <ul class="text-info__list">
                                <?php foreach ($phones as $phone): ?>
                                    <li class="text-info__list-item">
                                        <a
                                            class="text-info__list-link text-link"
                                            href="tel:<?= htmlspecialchars($phone['phone_number']) ?>"
                                            aria-label="Позвонить по номеру <?= htmlspecialchars($phone['phone_number']) ?>">
                                            <?= htmlspecialchars($phone['phone_number']) ?>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </li>
                    <?php endif; ?>
                </ul>
            </li>
            <li class="project-contacts__list-item">
                <ul class="project-contacts__item-list text-list">
                    <!-- <li class="text-list__item text-info">
                        <a
                            class="text-info__link text-link"
                            href="#"
                            target="_blank"
                            aria-label="Перейти в Instagram">
                            <svg class="text-link__icon">
                                <use
                                    href="./app/img/icons/icons.svg#inst"></use>
                            </svg>
                            <span class="text-link__text">
                                Instagram
                            </span>
                        </a>
                    </li> -->
                    <!-- <li class="text-list__item text-info">
                        <a
                            class="text-info__link text-link"
                            href="#"
                            target="_blank"
                            aria-label="Перейти на канал в YouTube">
                            <svg class="text-link__icon">
                                <use
                                    href="./app/img/icons/icons.svg#yt"></use>
                            </svg>
                            <span class="text-link__text">
                                YouTube
                            </span>
                        </a>
                    </li> -->
                    <li class="text-list__item text-info">
                        <a
                            class="text-info__link text-link"
                            href="https://vk.com/artwind_studio"
                            target="_blank"
                            aria-label="Перейти на страницу в Вконтакте">
                            <svg class="text-link__icon">
                                <use
                                    href="./app/img/icons/icons.svg#vk"></use>
                            </svg>
                            <span class="text-link__text">
                                Вконтакте
                            </span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</section>

<?php if (count($services) > 0): ?>
    <section
        id="services"
        class="main-section__project-services project-services section-inner">
        <div class="project-services__container container">
            <h2 class="project-services__title h-2">Услуги компании</h2>
            <div class="project-services__list-wrap js-list-wrap">
                <ul class="project-services__list">
                    <?php foreach ($services as $service): ?>
                        <li class="project-services__list-item js-list-item">
                            <?= htmlspecialchars($service['name']) ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
                <button
                    class="project-services__btn btn-inv js-list-btn">
                    <span class="btn-inv__text js-list-btn-text">Развернуть</span>
                    <svg class="btn-inv__icon">
                        <use
                            xlink:href="./app/img/icons/icons.svg#arrow"></use>
                    </svg>
                </button>
            </div>
        </div>
    </section>
<?php endif; ?>

<?php if (count($portfolios) > 0): ?>
    <section
        id="portfolio"
        class="main-section__project-portfolio project-portfolio section-inner">
        <div class="project-portfolio__container container">
            <h2 class="project-portfolio__title h-2">Портфолио</h2>
            <ul id="gallery-list" class="project-portfolio__list">
                <?php foreach ($portfolios as $portfolio): ?>
                    <li class="project-portfolio__list-item js-gallery-item">
                        <a
                            href="./app/<?= htmlspecialchars($portfolio['img']) ?>"
                            class="project-portfolio__list-link">
                            <div class="project-portfolio__list-img-wrap">
                                <img
                                    class="project-portfolio__list-img-bg"
                                    data-src="./app/<?= htmlspecialchars($portfolio['img']) ?>"
                                    alt="<?= htmlspecialchars($portfolio['name']) ?>">
                                <img
                                    class="project-portfolio__list-img"
                                    data-src="./app/<?= htmlspecialchars($portfolio['img']) ?>"
                                    alt="<?= htmlspecialchars($portfolio['name']) ?>">
                            </div>
                            <h3 class="project-portfolio__list-title h-3">
                                <?= htmlspecialchars($portfolio['name']) ?>
                            </h3>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
            <button
                id="gallery-btn"
                class="project-portfolio__btn btn-inv">
                <span id="gallery-btn-text" class="btn-inv__text">Загрузить еще проекты:</span>

                <span id="gallery-btn-count" class="btn-inv__text-count">0</span>
            </button>
        </div>
    </section>
<?php endif; ?>

<section
    id="reviews"
    class="main__project-reviews project-reviews section-inner">
    <div class="project-reviews__container container">
        <div class="project-reviews__wrap reviews">
            <div class="reviews__top">
                <h2 class="reviews__title h-2">Отзывы о <?= htmlspecialchars($company['name']) ?></h2>
                <button
                    class="reviews__btn btn js-popup-open"
                    data-open-popup="popup-reviews"
                    aria-label="Оставить отзыв">
                    <svg class="btn__icon">
                        <use
                            xlink:href="./app/img/icons/icons.svg#review"></use>
                    </svg>
                    <span class="btn__text">Оставить отзыв</span>
                </button>
            </div>
            <div class="reviews__result-wrap">
                <?php
                if (count($reviews) > 0) {
                ?>
                    <!--
                    <form class="reviews__form reviews-form">
                        <label
                            for="input-search"
                            class="reviews-form__input-wrap form-field form-field_inv">
                            <input
                                id="input-search"
                                class="form-field__input"
                                type="text"
                                placeholder="Поиск в отзывах" />
                            <svg class="form-field__icon">
                                <use
                                    xlink:href="/app/img/icons/icons.svg#search"></use>
                            </svg>
                        </label>
                        <div
                            class="reviews-form__select select js-select">
                            <input
                                class="select__input js-input-select"
                                type="hidden"
                                name="type" />
                            <div class="select__btn js-select-btn">
                                <span
                                    class="select__btn-text js-select-btn-text">
                                    В начале самые новые
                                </span>
                                <svg class="select__btn-icon">
                                    <use
                                        xlink:href="/app/img/icons/icons.svg#arrow"></use>
                                </svg>
                            </div>
                            <ul class="select__list js-select-list">
                                <li
                                    class="select__list-item js-select-item">
                                    По умолчанию
                                </li>
                                <li
                                    class="select__list-item js-select-item">
                                    В начале самые старые
                                </li>
                                <li
                                    class="select__list-item js-select-item">
                                    Сначала отрицательные
                                </li>
                                <li
                                    class="select__list-item js-select-item">
                                    Сначала положительные
                                </li>
                            </ul>
                        </div>
                    </form>
                -->
                    <div class="reviews__rating-wrap">
                        <ul class="reviews__rating-stars stars-list">
                            <?php
                            for ($i = 0; $i < 5; $i++) {
                            ?>
                                <?php
                                if ($i < ($rating - 1)) {
                                ?>
                                    <li
                                        class="stars-list__item stars-list__item_active">
                                        <svg class="stars-list__item-icon">
                                            <use
                                                xlink:href="./app/img/icons/icons.svg#star"></use>
                                        </svg>
                                    </li>
                                <?php
                                } else {
                                ?>
                                    <li
                                        class="stars-list__item">
                                        <svg class="stars-list__item-icon">
                                            <use
                                                xlink:href="./app/img/icons/icons.svg#star"></use>
                                        </svg>
                                    </li>
                                <?php
                                }
                                ?>
                            <?php
                            }
                            ?>
                        </ul>
                        <span class="reviews__rating-count"><?= $rating ?></span>
                        <div
                            class="reviews__rating-reviews-count reviews-count">
                            <span class="reviews-count__text">
                                Отзывов:
                            </span>
                            <span class="reviews-count__number">
                                <?= htmlspecialchars(count($reviews)) ?>
                            </span>
                        </div>
                    </div>
                    <ul class="reviews__list">
                        <?php foreach ($reviews as $review) {
                            $fio = htmlspecialchars(mb_substr($review['first_name'], 0, 1)) . htmlspecialchars(mb_substr($review['last_name'], 0, 1));
                        ?>
                            <li class="reviews__list-item reviews-item">
                                <div class="reviews-item__top">
                                    <div class="reviews-item__avatar">
                                        <?= htmlspecialchars($fio) ?>
                                    </div>
                                    <div class="reviews-item__info">
                                        <span class="reviews-item__name">
                                            <?= htmlspecialchars($review['first_name']) ?>
                                        </span>
                                        <ul
                                            class="reviews-item__stars stars-list">
                                            <?php
                                            for ($i = 0; $i < 5; $i++) {
                                            ?>
                                                <?php

                                                if ($i < (intval(htmlspecialchars($review['rating'])))) {
                                                ?>
                                                    <li
                                                        class="stars-list__item stars-list__item_active">
                                                        <svg
                                                            class="stars-list__item-icon">
                                                            <use
                                                                xlink:href="./app/img/icons/icons.svg#star"></use>
                                                        </svg>
                                                    </li>
                                                <?php
                                                } else {
                                                ?>
                                                    <li
                                                        class="stars-list__item">
                                                        <svg
                                                            class="stars-list__item-icon">
                                                            <use
                                                                xlink:href="./app/img/icons/icons.svg#star"></use>
                                                        </svg>
                                                    </li>
                                                <?php
                                                }
                                                ?>
                                            <?php
                                            }
                                            ?>
                                        </ul>
                                    </div>
                                </div>
                                <div class="reviews-item__descr">
                                    <p>
                                        <?= htmlspecialchars($review['review_text']) ?>
                                    </p>
                                </div>
                                <div class="reviews-item__bottom">
                                    <!--
                                    <button class="reviews-item__btn">
                                        <svg class="reviews-item__btn-icon">
                                            <use
                                                xlink:href="./app/img/icons/icons.svg#like"></use>
                                        </svg>
                                        <span
                                            class="reviews-item__btn-text">
                                            Полезно
                                        </span>
                                        <span
                                            class="reviews-item__btn-count">
                                            (1)
                                        </span>
                                    </button>
                                    -->
                                    <p class="reviews-item__data">
                                        <?= htmlspecialchars($review['created_at']) ?>
                                    </p>
                                </div>
                            </li>
                        <?php } ?>
                    </ul>
                    <!--
                    <button class="reviews__btn-more btn-inv">
                        Загрузить все отзывы:
                        <span class="btn-inv__text-count">14</span>
                    </button>
                    -->
            </div>

        <?php
                } else {
        ?>
            <p class="reviews__no-result">
                У этой компании пока что нет отзывов.
            </p>
        <?php
                }
        ?>
        </div>
    </div>
</section>

<!-- popup-reviews -->
<article
    id="popup-reviews"
    class="main-section__popup popup popup_reviews">
    <div class="popup__box js-popup-box">
        <button
            id="popup-reviews-close"
            aria-label="Закрыть всплывающие окно"
            class="popup__btn-close js-popup-close"></button>
        <?php
        if (!$isReview) {
        ?>
            <div id="popup-reviews-content" class="popup__content">

                <h3 class="popup__title">
                    Оставить отзыв
                    <span class="text-color">на компанию <?= htmlspecialchars($company['name']) ?></span>
                </h3>
                <form id="form-review" class="popup__form" method="post">
                    <div class="popup__form-rating form-rating">
                        <input
                            id="company-name"
                            class="form-rating__input"
                            name="company-name"
                            type="hidden"
                            value="<?= htmlspecialchars($company['name']) ?>" />
                        <input
                            id="rating-value"
                            class="form-rating__input"
                            name="rating-review"
                            type="hidden"
                            value="5" />
                        <div class="form-rating__img-wrap">
                            <img
                                class="form-rating__img"
                                alt="Фотография профиля"
                                data-src="./app/img/projects/img-profile-big-1.jpg" />
                        </div>

                        <div class="form-rating__list-wrap">
                            <h4 class="form-rating__title">
                                Архитектурное бюро «ArtWind»
                            </h4>
                            <ul
                                id="rating-review"
                                class="form-rating__list">
                                <li
                                    class="form-rating__list-item js-review-star"
                                    data-value="5">
                                    &#9733;
                                </li>
                                <li
                                    class="form-rating__list-item js-review-star"
                                    data-value="4">
                                    &#9733;
                                </li>
                                <li
                                    class="form-rating__list-item js-review-star"
                                    data-value="3">
                                    &#9733;
                                </li>
                                <li
                                    class="form-rating__list-item js-review-star"
                                    data-value="2">
                                    &#9733;
                                </li>
                                <li
                                    class="form-rating__list-item js-review-star"
                                    data-value="1">
                                    &#9733;
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="popup__form-label-wrap form-field-wrap">
                        <label
                            for="first-name"
                            class="popup__form-label form-field-inv">
                            <span class="form-field-inv__text">Имя</span>
                            <input
                                id="first-name"
                                class="form-field-inv__input"
                                type="text"
                                name="first-name"
                                placeholder="Имя"
                                required />
                        </label>
                        <label
                            for="last-name"
                            class="popup__form-label form-field-inv">
                            <span class="form-field-inv__text">
                                Фамилия
                            </span>
                            <input
                                id="last-name"
                                class="form-field-inv__input"
                                type="text"
                                name="last-name"
                                placeholder="Фамилия"
                                required />
                        </label>
                    </div>
                    <label
                        for="email"
                        class="popup__form-label form-field-inv">
                        <span class="form-field-inv__text">E-mail</span>
                        <input
                            id="email"
                            class="form-field-inv__input"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            required />
                    </label>
                    <label
                        for="comment"
                        class="popup__form-label form-field-inv">
                        <span class="form-field-inv__text">
                            Текст отзыва
                        </span>
                        <textarea
                            id="comment"
                            class="form-field-inv__textarea"
                            name="comment"
                            placeholder="Текст отзыва" required></textarea>
                    </label>
                    <!-- Скрытое поле для honeypot -->
                    <input id="honeypot" type="text" name="honeypot" style="display: none;" autocomplete="off">

                    <!-- Поле с временной меткой -->
                    <input id="form-start-time" type="hidden" name="form_start_time" value="<?= time(); ?>">

                    <button id="btn-submit" class="popup__form-btn btn" type="submit">
                        Оставить отзыв
                    </button>
                </form>
            </div>
        <?php
        } else {
        ?>
            <div id="popup-reviews-content" class="popup__content">
                <h3 class="popup__title">
                    <span class="popup__title-color text-color">Спасибо </span>за отзыв!
                </h3>
                <p class="popup__text">
                    <span class="popup__title-color text-color">Вы уже оставили отзыв.</span> Если он не отображается, значит, он находится на стадии модерации.
                </p>
            </div>
        <?php
        }
        ?>
    </div>
</article>