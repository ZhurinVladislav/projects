<?php
require_once 'parts/head.php';
require_once 'parts/header.php';
?>

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
                    <a class="breadcrumb-list__item-link" href="/rating">
                        Рейтинг услуг в Краснодарском крае
                    </a>
                </li>
                <li class="breadcrumb-list__item">
                    <span
                        class="breadcrumb-list__item-link breadcrumb-list__item-link_nolink">
                        <?= htmlspecialchars($page_title); ?> в Краснодарском крае
                    </span>
                </li>
            </ul>
        </div>
    </div>

    <section class="main-section__services services-inner">
        <div class="services-inner__container container">
            <h2 class="services-inner__title h-2">
                <?= htmlspecialchars($page_title); ?> в
                <span class="services-inner__title-color text-color">
                    Краснодарском крае
                </span>
            </h2>
            <ul class="services-inner__list links-list">
                <?php foreach ($servicesList as $service): ?>
                    <li class="links-list__item">
                        <button
                            class="links-list__item-link link-list js-filter-link"
                            data-filter-item="<?= htmlspecialchars($service['name']); ?>"
                            aria-label="Выбрать фильтр по <?= htmlspecialchars($service['name']); ?>">
                            <span class="link-list__text">
                                <?= htmlspecialchars($service['name']); ?>
                            </span>
                        </button>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>

    <section class="main-section__filter section-filter section-inner">
        <div class="section-filter__container container">
            <div class="section-filter__main-wrap js-filter-container">
                <ul class="section-filter__filters js-filter-wrap" style="margin-top: 0;">
                    <li class="section-filter__filter filter">
                        <button class="filter__btn js-filter-btn">
                            <span class="filter__btn-text">
                                Виды работ
                            </span>
                            <svg class="filter__btn-icon">
                                <use
                                    xlink:href="./app/img/icons/icons.svg#arrow"></use>
                            </svg>
                        </button>
                        <div
                            class="filter__list-wrap js-filter-content">
                            <ul class="filter__list filter-list">
                                <?php foreach ($servicesList as $service): ?>
                                    <li class="filter-list__item">
                                        <label
                                            class="feedback-form__label custom-checkbox">
                                            <input
                                                type="checkbox"
                                                class="custom-checkbox__input"
                                                data-filter-type="<?= htmlspecialchars($service['name']); ?>">
                                            <span
                                                class="custom-checkbox__text">
                                                <?= htmlspecialchars($service['name']); ?>
                                            </span>
                                        </label>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </li>
                    <li class="section-filter__filter filter">
                        <button class="filter__btn js-filter-btn">
                            <span class="filter__btn-text">Рейтинг</span>
                            <svg class="filter__btn-icon">
                                <use
                                    xlink:href="./app/img/icons/icons.svg#arrow"></use>
                            </svg>
                        </button>
                        <div
                            class="filter__list-wrap js-filter-content">
                            <ul class="filter__list filter-list">
                                <li class="filter-list__item">
                                    <label
                                        class="feedback-form__label custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-checkbox__input js-filter-rating"
                                            data-filter-rating="5"
                                            name="choice" />
                                        <ul
                                            class="custom-checkbox__list stars-list">
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                        </ul>
                                    </label>
                                </li>
                                <li class="filter-list__item">
                                    <label
                                        class="feedback-form__label custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-checkbox__input js-filter-rating"
                                            data-filter-rating="4"
                                            name="choice" />
                                        <ul
                                            class="custom-checkbox__list stars-list">
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                        </ul>
                                    </label>
                                </li>
                                <li class="filter-list__item">
                                    <label
                                        class="feedback-form__label custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-checkbox__input js-filter-rating"
                                            data-filter-rating="3"
                                            name="choice" />
                                        <ul
                                            class="custom-checkbox__list stars-list">
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item stars-list__item_active">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                            <li
                                                class="stars-list__item">
                                                <svg
                                                    class="stars-list__item-icon">
                                                    <use
                                                        xlink:href="./app/img/icons/icons.svg#star"></use>
                                                </svg>
                                            </li>
                                        </ul>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div class="section-filter__result filter-results">
                    <ul class="filter-results__filters-list filters-list js-filter-tags"></ul>
                    <ul id="results-list" class="filter-result__list results-list">
                        <?php if (count($companiesList) > 0): ?>
                            <?php foreach ($companiesList as $company) {
                                $phone = $companyObj->getLastPhones($company['id']);
                                // $rating = $companyObj->getRating($company['id']);
                                $reviews = $companyObj->getReviews($company['id']);
                            ?>
                                <li class="results-list__item card">
                                    <a
                                        class="card__link-wrap"
                                        href="<?= htmlspecialchars($company['alias']); ?>"
                                        target="_blank"
                                        aria-label="Перейти на компанию <?= htmlspecialchars($company['name']); ?>"></a>
                                    <div class="card__img-wrap">
                                        <img
                                            class="card__img"
                                            data-src="./app/img/projects/<?= htmlspecialchars($company['img']) ?>"
                                            alt="<?= htmlspecialchars($company['name']); ?>">
                                    </div>
                                    <div class="card__content">
                                        <div class="card__info card-info">
                                            <div
                                                class="card-info__title-wrap card-heading">
                                                <img
                                                    class="card-heading__img"
                                                    data-src="./app/img/projects/<?= htmlspecialchars($company['logo']) ?>"
                                                    alt="Логотип <?= htmlspecialchars($company['name']) ?>" />
                                                <h3 class="card-heading__title">
                                                    Архитектурное бюро «<?= htmlspecialchars($company['name']) ?>»
                                                </h3>
                                            </div>

                                            <ul
                                                class="card-info__list text-list">
                                                <li
                                                    class="text-list__item text-info">
                                                    <span
                                                        class="text-info__title text-color">
                                                        Сайт:
                                                    </span>
                                                    <a
                                                        class="text-info__link text-link"
                                                        href="http://<?= htmlspecialchars($company['site_url']) ?>"
                                                        aria-label="Перейти на сайт архитекторов <?= htmlspecialchars($company['name']) ?>">
                                                        <?= htmlspecialchars($company['site_url']) ?>
                                                    </a>
                                                </li>
                                                <li
                                                    class="text-list__item text-info">
                                                    <span
                                                        class="text-info__title text-color">
                                                        Город:
                                                    </span>
                                                    <span
                                                        class="text-info__descr">
                                                        <?= htmlspecialchars($company['address']) ?>
                                                    </span>
                                                </li>
                                                <li
                                                    class="text-list__item text-info">
                                                    <span
                                                        class="text-info__title text-color">
                                                        Опыт работы:
                                                    </span>
                                                    <span
                                                        class="text-info__descr">
                                                        <?= htmlspecialchars($company['experience']) ?> лет
                                                    </span>
                                                </li>
                                            </ul>
                                            <div
                                                class="card-info__descr js-more-wrap text-more"
                                                data-max-lines="4">
                                                <div
                                                    class="text-more__content js-more-text text-default">
                                                    <p>
                                                        <?= htmlspecialchars($company['intro_text']) ?>
                                                    </p>
                                                </div>
                                                <button
                                                    class="text-more__btn btn-text js-btn-more"
                                                    style="display: none;">
                                                    <span
                                                        class="btn-text__text js-btn-text">
                                                        Читать полностью
                                                    </span>
                                                    <svg class="btn-text__icon">
                                                        <use
                                                            xlink:href="./app/img/icons/icons.svg#arrow"></use>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card__feedback">
                                            <div
                                                class="card__feedback-reviews reviews-info">
                                                <div
                                                    class="reviews-info__rating">
                                                    <span
                                                        class="reviews-info__rating-star-count">
                                                        <?= htmlspecialchars(round($company['rating'], 1)) ?>
                                                    </span>
                                                    <ul
                                                        class="creviews-info__rating-stars stars-list">
                                                        <?php
                                                        for ($i = 0; $i < 5; $i++) {
                                                        ?>
                                                            <?php
                                                            if ($i < ($company['rating'] - 1)) {
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
                                                <div
                                                    class="reviews-info__counts">
                                                    <span
                                                        class="reviews-info__counts-num text-color">
                                                        <?= count($reviews) ?>
                                                    </span>
                                                    <?= normalizeStringCount(count($reviews), $WORDS_REVIEWS) ?>
                                                </div>
                                            </div>
                                            <div class="card__feedback-links">
                                                <?php if (!empty($phone)): ?>
                                                    <a
                                                        class="card__feedback-link link"
                                                        href="tel:<?php echo $phone; ?>"
                                                        aria-label="Позвонить по номеру <?php echo $phone; ?>">
                                                        <?php echo $phone; ?>
                                                    </a>
                                                <?php endif; ?>
                                                <a
                                                    class="card__feedback-link link-inv"
                                                    href="<?= htmlspecialchars($company['alias']); ?>"
                                                    target="_blank"
                                                    aria-label="Перейти на страницу подробнее о проекте">
                                                    Подробнее
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </li>
                            <?php
                            }
                            ?>
                        <?php else: ?>
                            <li>Отсутствуют компании с данными фильтрами</li>
                        <?php endif ?>
                    </ul>
                    <div class="filter-results__text-wrap text-default">
                        <p class="filter-results__text">
                            Архитектурное бюро в&nbsp;Краснодарском
                            крае: 49&nbsp;компаний с&nbsp;контактами
                            дополнительной информацией. При выборе
                            архитектурного бюро вы&nbsp;можете
                            ознакомиться с&nbsp;отзывами клиентов,
                            которые уже воспользовались услугами
                            &laquo;Ландшафтное проектирование&raquo;
                            в&nbsp;данных архитектурных бюро
                            Краснодарского края
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<?php require_once 'parts/footer.php'; ?>