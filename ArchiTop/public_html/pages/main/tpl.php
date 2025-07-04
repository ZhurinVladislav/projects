<?php

global $pdo, $page_title, $page_description;

require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Company.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Rating.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/functions/getUserIP.php';
require_once  $_SERVER['DOCUMENT_ROOT'] . '/functions/normalizeStringCount.php';

$ratingObj = new Rating($pdo);
$companyObj = new Company($pdo);
$WORDS_REVIEWS = ['Отзыв', 'Отзыва', 'Отзывов'];
$WORDS_DIRECTIONS = ['направление', 'направления', 'направлений'];

$ipAddress = getUserIP();

$totalServices = $ratingObj->countServices();
$totalReviews = $companyObj->countReviews();
$totalCompanies = $companyObj->count();
$ratingList = $ratingObj->getList();

// Проверка, голосовал ли пользователь
$stmt = $pdo->prepare("SELECT * FROM user_votes WHERE ip_address = :ip");
$stmt->execute(['ip' => $ipAddress]);
$hasVoted = $stmt->fetch() !== false;

// Получение статистики голосования
$votes = $pdo->query("SELECT * FROM votes")->fetchAll(PDO::FETCH_ASSOC);

$page_title = "Архитектурные бюро Краснодарского края";
$page_description = "Рейтинг лучших, проверенных архитектурных компаний и проектных организаций с высокой экспертизой в отрасли";

?>

<section class="hero section-reset">
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
            <?php require_once $_SERVER['DOCUMENT_ROOT'] . '/templates/parts/search-form.php'; ?>
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
                    <?php echo htmlspecialchars($totalReviews); ?>
                </span>
                <p class="advantages-item__text">
                    <?= normalizeStringCount($totalReviews, $WORDS_REVIEWS) ?> от&nbsp;пользователей
                </p>
            </li>
            <li class="hero__advantages-item advantages-item">
                <span class="advantages-item__num">
                    <?php echo htmlspecialchars($totalServices); ?>
                </span>
                <p class="advantages-item__text">
                    Архитектурных <?= normalizeStringCount($totalServices, $WORDS_DIRECTIONS) ?>
                </p>
            </li>
        </ul>
    </div>
</section>

<section class="services section-reset">
    <div class="services__container container">
        <h2 class="services__title h-2">
            Услуги архитектурных бюро в&nbsp;<a href="./rating" class="services__title-color text-color">Краснодарском крае</a>
        </h2>
        <ul class="services__list links-list">
            <?php foreach ($ratingList as $rating): ?>
                <li class="links-list__item">
                    <a
                        class="links-list__item-link link-list"
                        href="<?= htmlspecialchars($rating['alias']); ?>"
                        aria-label="Перейти на страницу <?= htmlspecialchars($rating['title']); ?>">
                        <span class="link-list__text">
                            <?= htmlspecialchars($rating['name']); ?>
                        </span>
                        <span class="link-list__line"></span>
                        <span class="link-list__num">
                            <?= $rating['count']; ?>
                        </span>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>

<section class="best section-reset">
    <div class="best__container container">
        <h2 class="best__title-hidden text-hidden">
            Топ архитектурных бюро по версии architectop.ru
        </h2>
        <div class="best__content-wrap">
            <div class="best__content">
                <h3 class="best__title h-2">
                    Лучшие и&nbsp;проверенные архитектурные бюро
                    по&nbsp;версии architectop.ru
                </h3>
                <ul class="best__list best-list">
                    <li class="best-list__item">
                        В&nbsp;рейтинге наравне с&nbsp;крупными
                        архитектурными бюро участвуют
                        и&nbsp;перспективные талантливые архитекторы
                    </li>
                    <li class="best-list__item">
                        Мы&nbsp;формируем рейтинг на&nbsp;основе
                        исследований авторитетных архитектурных
                        изданий
                    </li>
                    <li class="best-list__item">
                        Часть новых и&nbsp;молодых архитектурных
                        студий из&nbsp;Краснодарского края будут
                        попадать в&nbsp;этот рейтинг на&nbsp;основе
                        их&nbsp;портфолио
                    </li>
                    <li class="best-list__item">
                        Также будет учитываться видимость компаний
                        и&nbsp;их&nbsp;цитируемость
                        в&nbsp;Интернете.
                    </li>
                </ul>
            </div>
            <div
                class="best__img"
                data-image="./app/img/best/bg-img.webp"></div>
        </div>
    </div>
</section>

<section class="rating section-reset">
    <div class="rating__container container">
        <h2 class="rating__title-hidden text-hidden">
            О нашем рейтинге архитектурных бюро
        </h2>
        <div class="rating__content-wrap">
            <div
                class="rating__icon rating__icon_left"
                data-image="./app/img/rating/icon-1.svg"></div>
            <p class="rating__text">
                <span class="rating__text-color text-color">
                    Ключевая особенность нашего рейтинга
                </span>
                &mdash; это компании или
                <span class="rating__text-color text-color">
                    архитектурные бюро, задающие тренды
                </span>
                в&nbsp;современной российской архитектуре
            </p>
            <div
                class="rating__icon rating__icon_right"
                data-image="./app/img/rating/icon-2.svg"></div>
        </div>
    </div>
</section>

<section class="feedback section-reset">
    <div class="feedback__container container">
        <div class="feedback__content-wrap">
            <div
                class="feedback__img"
                data-image="./app/img/feedback/img-1.png"></div>

            <div id="feedback-result" class="feedback__right">
                <?php if (!$hasVoted): ?>
                    <div class="feedback__form-wrap">
                        <h3 class="feedback__title h-2">
                            На&nbsp;что вы&nbsp;обращаете внимание при
                            выборе архитектурного бюро?
                        </h3>
                        <p class="feedback__text">
                            Отметьте один пункт, который на&nbsp;ваш
                            взгляд самый важный
                        </p>
                        <form
                            id="feedback-form"
                            class="feedback__form feedback-form" method="post">
                            <ul class="feedback-form__list">
                                <?php foreach ($votes as $vote): ?>
                                    <li class="feedback-form__list-item">
                                        <label
                                            class="feedback-form__label custom-radio">
                                            <input
                                                type="radio"
                                                class="custom-radio__input"
                                                value="<?= $vote['id'] ?>"
                                                name="vote" required />
                                            <span
                                                class="custom-radio__text">
                                                <?= htmlspecialchars($vote['option_name']) ?>
                                            </span>
                                        </label>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                            <button
                                class="feedback-form__btn btn"
                                type="submit"
                                aria-label="Отправить заявку">
                                Отравить
                            </button>
                        </form>
                    </div>
                <?php else: ?>
                    <div class="feedback__result">
                        <h3 class="feedback__title h-2">
                            На&nbsp;что больше всего обращают внимание
                            при выборе архитектурного бюро
                        </h3>
                        <p class="feedback__text">
                            Спасибо за&nbsp;ваше мнение!
                        </p>
                        <ul class="feedback__result-list">
                            <?php
                            $totalVotes = array_sum(array_column($votes, 'count'));
                            foreach ($votes as $vote):
                                $percentage = $totalVotes ? round($vote['count'] / $totalVotes * 100) : 0;
                            ?>
                                <li class="feedback__result-list-item feedback-result-item">
                                    <div class="feedback-result-item__left">
                                        <h4
                                            class="feedback-result-item__title">
                                            <?= htmlspecialchars($vote['option_name']) ?>
                                        </h4>
                                        <div
                                            class="feedback-result-item__line-wrap">
                                            <div
                                                class="feedback-result-item__line"
                                                style="width: <?= $percentage ?>%;"></div>
                                        </div>
                                    </div>
                                    <div
                                        class="feedback-result-item__stats">
                                        <svg
                                            class="feedback-result-item__stats-icon">
                                            <use
                                                xlink:href="./app/img/icons/icons.svg#men"></use>
                                        </svg>
                                        <p
                                            class="feedback-result-item__stats-text">
                                            <?= $vote['count'] ?> (<?= $percentage ?>%)
                                        </p>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>

                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

<section class="main-section__seo seo">
    <div class="seo__container container">
        <h2 class="seo__title h-2">
            Профессиональные архитекторы в&nbsp;городе Краснодар,
            Краснодарский край на&nbsp;architectop
        </h2>
        <div class="seo__content-wrap text-more js-more-wrap">
            <div class="text-more__content text-default">
                <p class="text-default__p">
                    На&nbsp;этой странице мы&nbsp;собрали для вас
                    лучших проверенных архитекторов
                    и&nbsp;архитектурные бюро в&nbsp;городе
                    Краснодар, Краснодарский край, которые помогут
                    вам создать проект дома вашей мечты.
                    Вы&nbsp;можете посмотреть портфолио
                    архитектурных проектов, список предоставляемых
                    услуг по&nbsp;архитектурному проектированию,
                    почитать отзывы реальных клиентов и&nbsp;выбрать
                    специалиста по&nbsp;душе.
                </p>
                <p class="text-default__p">
                    Если вы&nbsp;уже знаете, чего хотите, важно
                    найти специалиста, который поймет
                    и&nbsp;разделит ваше видение и&nbsp;поможет
                    воплотить его в&nbsp;жизнь. Если вы&nbsp;еще
                    не&nbsp;определились, какой дом вы&nbsp;хотите
                    построить или как изменить ваш дом,
                    архитектурные студии помогут вам найти идеальный
                    вариант. Чтобы путь от&nbsp;чертежа
                    на&nbsp;бумаге до&nbsp;уютного дома не&nbsp;был
                    долгим и&nbsp;тернистым, в&nbsp;деталях
                    представьте себе желаемое. Обращайте внимание
                    на&nbsp;понравившиеся примеры загородных домов,
                    цветовые и&nbsp;композиционные решения, дизайн
                    дверей, окон. В&nbsp;этом вам может помочь наш
                    раздел с&nbsp;Фото частных домов. Определитесь
                    с&nbsp;размером дома с&nbsp;учетом места
                    на&nbsp;участке под строительство
                    и&nbsp;возможного роста семьи.
                </p>
            </div>
            <div
                class="text-more__content text-more__content_more text-default js-more-text">
                <h2 class="text-default__h2">
                    Где искать архитектурное бюро для проекта?
                </h2>
                <p class="text-default__p">
                    Часто мы&nbsp;пытаемся найти кого-то через
                    знакомых, но&nbsp;этот вариант не&nbsp;всегда
                    является гарантией успеха. Если вашему другу
                    нравятся дома в&nbsp;современном стиле,
                    а&nbsp;вам, например, в&nbsp;стиле шале, процесс
                    работы с&nbsp;архитектором может существенно
                    отличаться. Поэтому лучше искать специалиста
                    на&nbsp;Houzz, где есть большой выбор
                    архитекторов в&nbsp;городе Краснодар,
                    Краснодарский край с&nbsp;портфолио
                    и&nbsp;отзывами.
                </p>
                <p class="text-default__p">
                    Если перед вами стоит выбор&nbsp;&mdash;
                    обратиться в&nbsp;архитектурное бюро или
                    к&nbsp;частному архитектору, имейте в&nbsp;виду,
                    что бюро может дать больше гарантий качественной
                    работы, но&nbsp;свободный специалист предоставит
                    более персональный подход и&nbsp;плотное
                    взаимодействие. Обсуждая проект, старайтесь
                    максимально четко объяснить, какого результата
                    вы&nbsp;хотите добиться, будьте дружелюбны
                    и&nbsp;внимательны. Чтобы сотрудничество стало
                    наиболее плодотворным, а&nbsp;результат, как
                    минимум, не&nbsp;разочаровал, попробуйте
                    научиться понимать чертежи и&nbsp;основную
                    терминологию.
                </p>
                <h2 class="text-default__h2">
                    На&nbsp;что следует обращать внимание при выборе
                    архитектора?
                </h2>
                <p class="text-default__p">
                    Если вы&nbsp;располагаете соответствующим
                    бюджетом на&nbsp;архитектурное проектирование,
                    обратите внимание на&nbsp;следующие детали:
                </p>
                <p class="text-default__p">
                    Образование. Частный специалист должен быть
                    архитектором по&nbsp;диплому (не&nbsp;дизайнером
                    и&nbsp;не&nbsp;&laquo;любителем&raquo;,
                    овладевшим чертежной программой).
                </p>
                <p class="text-default__p">
                    Портфолио и&nbsp;практический опыт. Хорошо, если
                    в&nbsp;портфолио архитектора не&nbsp;только
                    чертежи, планы и&nbsp;визуализации, а&nbsp;фото
                    реальных построенных домов. Узнайте, сколько
                    времени занял тот или иной заказ. Если
                    в&nbsp;портфолио есть нереализованные работы,
                    узнайте, что помешало их&nbsp;завершению. Общая
                    стилистика работ будет прослеживаться
                    в&nbsp;работах и&nbsp;поможет понять,
                    близка&nbsp;ли она Вам и&nbsp;задумке будущего
                    дома.
                </p>
                <p class="text-default__p">
                    Перечень предоставляемых услуг и&nbsp;состав
                    проекта. Необходимо заранее определиться,
                    нужен&nbsp;ли вам дизайн интерьера дома, или
                    вы&nbsp;хотите только архитектурный проект,
                    включены&nbsp;ли услуги авторского надзора,
                    подбора материалов. У&nbsp;многих архитектурных
                    бюро в&nbsp;городе Краснодар, Краснодарский край
                    есть свои дизайнеры и&nbsp;строительные бригады.
                    Попросите пример выполненного проекта,
                    рассмотрите его наполненность. Если вы&nbsp;уже
                    знаете, кто будет строить Ваш дом, покажите
                    такой пример прорабу, пусть он&nbsp;скажет,
                    достаточно&nbsp;ли в&nbsp;нем информации.
                </p>
                <h2 class="text-default__h2">
                    Сколько времени займет поиск хорошего
                    архитектора или архитектурного бюро?
                </h2>
                <p class="text-default__p">
                    Подойдите к&nbsp;выбору специалиста
                    ответственно, ведь если
                    вы&nbsp;не&nbsp;удовлетворены результатом,
                    исправить положение будет не&nbsp;так-то легко.
                    Поиск хорошего специалиста требует времени
                    и&nbsp;терпения. Изучайте портфолио экспертов
                    и&nbsp;не&nbsp;останавливайтесь на&nbsp;первом
                    попавшемся вам бюро. Помните&nbsp;&mdash; все
                    познается в&nbsp;сравнении, чем больше
                    архитектурных проектов и&nbsp;готовых работ
                    вы&nbsp;изучите, тем лучше у&nbsp;вас будет
                    представление о&nbsp;том, что вам нравится,
                    а&nbsp;чего лучше избежать.
                </p>
                <p class="text-default__p">
                    Просматривайте профили лучших архитекторов
                    в&nbsp;городе Краснодар, Краснодарский
                    край&nbsp;&mdash; читайте отзывы, оценивайте
                    портфолио и&nbsp;фото реализованных проектов
                    домов и&nbsp;квартир на&nbsp;Houzz и&nbsp;легко
                    связывайтесь с&nbsp;понравившимися вам
                    специалистами, нажав кнопку
                    &laquo;Написать&raquo;
                </p>
                <p class="text-default__p">
                    Если вы&nbsp;&mdash; архитектор или
                    архитектурное бюро, узнайте больше о&nbsp;наших
                    услугах для профессионалов на&nbsp;странице
                    Привлечение клиентов для архитекторов
                    с&nbsp;Houzz PRO.
                </p>
            </div>
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
</section>