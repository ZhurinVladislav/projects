<?php

use App\Classes\Category;
use App\Classes\Company;

global $pdo;

require_once $_SERVER['DOCUMENT_ROOT'] . '/adminko/classes/Category.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/adminko/classes/Company.php';

$company = new Company($pdo);
$category = new Category($pdo);

$companyNewId = $company->getNewId();
$categories = $category->list();

if ($companyNewId === null || !is_numeric($companyNewId)) {
    throw new Exception("Ошибка: companyNewId имеет недопустимое значение. Ожидалось число, получено: " . var_export($companyNewId, true));
}

if ($_POST['action'] === 'add') {
    $company->store($_POST['data']);
}
?>

<?php if ($_POST['action'] == 'get_page'): ?>
    <form
        class="form form-add"
        method="POST"
        data-page-handler="companies/store"
        enctype="multipart/form-data">
        <h3 class="form__title">
            Создание компании
        </h3>
        <div class="form__items-wrap">
            <div class="form__item">
                <label for="name" class="form__label">Название компании:</label>
                <input id="name" class="form__input" type="text" name="name" oninput="generateAlias()" required>
            </div>

            <div class="form__item">
                <label for="alias" class="form__label">Алиас:</label>
                <input
                    id="alias"
                    class="form__input"
                    type="alias"
                    name="alias"
                    readonly
                    required>
            </div>

            <div class="form__item">
                <label class="form__label" for="categories">Категория:</label>
                <select id="categories" class="form__select" name="categories">
                    <?php foreach ($categories as $category): ?>
                        <option value="<?= htmlspecialchars($category['id']) ?>">
                            <?= htmlspecialchars($category['name']) ?>
                        </option>
                    <?php endforeach ?>
                </select>
            </div>

            <div class="form__item">
                <label for="logo" class="form__label">Логотип компании:</label>
                <input
                    id="logo"
                    class="form__input"
                    type="file"
                    name="logo"
                    data-save-path="images/companies/<?= htmlspecialchars($companyNewId) ?>/logo"
                    data-id="<?= htmlspecialchars($companyNewId) ?>"
                    required>
            </div>

            <div class="form__item">
                <label for="img" class="form__label">Основное изображение:</label>
                <input
                    id="img"
                    class="form__input"
                    type="file"
                    name="img"
                    data-save-path="images/companies/<?= htmlspecialchars($companyNewId) ?>"
                    data-id="<?= htmlspecialchars($companyNewId) ?>"
                    required>
            </div>

            <div class="form__item">
                <label for="city" class="form__label">Город:</label>
                <input
                    id="city"
                    class="form__input"
                    type="text"
                    name="city"
                    required>
            </div>

            <div class="form__item">
                <label for="address" class="form__label">Адрес:</label>
                <input
                    id="address"
                    class="form__input"
                    type="address"
                    name="address"
                    required>
            </div>

            <div class="form__item">
                <label for="link_map" class="form__label">Ссылка на карту:</label>
                <input
                    id="link_map"
                    class="form__input"
                    type="link_map"
                    name="link_map"
                    required>
            </div>

            <div class="form__item">
                <label for="email" class="form__label">Электронная почта:</label>
                <input
                    id="email"
                    class="form__input"
                    type="email"
                    name="email"
                    required>
            </div>

            <div class="form__item">
                <label for="phone" class="form__label">Основной номер телефон:</label>
                <input
                    id="phone"
                    class="form__input"
                    type="phone"
                    name="phone"
                    required>
            </div>

            <div class="form__item">
                <h3>Добавить дополнительные номера телефонов</h3>
                <div id="phone-container" class="input-group-wrap"></div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('phone')">
                    Добавить номер
                </button>
            </div>

            <div class="form__item">
                <h3>Добавить ссылки на мессенджеры или соц. сети</h3>
                <div id="links-container" class="input-group-wrap"></div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('links')">
                    Добавить ссылку
                </button>
            </div>

            <div class="form__item">
                <h3>Добавить услуги</h3>
                <div id="service-container" class="input-group-wrap"></div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('service')">
                    Добавить услугу
                </button>
            </div>

            <div class="form__item">
                <label for="url" class="form__label">Ссылка на сайт:</label>
                <input
                    id="url"
                    class="form__input"
                    type="text"
                    name="site_url"
                    required>
            </div>

            <div class="form__item">
                <label for="experience" class="form__label">Опыт работы:</label>
                <input
                    id="experience"
                    class="form__input"
                    type="number"
                    name="experience"
                    min="0"
                    max="200">
            </div>

            <div class="form__item">
                <label for="intro-text" class="form__label">Краткое описание:</label>
                <textarea
                    id="intro-text"
                    class="form__textarea"
                    name="intro_text"></textarea>
            </div>

            <div class="form__item">
                <label for="editor" class="form__label">Описание для страницы:</label>
                <div id="editor" class="form__editor"></div>
                <input
                    id="editor-content"
                    type="hidden"
                    name="description">
            </div>

            <div class="form__item">
                <h3>Добавить проекты</h3>
                <div id="projects-container" class="input-group-wrap">
                </div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('projects')">
                    Добавить проект
                </button>
            </div>
        </div>

        <button
            class="form__btn btn"
            type="submit"
            aria-label="Создать компанию">
            Создать
        </button>
    </form>

    <?php $time = time(); ?>
    <script>
        const quill_<?= $time ?> = new Quill('#editor', {
            theme: 'snow',
        });

        quill_<?= $time ?>.on('text-change', () => {
            document.getElementById('editor-content').value = quill_<?= $time ?>.root.innerHTML;
        });

        const isValue_<?= $time ?> = (wrap) => {
            const children = Array.from(wrap.querySelectorAll('.input-group'));

            if (children.length === 0) {
                return true;
            } else {
                const lastInput = children.at(-1).querySelector('.input');

                return lastInput.value === '' ? false : true;
            }
        }

        const createItem_<?= $time ?> = (wrapId, type, name, text) => {
            const wrap = document.getElementById(wrapId);
            const index = wrap.children.length;

            const inputWrap = document.createElement('div');
            const input = document.createElement('input');
            const btn = document.createElement('button');

            inputWrap.classList.add('input-group');
            input.classList.add('input');
            input.type = type;
            input.name = `${name}_${index}`;
            input.placeholder = `Добавить ${text}`;
            input.required = true;
            btn.classList.add('remove-btn');
            btn.setAttribute('onclick', 'deleteItem(this)');
            btn.innerHTML = '❌';

            inputWrap.append(input);
            inputWrap.append(btn);

            isValue_<?= $time ?>(wrap) ? wrap.append(inputWrap) : alert('Заполните предыдущее поле перед добавлением нового!');
        }

        const createItemPortfolio_<?= $time ?> = () => {
            const wrap = document.getElementById('projects-container');
            const index = wrap.children.length;

            const inputWrap = document.createElement('div');
            const input = document.createElement('input');
            const inputImg = document.createElement('input');
            const btn = document.createElement('button');

            inputWrap.classList.add('input-group');
            input.classList.add('input');
            input.type = 'text';
            input.name = `project_${index}`;
            input.placeholder = 'Название проекта';
            input.required = true;

            inputImg.type = 'file';
            inputImg.name = `project_img_${index}`;
            inputImg.setAttribute('data-save-path', `images/companies/<?= htmlspecialchars($companyNewId) ?>portfolio/${index}`);
            inputImg.required = true;

            btn.classList.add('remove-btn');
            btn.setAttribute('onclick', 'deleteItem(this)');
            btn.innerHTML = '❌';

            inputWrap.append(input);
            inputWrap.append(inputImg);
            inputWrap.append(btn);

            isValue_<?= $time ?>(wrap) ? wrap.append(inputWrap) : alert('Заполните предыдущее поле перед добавлением нового!');
        }

        const createItemLinks_<?= $time ?> = () => {
            const wrap = document.getElementById('links-container');
            const index = wrap.children.length;
            const optionArr = ['vk', 'tg', 'wa', 'inst', 'ok', 'yt', 'other'];

            const inputWrap = document.createElement('div');
            const inputLink = document.createElement('input');
            const inputText = document.createElement('input');
            const select = document.createElement('select');
            const btn = document.createElement('button');

            inputWrap.classList.add('input-group');

            inputLink.classList.add('input');
            inputLink.type = 'text';
            inputLink.name = `link_${index}`;
            inputLink.placeholder = 'Ссылка';
            inputLink.required = true;

            inputText.classList.add('input');
            inputText.type = 'text';
            inputText.name = `link-text_${index}`;
            inputText.placeholder = 'Название ссылки';
            inputText.required = true;

            select.id = 'links';
            select.classList.add('form__select');
            select.name = `links_${index}`;

            btn.classList.add('remove-btn');
            btn.setAttribute('onclick', 'deleteItem(this)');
            btn.innerHTML = '❌';

            inputWrap.append(inputLink);
            inputWrap.append(inputText);
            inputWrap.append(select);
            inputWrap.append(btn);

            optionArr.forEach(el => {
                const option = document.createElement('option');
                option.setAttribute('value', el);
                option.textContent = el;

                select.append(option);
            });

            isValue_<?= $time ?>(wrap) ? wrap.append(inputWrap) : alert('Заполните предыдущее поле перед добавлением нового!');
        }

        function handlerCreateItem(name) {
            switch (name) {
                case 'phone':
                    createItem_<?= $time ?>('phone-container', name, name, 'телефон');
                    break;
                case 'service':
                    createItem_<?= $time ?>('service-container', 'text', name, 'услугу');
                    break;
                case 'links':
                    createItemLinks_<?= $time ?>();
                    break;
                case 'projects':
                    createItemPortfolio_<?= $time ?>();
                    break;
                default:
                    break;
            }
        }

        function deleteItem(el) {
            el.parentNode.remove();
        }

        // let formData = new FormData();

        const transliterate_<?= $time ?> = (str) => {
            const map = {
                'а': 'a',
                'б': 'b',
                'в': 'v',
                'г': 'g',
                'д': 'd',
                'е': 'e',
                'ё': 'yo',
                'ж': 'zh',
                'з': 'z',
                'и': 'i',
                'й': 'y',
                'к': 'k',
                'л': 'l',
                'м': 'm',
                'н': 'n',
                'о': 'o',
                'п': 'p',
                'р': 'r',
                'с': 's',
                'т': 't',
                'у': 'u',
                'ф': 'f',
                'х': 'h',
                'ц': 'ts',
                'ч': 'ch',
                'ш': 'sh',
                'щ': 'sch',
                'ъ': '',
                'ы': 'y',
                'ь': '',
                'э': 'e',
                'ю': 'yu',
                'я': 'ya'
            };
            return str
                .toLowerCase()
                .split('')
                .map(char => map[char] || char)
                .join('');
        }

        function generateAlias() {
            const name = document.getElementById('name').value;
            const alias = transliterate_<?= $time ?>(name)
                .toLowerCase()
                .replace(/[^a-z0-9\- ]/g, '') // Удаляем спецсимволы
                .replace(/\s+/g, '-') // Пробелы заменяем на '-'
                .replace(/-+/g, '-'); // Убираем дублирование '-'

            document.getElementById('alias').value = alias;
        }
    </script>
<?php endif ?>