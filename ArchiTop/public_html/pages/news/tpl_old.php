<div class="main-section__search-services search-services">
    <div class="search-services__container container">
        <?php
        load_view('templates/base/search', $template);
        ?>
    </div>
</div>


<!-- <div class="text"><?= $item['annotation_' . $user->language]; ?></div>
<a class="button-big blue dark" href="news?id=<?= $item['id']; ?>">
<?= $_txt['button-more']; ?>
</a> -->

<?php
global $pdo;
require_once './functions/news.php';
if (isset($_GET['id'])) {

    $item_id = (int) $_GET['id'];

    if ($item_id > 0) {
        $news_item = news_get_item($item_id);
        $item_content = json_decode(file_get_contents('./pages/news/items/news' . $news_item['id'] . '.json'), true);
?>
        <div class="main-section__breadcrumb breadcrumb">
            <div class="breadcrumb__container container">
                <ul class="breadcrumb__list breadcrumb-list">
                    <li class="breadcrumb-list__item">
                        <a class="breadcrumb-list__item-link" href="/">
                            Главная
                        </a>
                    </li>
                    <li class="breadcrumb-list__item">
                        <a class="breadcrumb-list__item-link" href="/news">
                            Новости
                        </a>
                    </li>
                    <li class="breadcrumb-list__item">
                        <span
                            class="breadcrumb-list__item-link breadcrumb-list__item-link_nolink">
                            <!-- <?= $news_item['title_' . $user->language]; ?> -->
                            <?= $news_item['title_ru']; ?>
                        </span>
                    </li>
                </ul>
            </div>
        </div>


        <section class="main-section__news-inner news-inner section-inner">
            <h1 class="news-inner__title-hidden text-hidden">
                Новости
                <!-- <?= $news_item['title_' . $user->language]; ?> -->
            </h1>
            <div class="news-inner__container container">
                <div class="news-inner__content-wrap">
                    <a
                        class="news-inner__link-back link-text link-text_back"
                        href="./news"
                        aria-label="Перейти на общую страницу новостей">
                        <svg class="link-text__icon">
                            <use
                                xlink:href="./app/img/icons/icons.svg#arrow"></use>
                        </svg>
                        <span class="link-text__text">Назад</span>
                    </a>
                    <h2 class="news-inner__title h-2">
                        <!-- <?= $news_item['title_' . $user->language]; ?> -->
                        <?= $news_item['title_ru']; ?>
                    </h2>
                    <div class="news-inner__content text-default">
                        <!-- <?= $item_content[$user->language]; ?> -->
                        <!-- <?= $item_content['ru']; ?> -->
                        <?= $news_item['annotation_ru']; ?>
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
        <div class="main-section__breadcrumb breadcrumb">
            <div class="breadcrumb__container container">
                <ul class="breadcrumb__list breadcrumb-list">
                    <li class="breadcrumb-list__item">
                        <a class="breadcrumb-list__item-link" href="/">
                            Главная
                        </a>
                    </li>
                    <li class="breadcrumb-list__item">
                        <span
                            class="breadcrumb-list__item-link breadcrumb-list__item-link_nolink">
                            Новости
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <section class="main-section__news news section-inner">
            <h1 class="news__title-hidden text-hidden"><?= $_txt['header']; ?></h1>
            <div class="news__container container">
                <!-- <h2 class="news__title h-2"><?= $_txt['header']; ?></h2> -->
                <h2 class="news__title h-2">Новости</h2>
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
                                    <!-- <span class="news-link__date">
                                        <?= date('d.m.y H:i', $item['date']); ?>
                                    </span> -->
                                    <div class="news-link__img-wrap">
                                        <img
                                            class="news-link__img"
                                            src="images/news/<?= $item['image']; ?>"
                                            alt="<?= $item['title_ru'] ?>" />
                                    </div>
                                    <h3 class="news-link__title">
                                        <?= $item['title_ru']; ?>
                                        <!-- <?= $item['title_' . $user->language]; ?> -->
                                    </h3>
                                </a>
                            </li>
                        <?php
                        }
                        ?>
                    </ul>

                    <!-- <div class="pagination" data-controller="news/get_list" data-result="result_news" data-scroll-top="true">
                        <?php
                        $pagination = $news['pagination'];
                        if ($pagination['prev'] !== false || $pagination['next'] !== false) {
                            if ($pagination['prev']) {
                                echo '<a class="prev" data-page="' . $pagination['prev'] . '"></a>';
                            } else {
                                echo '<span class="prev_off"></span>';
                            }
                            if ($pagination['minustwo']) echo '<a data-page="' . $pagination['minustwo'] . '">' . $pagination['minustwo'] . '</a>';
                            if ($pagination['minusone']) echo '<a data-page="' . $pagination['minusone'] . '">' . $pagination['minusone'] . '</a>';
                            echo '<span class="current">' . $pagination['current'] . '</span>';
                            if ($pagination['plusone']) echo '<a data-page="' . $pagination['plusone'] . '">' . $pagination['plusone'] . '</a>';
                            if ($pagination['plustwo']) echo '<a data-page="' . $pagination['plustwo'] . '">' . $pagination['plustwo'] . '</a>';
                            if ($pagination['next']) {
                                echo '<a class="next" data-page="' . $pagination['next'] . '"></a>';
                            } else {
                                echo '<span class="next_off"></span>';
                            }
                        }
                        ?>
                    </div> -->
                </div>
            </div>
        </section>
<?php
    }
}
?>

<!-- <script>
    <?php
    $get_news_count = $pdo->query('SELECT count(id) as total FROM news WHERE admin_only = 0');
    $news_count = $get_news_count->fetch();
    ?>
    localStorage['news_total_readed'] = <?= $news_count['total']; ?>;
</script> -->