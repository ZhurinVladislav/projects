<?php
	global $root_url, $user;
?>
<!DOCTYPE html>
<html lang="<?= $user->language; ?>">
<head>
	<meta charset="UTF-8">
	<title>Title</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta name="description" content="Description">

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Site name" />
	<meta property="og:url" content="<?= $root_url; ?>" />
	<meta property="og:title" content="Title" />
	<meta property="og:description" content="Description" />
	<meta property="og:image" content="<?= $root_url; ?>app/images/logo_link.png" />

	<link rel="stylesheet" href="/app/css/style.css">
	
	<link rel="shortcut icon" href="/app/images/favicon/favicon.ico" type="image/x-icon">
	<link rel="apple-touch-icon" sizes="16x16" href="/app/images/favicon/16x16.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/app/images/favicon/72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/app/images/favicon/114x114.png">

	
	<script>
		if (window.location.search.indexOf('r=') != -1 || window.location.search.indexOf('s=') != -1) {
			window.location.href = window.location.href.replace(window.location.search,'');
		}
	</script>
</head>
<body class="<?= $template; ?>">