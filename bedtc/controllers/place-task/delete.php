<?php

global $pdo, $coin;
require_once './functions/users.php';
require_once './pages/place-task/'.$user->language.'.php';

$site_id = (int) $_POST['site_id'];
$update_site = $pdo->query('DELETE FROM surfing WHERE id = ' . $site_id);

?>