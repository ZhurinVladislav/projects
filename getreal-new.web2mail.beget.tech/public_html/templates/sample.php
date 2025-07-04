<?php require_once 'parts/head.php'; ?>
<?php require_once 'parts/header.php'; ?>

<main>
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
                        <?= htmlspecialchars($pageTitle); ?>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <section class="section-inner">
        <div class="container">
            <div class="content">
                <h1 class="visually-hidden">
                    <?= htmlspecialchars($pageTitle); ?>
                </h1>
                <h2 class="header_1">
                    <?= htmlspecialchars($pageTitle); ?>
                </h2>
                <div class="text-default">
                    <?= $content; ?>
                </div>
            </div>
        </div>
    </section>
</main>

<?php require_once 'parts/footer.php'; ?>