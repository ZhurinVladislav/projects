<?php
// load_view('templates/base/header', $template);
?>

<header id="header" class="home-page__header header">
    <div class="header__content-top header-top">
        <div class="header-top__container container">
            <div
                class="header-top__site-wrapper site-wrapper js-site-wrapper"
                tabindex="0"
                aria-label="Раскрыть список городов">
                <button class="site-wrapper__btn js-btn-site-toggle">
                    <svg class="site-wrapper__icon">
                        <use
                            xlink:href="./app/img/icons/icons.svg#mark"></use>
                    </svg>
                    <span class="site-wrapper__text">Краснодар</span>
                    <svg class="site-wrapper__icon-arrow">
                        <use
                            xlink:href="./app/img/icons/icons.svg#arrow"></use>
                    </svg>
                </button>
                <ul class="site-wrapper__list hidden js-list-site">
                    <li class="site-wrapper__list-item">
                        <a
                            href="#"
                            class="site-wrapper__list-link"
                            aria-label="Перейти на сайт Новороссийск">Новороссийск</a>
                    </li>
                    <li class="site-wrapper__list-item">
                        <a
                            href="#"
                            class="site-wrapper__list-link"
                            aria-label="Перейти на сайт Новороссийск">Сочи</a>
                    </li>
                    <li class="site-wrapper__list-item">
                        <a
                            href="#"
                            class="site-wrapper__list-link"
                            aria-label="Перейти на сайт Новороссийск">Санкт-Петербург</a>
                    </li>
                    <li class="site-wrapper__list-item">
                        <a
                            href="#"
                            class="site-wrapper__list-link"
                            aria-label="Перейти на сайт Новороссийск">Москва</a>
                    </li>
                </ul>
            </div>
            <a
                class="header-top__logo logo"
                href="/"
                aria-label="Перейти на главную страницу ArchiTop">
                <img
                    class="logo__img"
                    data-src="./app/img/logo.svg"
                    alt="Логотип ArchiTop"
                    title="ArchiTop" />
                <img
                    class="logo__img logo__img_active"
                    data-src="./app/img/logo-inv.svg"
                    alt="Логотип ArchiTop"
                    title="ArchiTop" />
            </a>

            <div class="header-top__feedback-wrap">
                <button
                    id="feedback-btn"
                    class="header-top__btn btn"
                    aria-label="Открыть блок для связи с нами">
                    <span class="btn__text btn__text_ph">
                        Связаться с&nbsp;нами
                    </span>
                </button>
                <ul
                    id="feedback-list"
                    class="header-top__feedback-list header-feedback">
                    <li class="header-feedback__item">
                        <a
                            class="header-feedback__item-link"
                            href="mailto:sales@sitename.ru"
                            aria-label="Написать нам на почту sales@sitename.ru">
                            sales@sitename.ru
                        </a>
                    </li>
                    <!-- <li class="header-feedback__item">
                        <a
                            class="header-feedback__item-link"
                            href="tel:+79997778866"
                            aria-label="Позвонить нам +7 (999) 777-88-66">
                            +7 (999) 777-88-66
                        </a>
                    </li> -->
                </ul>
            </div>

            <button
                id="burger-toggle"
                class="header-top__menu-toggle menu-toggle"
                aria-label="Открыть мобильное меню">
                <span class="menu-toggle__item"></span>
                <span class="menu-toggle__item"></span>
                <span class="menu-toggle__item"></span>
            </button>
        </div>
    </div>
    <div class="header__menu-container container">
        <nav class="header__menu header-menu">
            <ul class="header-menu__list">
                <li class="header-menu__list-item menu-active">
                    <a
                        class="header-menu__list-link"
                        href="./main"
                        data-href="main" data-template="main"
                        aria-label="Перейти в раздел рейтинг">
                        Главная
                    </a>
                </li>
                <li class="header-menu__list-item menu-active">
                    <a
                        class="header-menu__list-link"
                        href="./rating"
                        data-href="rating" data-template="main_external"
                        aria-label="Перейти в раздел рейтинг">
                        Рейтинг
                    </a>
                </li>
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link"
                        href="./about-us"
                        data-href="about-us" data-template="main_external"
                        aria-label="Перейти в раздел о проекте">
                        О проекте
                    </a>
                </li>
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link"
                        href="./news"
                        data-href="news" data-template="main_external"
                        aria-label="Перейти в раздел с новостями">
                        Новости
                    </a>
                </li>
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link"
                        href="./methodology"
                        data-href="methodology" data-template="main_external"
                        aria-label="Перейти в раздел методики">
                        Методика
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <!-- MENU-MOBILE -->
    <div id="menu-mobile" class="header__menu-mobile menu-mobile">
        <div
            class="menu-mobile__site-wrapper site-wrapper js-site-wrapper"
            tabindex="0"
            aria-label="Раскрыть список городов">
            <button class="site-wrapper__btn js-btn-site-toggle">
                <svg class="site-wrapper__icon">
                    <use
                        xlink:href="./app/img/icons/icons.svg#mark"></use>
                </svg>
                <span class="site-wrapper__text">Краснодар</span>
                <svg class="site-wrapper__icon-arrow">
                    <use
                        xlink:href="./app/img/icons/icons.svg#arrow"></use>
                </svg>
            </button>
            <ul class="site-wrapper__list hidden js-list-site">
                <li class="site-wrapper__list-item">
                    <a
                        href="#"
                        class="site-wrapper__list-link"
                        aria-label="Перейти на сайт Новороссийск">Новороссийск</a>
                </li>
                <li class="site-wrapper__list-item">
                    <a
                        href="#"
                        class="site-wrapper__list-link"
                        aria-label="Перейти на сайт Новороссийск">Сочи</a>
                </li>
                <li class="site-wrapper__list-item">
                    <a
                        href="#"
                        class="site-wrapper__list-link"
                        aria-label="Перейти на сайт Новороссийск">Санкт-Петербург</a>
                </li>
                <li class="site-wrapper__list-item">
                    <a
                        href="#"
                        class="site-wrapper__list-link"
                        aria-label="Перейти на сайт Новороссийск">Москва</a>
                </li>
            </ul>
        </div>
        <div class="menu-mobile__wrap">
            <nav class="menu-mobile__menu">
                <ul class="menu-mobile__menu-list menu-mobile-list">
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link"
                            href="./main"
                            data-href="main" data-template="main"
                            aria-label="Перейти в раздел рейтинг">
                            Главная
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link"
                            href="./rating"
                            data-href="rating" data-template="main_external"
                            aria-label="Перейти в раздел рейтинг">
                            Рейтинг
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link"
                            href="./about-us"
                            data-href="about-us" data-template="main_external"
                            aria-label="Перейти в раздел о проекте">
                            О проекте
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link"
                            href="./news"
                            data-href="news" data-template="main_external"
                            aria-label="Перейти в раздел с новостями">
                            Новости
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link"
                            href="./methodology"
                            data-href="methodology" data-template="main_external"
                            aria-label="Перейти в раздел методики">
                            Методика
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>

<div id="main" class="main">
    <div class="main__content" id="main-placeholder">
        <main id="main-block" class="home-page__main main-section">
            <?php
            if (isset($content_path)) {
                require $content_path;
            }
            ?>
            <!-- POPUP -->
            <!--
            <div id="popup-feedback" class="main-section__popup popup">
                <div class="popup__box js-popup-box">
                    <button
                        aria-label="Закрыть всплывающие окно"
                        class="popup__btn-close js-popup-close"></button>
                    <h3 class="popup__title">Связаться с нами</h3>
                    <form class="popup__form">
                        <label
                            for="e-mail"
                            class="popup__form-label form-field form-field_inv">
                            <input
                                id="e-mail"
                                class="form-field__input"
                                type="email"
                                placeholder="E-mail"
                                required />
                            <svg class="form-field__icon">
                                <use
                                    xlink:href="/app/img/icons/icons.svg#email"></use>
                            </svg>
                        </label>
                        <label
                            for="phone"
                            class="popup__form-label form-field form-field_inv">
                            <input
                                id="phone"
                                class="form-field__input"
                                type="text"
                                placeholder="Телефон"
                                required />
                            <svg class="form-field__icon">
                                <use
                                    xlink:href="/app/img/icons/icons.svg#phone"></use>
                            </svg>
                        </label>
                        <button class="popup__form-btn btn">Отправить</button>
                    </form>
                </div>
            </div>
            -->
        </main>
    </div>
</div>


<?php
load_view('templates/base/footer', $template);
?>