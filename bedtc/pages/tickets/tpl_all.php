<?php

global $pdo, $coin;

?>



<section class="account-tickets">
    <div class="container">
        <div class="content">

            <div class="tickets">
                <div class="tickets-title">
                    <span class="tickets-title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#support"></use></svg>
                    </span>
                    <span class="tickets-title__text"><?= $_txt['tickets-title']; ?></span>
                </div>
                <div class="tickets-content">
                    <div class="row">
                        <div class="col-left">
                            <div class="text-default">
                                <p>
                                    <?= $_txt['tickets-content-after']; ?>
                                    <a href="#"><?= $_txt['tickets-content-link']; ?>,</a> 
                                    <?= $_txt['tickets-content-before']; ?>.
                                </p>
                                <p>
                                    <span class="note">
                                        <span class="note__icon">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
                                        </span>
                                        <span class="note__text"><?= $_txt['tickets-note']; ?>.</span>
                                    </span>
                                </p>
                                <ul>
                                    <li>
                                        <?= $_txt['tickets-item1-after']; ?>
                                        <a href="#"><?= $_txt['tickets-content-link']; ?></a>.<?= $_txt['tickets-item1-before']; ?>.
                                    </li>
                                    <li><?= $_txt['tickets-item2']; ?>.</li>
                                    <li><?= $_txt['tickets-item3']; ?>.</li>
                                </ul>
                            </div>
                            <button class="button-invert" id="account-tickets__show"><?= $_txt['tickets-button-show']; ?></button>
                        </div>
                        <div class="col-right image-wrapper">
                            <img src="/app/images/support.png" alt="tickets">
                        </div>
                    </div>
                </div>
            </div>


            <?php
                global $pdo, $captcha_keys, $user, $root_url;

                if ($user->is_logged() === true) {

                require_once './functions/users.php';
                require_once './functions/tickets.php';

                $users_tickets_list = tickets_get_list_user($user->id);

                $can_send_ticket = true;

                $get_tickets_sended = $pdo->query('SELECT COUNT(id) AS total FROM tickets WHERE user_id = '.$user->id.' AND date > '.(time() - 86400));
                if (!is_bool($user_tickets = $get_tickets_sended->fetch())) {
                    if ($user_tickets['total'] >= 2) {
                        $can_send_ticket = false;
                    }
                }

                if ($can_send_ticket == true) { 

            ?>

                    <div class="tickets-spoller">

                        <div class="tickets-form">
                            <div class="tickets-title">
                                <span class="tickets-title__icon">
                                    <svg><use xlink:href="/app/images/svg_sprite.svg#sms"></use></svg>
                                </span>
                                <span class="tickets-title__text"><?= $_txt['tickets-title2']; ?></span>
                            </div>

                            <div class="tickets-form-content">
                                <div class="form-wrap">
                                    <form class="form-add form" data-controller="tickets/add_ticket" data-callback="collect_redirect">


                                        <!-- <div class="form-item">
                                            <div class="label-wrap">
                                                <label for="tickets-category"><?= $_txt['tickets-category']; ?></label>
                                            </div>
                                            <div class="input-wrap">
                                                <input type="text" name="category" id="tickets-category" placeholder="<?= $_txt['tickets-category-input']; ?>" required>
                                            </div>
                                        </div> -->




                                        <div class="form-item">
                                            <div class="label-wrap">
                                                <label for="tickets-category"><?= $_txt['tickets-category']; ?></label>
                                            </div>
                                            
                                            <div class="custom-select">
                                                <input type="hidden" name="category" id="tickets-category" value="1" required>
                                                <div class="select-input">
                                                    <div class="select-input__value"><?= $_txt['theme_item'][1]; ?></div>
                                                    <div class="select-input__arrow">
                                                        <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                                    </div>
                                                </div>
                                                <div class="select-list">
                                                    <div class="select-item" data-value="1"><?= $_txt['theme_item'][1]; ?></div>
                                                    <div class="select-item" data-value="2"><?= $_txt['theme_item'][2]; ?></div>
                                                    <div class="select-item" data-value="3"><?= $_txt['theme_item'][3]; ?></div>
                                                    <div class="select-item" data-value="4"><?= $_txt['theme_item'][4]; ?></div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div class="form-item">
                                            <div class="label-wrap">
                                                <label for="tickets-subject"><?= $_txt['tickets-subject']; ?></label>
                                            </div>
                                            <div class="input-wrap">
                                                <input type="text" name="subject" id="tickets-subject" placeholder="<?= $_txt['tickets-subject-input']; ?>" required>
                                            </div>
                                        </div>

                                        <div class="form-item">
                                            <div class="label-wrap">
                                                <label for="tickets-question"><?= $_txt['tickets-question']; ?></label>
                                            </div>
                                            <div class="input-wrap">
                                                <textarea 
                                                    name="text" 
                                                    id="tickets-question" 
                                                    placeholder="<?= $_txt['tickets-question-textarea']; ?>" 
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div class="button-wrapper">
                                            <button class="button"><?= $_txt['tickets-button-send']; ?></button>
                                        </div>

                                    </form>
                                </div>
                            </div>

                        </div>

                        <!--
                        <div class="success">
                            <span class="success__icon">
                                <svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
                            </span>
                            <span class="success__text"><?= $_txt['tickets-button-send']; ?></span>
                        </div>
                        -->

                    </div>

            <?php 
                } else { 
            ?>

                    <div class="tickets-spoller">
                        <div class="tickets-form">

                            <div class="tickets-title">
                                <span class="tickets-title__icon">
                                    <svg><use xlink:href="/app/images/svg_sprite.svg#sms"></use></svg>
                                </span>
                                <span class="tickets-title__text"><?= $_txt['tickets-title2']; ?></span>
                            </div>

                            <div class="tickets-form-content">
                                <div class="form-wrap">
                                    <div class="error-attr__text"><?= $_txt['error_limit']; ?></div>
                                </div>
                            </div>
                        </div>
                    </div>
            
            <?php 
                } 
            ?>


        <?php
            if (!empty($users_tickets_list)) {
        ?>

            <div class="table">
                <div class="table-header">
                    <div class="table-header__td">ID</div>
                    <div class="table-header__td"><?= $_txt['tickets-theme']; ?></div>
                    <div class="table-header__td"><?= $_txt['tickets-create']; ?></div>
                    <div class="table-header__td"><?= $_txt['tickets-status']; ?></div>
                    <div class="table-header__td"></div>
                </div>
                <div class="table-body">

            <?php
                foreach ($users_tickets_list as $item) {
            ?>
                    <div class="tr">
                        <div class="td">
                            <div class="td-title">ID</div>
                            <div class="td-value"><?= $item['id']; ?></div>
                        </div>
                        <div class="td">
                            <div class="td-title"><?= $_txt['tickets-theme'] ?></div>
                            <div class="td-value"><?= $_txt['theme_item'][$item['category']] ?></div>
                        </div>
                        <div class="td">
                            <div class="td-title"><?= $_txt['created']; ?></div>
                            <div class="td-value"><?= date('H:i d.m.y', $item['date']); ?></div>
                        </div>
                        <div class="td 
                            <?php 
                                if($item['status'] == 1){
                                    echo 'pending';
                                } else {
                                    echo 'new';
                                }
                            ?> 
                        ">
                            <div class="td-title"><?= $_txt['status']['title'] ?></div>
                            <div class="td-value"><?= $_txt['status'][$item['status']] ?></div>
                        </div>
                        <div class="td">
                            <div class="td-title"></div>
                            <div class="td-value">
                                <!-- <a data-href="tickets?ticket_id=<?= $item['id']; ?>" data-template="main_inner" class="open">
                                    <span class="open__text">Открыть</span>
                                    <span class="open__icon">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                    </span>
                                </a> -->

                                <a data-open-ticket="<?= $item['id']; ?>" data-template="main_inner" class="open">
                                    <span class="open__text"><?= $_txt['tickets_btn']; ?></span>
                                    <span class="open__icon">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                    </span>
                                </a>
                                
                            </div>
                        </div>
                    </div>
            <?php
                }
            ?>

        <?php
            }
        ?>

                </div>
            </div>

        <?php } ?>

        </div>
    </div>
</section>

            