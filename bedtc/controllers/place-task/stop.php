<?php

global $pdo, $coin;
require_once './functions/users.php';
require_once './pages/place-task/'.$user->language.'.php';

$site_id = (int) $_POST['site_id'];
$update_site = $pdo->query('UPDATE surfing SET status = 0 WHERE id = ' . $site_id . ' AND user_id = ' . $user->id . ' LIMIT 1');

write_log($user->id, '05002', "");


$get_sites = $pdo->query('SELECT * FROM surfing WHERE id = ' . $site_id . ' AND user_id = ' . $user->id . ' LIMIT 1');
$sites = $get_sites->fetchAll();
$site = $sites[0];


$response['image'] = '<img src="/app/images/paid.png" alt="' . $_txt['site-stop'] . '" class="task-tab__icon">';
$response['buttons'] = '
    <button 
        class="button" 
        data-overlay="form-continue"
        data-get-name="' . $site['link_name'] . '"
        data-get-address="' . $site['link_address'] . '"
        data-get-id="' . $site['id'] . '"
    >' . $_txt['task-continue'] . '</button>
    <button 
        class="btnsmall-invert button-delete" 
        data-overlay="form-delete"
        data-get-name="' . $site['link_name'] . '"
        data-get-address="' . $site['link_address'] . '"
        data-get-id="' . $site['id'] . '"
    >
        <span class="icon"><svg><use xlink:href="/app/images/svg_sprite.svg#trash"></use></svg></span>
    </button>
';

echo json_encode($response);

return;

?>