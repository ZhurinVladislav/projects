<footer class="footer">
    <div class="container">
        <div class="content">
            <a href="/" class="logo">
                <img
                    src="/app/img/logo-footer.svg"
                    alt="Логотип GetRealt">
            </a>

            <nav class="menu">
                <ul class="menu-list">
                    <li class="menu-item">
                        <a
                            class="<?= $currentPage == 'main' ? ' active' : '' ?>"
                            href="/">
                            Главная
                        </a>
                    </li>
                    <li class="menu-item">
                        <a
                            class="<?= $currentPage == 'about-us' ? ' active' : '' ?>" href="/about-us">
                            О проекте
                        </a>
                    </li>
                    <li class="menu-item">
                        <a
                            class="<?= $currentPage == 'methodology' ? ' active' : '' ?>"
                            href="/methodology">
                            Методика
                        </a>
                    </li>
                    <li class="menu-item">
                        <a
                            class="<?= $currentPage == 'news' ? ' active' : '' ?>"
                            href="/news">
                            Блог
                        </a>
                    </li>
                    <li class="menu-item">
                        <a
                            class="<?= $currentPage == 'agencies' ? ' active' : '' ?>"
                            href="/agencies">Агентства недвижимости</a>
                    </li>
                </ul>
            </nav>

            <div class="block">
                <div class="block-title">Реклама и сотрудничество</div>
                <a class="block-link" href="mailto:sales@sitename.ru">sales@sitename.ru</a>
            </div>
        </div>
    </div>
</footer>

<div class="copyright">
    <div class="container">
        <div class="content">
            <div class="text">Все права защищены © <?= date('Y'); ?></div>
            <a class="text" href="/user-agreement">Пользовательское соглашение</a>
            <a class="text" href="https://web2.agency/">
                <svg
                    width="47"
                    height="20"
                    viewBox="0 0 47 20"
                    fill="none">
                    <path
                        d="M15.0785 1.70935L12.4585 18.5381L12.6902 19.8915H9.28593L9.51763 18.5381L7.8066 7.94221L6.14903 18.5381L6.38073 19.8915H3.01213L3.24384 18.5381L0.570345 1.74497L0 0.0175781H3.08343L2.90519 0.854562L4.68752 12.9997L6.46985 0.854562L6.25597 0.0175781H9.37504L9.16116 0.854562L10.9613 12.9997L12.7436 0.854562L12.5298 0.0175781H15.6488L15.0785 1.70935Z" />
                    <path
                        d="M25.3273 19.8917H17.8594L18.1802 18.663V1.21095L17.8594 0H25.3273L25.7729 2.74246L24.4896 2.45753H20.925L20.6398 2.74246V8.38764L20.925 8.67257H21.9231L23.1529 8.35203V11.4685L21.9231 11.1479H20.925L20.6398 11.4685V17.0958L20.925 17.3808H24.4896L25.7729 17.0958L25.3273 19.8917Z" />
                    <path
                        d="M28.4263 1.21095L28.1055 0H34.6288L35.8942 1.22876V8.69038L34.611 9.91915L35.8942 11.1835V18.663L34.6288 19.8917H28.1233L28.4441 18.663V1.21095H28.4263ZM30.9215 2.74246V8.38764L31.2067 8.67257H33.1138L33.399 8.38764V2.74246L33.1138 2.45753H31.2067L30.9215 2.74246ZM33.4168 11.4685L33.1316 11.1835H31.2245L30.9394 11.4685V17.0958L31.2245 17.3808H33.1138L33.399 17.0958V11.4685H33.4168Z" />
                    <path
                        d="M47.0002 14.9232L46.6794 16.1342V19.9095H39.2114V9.93696L40.4413 8.70819H43.899L44.1841 8.42326V2.79588L43.899 2.51095H41.9562L41.6711 2.79588V3.75752L42.0097 4.96848H38.8906L39.2114 3.75752V1.26438L40.4413 0H45.4139L46.6794 1.26438V9.95476L45.4139 11.2191H41.9562L41.6711 11.5041V17.0958L41.9562 17.3808H43.899L44.1841 17.0958V16.1342L43.8633 14.9232H47.0002Z" />
                </svg>
                Создание сайтов
            </a>
        </div>
    </div>
</div>

<div class="overlay">
    <div class="overlay__wrapper">
        <div class="overlay__bg"></div>
        <div class="overlay__content">
            <a class="overlay__close"></a>

            <form
                action="/"
                method="post"
                class="form form-callback novalid">
                <input type="hidden" name="count" value="0" />
                <h3 class="header_2">Заказать звонок</h3>

                <div class="form-item">
                    <input type="text" name="name" placeholder="имя">
                </div>
                <div class="form-item">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="телефон">
                </div>
                <div class="form-item">
                    <textarea
                        name="comment"
                        id=""
                        placeholder="комментарий"></textarea>
                </div>
                <button class="button">Отправить</button>
                <label class="form-note">
                    <input type="checkbox" checked />
                    <div class="custom-checkbox"></div>
                    <div class="form-note-text">
                        Принимаю условия <a href="#">Соглашения</a> на
                        обработку <br />персональных данных
                    </div>
                </label>
            </form>

            <div class="form-citys">
                <h3 class="header_2">Выберите город</h3>
                <ul class="form-citys__list">
                    <li class="form-citys__item">
                        <a href="#" class="form-citys__link">Сочи</a>
                    </li>
                    <li class="form-citys__item">
                        <a href="#" class="form-citys__link">Новороссийск</a>
                    </li>
                </ul>
            </div>

            <div class="form-success">
                <div class="header_2">Спасибо!</div>
                <div class="text">Ваши данные отправлены.</div>
            </div>
        </div>
    </div>
</div>

<button class="scroll-top">
    <svg viewBox="0 0 7 12">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.435313 6.07396L5.76031 0.749961L6.82031 1.80996L2.56331 6.06796L6.81731 10.268L5.76331 11.335L0.435313 6.07396Z" />
    </svg>
</button>

<script src="./app/js/libs/jquery-3.7.1.min.js"></script>
<script src="./app/js/libs/lightgallery-all.min.js"></script>
<script src="./app/js/libs/owl.carousel.min.js"></script>
<script src="./app/js/main.js"></script>
<script src="./app/js/index.js"></script>
</body>

</html>