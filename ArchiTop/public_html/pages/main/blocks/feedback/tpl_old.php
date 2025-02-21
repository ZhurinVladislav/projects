<?php
global $conn;

$data = json_decode(file_get_contents("php://input"), true);
$vote_option = $data['vote'];
$user_ip = $_SERVER['REMOTE_ADDR'];

// Проверяем, голосовал ли пользователь
$sql_check = "SELECT * FROM votes WHERE user_ip = ?";
$stmt = $conn->prepare($sql_check);
$stmt->bind_param("s", $user_ip);
$stmt->execute();
$result_check = $stmt->get_result();

if ($result_check->num_rows > 0) {
    // Пользователь уже голосовал, возвращаем статистику
    $sql_stats = "
        SELECT vote_options.option_name, COUNT(votes.vote_option) AS count,
        (COUNT(votes.vote_option) * 100 / (SELECT COUNT(*) FROM votes)) AS percentage
        FROM vote_options
        LEFT JOIN votes ON vote_options.option_name = votes.vote_option
        GROUP BY vote_options.option_name
    ";

    $result_stats = $conn->query($sql_stats);
    $statistics = [];

    while ($row = $result_stats->fetch_assoc()) {
        $statistics[] = [
            'option' => $row['option_name'],
            'count' => (int)$row['count'],
            'percentage' => round($row['percentage'], 2)
        ];
    }

    // echo json_encode([
    //     'alreadyVoted' => true,
    //     'statistics' => $statistics
    // ]);
} else {
    // Пользователь голосует впервые, сохраняем голос
    $sql_insert = "INSERT INTO votes (user_ip, vote_option) VALUES (?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("ss", $user_ip, $vote_option);
    $stmt_insert->execute();

    // Возвращаем успех
    // echo json_encode(['alreadyVoted' => false]);
}

$conn->close();
?>


<section class="main-section__feedback feedback section-reset">
    <div class="feedback__container container">
        <h2 class="feedback__title-hidden text-hidden">
            Что Вас большего интересует при выборе архитектурного
            бюро?
        </h2>
        <div class="feedback__content-wrap">
            <div
                class="feedback__img"
                data-image="./app/img/feedback/img-1.png"></div>
            <div class="feedback__form-wrap">
                <h3 class="feedback__title h-2">
                    На&nbsp;что вы&nbsp;обращаете внимание при
                    выборе архитектурного бюро?
                </h3>
                <p class="feedback__text">
                    Отметьте один пункт, который на&nbsp;ваш взгляд
                    самый важный
                </p>
                <form
                    id="feedback-form"
                    class="feedback__form feedback-form">
                    <ul class="feedback-form__list">
                        <li class="feedback-form__list-item">
                            <label
                                class="feedback-form__label custom-radio">
                                <input
                                    type="radio"
                                    class="custom-radio__input"
                                    value="Портфолио и опыт"
                                    name="choice" />
                                <span class="custom-radio__text">
                                    Портфолио и&nbsp;опыт
                                </span>
                            </label>
                        </li>
                        <li class="feedback-form__list-item">
                            <label
                                class="feedback-form__label custom-radio">
                                <input
                                    type="radio"
                                    class="custom-radio__input"
                                    name="choice"
                                    value="Профессионализм
                                                и экспертиза"
                                    checked />
                                <span class="custom-radio__text">
                                    Профессионализм
                                    и&nbsp;экспертиза
                                </span>
                            </label>
                        </li>
                        <li class="feedback-form__list-item">
                            <label
                                class="feedback-form__label custom-radio">
                                <input
                                    type="radio"
                                    class="custom-radio__input"
                                    name="choice"
                                    value="Способность предлагать
                                                уникальные, креативные решения" />
                                <span class="custom-radio__text">
                                    Способность предлагать
                                    уникальные, креативные решения
                                </span>
                            </label>
                        </li>
                        <li class="feedback-form__list-item">
                            <label
                                class="feedback-form__label custom-radio">
                                <input
                                    type="radio"
                                    class="custom-radio__input"
                                    name="choice"
                                    value="Эффективное управление проектом
                                                и соблюдение сроков" />
                                <span class="custom-radio__text">
                                    Эффективное управление проектом
                                    и&nbsp;соблюдение сроков
                                </span>
                            </label>
                        </li>
                        <li class="feedback-form__list-item">
                            <label
                                class="feedback-form__label custom-radio">
                                <input
                                    type="radio"
                                    class="custom-radio__input"
                                    name="choice"
                                    value="Готовность адаптировать проект
                                                под меняющиеся требования" />
                                <span class="custom-radio__text">
                                    Готовность адаптировать проект
                                    под меняющиеся требования
                                </span>
                            </label>
                        </li>
                        <li class="feedback-form__list-item">
                            <label
                                class="feedback-form__label custom-radio">
                                <input
                                    type="radio"
                                    class="custom-radio__input"
                                    name="choice"
                                    value="Положительный имидж
                                                и авторитет бюро в
                                                профессиональном сообществе" />
                                <span class="custom-radio__text">
                                    Положительный имидж
                                    и&nbsp;авторитет бюро в
                                    профессиональном сообществе
                                </span>
                            </label>
                        </li>
                        <li class="feedback-form__list-item">
                            <label
                                class="feedback-form__label custom-radio">
                                <input
                                    type="radio"
                                    class="custom-radio__input"
                                    name="choice"
                                    value="Наличие наград, премий
                                                и других профессиональных
                                                достижений" />
                                <span class="custom-radio__text">
                                    Наличие наград, премий
                                    и&nbsp;других профессиональных
                                    достижений
                                </span>
                            </label>
                        </li>
                    </ul>
                    <button
                        class="feedback-form__btn btn"
                        aria-label="Отправить заявку">
                        Отравить
                    </button>
                </form>
                <div id="resultSection" style="display:none;">
                    <h3>Результаты голосования:</h3>
                    <div id="voteResults"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- POPUP-SUCCESS -->
<!-- <div id="popup-success" class="main-section__popup popup">
    <div class="popup__box js-popup-box">
        <button
            aria-label="Закрыть всплывающие окно"
            class="popup__btn-close js-popup-close"></button>
        <h3 class="popup__title js-popup-title"></h3>
        <p class="popup__text js-popup-text"></p>
    </div>
</div> -->

<script>
    const form = document.getElementById('feedback-form');

    if (form || form !== null) {
        form.addEventListener('submit', ev => {
            ev.preventDefault();
        })
    }
</script>

<!--
<script>
    document.getElementById('feedback-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedOption = document.querySelector('input[name="choice"]:checked');

        if (selectedOption) {
            const voteValue = selectedOption.value;

            fetch('', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        vote: voteValue
                    })
                })
                .then(response => response.text()) // Считываем ответ как текст
                .then(data => {
                    // Попробуем обработать HTML-ответ
                    if (data.includes('<html>') || data.includes('<!DOCTYPE html>')) {
                        console.warn('Сервер вернул HTML. Обрабатываю...');
                        displayFallbackMessage(data); // Обрабатываем HTML-ответ
                    } else {
                        try {
                            // Пробуем разобрать JSON, если это возможно
                            const jsonResponse = JSON.parse(data);
                            if (jsonResponse.alreadyVoted) {
                                displayStatistics(jsonResponse.statistics);
                            } else {
                                alert('Ваш голос принят!');
                            }
                        } catch (error) {
                            console.error('Ошибка обработки ответа:', error);
                        }
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }
    });

    // Функция для отображения fallback-сообщения из HTML
    function displayFallbackMessage(htmlContent) {
        const resultSection = document.getElementById('resultSection');
        const resultsContainer = document.getElementById('voteResults');

        // Вставляем HTML-контент в контейнер (предварительно очищая его)
        resultsContainer.innerHTML = htmlContent;
        resultSection.style.display = 'block';
    }

    // Функция для отображения статистики
    function displayStatistics(statistics) {
        const resultSection = document.getElementById('resultSection');
        const resultsContainer = document.getElementById('voteResults');
        resultsContainer.innerHTML = ''; // Очищаем предыдущие результаты

        statistics.forEach(stat => {
            const statElement = document.createElement('p');
            statElement.textContent = `${stat.option}: ${stat.percentage}% (${stat.count} голосов)`;
            resultsContainer.appendChild(statElement);
        });

        resultSection.style.display = 'block';
    }
</script>