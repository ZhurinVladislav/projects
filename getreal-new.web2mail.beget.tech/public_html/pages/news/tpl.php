<?php

global $pdo;
$pageTitle = "Новости | " . Config::APP_NAME;

require_once './functions/news.php';
if (isset($_GET['id'])) {

    $item_id = (int) $_GET['id'];

    if ($item_id > 0) {
        $news_item = news_get_item($item_id);
        $item_content = json_decode(file_get_contents('./pages/news/items/news' . $news_item['id'] . '.json'), true);
?>
        <div class="breadcrumbs">
            <div class="container">
                <div class="content">
                    <ul class="list">
                        <li class="item">
                            <a href="/" class="link">
                                Главная&nbsp;&mdash;&nbsp;
                            </a>
                        </li>
                        <li class="item">
                            <a href="/news" class="link">
                                Новости&nbsp;&mdash;&nbsp;
                            </a>
                        </li>
                        <li class="item">
                            <?= $news_item['title_ru']; ?>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <section class="main-section__news-inner news-inner section-inner">
            <div class="news-inner__container container">
                <div class="news-inner__content-wrap">
                    <a
                        class="news-inner__link-back link-text link-text_back"
                        href="./news"
                        aria-label="Перейти на общую страницу новостей">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="ic:twotone-arrow-back">
                                <path id="Vector" d="M2.93622 4.875L5.03247 6.97125L4.49997 7.5L1.49997 4.5L4.49997 1.5L5.02872 2.02875L2.93622 4.125L2.54491 4.5L2.93622 4.875Z"></path>
                            </g>
                        </svg>
                        <span class="link-text__text">Назад</span>
                    </a>
                    <h2 class="news-inner__title h-2">
                        <?= $news_item['title_ru']; ?>
                    </h2>
                    <div class="news-inner__content text-default">
                        <?= $item_content['ru']; ?>
                    </div>
                </div>
            </div>
        </section>
    <?php
    }
} else {
    $news = news_get_list(1, 2);
    if ($news != 'empty') {
    ?>
        <div class="breadcrumbs">
            <div class="container">
                <div class="content">
                    <ul class="list">
                        <li class="item">
                            <a href="/" class="link">
                                Главная&nbsp;&mdash;&nbsp;
                            </a>
                        </li>
                        <li class="item">
                            Новости
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <section class="news section-inner">
            <div class="container">
                <div class="content">
                    <div data-placeholder="result_news">
                        <ul class="news__list">
                            <?php
                            foreach ($news['items'] as $item) {
                            ?>
                                <li class="news__list-item">
                                    <a
                                        class="news__list-item-link news-link"
                                        href="news?id=<?= $item['id']; ?>"
                                        aria-label="Перейти на новость <?= $item['title_ru']; ?>">
                                        <div class="news-link__img-wrap">
                                            <img
                                                class="news-link__img"
                                                src="images/news/<?= $item['image']; ?>"
                                                alt="<?= $item['title_ru'] ?>" />
                                        </div>
                                        <h3 class="news-link__title">
                                            <?= $item['title_ru']; ?>
                                        </h3>
                                    </a>
                                </li>
                            <?php
                            }
                            ?>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
<?php
    }
}
?>