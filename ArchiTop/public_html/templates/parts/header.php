<?php
$current_page = $_GET['q'] ?? 'main'; // Определяем текущую страницу
?>

<header id="header" class="header">
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
                            href="/"
                            class="site-wrapper__list-link"
                            aria-label="Перейти на сайт Новороссийск">Новороссийск</a>
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
            <!-- class="js-popup-open" data-open-popup="popup-feedback" -->
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
                    <li class="header-feedback__item">
                        <a
                            class="header-feedback__item-link"
                            href="tel:+79997778866"
                            aria-label="Позвонить нам +7 (999) 777-88-66">
                            +7 (999) 777-88-66
                        </a>
                    </li>
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
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link<?= $current_page == 'main' ? ' active' : '' ?>"
                        href="/"
                        aria-label="Перейти в раздел Рейтинг">
                        Главная
                    </a>
                </li>
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link<?= $current_page == 'rating' ? ' active' : '' ?>"
                        href="./rating"
                        aria-label="Перейти в раздел Рейтинг">
                        Рейтинг
                    </a>
                </li>
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link<?= $current_page == 'about-us' ? ' active' : '' ?>"
                        href="./about-us"
                        aria-label="Перейти в раздел О проекте">
                        О проекте
                    </a>
                </li>
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link<?= $current_page == 'news' ? ' active' : '' ?>"
                        href="./news"
                        aria-label="Перейти в раздел Новости">
                        Новости
                    </a>
                </li>
                <li class="header-menu__list-item">
                    <a
                        class="header-menu__list-link<?= $current_page == 'methodology' ? ' active' : '' ?>"
                        href="./methodology"
                        aria-label="Перейти в раздел Методика">
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
                        href="/"
                        class="site-wrapper__list-link"
                        aria-label="Перейти на сайт Новороссийск">Новороссийск</a>
                </li>
            </ul>
        </div>
        <!--
                <div class="menu-mobile__feedback-wrap">
                    <button
                        id="feedback-btn"
                        class="menu-mobile__btn btn"
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
                        <li class="header-feedback__item">
                            <a
                                class="header-feedback__item-link"
                                href="tel:+79997778866"
                                aria-label="Позвонить нам +7 (999) 777-88-66">
                                +7 (999) 777-88-66
                            </a>
                        </li>
                    </ul>
                </div>
                -->
        <div class="menu-mobile__wrap">
            <nav class="menu-mobile__menu">
                <ul class="menu-mobile__menu-list menu-mobile-list">
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link<?= $current_page == 'main' ? ' active' : '' ?>"
                            href="/"
                            aria-label="Перейти в раздел рейтинг">
                            Главная
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link<?= $current_page == 'rating' ? ' active' : '' ?>"
                            href="./rating"
                            aria-label="Перейти в раздел рейтинг">
                            Рейтинг
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link<?= $current_page == 'about-us' ? ' active' : '' ?>"
                            href="./about-us"
                            aria-label="Перейти в раздел о проекте">
                            О проекте
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link<?= $current_page == 'news' ? ' active' : '' ?>"
                            href="./news"
                            aria-label="Перейти в раздел с новостями">
                            Новости
                        </a>
                    </li>
                    <li class="menu-mobile-list__item">
                        <a
                            class="menu-mobile-list__link<?= $current_page == 'methodology' ? ' active' : '' ?>"
                            href="./methodology"
                            aria-label="Перейти в раздел методики">
                            Методика
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>


<!-- <header>
    <nav>
        <ul>
            <li><a href="/" class="<?= $current_page == 'main' ? 'active' : '' ?>">Главная</a></li>
            <li><a href="/about" class="<?= $current_page == 'about' ? 'active' : '' ?>">О нас</a></li>
            <li><a href="/contacts" class="<?= $current_page == 'contacts' ? 'active' : '' ?>">Контакты</a></li>
        </ul>
    </nav>
</header> -->