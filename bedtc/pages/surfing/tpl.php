<?php

global $pdo, $coin;

$get_site = $pdo->query('SELECT * FROM surfing WHERE status = 1 ORDER BY RAND() LIMIT 1');
$site = $get_site->fetch();

?>

<section class="account-surfing ">
    <div class="container">
        <div class="content" data-placeholder="surfing_viewed_success">
            <div class="surfing">

                <div class="surfing-title">
                    <span class="surfing-title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#surfing"></use></svg>
                    </span>
                    <span class="surfing-title__text"><?= $_txt['surfing-title']; ?></span>
                </div>
                
                <div class="control">
                    <div class="control-title"><?= $site["link_desc"]; ?></div>

                    <div class="control-panel">
                        <div class="control-panel__left" data-placeholder="surfing_captcha_success">
                            <?php
                                if($site['mandatory_transition']){
                                    echo '<div class="control-tugo">' . $_txt['mandatory_transition'] . '</div>';
                                } 
                            ?>
                            <div class="control-tugo"><?= $_txt['reward']; ?>: <?= number_format($site["viewcost"], 10, '.', ''); ?> <?= $coin ?></div>
                            <div class="control-tugo">
                                <div><?= $_txt['timer']; ?>: <span id="time" data-site_id='<?= $site["id"]; ?>'><?= $site["time_viewing"]; ?></span> <?= $_txt['seconds']; ?></div>
                            </div>
                        </div>
                        <div class="control-panel__right" data-placeholder="surfing_buttons">
                            <a href="<?= $site["link_address"]; ?>" class="button" target="_blank" data-surfing_visited><?= $_txt['control-panel__button1']; ?></a>
                            <div class="control-panel__right-wrap">
                                <button class="button-invert" data-surfing_skip><?= $_txt['control-panel__button2']; ?></button>
                                <button class="btnsmall-invert" data-surfing_complain='<?= $site["id"]; ?>' >
                                    <span class="icon">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#ignore"></use></svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div data-placeholder="surfing_iframe">
                <?php
                    if(!$site['mandatory_transition']){
                        echo '
                            <div class="iframe-wrap">
                                <div class="nothover"><span>' . $_txt['nothover-text'] . '</span></div>
                                <iframe src=" ' . $site["link_address"] . ' " ></iframe>
                            </div>
                        ';
                    } else {
                        echo '
                            <div class="iframe-wrap2">
                                <div class="nothover"><span>' . $_txt['nothover-text2'] . '</span></div>
                                <iframe src=" ' . $site["link_address"] . ' " ></iframe>
                            </div>
                        ';
                    }
                ?>
            </div>

        </div>
    </div>
</section>
