<footer class="home-page__footer footer">
    <div class="footer__container container">
        <div class="footer__content-top footer-top">
            <div class="footer-top__logo-wrap">
                <a
                    class="footer-top__logo logo"
                    href="/"
                    aria-label="Перейти на главную страницу ArchiTop">
                    <img
                        class="logo__img"
                        data-src="./app/img/logo-inv.svg"
                        alt="Логотип ArchiTop"
                        title="ArchiTop" />
                </a>
            </div>
            <nav class="footer-top__menu">
                <ul class="footer-top__menu-list footer-menu-list">
                    <li class="footer-menu-list__item">
                        <a
                            class="footer-menu-list__item-link"
                            href="./main"
                            data-href="main" data-template="main"
                            aria-label="Перейти на страницу рейтинга">
                            Главная
                        </a>
                    </li>
                    <li class="footer-menu-list__item">
                        <a
                            class="footer-menu-list__item-link"
                            href="./rating"
                            data-href="rating" data-template="main_external"
                            aria-label="Перейти на страницу рейтинга">
                            Рейтинг
                        </a>
                    </li>
                    <li class="footer-menu-list__item">
                        <a
                            class="footer-menu-list__item-link"
                            href="./about-us"
                            data-href="about-us" data-template="main_external"
                            aria-label="Перейти на страницу о проекте">
                            О проекте
                        </a>
                    </li>
                    <li class="footer-menu-list__item">
                        <a
                            class="footer-menu-list__item-link"
                            href="./news"
                            data-href="news" data-template="main_external"
                            aria-label="Перейти на страницу c новостями">
                            Новости
                        </a>
                    </li>
                    <li class="footer-menu-list__item">
                        <a
                            class="footer-menu-list__item-link"
                            href="./methodology"
                            data-href="methodology" data-template="main_external"
                            aria-label="Перейти на страницу методики">
                            Методика
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="footer__cooperation">
                <p class="footer__cooperation-desr">
                    Реклама и&nbsp;сотрудничество
                </p>
                <a
                    class="footer__cooperation-link link-text"
                    href="mailto:sales@sitename.ru"
                    aria-label="Написать на почту sales@sitename.ru"
                    target="_blank">
                    sales@sitename.ru
                </a>
            </div>
        </div>
        <div class="footer__bottom footer-bottom">
            <p class="footer-bottom__text">
                Все права защищены &copy;&nbsp;<?= date('Y'); ?>
            </p>
            <a
                class="footer-bottom__link link-text"
                href="./user-agreement"
                data-href="user-agreement"
                data-template="main_external">
                <span class="link-text__descr">
                    Пользовательское соглашение
                </span>
            </a>
            <a
                class="footer-bottom__link link-text link-web2"
                href="https://web2.agency/"
                target="_blank">
                <svg class="link-text__icon link-web2__icon">
                    <use
                        xlink:href="/app/img/icons/icons.svg#logo-dev"></use>
                </svg>
                <span class="link-text__descr"> Создание сайтов </span>
            </a>
        </div>
        <!--
        <div class="footer__content-bottom footer-bottom">
            <ul class="footer-bottom__list">
                <li class="footer-bottom__list-item">
                    <a
                        class="footer-bottom__list-item-link"
                        href="#"
                        aria-label="Перейти на страницу Пользовательское соглашение">
                        Пользовательское соглашение
                    </a>
                </li>
                <li class="footer-bottom__list-item">
                    <a
                        class="footer-bottom__list-item-link"
                        href="#"
                        aria-label="Перейти на страницу Обработка персональных данных">
                        Обработка персональных данных
                    </a>
                </li>
                <li class="footer-bottom__list-item">
                    <a
                        class="footer-bottom__list-item-link"
                        href="#"
                        aria-label="Перейти на страницу Политика конфиденциальности">
                        Политика конфиденциальности
                    </a>
                </li>
                <li class="footer-bottom__list-item">
                    <a
                        class="footer-bottom__list-item-link"
                        href="#"
                        aria-label="Перейти на страницу Карта сайта">
                        Карта сайта
                    </a>
                </li>
            </ul>
        </div>
        -->
    </div>
</footer>

<?php
load_view('templates/base/foot', $template);
?>