<?php
load_view('templates/base/header', $template);
?>

<div id="main-external" class="main-external">
    <div id="main-placeholder">
        <main id="main-block" class="main-section">
            <?php
            if (isset($content_path)) {
                require $content_path;
            }
            ?>
            <!-- POPUP -->
            <!-- <div id="popup-feedback" class="main-section__popup popup">
                <div class="popup__box js-popup-box">
                    <button
                        aria-label="Закрыть всплывающие окно"
                        class="popup__btn-close js-popup-close"></button>
                    <h3 class="popup__title">Связаться с нами</h3>
                    <form class="popup__form">
                        <label
                            for="e-mail"
                            class="popup__form-label form-field form-field_inv">
                            <input
                                id="e-mail"
                                class="form-field__input"
                                type="email"
                                placeholder="E-mail"
                                required />
                            <svg class="form-field__icon">
                                <use
                                    xlink:href="/app/img/icons/icons.svg#email"></use>
                            </svg>
                        </label>
                        <label
                            for="phone"
                            class="popup__form-label form-field form-field_inv">
                            <input
                                id="phone"
                                class="form-field__input"
                                type="text"
                                placeholder="Телефон"
                                required />
                            <svg class="form-field__icon">
                                <use
                                    xlink:href="/app/img/icons/icons.svg#phone"></use>
                            </svg>
                        </label>
                        <button class="popup__form-btn btn">Отправить</button>
                    </form>
                </div>
            </div> -->
        </main>
    </div>
</div>

<?php
load_view('templates/base/footer', $template);
?>