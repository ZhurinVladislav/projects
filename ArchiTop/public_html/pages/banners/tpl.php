<?php

require_once './pages/banners/banners_'.$user->language.'.php';
global $pdo, $root_url;

$get_info = $pdo->prepare('SELECT * FROM referrals_info WHERE user_id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

switch ($info['type']) {
	case '1':
		$ref_percent = '7';
		break;
	case '2':
		$ref_percent = '15';
		break;
}
?>

<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<?php
	foreach ($banners as $banner => $val) {
?>
		<div class="banners__item <?= $val['orientation']; ?>">
			<div class="title"><?= $val['sizes']; ?>px</div>
			<div class="body">
				<div class="img">
					<img src="images/banners/high/<?= $val['filename']; ?>">
				</div>

				<div class="link">
					<textarea id="<?= $val["id"]; ?>"><a href='<?= $root_url; ?>?r=<?= $user->id; ?>&s=ref'><img src='<?= $root_url.'images/banners/high/'.$val['filename']; ?>'></a></textarea>
					<a href="<?= $root_url.'images/banners/high/'.$val['filename']; ?>" class="download" download><?= $_txt['download']; ?></a>
				</div>
			</div>
		</div>
<?php
	}
?>
		
<?php
	foreach ($banners as $banner => $val) {
?>
	<div class="banners__item <?= $val['orientation']; ?>">
		<div class="title"><?= $val['sizes']; ?>px</div>
		<div class="body">
			<div class="img">
				<img src="images/banners/low/<?= $val['filename']; ?>">
			</div>

			<div class="link">
				<textarea id="<?= $val["id"]; ?>"><a href='<?= $root_url; ?>?r=<?= $user->id; ?>&s=ref'><img src='<?= $root_url.'images/banners/low/'.$val['filename']; ?>'></a></textarea>
				<a href="<?= $root_url.'images/banners/low/'.$val['filename']; ?>" class="download" download><?= $_txt['download']; ?></a>
			</div>
		</div>
	</div>
<?php
	}
?>