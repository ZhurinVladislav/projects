<?php

global $pdo, $coin;

?>

<section class="account-viewing">
    <div class="container">
        <div class="content">

            <h1 class="header_1"><?= $_txt['viewing-title']; ?></h1>

            <div class="viewing">
                <div class="viewing-title">
                    <span class="viewing-title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#viewing"></use></svg>
                    </span>
                    <span class="viewing-title__text"><?= $_txt['viewing-title']; ?></span>
                </div>
                <div class="viewing-wrap">
                    <div class="rightnow">
                        <div class="rightnow-title"><?= $_txt['rightnow-title']; ?></div>
                        <a data-href="surfing" data-template="main_inner" class="button button-mobile"><?= $_txt['earn-text']; ?></a>

                        <div class="spoller">

                            <div class="rightnow-text">
                                <?= $_txt['rightnow-text']; ?>
                            </div>
                            <div class="rightnow-note"><?= $_txt['rightnow-note']; ?></div>
                        
                            <div class="rightnow-table">
                                <div class="rightnow-thead">
                                    <div class="rightnow-tr">
                                        <div class="rightnow-th"><?= $_txt['rightnow-time']; ?></div>
                                        <div class="rightnow-th">bitcoin</div>
                                    </div>
                                </div>
                                <div class="rightnow-tbody">
                                    <div class="rightnow-tr">
                                        <div class="rightnow-td">
                                            <span class="rightnow-td__icon">
                                                <svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
                                            </span>
                                            <span class="rightnow-td__text">15 <?= $_txt['rightnow-second']; ?></span>
                                        </div>
                                        <div class="rightnow-td">0,00000050</div>
                                    </div>
                                    <div class="rightnow-tr">
                                        <div class="rightnow-td">
                                            <span class="rightnow-td__icon">
                                                <svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
                                            </span>
                                            <span class="rightnow-td__text">30 <?= $_txt['rightnow-second']; ?></span>
                                        </div>
                                        <div class="rightnow-td">0,00000100</div>
                                    </div>
                                    <div class="rightnow-tr">
                                        <div class="rightnow-td">
                                            <span class="rightnow-td__icon">
                                                <svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
                                            </span>
                                            <span class="rightnow-td__text">45 <?= $_txt['rightnow-second']; ?></span>
                                        </div>
                                        <div class="rightnow-td">0,000000150</div>
                                    </div>
                                    <div class="rightnow-tr">
                                        <div class="rightnow-td">
                                            <span class="rightnow-td__icon">
                                                <svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
                                            </span>
                                            <span class="rightnow-td__text">60 <?= $_txt['rightnow-second']; ?></span>
                                        </div>
                                        <div class="rightnow-td">0,00000260</div>
                                    </div>
                                </div>
                            </div>

                            <div class="rightnow-list">
                                <div class="rightnow-item">
                                    <span class="rightnow-item__icon">
                                        <img src="/app/images/services-icon11.png" alt="services">
                                    </span>
                                    <span class="rightnow-item__text">
                                        <?= $_txt['rightnow-item1']; ?>
                                    </span>
                                </div>
                                <div class="rightnow-item">
                                    <span class="rightnow-item__icon">
                                        <img src="/app/images/services-icon13.png" alt="services">
                                    </span>
                                    <span class="rightnow-item__text">
                                        <?= $_txt['rightnow-item2']; ?>
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
                            <img src="/app/images/earn.png" alt="">
                        </div>
                        <a data-href="surfing" data-template="main_inner" class="button"><?= $_txt['earn-text']; ?></a>
                    </div>
                </div>
            </div>

            <div class="earnings">
                <div class="earnings-title">
                    <span class="earnings-title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#earnings"></use></svg>
                    </span>
                    <span class="earnings-title__text"><?= $_txt['earnings-title']; ?></span>
                </div>
                <ul class="earnings-list">
                    <li class="earnings-item">
                        <span class="earnings-item__day"><?= $_txt['earnings-day1']; ?></span>
                        <span class="earnings-item__btc">0,00000050 <?= $coin; ?>;</span>
                    </li>
                    <li class="earnings-item">
                        <span class="earnings-item__day"><?= $_txt['earnings-day2']; ?></span>
                        <span class="earnings-item__btc">0,00000150 <?= $coin; ?>;</span>
                    </li>
                    <li class="earnings-item">
                        <span class="earnings-item__day"><?= $_txt['earnings-day3']; ?></span>
                        <span class="earnings-item__btc">0,00002350 <?= $coin; ?>;</span>
                    </li>
                    <li class="earnings-item">
                        <span class="earnings-item__day"><?= $_txt['earnings-day4']; ?></span>
                        <span class="earnings-item__btc">0,00066750 <?= $coin; ?>;</span>
                    </li>
                </ul>
            </div>

            <div class="howearnings">
                <div class="howearnings-title">
                    <span class="howearnings-title__icon">
                        <svg><use xlink:href="/app/images/svg_sprite.svg#howearnings"></use></svg>
                    </span>
                    <span class="howearnings-title__text"><?= $_txt['howearnings-title']; ?></span>
                </div>

                <div class="referral">
                    <div class="referral-title"><?= $_txt['referral-title']; ?></div>
                    <div class="referral-item">
                        <span class="referral-item__icon">
                            <img src="/app/images/services-icon15.png" alt="services">
                        </span>
                        <span class="referral-item__text">
                            <?= $_txt['referral-item__text']; ?>
                        </span>
                    </div>
                    <div class="referral-text">
                        <?= $_txt['referral-text']; ?>
                    </div>
                    <a data-href="referrals" data-template="main_inner" class="button-invert"><?= $_txt['referral-btn']; ?></a>
                    <div class="referral-image image-wrapper">
                        <img src="/app/images/referral-image.png" alt="referral">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
            