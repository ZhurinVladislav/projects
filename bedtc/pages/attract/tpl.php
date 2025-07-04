<?php

global $pdo, $coin;

?>


<section class="account-attract">
    <div class="container">
        <div class="content">
            <h1 class="header_1"><?= $_txt['header']; ?></h1>

            <form data-controller="surfing/add" class="form-add surfing-form" data-callback="collect_redirect">

                <div class="basic">
                    <div class="title">
                        <span class="title__icon">
                            <svg><use xlink:href="/app/images/svg_sprite.svg#settings"></use></svg>
                        </span>
                        <span class="title__text"><?= $_txt['basic_header']; ?></span>
                    </div>
                    <div class="basic-wrap">
                    
                        <div class="form-block">

                            <div class="form-item">
                                <div class="label-wrap">
                                    <label for="name_site"><?= $_txt['name_site']; ?></label>

                                    <a href="#" class="hint">
                                        <span class="hint-icon">?</span>
                                        <div class="hint-desc"><?= $_txt['name_site_hint']; ?></div>
                                    </a>
                                </div>
                                <div class="input_errors" data-error="error_pin_type">
                                    <div class="input-wrap">
                                        <input type="text" class="login_error default" name="link_name" id="link_name" required>
                                    </div>
                                    <div class="error-message" data-error-text="error_pin_type"></div>
                                </div>
                            </div>

                            <div class="form-item">
                                <div class="label-wrap">
                                    <label for="name_surfing"><?= $_txt['name_surfing']; ?></label>

                                    <a href="#" class="hint">
                                        <span class="hint-icon">?</span>
                                        <div class="hint-desc"><?= $_txt['name_surfing_hint']; ?></div>
                                    </a>

                                </div>
                                <div class="input_errors" data-error="error_pin_type">
                                    <div class="input-wrap">
                                    <textarea 
                                        name="link_desc" 
                                        id="link_desc" 
                                        placeholder="<?= $_txt['text_surfing']; ?>" 
                                        required
                                    ></textarea>
                                    </div>
                                    <div class="error-message" data-error-text="error_pin_type"></div>
                                </div>
                            </div>

                            <div class="form-item last">
                                <div class="label-wrap">
                                    <label for="link_site"><?= $_txt['link_site']; ?></label>
                                    <a href="#" class="hint">
                                        <span class="hint-icon">?</span>
                                        <div class="hint-desc"><?= $_txt['link_site_hint']; ?></div>
                                    </a>
                                </div>
                                <div class="input_errors" data-error="error_pin_type">
                                    <div class="input-wrap">
                                        <input type="text" class="login_error default" name="link_address" id="link_address" required>
                                    </div>
                                    <div class="error-message" data-error-text="error_pin_type"></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div class="additional">
                    <div class="title">
                        <span class="title__icon">
                            <svg><use xlink:href="/app/images/svg_sprite.svg#viewing"></use></svg>
                        </span>
                        <span class="title__text"><?= $_txt['additional_header']; ?></span>
                    </div>
                    <div class="additional-wrap">

                        <!--
                        <div class="tabs">
                            <label class="label-tab">
                                <input type="radio" name="tariff" id="" class="label-tab__input" value="2" checked>
                                <div class="tab"><?= $_txt['additional_tab'][1]; ?></div>
                            </label>
                            <label class="label-tab">
                                <input type="radio" name="tariff" id="" class="label-tab__input" value="1" >
                                <div class="tab"><?= $_txt['additional_tab'][0]; ?></div>
                            </label>
                        </div>
                        -->

                        <!-- тариф -->
                        <input type="hidden" name="tariff" value="2">

                        <div class="form-item-wrap">

                            <div class="form-item">
                                <div class="label-wrap">
                                    <label for="number_viewing"><?= $_txt['number_viewing']; ?></label>
                                    <a href="#" class="hint">
                                        <span class="hint-icon">?</span>
                                        <div class="hint-desc"><?= $_txt['number_viewing_hint']; ?></div>
                                    </a>
                                </div>
                                <div class="custom-select">
                                    <input type="hidden" name="number_viewing" id="number_viewing" value="500">
                                    <div class="select-input">
                                        <div class="select-input__value">500</div>
                                        <div class="select-input__arrow">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <div class="select-item" data-value="500">500</div>
                                        <div class="select-item" data-value="1000">1000</div>
                                        <div class="select-item" data-value="1500">1500</div>
                                        <div class="select-item" data-value="2000">2000</div>
                                    </div>
                                </div>
                            </div>

                            <!--
                            <div class="form-item" style="display:none;">
                                <div class="label-wrap">
                                    <label for="time_placement"><?= $_txt['time_placement']; ?></label>
                                    <a href="#" class="hint">
                                        <span class="hint-icon">?</span>
                                        <div class="hint-desc"><?= $_txt['time_placement_hint']; ?></div>
                                    </a>
                                </div>
                                <div class="custom-select">
                                    <input type="hidden" name="time_placement" id="time_placement" value="" required>
                                    <div class="select-input">
                                        <div class="select-input__value"><?= $_txt['select_from']; ?></div>
                                        <div class="select-input__arrow">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <div class="select-item" data-value="<?= $_txt['time_placement_val'][0]; ?>"><?= $_txt['time_placement_val'][0]; ?></div>
                                        <div class="select-item" data-value="<?= $_txt['time_placement_val'][1]; ?>"><?= $_txt['time_placement_val'][1]; ?></div>
                                        <div class="select-item" data-value="<?= $_txt['time_placement_val'][2]; ?>"><?= $_txt['time_placement_val'][2]; ?></div>
                                        <div class="select-item" data-value="<?= $_txt['time_placement_val'][3]; ?>"><?= $_txt['time_placement_val'][3]; ?></div>
                                    </div>
                                </div>
                            </div>
                            -->



                            <div class="form-item">
                                <div class="label-wrap">
                                    <label for="time_viewing "><?= $_txt['time_viewing']; ?></label>
                                    <a href="#" class="hint">
                                        <span class="hint-icon">?</span>
                                        <div class="hint-desc"><?=$_txt['time_viewing_hint']; ?></div>
                                    </a>
                                </div>
                                <div class="custom-select">
                                    <input type="hidden" name="time_viewing" id="time_viewing" value="10" required>
                                    <div class="select-input">
                                        <div class="select-input__value"><?=$_txt['time_viewing_val'][0]; ?></div>
                                        <div class="select-input__arrow">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <div class="select-item" data-value="10"><?=$_txt['time_viewing_val'][0]; ?></div>
                                        <div class="select-item" data-value="30"><?=$_txt['time_viewing_val'][1]; ?></div>
                                        <div class="select-item" data-value="60"><?=$_txt['time_viewing_val'][2]; ?></div>
                                        <div class="select-item" data-value="90"><?=$_txt['time_viewing_val'][3]; ?></div>
                                        <div class="select-item" data-value="120"><?=$_txt['time_viewing_val'][4]; ?></div>
                                        <div class="select-item" data-value="180"><?=$_txt['time_viewing_val'][5]; ?></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="label-wrap">
                                    <label for="language"><?= $_txt['language']; ?></label>
                                    <a href="#" class="hint">
                                        <span class="hint-icon">?</span>
                                        <div class="hint-desc"><?= $_txt['language_hint']; ?></div>
                                    </a>
                                </div>
                                <div class="custom-select">
                                    <input type="hidden" name="language" id="language" value="<?= $_txt['language_all']; ?>" required>
                                    <div class="select-input">
                                        <div class="select-input__value"><?= $_txt['language_all']; ?></div>
                                        <div class="select-input__arrow">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <div class="select-item" data-value="<?= $_txt['language_all']; ?>"><?= $_txt['language_all']; ?></div>
                                        <div class="select-item" data-value="En">En</div>
                                        <div class="select-item" data-value="Ru">Ru</div>
                                        <div class="select-item" data-value="de">De</div>
                                        <div class="select-item" data-value="pt">Pt</div>
                                        <div class="select-item" data-value="es">Es</div>
                                        <div class="select-item" data-value="fr">Fr</div>
                                        <div class="select-item" data-value="th">Th</div>
                                        <div class="select-item" data-value="Hi">Hi</div>
                                        <div class="select-item" data-value="zh">Zh</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="checkboxs">
                            <div class="checkbox-wrap">
                                <label>
                                    <input type="checkbox" name="mandatory_transition" value="1" id="mandatory_transition" >
                                    <div class="custom-checkbox">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
                                    </div>
                                </label>
                                <div class="checkbox-text"><?= $_txt['mandatory_transition']; ?></div>
                                <div class="checkbox-note" id="mandatory-cost" style="display:none">+ <span></span> <?= $coin ?></div>
                            </div>

                            <!--
                            <div class="checkbox-wrap ">
                                <label>
                                    <input type="checkbox" name="material" value="1" id="material" >
                                    <div class="custom-checkbox">
                                        <svg><use xlink:href="/app/images/svg_sprite.svg#check"></use></svg>
                                    </div>
                                </label>
                                <div class="checkbox-text"><?= $_txt['material']; ?></div>
                                <div class="checkbox-note">+0,00004500 <?= $coin ?></div>
                            </div>
                            -->
                        </div>

                        <!--
                        <div class="form-item-wrap">
                            <div class="form-item">
                                <div class="label-wrap">
                                    <label for="geotargeting"><?= $_txt['geotargeting']; ?></label>
                                    <span data-toggle="tooltip" data-placement="right" title="Геотаргетинг" class="hint">?</span>
                                </div>
                                <div class="custom-select">
                                    <input type="hidden" name="geotargeting" id="geotargeting" value="1 неделя" required>
                                    <div class="select-input">
                                        <div class="select-input__value">Все страны</div>
                                        <div class="select-input__arrow">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <div class="select-item" data-value="Все страны">Все страны</div>
                                        <div class="select-item" data-value="Все страны">НЕ все страны</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="label-wrap">
                                    <label for="devices"><?= $_txt['devices']; ?></label>
                                    <span data-toggle="tooltip" data-placement="right" title="<?= $_txt['devices']; ?>" class="hint">?</span>
                                </div>
                                <div class="custom-select">
                                    <input type="hidden" name="devices" id="devices" value="Мобильные + десктоп" required>
                                    <div class="select-input">
                                        <div class="select-input__value">Мобильные + десктоп</div>
                                        <div class="select-input__arrow">
                                            <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <div class="select-item" data-value="Мобильные + десктоп">Мобильные + десктоп</div>
                                        <div class="select-item" data-value="Мобильные">Мобильные</div>
                                        <div class="select-item" data-value="десктоп">десктоп</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        -->

                        <div class="block-price-wrap">
                            <div class="block-price">
                                <div class="block-price__title"><?= $_txt['cost']; ?></div>
                                <div class="block-price__value"><span class="all-cost"></span> <?= $coin ?></div>
                                <div class="errors" data-error="balance_buy">
                                    <div class="error-message" data-error-text="balance_buy"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="conclusion">
                    <a data-href="place-task" data-template="main_inner" class="link-back">
                        <div class="link-back__arrow">
                            <svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
                        </div>
                        <div class="link-back__text"><?= $_txt['link_back']; ?></div>
                    </a>
                    <div class="col-right">
                        <div class="conclusion-price"><?= $_txt['conclusion_price']; ?>: <span class="all-cost"></span> <?= $coin ?></div>
                        <div class="buttons">
                            <button class="btnsmall orange" data-button="save">
                                <span class="icon"><svg><use xlink:href="/app/images/svg_sprite.svg#save"></use></svg></span>
                            </button>
                            <button class="button" data-button="submit"><?= $_txt['start']; ?></button>
                        </div>
                    </div>
                </div>

                <input type="hidden" name="allcost">
                <input type="hidden" name="viewcost">

            </form>


        </div>
    </div>
</section>
