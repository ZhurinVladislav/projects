<?php

global $pdo, $coin;
require_once './pages/surfing/'.$user->language.'.php';

$site_id = (int) $_POST['site_id'];
//$update_viewed = $pdo->query('UPDATE surfing SET viewed = viewed + 1 WHERE id = ' . $site_id . ' LIMIT 1');

$get_site = $pdo->query('SELECT * FROM surfing WHERE status = 1 AND id = ' . $site_id . ' LIMIT 1');
$site = $get_site->fetch();

?>


<?php
    $arr_number = [rand(1,50), rand(51,100), rand(101,150), rand(151,400)];
    $random_number = $arr_number[rand(0,3)];
?>

<div class="control-panel__wrap">
    <div class="control-panel__text"><?= $_txt['control-panel__text']; ?> <strong><?= $random_number; ?></strong></div>
    <div class="control-panel__buttons">
        <?php
            for ($i = 0; $i < count($arr_number); $i++) {
                if($arr_number[$i] == $random_number){
                    echo '<button class="btnsmall-invert" data-site_id=' . $site["id"] . ' >' . $arr_number[$i] . '</button>';
                } else {
                    echo '<button class="btnsmall-invert">' . $arr_number[$i] . '</button>';
                }
            }
        ?>
    </div>
</div>


