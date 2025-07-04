<?php

global $pdo, $coin;

?>

<section class="account-support">
    <div class="container">
        <div class="content">
            <div class="support">
                <div class="support-title">
                    <span class="support-title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#support"></use></svg>
                    </span>
                    <span class="support-title__text"><?= $_txt['support-title']; ?></span>
                </div>
                <div class="support-content">
                    <div class="row">
                        <div class="col-left">
                            <div class="text-default">
                                <p>
                                    <?= $_txt['support-content-after']; ?>
                                    <a href="#"><?= $_txt['support-content-link']; ?>,</a> 
                                    <?= $_txt['support-content-before']; ?>.
                                </p>
                                <p>
                                    <span class="note">
                                        <span class="note__icon">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
                                        </span>
                                        <span class="note__text"><?= $_txt['support-note']; ?>.</span>
                                    </span>
                                </p>
                                <ul>
                                    <li>
                                        <?= $_txt['support-item1-after']; ?>
                                        <a href="#"><?= $_txt['support-content-link']; ?></a>.<?= $_txt['support-item1-before']; ?>.
                                    </li>
                                    <li><?= $_txt['support-item2']; ?>.</li>
                                    <li><?= $_txt['support-item3']; ?>.</li>
                                </ul>
                            </div>
                            <button class="button-invert" id="account-support__show"><?= $_txt['support-button-show']; ?></button>
                        </div>
                        <div class="col-right image-wrapper">
                            <img src="/app/images/support.png" alt="support">
                        </div>
                    </div>
                </div>
            </div>

            <div class="support-spoller">

                <div class="support-form">
                    <div class="support-title">
                        <span class="support-title__icon">
                            <svg><use xlink:href="/app/images/svg_sprite.svg#sms"></use></svg>
                        </span>
                        <span class="support-title__text"><?= $_txt['support-title2']; ?></span>
                    </div>

                    <div class="support-form-content">
                        <div class="form-wrap">
                            <form action="/" class="form">
                                <div class="form-item">
                                    <div class="label-wrap">
                                        <label for="support-category"><?= $_txt['support-category']; ?></label>
                                    </div>
                                    <div class="input-wrap">
                                        <input type="text" name="category" id="support-category" placeholder="<?= $_txt['support-category-input']; ?>" required>
                                    </div>
                                </div>

                                <div class="form-item">
                                    <div class="label-wrap">
                                        <label for="support-subject"><?= $_txt['support-subject']; ?></label>
                                    </div>
                                    <div class="input-wrap">
                                        <input type="text" name="subject" id="support-subject" placeholder="<?= $_txt['support-subject-input']; ?>" required>
                                    </div>
                                </div>

                                <div class="form-item">
                                    <div class="label-wrap">
                                        <label for="support-question"><?= $_txt['support-question']; ?></label>
                                    </div>
                                    <div class="input-wrap">
                                        <textarea 
                                            name="question" 
                                            id="support-question" 
                                            placeholder="<?= $_txt['support-question-textarea']; ?>" 
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div class="button-wrapper">
                                    <button class="button"><?= $_txt['support-button-send']; ?></button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

                <div class="success">
                    <span class="success__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
                    </span>
                    <span class="success__text"><?= $_txt['support-button-send']; ?></span>
                </div>

            </div>


            <div class="table">
                <div class="table-header">
                    <div class="table-header__td">ID</div>
                    <div class="table-header__td"><?= $_txt['support-theme']; ?></div>
                    <div class="table-header__td"><?= $_txt['support-create']; ?></div>
                    <div class="table-header__td"><?= $_txt['support-status']; ?></div>
                    <div class="table-header__td"></div>
                </div>
                <div class="table-body">
                    <div class="tr">
                        <div class="td">
                            <div class="td-title">ID</div>
                            <div class="td-value">8578</div>
                        </div>
                        <div class="td">
                            <div class="td-title">Тема</div>
                            <div class="td-value">Проблемы с размещением</div>
                        </div>
                        <div class="td">
                            <div class="td-title">Создано</div>
                            <div class="td-value">23.03.22 06:21</div>
                        </div>
                        <div class="td new">
                            <div class="td-title">Статус</div>
                            <div class="td-value">Новое</div>
                        </div>
                        <div class="td">
                            <div class="td-title"></div>
                            <div class="td-value">
                                <a data-href="appeal" data-template="main_inner" class="open">
                                    <span class="open__text">Открыть</span>
                                    <span class="open__icon">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                            <div class="td-title">ID</div>
                            <div class="td-value">8502</div>
                        </div>
                        <div class="td">
                            <div class="td-title">Тема</div>
                            <div class="td-value">Проблемы с выводом</div>
                        </div>
                        <div class="td">
                            <div class="td-title">Создано</div>
                            <div class="td-value">23.03.22 06:23</div>
                        </div>
                        <div class="td pending">
                            <div class="td-title">Статус</div>
                            <div class="td-value">На рассмотрении</div>
                        </div>
                        <div class="td">
                            <div class="td-title"></div>
                            <div class="td-value">
                                <a data-href="appeal" data-template="main_inner" class="open">
                                    <span class="open__text">Открыть</span>
                                    <span class="open__icon">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                            <div class="td-title">ID</div>
                            <div class="td-value">8484</div>
                        </div>
                        <div class="td">
                            <div class="td-title">Тема</div>
                            <div class="td-value">Не могу сменить пароль</div>
                        </div>
                        <div class="td">
                            <div class="td-title">Создано</div>
                            <div class="td-value">23.03.22 06:21</div>
                        </div>
                        <div class="td close">
                            <div class="td-title">Статус</div>
                            <div class="td-value">Закрыто</div>
                        </div>
                        <div class="td">
                            <div class="td-title"></div>
                            <div class="td-value">
                                <a data-href="appeal" data-template="main_inner" class="open">
                                    <span class="open__text">Открыть</span>
                                    <span class="open__icon">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    </div>
</section>
            