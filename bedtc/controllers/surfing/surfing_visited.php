<?php

global $pdo, $coin;
require_once './pages/surfing/'.$user->language.'.php';

$site_id = (int) $_POST['site_id'];

// записываем визит
$update_viewed = $pdo->query('UPDATE surfing SET visited = visited + 1 WHERE id = ' . $site_id . ' LIMIT 1');

// получаем текущий сайт
$get_update_site = $pdo->query('SELECT * FROM surfing WHERE status = 1 AND id = ' . $site_id . ' LIMIT 1');
$update_site = $get_update_site->fetch();

$response['mandatory_transition'] = $update_site['mandatory_transition'];

echo json_encode($response);

?>
