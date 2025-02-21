<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= htmlspecialchars($description) ?>">
    <title><?= htmlspecialchars($title) ?></title>
</head>

<body>
    <header>
        <h1><?= htmlspecialchars($title) ?></h1>
    </header>
    <main>
        <div>
            <?= $content ?> <!-- Динамическое содержимое страницы -->
        </div>
    </main>
    <footer>
        <p>© <?= date('Y') ?> Your Website</p>
    </footer>
</body>

</html>