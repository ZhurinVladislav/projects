<?php

global $pdo, $coin;
require_once './functions/users.php';
require_once './functions/payments.php';
require_once './pages/place-task/'.$user->language.'.php';

$site_id = (int) $_POST['site_id'];
$extendcost = number_format($_POST['extendcost'], 8, '.', '');
$number_viewing = (int) $_POST['number_viewing'];

// если баланса не достаточно, то ошибка
if($user->balance_buy < $extendcost){
    $response['status'] = 'error';
    $response['placeholder'] = 'balance_buy';
    $response['print'] = $_txt['balance_buy'];
    echo json_encode($response);
    return;
}

// отнимаем валюту за публикацию
$update_balance = $pdo->query('UPDATE users SET balance_buy = balance_buy - ' . $extendcost . ' WHERE id = '.$user->id.' LIMIT 1');
// увеличиваем кол-во просмотров, публикуем
$update_site = $pdo->query('UPDATE surfing SET status = 1, number_viewing = number_viewing + ' . $number_viewing . '  WHERE id = ' . $site_id . ' LIMIT 1');

write_log($user->id, '05001', $extendcost);


// Получаем сайт
$get_sites = $pdo->query('SELECT * FROM surfing WHERE id = ' . $site_id . ' AND user_id = ' . $user->id . ' LIMIT 1');
$sites = $get_sites->fetchAll();
$site = $sites[0];


// получаем баланс
$select_balances = $pdo->prepare('SELECT balance_buy, balance_withdrawal FROM users WHERE id = ?');
$select_balances->execute(array($user->id));
$balances = $select_balances->fetch();

$response['balance_buy'] = format_money($balances['balance_buy']);
$response['balance_withdrawal'] = format_money($balances['balance_withdrawal']);
$response['remains'] = $site['number_viewing'] -  $site['viewed'];
$response['image'] = '<img src="/app/images/done.png" alt="' . $_txt['site-continue'] . '" class="task-tab__icon">';
$response['buttons'] = '
    <button 
        class="button-invert" 
        data-overlay="form-stop"
        data-get-name="' . $site['link_name'] . '"
        data-get-address="' . $site['link_address'] . '"
        data-get-id="' . $site['id'] . '"

    >' . $_txt['task-stop'] . '</button>
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