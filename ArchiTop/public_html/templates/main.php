<?php require __DIR__ . '/parts/head.php'; ?>
<?php require __DIR__ . '/parts/header.php'; ?>

<main>
	<?= $content ?? '<p>Страница не найдена</p>'; ?>
</main>

<?php require __DIR__ . '/parts/footer.php'; ?>