<header class="header">
    <div class="header-city">
        <div class="container">
            <div class="content">
                <div class="cf-city">
                    <a href="#" class="cf-city-link">
                        <svg
                            class="cf-city-link__icon"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none">
                            <path
                                d="M0.693212 6.96015L0.665635 6.33437L15.5962 0.596194L9.85802 15.5268L9.23223 15.4992L6.78494 9.40745L0.693212 6.96015ZM2.62927 6.63347L7.57902 8.61337L9.55892 13.5631L13.8723 2.32012L2.62927 6.63347Z" />
                        </svg>
                        <span class="cf-city-link__text">Cочи</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="header-top">
        <div class="container">
            <div class="content">
                <a href="/" class="logo">
                    <img src="./app/img/logo.png" alt="Логотип GetRealt">
                </a>

                <ul class="menu-list">
                    <li class="menu-item active">
                        <a class="menu-link<?= $currentPage == 'main' ? ' active' : '' ?>" href="/">
                            Главная
                        </a>
                    </li>
                    <li class="menu-item parent">
                        <a
                            class="menu-link<?= $currentPage == 'about-us' ? ' active' : '' ?>"
                            href="/about-us">
                            О проекте
                        </a>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link<?= $currentPage == 'agencies' ? ' active' : '' ?>" href="/agencies">
                            Агентства недвижимости
                        </a>
                    </li>
                    <li class="menu-item">
                        <a
                            class="menu-link<?= $currentPage == 'news' ? ' active' : '' ?>"
                            href="/news">
                            Блог
                        </a>
                    </li>
                    <li class="menu-item">
                        <a
                            class="menu-link<?= $currentPage == 'methodology' ? ' active' : '' ?>"
                            href="/methodology">
                            Методика
                        </a>
                    </li>
                </ul>

                <div class="header-feedback">
                    <button class="header-feedback__button button">
                        Связаться с нами
                    </button>
                    <div class="header-feedback__spoller">
                        <div class="header-feedback__list">
                            <a
                                href="tel:+78009008080"
                                class="header-feedback__item">+78009008080
                            </a>
                            <a
                                href="mailto:sales@sitename.ru"
                                class="header-feedback__item">
                                sales@sitename.ru
                            </a>
                        </div>
                    </div>
                </div>

                <button class="menu__toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </div>

    <div class="menu-mobile">
        <div class="wrap">
            <ul class="menu-list">
                <li class="menu-item active">
                    <a class="menu-link<?= $currentPage == 'main' ? ' active' : '' ?>" href="/">
                        Главная
                    </a>
                </li>
                <li class="menu-item parent">
                    <a
                        class="menu-link<?= $currentPage == 'about-us' ? ' active' : '' ?>"
                        href="/about-us">
                        О проекте
                    </a>
                </li>
                <li class="menu-item">
                    <a class="menu-link<?= $currentPage == 'agencies' ? ' active' : '' ?>" href="/agencies">
                        Агентства недвижимости
                    </a>
                </li>
                <li class="menu-item">
                    <a
                        class="menu-link<?= $currentPage == 'news' ? ' active' : '' ?>"
                        href="/news">
                        Блог
                    </a>
                </li>
                <li class="menu-item">
                    <a
                        class="menu-link<?= $currentPage == 'methodology' ? ' active' : '' ?>"
                        href="/methodology">
                        Методика
                    </a>
                </li>
            </ul>

            <button class="button" data-open="form-callback">
                Связаться с нами
            </button>
        </div>
    </div>
</header>