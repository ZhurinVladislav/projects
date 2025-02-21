<?php
global $pdo;

// Включение ошибок для отладки
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Обработка POST-запроса
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data['vote'])) {
    $vote = intval($data['vote']);

    // Проверяем, голосовал ли пользователь
    if (isset($_SESSION['voted']) && $_SESSION['voted'] === true) {
        echo json_encode(['success' => false, 'message' => 'Вы уже голосовали']);
        exit;
    }

    // Обновляем голос в базе данных
    $stmt = $conn->prepare("UPDATE votes SET count = count + 1 WHERE id = ?");
    $stmt->bind_param("i", $vote);

    if ($stmt->execute()) {
        $_SESSION['voted'] = true;

        // Получение обновленных данных для отображения статистики
        $result = $conn->query("SELECT option_name, count, ROUND((count / (SELECT SUM(count) FROM votes) * 100), 2) AS percentage FROM votes");
        $votes = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode(['success' => true, 'votes' => $votes]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка обновления базы данных']);
    }
    $stmt->close();
    $conn->close();
    exit;
}

// Получение статистики (если форма не отображается)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT option_name, count, ROUND((count / (SELECT SUM(count) FROM votes) * 100), 2) AS percentage FROM votes");
    $votes = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['success' => true, 'votes' => $votes]);
    exit;
}
?>

<section class="main-section__feedback feedback section-reset">
    <div class="feedback__container container">
        <div class="feedback__content-wrap">
            <div
                class="feedback__img"
                data-image="./app/img/feedback/img-1.png"></div>

            <div id="app" class="feedback__right">
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
                        id="voteForm"
                        class="feedback__form feedback-form">
                        <ul class="feedback-form__list">
                            <li class="feedback-form__list-item">
                                <label
                                    class="feedback-form__label custom-radio">
                                    <input
                                        type="radio"
                                        class="custom-radio__input"
                                        name="vote" value="1" />
                                    <span
                                        class="custom-radio__text">
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
                                        name="vote"
                                        value="2"
                                        checked />
                                    <span
                                        class="custom-radio__text">
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
                                        name="vote"
                                        value="3" />
                                    <span
                                        class="custom-radio__text">
                                        Способность предлагать
                                        уникальные, креативные
                                        решения
                                    </span>
                                </label>
                            </li>
                            <li class="feedback-form__list-item">
                                <label
                                    class="feedback-form__label custom-radio">
                                    <input
                                        type="radio"
                                        class="custom-radio__input"
                                        name="vote"
                                        value="4" />
                                    <span
                                        class="custom-radio__text">
                                        Эффективное управление
                                        проектом и&nbsp;соблюдение
                                        сроков
                                    </span>
                                </label>
                            </li>
                            <li class="feedback-form__list-item">
                                <label
                                    class="feedback-form__label custom-radio">
                                    <input
                                        type="radio"
                                        class="custom-radio__input"
                                        name="vote"
                                        value="5" />
                                    <span
                                        class="custom-radio__text">
                                        Готовность адаптировать
                                        проект под меняющиеся
                                        требования
                                    </span>
                                </label>
                            </li>
                            <li class="feedback-form__list-item">
                                <label
                                    class="feedback-form__label custom-radio">
                                    <input
                                        type="radio"
                                        class="custom-radio__input"
                                        name="vote"
                                        value="6" />
                                    <span
                                        class="custom-radio__text">
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
                                        name="vote"
                                        value="7" />
                                    <span
                                        class="custom-radio__text">
                                        Наличие наград, премий
                                        и&nbsp;других
                                        профессиональных достижений
                                    </span>
                                </label>
                            </li>
                        </ul>
                        <button
                            class="feedback-form__btn btn"
                            type="submit"
                            aria-label="Отправить заявку">
                            Отравить
                        </button>
                    </form>
                </div>
                <div id="vote-results" class="feedback__result" style="display: none;">
                    <h3 class="feedback__title h-2">
                        На&nbsp;что больше всего обращают внимание
                        при выборе архитектурного бюро.
                    </h3>
                    <p class="feedback__text">
                        Спасибо за&nbsp;ваше мнение!
                    </p>
                    <ul id="results" class="feedback__result-list">

                    </ul>

                </div>
            </div>
        </div>
    </div>
</section>

<script>
    // Функция для отображения результатов голосования
    function renderResults(votes) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Очистка старых результатов

        votes.forEach(vote => {
            const percentage = vote.percentage || 0; // Процент
            const count = vote.count || 0; // Количество голосов

            const resultBar = document.createElement('div');
            resultBar.classList.add('result-bar');

            const label = document.createElement('span');
            label.textContent = `${vote.option_name} (${count} голосов, ${percentage}%)`;

            const barContainer = document.createElement('div');
            barContainer.style.width = '100%';

            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.width = `${percentage}%`;

            barContainer.appendChild(bar);
            resultBar.appendChild(label);
            resultBar.appendChild(barContainer);

            resultsDiv.appendChild(resultBar);
        });
    }

    // Функция для отправки голоса
    async function submitVote(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const vote = formData.get('vote');

        if (!vote) {
            alert('Пожалуйста, выберите вариант!');
            return;
        }

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vote
            }),
        });

        const data = await response.json();
        if (data.success) {
            document.getElementById('vote-form').style.display = 'none';
            document.getElementById('vote-results').style.display = 'block';
            renderResults(data.votes);
        } else {
            alert(data.message || 'Ошибка при голосовании');
        }
    }

    // Функция для получения результатов при загрузке страницы
    async function fetchResults() {
        const response = await fetch('');
        const data = await response.json();

        if (data.success) {
            document.getElementById('vote-form').style.display = 'none';
            document.getElementById('vote-results').style.display = 'block';
            renderResults(data.votes);
        } else {
            document.getElementById('vote-form').style.display = 'block';
            document.getElementById('vote-results').style.display = 'none';
        }
    }

    // Добавление обработчиков событий
    document.getElementById('voteForm').addEventListener('submit', submitVote);

    // Получение результатов при загрузке страницы
    fetchResults();
</script>