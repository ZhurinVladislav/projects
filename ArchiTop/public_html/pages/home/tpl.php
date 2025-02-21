<?php

global $pdo, $coin;

?>

<!-- <h1 class="header-inner"><?= $_txt['header']; ?></h1> -->
<section class="hero section-reset">
	<div
		class="hero__bg-img"
		data-image="./app/img/hero/bg-img.jpg"></div>
	<div class="hero__container container">
		<div class="hero__content-top">
			<div
				class="hero__bg-img hero__bg-img_ph"
				data-image="./app/img/hero/bg-img.jpg"></div>
			<h1 class="hero__title h-1">
				Архитектурные бюро Краснодарского края
			</h1>
			<p class="hero__text">
				Рейтинг лучших, проверенных архитектурных компаний
				и&nbsp;проектных организаций с&nbsp;высокой
				экспертизой в&nbsp;отрасли
			</p>
			<form class="hero__form search-form">
				<label
					for="input-search"
					class="search-form__input-wrap form-field">
					<input
						id="input-search"
						class="form-field__input"
						type="text"
						placeholder="Поиск услуг" />
					<svg class="form-field__icon">
						<use
							xlink:href="/app/img/icons/icons.svg#search"></use>
					</svg>
				</label>
				<button class="search-form__btn btn">Найти</button>
			</form>
		</div>

		<ul class="hero__advantages">
			<li class="hero__advantages-item advantages-item">
				<span class="advantages-item__num">28</span>
				<p class="advantages-item__text">
					Архитектурных бюро Краснодарского края
				</p>
			</li>
			<li class="hero__advantages-item advantages-item">
				<span class="advantages-item__num">250+</span>
				<p class="advantages-item__text">
					Отзывов от&nbsp;пользователей
				</p>
			</li>
			<li class="hero__advantages-item advantages-item">
				<span class="advantages-item__num">54+</span>
				<p class="advantages-item__text">
					Архитектурных направления
				</p>
			</li>
		</ul>
	</div>
</section>