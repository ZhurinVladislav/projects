<?php

global $pdo, $coin;

require_once './functions/users.php';
require_once './pages/place-task/'.$user->language.'.php';

if ($user->is_logged() === true) {
    $get_sites = $pdo->query('SELECT * FROM surfing WHERE user_id = '.$user->id);
    $sites = $get_sites->fetchAll();
}

?>


<section class="account-task">
    <div class="container">
        <div class="content">
            <h1 class="header_1"><?= $_txt['header']; ?></h1>

            <div class="placement">
                <div class="title">
                    <span class="title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#placement"></use></svg>
                    </span>
                    <span class="title__text"><?= $_txt['header']; ?></span>
                </div>
                <div class="placement-wrap">
                    <div class="rightnow">
                        <div class="rightnow-title"><?= $_txt['rightnow-title']; ?></div>
                        <a data-href="surfing" data-template="main_inner" class="button button-mobile"><?= $_txt['earn-text']; ?></a>

                        <div class="spoller">

                            <div class="rightnow-text">
                                <?= $_txt['rightnow-text']; ?>
                            </div>

                            <div class="rightnow-text__list">
                                <div class="rightnow-text__item">
                                    <img src="/app/images/svg/shield.svg" alt="shield" class="rightnow-text__icon">
                                    <div class="rightnow-text__text"><?= $_txt['rightnow-text-item1']; ?></div>
                                </div>
                                <div class="rightnow-text__item">
                                    <img src="/app/images/svg/money.svg" alt="money" class="rightnow-text__icon">
                                    <div class="rightnow-text__text"><?= $_txt['rightnow-text-item2']; ?></div>
                                </div>
                            </div>

                            <div class="rightnow-desc__list">
                                <div class="rightnow-desc__item"><?= $_txt['rightnow-desc-item1']; ?> 0,00007000 <?= $coin; ?>;</div>
                                <div class="rightnow-desc__item"><?= $_txt['rightnow-desc-item2']; ?> 0.00008000 <?= $coin; ?>;</div>
                                <div class="rightnow-desc__item"><?= $_txt['rightnow-desc-item3']; ?></div>
                            </div>

        
                            <div class="rightnow-text">
                                <?= $_txt['rightnow-item1']; ?>
                            </div>
                            
                            
                            <div class="rightnow-list">
                                <div class="rightnow-item">
                                    <span class="rightnow-item__icon">
                                        <img src="/app/images/services-icon2.png" alt="services">
                                    </span>
                                    <span class="rightnow-item__text">
                                        <?= $_txt['rightnow-item1']; ?>
                                    </span>
                                </div>
                            </div>

                        </div>

                        <button class="rightnow-link-more">
                            <span class="rightnow-link-more__text"><?= $_txt['rightnow-more']; ?></span>
                            <span class="rightnow-link-more__icon">
                                <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                            </span>
                        </button>
                    </div>

                    <div class="earn">
                        <div class="image-wrapper">
                            <img src="/app/images/placement.png" alt="placement">
                        </div>
                        <a data-href="attract" data-template="main_inner" class="button earn-button"><?= $_txt['earn-text']; ?></a>
                    </div>
                </div>
            </div>

            <div class="task" id="task">
                <div class="title">
                    <span class="title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#task"></use></svg>
                    </span>
                    <span class="title__text"><?= $_txt['task-title']; ?></span>
                </div>
                <div class="task-wrap">
                    <div class="task-list" data-placeholder="place-task_success">

                        <?php 
                            foreach ($sites as $key => $site) {    
                        ?>
                            
                            <div class="task-item" data-site="<?= $site['id'] ?>">
                                <div class="task-tab">
                                    <div class="task-tab__left">
                                        <div class="task-tab__status">
                                            <?php
                                                if($site['status']){
                                                    echo '<img src="/app/images/done.png" alt="' . $_txt['site-continue'] . '" class="task-tab__icon">';
                                                } 
                                                if(!$site['status'] && $site['viewed'] == $site['number_viewing']){
                                                    echo '<img src="/app/images/off.png" alt="' . $_txt['site-stop'] . '" class="task-tab__icon">';
                                                }
                                                if(!$site['status'] && $site['viewed'] < $site['number_viewing'] ){
                                                    echo '<img src="/app/images/paid.png" alt="' . $_txt['site-stop'] . '" class="task-tab__icon">';
                                                }
                                            ?>
                                        </div>
                                        <div class="task-tab__wrap">
                                            <div class="task-tab__name"><?= $site['link_name'] ?></div>
                                            <div class="task-tab__link"><?= $site['link_address'] ?></div>
                                        </div>
                                    </div>
                                    <div class="task-tab__right">
                                        <div class="task-tab__toggler"></div>
                                    </div>
                                </div>
                                <div class="task-spoller">
                                    <div class="task-desc">
                                        <div class="task-desc__left">
                                            <div class="task-blocks">
                                                <div class="task-block">
                                                    <div class="task-block__title"><?= $_txt['task-show']; ?></div>
                                                    <div class="task-block__value orange"><?= $site['viewed']; ?></div>
                                                </div>
                                                <div class="task-block">
                                                    <div class="task-block__title"><?= $_txt['task-transition']; ?></div>
                                                    <div class="task-block__value green"><?= $site['visited']; ?></div>
                                                </div>
                                                <div class="task-block">
                                                    <div class="task-block__title"><?= $_txt['task-remains']; ?></div>
                                                    <div class="task-block__value site-remains" ><?= $site['number_viewing'] -  $site['viewed'] ?></div>
                                                </div>
                                            </div>
                                            <div class="task-desc__list">
                                                <div class="task-desc__item"><?= $_txt['task-desc1']; ?>: <?= $site['link_desc']; ?></div>
                                                <div class="task-desc__item"><?= $_txt['task-desc2']; ?>: <?= $site['time_viewing']; ?></div>
                                                <?php
                                                    if($site['mandatory_transition']){
                                                        echo '<div class="task-desc__item">' . $_txt['task-desc3'] . '</div>';
                                                    }
                                                    if($site['material']){
                                                        echo '<div class="task-desc__item">' . $_txt['task-desc4'] . '</div>';
                                                    }
                                                ?>
                                            </div>
                                        </div>
                                        <div class="task-desc__right">
                                            <div class="buttons">

                                                <?php 
                                                    if($site['status']){
                                                        echo '
                                                            <button 
                                                                class="button-invert" 
                                                                data-overlay="form-stop"
                                                                data-get-name="' . $site['link_name'] . '"
                                                                data-get-address="' . $site['link_address'] . '"
                                                                data-get-id="' . $site['id'] . '"

                                                            >' . $_txt['task-stop'] . '</button>
                                                        ';
                                                    } 
                                                    if(!$site['status'] && $site['viewed'] == $site['number_viewing'] ) {
                                                        echo '
                                                            <button 
                                                                class="button" 
                                                                data-overlay="form-extend"
                                                                data-get-name="' . $site['link_name'] . '"
                                                                data-get-address="' . $site['link_address'] . '"
                                                                data-get-id="' . $site['id'] . '"
                                                                data-get-viewcost="' . number_format($site["viewcost"], 10, '.', '') . '"
                                                            >' . $_txt['task-extend'] . '</button>';
                                                    }
                                                    if(!$site['status'] && $site['viewed'] < $site['number_viewing'] ) {
                                                        echo '
                                                            <button 
                                                                class="button" 
                                                                data-overlay="form-continue"
                                                                data-get-name="' . $site['link_name'] . '"
                                                                data-get-address="' . $site['link_address'] . '"
                                                                data-get-id="' . $site['id'] . '"
                                                            >' . $_txt['task-continue'] . '</button>
                                                        ';
                                                    }
                                                ?>

                                                <button 
                                                    class="btnsmall-invert button-delete" 
                                                    data-overlay="form-delete"
                                                    data-get-name="<?= $site['link_name'] ?>"
                                                    data-get-address="<?= $site['link_address'] ?>"
                                                    data-get-id="<?= $site['id'] ?>"
                                                >
                                                    <span class="icon"><svg><use xlink:href="/app/images/svg_sprite.svg#trash"></use></svg></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        <?php
                            }
                        ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
