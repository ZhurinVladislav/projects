<?php

global $settings, $pdo, $coin, $site_name;

?>

<section class="crowdfunding-hero">
    <div class="container">
        <div class="content">
            <h1 class="header_0"><?= $_txt['hero-titile']; ?> <span class="color"><?= $site_name; ?></span></h1>
            <div class="block">
                <div class="block-title"><?= $_txt['hero-blok-titile']; ?></div>
                <div class="block-desc text-default">
                    <?= $_txt['hero-blok-text']; ?>
                </div>
                <img src="/app/images/crowdfunding-hero.png" alt="BitcoinETF" class="block-image">
            </div>
        </div>
    </div>
</section>


<section class="crowdfunding-services1">
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-left">
                    <h2 class="header_1"><?= $_txt['services1-title']; ?></h2>
                    <div class="content-text text-default">
                        <?= $_txt['services1-text']; ?>
                    </div>
                    <ul class="list">
                        <li class="item">
                            <div class="item-icon">
                                <img src="/app/images/crowdfunding-services1-icon1.png" alt="services">
                            </div>
                            <div class="item-text text-default"><?= $_txt['services1-item1']; ?></div>
                        </li>
                        <li class="item">
                            <div class="item-icon">
                                <img src="/app/images/crowdfunding-services1-icon2.png" alt="services">
                            </div>
                            <div class="item-text text-default"><?= $_txt['services1-item2']; ?></div>
                        </li>
                        <li class="item">
                            <div class="item-icon">
                                <img src="/app/images/crowdfunding-services1-icon3.png" alt="services">
                            </div>
                            <div class="item-text text-default"><?= $_txt['services1-item3']; ?></div>
                        </li>
                        <li class="item">
                            <div class="item-icon">
                                <img src="/app/images/crowdfunding-services1-icon4.png" alt="services">
                            </div>
                            <div class="item-text text-default"><?= $_txt['services1-item4']; ?></div>
                        </li>
                    </ul>
                    <div class="text-default">
                        <?= $_txt['services1-text-after']; ?>
                    </div>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-services1.png" alt="services">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-services2">
    <div class="container">
        <div class="content">
            
            <div class="row">
                <div class="col-left">
                <h2 class="header_1"><?= $_txt['services2-title']; ?></h2>
                <div class="content-text text-default">
                    <?= $_txt['services2-text']; ?>
                </div>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-services2.png" alt="services">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-services3">
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-left">
                    <h2 class="header_1 title-decore"><?= $_txt['services3-title']; ?></h2>
                    <div class="content-text text-default">
                        <?= $_txt['services3-text']; ?>
                    </div>
                    <div class="list-title"><?= $_txt['services3-list-title']; ?></div>
                    <div class="list-wrap">
                        <img src="/app/images/crowdfunding-services3-money.png" alt="money" class="list-image">
                        <ul class="list">
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/people.png" alt="services">
                                </div>
                                <div class="item-title">5 487 +</div>
                                <div class="item-text"><?= $_txt['services3-item1']; ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/document.png" alt="services">
                                </div>
                                <div class="item-title">2 000 487 +</div>
                                <div class="item-text"><?= $_txt['services3-item2']; ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/wifi.png" alt="services">
                                </div>
                                <div class="item-title">1 607 +</div>
                                <div class="item-text"><?= $_txt['services3-item3']; ?></div>
                            </li>
                            <li class="item">
                                <div class="item-icon">
                                    <img src="/app/images/pc.png" alt="services">
                                </div>
                                <div class="item-title">12 237</div>
                                <div class="item-text"><?= $_txt['services3-item4']; ?></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-services3.png" alt="services">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-services4">
    <div class="container">
        <div class="content">
            
            <div class="row">
                <div class="col-left">
                <h2 class="header_1 title-decore"><?= $_txt['services4-title']; ?></h2>
                <div class="content-text text-default">
                    <?= $_txt['services4-text']; ?>
                </div>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-services4.png" alt="services">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-plan">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['plan-title']; ?></h2>
            </div>
            <div class="list-wrap">
                <img src="/app/images/crowdfunding-plan1.png" alt="image1" class="image1">
                <img src="/app/images/crowdfunding-plan2.png" alt="image2" class="image2">
                <img src="/app/images/crowdfunding-plan3.png" alt="image3" class="image3">
                <img src="/app/images/crowdfunding-plan4.png" alt="image4" class="image4">
                <div class="list">
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item1']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text1']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item2']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text2']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item3']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text3']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item4']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text4']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item5']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text5']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item6']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text6']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item7']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text7']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item8']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text8']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item9']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text9']; ?>
                        </div>
                    </div>
                    <div class="item">
                        <img src="/app/images/svg/check2.svg" alt="check" class="item-icon">
                        <div class="item-title"><?= $_txt['plan-item10']; ?></div>
                        <div class="item-text">
                            <?= $_txt['plan-text10']; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-info">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['info-title']; ?></h2>
            </div>
            <div class="text-default">
                <?= $_txt['info-text']; ?>
            </div>
            <a href="#" class="link"><?= $_txt['info-link']; ?></a>
        </div>
    </div>
</section>

<section class="crowdfunding-roadmap">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['roadmap-title']; ?></h2>
            </div>
            <div class="text-default">
                <?= $_txt['roadmap-text']; ?>
            </div>
            <div class="list">
                <div class="item-wrap">
                    <div class="item-step">
                        <div class="item-step__title">1 step</div>
                        <div class="item-step__date"><?= $_txt['roadmap-item1-date']; ?></div>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <div class="line"></div>
                        <div class="item-block">
                            <span><?= $_txt['roadmap-item1-1']; ?></span>
                            <span><?= $_txt['roadmap-item1-2']; ?></span>
                            <span><?= $_txt['roadmap-item1-3']; ?></span>
                        </div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <div class="item-step__title">2 step</div>
                        <div class="item-step__date"><?= $_txt['roadmap-item2-date']; ?></div>
                    </div>
                    <div class="item">
                        <div class="item-block">
                            <span><?= $_txt['roadmap-item2-1']; ?></span>
                            <span><?= $_txt['roadmap-item2-2']; ?></span>
                            <span><?= $_txt['roadmap-item2-3']; ?></span>
                            <span><?= $_txt['roadmap-item2-4']; ?></span>
                        </div>
                        <div class="line"></div>
                        <div class="circle"></div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <div class="item-step__title">3 step</div>
                        <div class="item-step__date"><?= $_txt['roadmap-item3-date']; ?></div>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <div class="line"></div>
                        <div class="item-block">
                            <span><?= $_txt['roadmap-item3-1']; ?></span>
                            <span><?= $_txt['roadmap-item3-2']; ?></span>
                            <span><?= $_txt['roadmap-item3-3']; ?></span>
                        </div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <div class="item-step__title">4 step</div>
                        <div class="item-step__date"><?= $_txt['roadmap-item4-date']; ?></div>
                    </div>
                    <div class="item">
                        <div class="item-block">
                            <span><?= $_txt['roadmap-item4-1']; ?></span>
                            <span><?= $_txt['roadmap-item4-2']; ?></span>
                        </div>
                        <div class="line"></div>
                        <div class="circle"></div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <div class="item-step__title">5 step</div>
                        <div class="item-step__date"><?= $_txt['roadmap-item5-date']; ?></div>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <div class="line"></div>
                        <div class="item-block">
                            <span><?= $_txt['roadmap-item5-1']; ?></span>
                            <span><?= $_txt['roadmap-item5-2']; ?></span>
                        </div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <div class="item-step__title">6 step</div>
                        <div class="item-step__date"><?= $_txt['roadmap-item6-date']; ?></div>
                    </div>
                    <div class="item">
                        <div class="item-block">
                            <span><?= $_txt['roadmap-item6-1']; ?></span>
                        </div>
                        <div class="line"></div>
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<section class="crowdfunding-budget">
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-left">
                <h2 class="header_1 title-decore"><?= $_txt['budget-title']; ?></h2>
                <div class="content-text text-default">
                    <?= $_txt['budget-text']; ?>
                </div>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-budget.png" alt="budget">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-expenses">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['expenses-title']; ?></h2>
            </div>
            <ul class="list">
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses1.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item1-title']; ?></div>
                    <div class="item-text">
                        <?= $_txt['expenses-item1-text']; ?>
                    </div>
                </li>
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses2.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item2-title']; ?></div>
                    <div class="item-text"><?= $_txt['expenses-item2-text']; ?></div>
                </li>
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses3.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item3-title']; ?></div>
                    <div class="item-text"><?= $_txt['expenses-item3-text']; ?></div>
                </li>
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses4.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item4-title']; ?></div>
                    <div class="item-text"><?= $_txt['expenses-item4-text']; ?></div>
                </li>
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses5.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item5-title']; ?></div>
                    <div class="item-text"><?= $_txt['expenses-item5-text']; ?></div>
                </li>
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses6.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item6-title']; ?></div>
                    <div class="item-text"><?= $_txt['expenses-item6-text']; ?></div>
                </li>
            </ul>
        </div>
    </div>
</section>

<section class="crowdfunding-token">
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-token.png" alt="budget">
                    </div>
                </div>
                <div class="col-left">
                    <h2 class="header_1 title-decore"><?= $_txt['token-title']; ?></h2>
                    <div class="content-text text-default">
                        <?= $_txt['token-text']; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-expenses">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['expenses-title']; ?></h2>
            </div>
            <ul class="list">
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses2-1.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item1']; ?></div>
                </li>
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses2-2.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item2']; ?></div>
                </li>
                <li class="item">
                    <div class="item-image">
                        <img src="/app/images/crowdfunding-expenses2-3.png" alt="expenses">
                    </div>
                    <div class="item-title"><?= $_txt['expenses-item3']; ?></div>
                </li>
            </ul>
        </div>
    </div>
</section>

<section class="crowdfunding-investment">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['investment-title']; ?></h2>
            </div>
            <div class="list">
                <div class="item-wrap">
                    <div class="item-step">
                        <?= $_txt['investment-item1']; ?>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <div class="line"></div>
                        <div class="item-block item-block__big">
                            21 000 000 <?= $coin; ?>
                        </div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <?= $_txt['investment-item2']; ?>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <div class="line"></div>
                        <div class="item-block">
                            <div class="item-block__title">0.00002 <?= $coin; ?></div>
                            <div class="item-block__text"><?= $_txt['investment-item-text1']; ?></div>
                        </div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <?= $_txt['investment-item3']; ?>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <div class="line"></div>
                        <div class="item-block">
                            <div class="item-block__title">0.000016 <?= $coin; ?></div>
                            <div class="item-block__text"><?= $_txt['investment-item-text1']; ?></div>
                        </div>
                    </div>
                </div>
                <div class="item-wrap">
                    <div class="item-step">
                        <?= $_txt['investment-item4']; ?>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <div class="line"></div>
                        <div class="item-block">
                            <div class="item-block__title">5 250 000</div>
                            <div class="item-block__text"><?= $_txt['investment-item-text2']; ?></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-default">
                <?= $_txt['investment-text']; ?>
            </div>

        </div>
    </div>
</section>

<section class="crowdfunding-addition">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['addition-title']; ?></h2>
            </div>
            <ul class="list">
                <li class="item">
                    <div class="item-title">100-1000 <br><?= $_txt['addition-t']; ?></div>
                    <ul class="item-list">
                        <div class="item-item"><?= $_txt['addition-item1-1']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item1-2']; ?></div>
                    </ul>
                </li>

                <li class="item">
                    <div class="item-title">1000-5000 <br><?= $_txt['addition-t']; ?></div>
                    <ul class="item-list">
                        <div class="item-item"><?= $_txt['addition-item2-1']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item2-2']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item2-3']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item2-4']; ?></div>
                    </ul>
                </li>

                <li class="item">
                    <div class="item-title">5000-10000 <br><?= $_txt['addition-t']; ?></div>
                    <ul class="item-list">
                        <div class="item-item"><?= $_txt['addition-item3-1']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item3-2']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item3-3']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item3-4']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item3-5']; ?></div>
                    </ul>
                </li>

                <li class="item">
                    <div class="item-title">10001+ <br><?= $_txt['addition-t']; ?></div>
                    <ul class="item-list">
                        <div class="item-item"><?= $_txt['addition-item4-1']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item4-2']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item4-3']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item4-4']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item4-5']; ?></div>
                        <div class="item-item"><?= $_txt['addition-item4-6']; ?></div>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</section>

<section class="crowdfunding-distribution">
    <div class="container">
        <div class="content">
            <div style="text-align:center">
                <h2 class="header_1 title-decore"><?= $_txt['distribution-title']; ?></h2>
            </div>
            <div class="list-wrap">
                <img src="/app/images/crowdfunding-distribution.png" alt="distribution" class="image">
                <div class="list">
                    <div class="item item-left">
                        <div class="item-wrap">
                            <div class="item-title">25%</div>
                            <div class="item-text">
                                <?= $_txt['distribution-item1']; ?>
                            </div>
                        </div>
                        <div class="item-circle"></div>
                        <div class="item-line"></div>
                    </div>
                    <div class="item item-left">
                        <div class="item-wrap">
                            <div class="item-title">10%</div>
                            <div class="item-text">
                                <?= $_txt['distribution-item2']; ?>
                            </div>
                        </div>
                        <div class="item-circle"></div>
                        <div class="item-line"></div>
                    </div>
                    <div class="item item-left">
                        <div class="item-wrap">
                            <div class="item-title">20%</div>
                            <div class="item-text">
                                <?= $_txt['distribution-item3']; ?>
                            </div>
                        </div>
                        <div class="item-circle"></div>
                        <div class="item-line"></div>
                    </div>


                    <div class="item item-right">
                        <div class="item-line"></div>
                        <div class="item-circle"></div>
                        <div class="item-wrap">
                            <div class="item-title">25%</div>
                            <div class="item-text">
                                <?= $_txt['distribution-item4']; ?>
                            </div>
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="item-line"></div>
                        <div class="item-circle"></div>
                        <div class="item-wrap">
                            <div class="item-title">10%</div>
                            <div class="item-text">
                                <?= $_txt['distribution-item5']; ?>
                            </div>
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="item-line"></div>
                        <div class="item-circle"></div>
                        <div class="item-wrap">
                            <div class="item-title">10%</div>
                            <div class="item-text">
                                <?= $_txt['distribution-item6']; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-sales">
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-left">
                <h2 class="header_1 title-decore"><?= $_txt['sales-title']; ?></h2>
                <div class="content-text text-default">
                    <?= $_txt['sales-text']; ?>
                </div>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-sales.png" alt="sales">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-team">
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-left">
                    <h2 class="header_1 title-decore"><?= $_txt['team-title']; ?></h2>
                    <div class="content-text text-default">
                        <?= $_txt['team-text']; ?>
                    </div>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-team.png" alt="budget">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-seriously">
    <div class="container">
        <div class="content">
            <h2 class="header_1 title-decore"><?= $_txt['seriously-title']; ?></h2>
            <div class="block">
                <div class="list">
                    <div class="item text-default">
                        <?= $_txt['seriously-text1']; ?>
                    </div>
                    <div class="item text-default">
                        <?= $_txt['seriously-text2']; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="crowdfunding-invest">
    <div class="container">
        <div class="content">
            <div class="row">
                <div class="col-left">
                    <h2 class="header_1 title-decore"><?= $_txt['invest-title']; ?></h2>
                    <a href="#" class="button"><?= $_txt['invest-button']; ?></a>
                </div>
                <div class="col-right">
                    <div class="image-wrapper round-decore">
                        <img src="/app/images/crowdfunding-invest.png" alt="sales">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



    