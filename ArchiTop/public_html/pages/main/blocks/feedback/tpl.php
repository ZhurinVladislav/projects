<?php
global $pdo;

require_once './functions/getUserIP.php';

$ipAddress = getUserIP();

// Проверка, голосовал ли пользователь
$stmt = $pdo->prepare("SELECT * FROM user_votes WHERE ip_address = :ip");
$stmt->execute(['ip' => $ipAddress]);
$hasVoted = $stmt->fetch() !== false;

// Получение статистики голосования
$votes = $pdo->query("SELECT * FROM votes")->fetchAll(PDO::FETCH_ASSOC);
?>

<section class="main-section__feedback feedback section-reset">
    <div class="feedback__container container">
        <div class="feedback__content-wrap">
            <div
                class="feedback__img"
                data-image="./app/img/feedback/img-1.png"></div>

            <div id="feedback-result" class="feedback__right">
                <?php if (!$hasVoted): ?>
                    <div class="feedback__form-wrap">
                        <h3 class="feedback__title h-2">
                            На&nbsp;что вы&nbsp;обращаете внимание при
                            выборе архитектурного бюро?
                        </h3>
                        <p class="feedback__text">
                            Отметьте один пункт, который на&nbsp;ваш
                            взгляд самый важный
                        </p>
                        <form
                            id="feedback-form"
                            class="feedback__form feedback-form" method="post">
                            <ul class="feedback-form__list">
                                <?php foreach ($votes as $vote): ?>
                                    <li class="feedback-form__list-item">
                                        <label
                                            class="feedback-form__label custom-radio">
                                            <input
                                                type="radio"
                                                class="custom-radio__input"
                                                value="<?= $vote['id'] ?>"
                                                name="vote" required />
                                            <span
                                                class="custom-radio__text">
                                                <?= htmlspecialchars($vote['option_name']) ?>
                                            </span>
                                        </label>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                            <button
                                class="feedback-form__btn btn"
                                type="submit"
                                aria-label="Отправить заявку">
                                Отравить
                            </button>
                        </form>
                    </div>
                <?php else: ?>
                    <div class="feedback__result">
                        <h3 class="feedback__title h-2">
                            На&nbsp;что больше всего обращают внимание
                            при выборе архитектурного бюро
                        </h3>
                        <p class="feedback__text">
                            Спасибо за&nbsp;ваше мнение!
                        </p>
                        <ul class="feedback__result-list">
                            <?php
                            $totalVotes = array_sum(array_column($votes, 'count'));
                            foreach ($votes as $vote):
                                $percentage = $totalVotes ? round($vote['count'] / $totalVotes * 100) : 0;
                            ?>
                                <li class="feedback__result-list-item feedback-result-item">
                                    <div class="feedback-result-item__left">
                                        <h4
                                            class="feedback-result-item__title">
                                            <?= htmlspecialchars($vote['option_name']) ?>
                                        </h4>
                                        <div
                                            class="feedback-result-item__line-wrap">
                                            <div
                                                class="feedback-result-item__line"
                                                style="width: <?= $percentage ?>%;"></div>
                                        </div>
                                    </div>
                                    <div
                                        class="feedback-result-item__stats">
                                        <svg
                                            class="feedback-result-item__stats-icon">
                                            <use
                                                xlink:href="./app/img/icons/icons.svg#men"></use>
                                        </svg>
                                        <p
                                            class="feedback-result-item__stats-text">
                                            <?= $vote['count'] ?> (<?= $percentage ?>%)
                                        </p>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>

                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>