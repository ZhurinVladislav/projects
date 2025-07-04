<div class="hero__form-wrap search">
    <form class="hero__form search-form" action="search" method="get">
        <label for="search-input" class="search-form__input-wrap form-field">
            <input
                id="search-input"
                class="form-field__input"
                type="text"
                name="query"
                placeholder="Поиск услуг"
                autocomplete="off"
                required>
            <svg class="form-field__icon">
                <use xlink:href="/app/img/icons/icons.svg#search"></use>
            </svg>
        </label>
        <button class="search-form__btn btn" type="submit">Найти</button>
    </form>
    <ul
        id="search-results"
        class="search__list search-result">
    </ul>
</div>