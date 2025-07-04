<?php

global $pdo, $coin;
require_once './pages/surfing/'.$user->language.'.php';

$site_id = (int) $_POST['site_id'];

// получаем новый сайт
$get_site = $pdo->query('SELECT * FROM surfing WHERE status = 1 ORDER BY RAND() LIMIT 1');
$site = $get_site->fetch();


// Обязательный переход
if($site['mandatory_transition']){
    $mandatory_transition_title = '<div class="control-tugo">' . $_txt['mandatory_transition'] . '</div>';
    $iframe = '
        <div class="iframe-wrap2">
            <div class="nothover"><span>' . $_txt['nothover-text2'] . '</span></div>
            <iframe src=" ' . $site["link_address"] . ' " ></iframe>
        </div>
    ';
} else {
    $mandatory_transition_title = '';
    $iframe = '
        <div class="iframe-wrap">
            <div class="nothover"><span>' . $_txt['nothover-text'] . '</span></div>
            <iframe src=" ' . $site["link_address"] . ' " ></iframe>
        </div>
    ';
}

$response['content_left'] = '
    ' . $mandatory_transition_title . '
    <div class="control-tugo"> ' . $_txt['reward'] . ': ' . number_format($site["viewcost"], 10, '.', '') . ' ' . $coin . '</div>
    <div class="control-tugo">
        <div>' . $_txt['timer'] . ': <span id="time" data-site_id="' . $site["id"] . '">' . $site["time_viewing"] . '</span> ' . $_txt['seconds'] . '</div>
    </div>
';
$response['content_right'] = '
    <a href="' . $site["link_address"] . '" class="button" target="_blank" data-surfing_visited>' . $_txt['control-panel__button1'] . '</a>
    <div class="control-panel__right-wrap">
        <button class="button-invert" data-surfing_skip>' . $_txt['control-panel__button2'] . '</button>
        <button class="btnsmall-invert" data-surfing_complain="' . $site["id"] . '" >
            <span class="icon">
                <svg><use xlink:href="/app/images/svg_sprite.svg#ignore"></use></svg>
            </span>
        </button>
    </div>
';
$response['iframe'] = $iframe;
$response['link_desc'] = $site["link_desc"];

echo json_encode($response);

return;

?>