<?php

global $settings, $pdo, $coin, $site_name;

// $action_percent = $settings->get('action_percent');

$statistics_users_new = $pdo->query('SELECT COUNT(id) AS total FROM users WHERE reg_date > '.(time() - 86400));
$statistics_users_new = $statistics_users_new->fetch();
$statistics_users_new = $statistics_users_new['total'];

$statistics_users = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "users_total" OR name LIKE "fake_users_total"');
$statistics_users = $statistics_users->fetch();
$statistics_users = $statistics_users['total'];

$statistics_withdrawal = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "withdrawal_total" OR name LIKE "fake_withdrawal_total"');
$statistics_withdrawal = $statistics_withdrawal->fetch();
$statistics_withdrawal = format_money($statistics_withdrawal['total']);

$statistics_replenishments = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "replenishments_total" OR name LIKE "fake_replenishments_total"');
$statistics_replenishments = $statistics_replenishments->fetch();
$statistics_replenishments = format_money($statistics_replenishments['total']);

$statistics_start = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "start_date"');
$statistics_start = $statistics_start->fetch();
$statistics_start = (int) $statistics_start['value'];
$statistics_days_work = floor((time() - $statistics_start) / 60 / 60 / 24);

$statistics_online = file_get_contents('./users_online.txt');
$statistics_online = intval($statistics_online / 4);

?>

    <section class="heroimage">
        <!-- <img src="/app/images/decor/main-top-branch-left.svg" alt="" class="branch-left" style="width: 360px; height: 411px;">
        <img src="/app/images/decor/main-top-branch-right.svg" alt="" class="branch-right" style="width: 360px; height: 411px;"> -->
        <div class="top-bg"></div>
        <div class="top-bg-dark"></div>
        <div class="top-bg-colored"></div>
    </section>

    <section class="services">
        <div class="container">
            <div class="content">
                <h2 class="header_1">
                    <span class="color"><?= $_txt['1-services_header_c'] ?></span> 
                    <?= $_txt['1-services_header'] ?>
                </h2>
                <div class="content-text text-default">
                    <?= $_txt['1-services_text'] ?>
                    <span class="color">0,0005000 <?= $coin ?>.</span>
                </div>
                <div class="row">
                    <div class="col-left">
                        <ul class="list">
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon1.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['1-services_item1'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon2.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['1-services_item2'] ?> <span class="colr">0,0005000 <?= $coin ?></span>;</div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon3.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['1-services_item3'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon4.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['1-services_item4'] ?></div>
                            </li>
                        </ul>
                        <div class="note"><?= $_txt['1-services_note'] ?></div>

                        <?php
                            if ($user->is_logged() == true) {
                        ?>
                            <a data-href="home" data-template="main_inner" class="button"><?= $_txt['1-services_button'] ?></a>
                        <?php
                            } else {
                        ?>
                            <a data-href="registration" data-template="login" class="button"><?= $_txt['1-services_button'] ?></a>
                        <?php } ?>
                        
                    </div>
                    <div class="col-right">
                        <div class="image-wrapper">
                            <img src="/app/images/services1.png" alt="services">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services even">
        <div class="container">
            <div class="content">
                <h2 class="header_1">
                    <?= $_txt['2-services_header_b'] ?> <span class="color">0,000001 <?= $coin ?></span> <?= $_txt['2-services_header_a'] ?>
                </h2>
                <div class="content-text text-default">
                    <?= $_txt['2-services_text'] ?>
                </div>
                <div class="row">
                    <div class="col-left">
                        <ul class="list">
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon5.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['2-services_item1'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon6.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['2-services_item2'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon7.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['2-services_item3'] ?> <span class="color">0,00000020 <?= $coin ?></span>;</div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon8.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['2-services_item4'] ?></div>
                            </li>
                        </ul>
                        <div class="note"><?= $_txt['2-services_note'] ?></div>

                        <?php
                            if ($user->is_logged() == true) {
                        ?>
                            <a data-href="home" data-template="main_inner" class="button"><?= $_txt['2-services_button'] ?></a>
                        <?php
                            } else {
                        ?>
                            <a data-href="registration" data-template="login" class="button"><?= $_txt['2-services_button'] ?></a>
                        <?php } ?>

                    </div>
                    <div class="col-right">
                        <div class="image-wrapper">
                            <img src="/app/images/services2.png" alt="services">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services">
        <div class="container">
            <div class="content">
                <h2 class="header_1">
                    <?= $_txt['3-services_header'] ?> <span class="color"><?= $site_name; ?></span>
                </h2>
                <div class="content-text text-default">
                    <?= $_txt['3-services_text'] ?>
                    <span class="color">0,0005000 <?= $coin ?>.</span>
                </div>
                <div class="row">
                    <div class="col-left">
                        <ul class="list">
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon9.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['3-services_item1'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon10.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['3-services_item2_b'] ?> <span class="color">0,00000500 <?= $coin ?></span> <?= $_txt['3-services_item2_a'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon11.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['3-services_item3_b'] ?> <span class="color">0,00004000 <?= $coin ?></span> <?= $_txt['3-services_item3_a'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon12.png" alt="services">
                                </div>
                                <div class="item-text text-default">
                                    <?= $_txt['3-services_item4'] ?>
                                </div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon13.png" alt="services">
                                </div>
                                <div class="item-text text-default">
                                    <?= $_txt['3-services_item5'] ?>
                                </div>
                            </li>
                        </ul>
                        <div class="buttons">
                            <?php
                                if ($user->is_logged() == true) {
                            ?>
                                <a data-href="home" data-template="main_inner" class="button"><?= $_txt['3-services_button1'] ?></a>
                                <a href="#" class="button-invert"><?= $_txt['3-services_button2'] ?></a>
                            <?php
                                } else {
                            ?>
                                <a data-href="registration" data-template="login" class="button"><?= $_txt['3-services_button1'] ?></a>
                                <a href="#" class="button-invert"><?= $_txt['3-services_button2'] ?></a>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="col-right">
                        <div class="image-wrapper">
                            <img src="/app/images/services3.png" alt="services">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services even">
        <div class="container">
            <div class="content">
                <h2 class="header_1">
                    <?= $_txt['4-services_header'] ?>
                    <span class="color"><?= $_txt['4-services_header_c'] ?></span>
                </h2>
                <div class="content-text text-default">
                    <?= $_txt['4-services_text'] ?>
                </div>
                <div class="row">
                    <div class="col-left">
                        <ul class="list">
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon14.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['4-services_item1'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon15.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['4-services_item2'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon16.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['4-services_item3'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon17.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['4-services_item4'] ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/services-icon18.png" alt="services">
                                </div>
                                <div class="item-text text-default"><?= $_txt['4-services_item5'] ?> <span class="color">0,00000009 <?= $coin ?>.</span></div>
                            </li>
                        </ul>
                        <div class="note"><?= $_txt['4-services_note'] ?></div>
                        <?php
                            if ($user->is_logged() == true) {
                        ?>
                            <a data-href="home" data-template="main_inner" class="button"><?= $_txt['4-services_button'] ?></a>
                        <?php
                            } else {
                        ?>
                            <a data-href="registration" data-template="login" class="button"><?= $_txt['4-services_button'] ?></a>
                        <?php } ?>
                    </div>
                    <div class="col-right">
                        <div class="image-wrapper">
                            <img src="/app/images/services4.png" alt="services">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="payments">
        <div class="container">
            <div class="content">
                <h2 class="header_1"><span class="color"><?= $_txt['payments_header_c'] ?></span> <?= $_txt['payments_header'] ?></h2>
                <ul class="list">
                    <li class="item"><img src="/app/images/payment1.svg" alt="payment"></li>
                    <!-- <li class="item"><img src="/app/images/payment2.svg" alt="payment"></li> -->
                    <li class="item"><img src="/app/images/payment3.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment4.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment5.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment6.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment7.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment8.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment9.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment10.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment11.svg" alt="payment"></li>
                    <li class="item"><img src="/app/images/payment12.svg" alt="payment"></li>
                </ul>
            </div>
        </div>
    </section>

    