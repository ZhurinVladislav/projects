<?php

use App\Classes\Category;
use App\Classes\Company;

global $pdo;

require_once $_SERVER['DOCUMENT_ROOT'] . '/adminko/classes/Category.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/adminko/classes/Company.php';

$companyObj = new Company($pdo);
$categoryObj = new Category($pdo);

$id = (int) $_POST['id'] ?? null;

if ($id === null || !is_numeric($id)) {
    throw new Exception("Не удалось получить id компании.");
}

$company = $companyObj->get($id);
$categories = $categoryObj->list();

if ($_POST['action'] === 'edit') {
    $companyObj->update($_POST['data']);
}

if ($_POST['action'] === 'delete') {
    $companyObj->deleteItem($_POST['data']);
}

$categoryCompany = $categoryObj->get((int) $company['category_id']);
$phonesCompany = $companyObj->getPhones($id);
$linksCompany = $companyObj->getLinks($id);
$servicesCompany = $companyObj->getServices($id);
$projectsCompany = $companyObj->getProjects($id);

$linksType = ['vk', 'tg', 'wa', 'inst', 'ok', 'yt', 'other'];
?>

<?php if ($_POST['action'] === 'get_page'): ?>
    <div class="form">
        <h3 class="form__title">
            Редактирование компании
        </h3>
        <div class="form__items-wrap">
            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="name" class="form__label">Название компании:</label>
                    <input
                        id="name"
                        class="form__input"
                        type="text"
                        name="name"
                        value="<?= htmlspecialchars($company['name']) ?>"
                        oninput="generateAlias()"
                        data-editable
                        required>
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
            </form>

            <div class="form__item">
                <label class="form__label" for="categories">Категория:</label>
                <select id="categories" class="form__select" name="categories">
                    <?php foreach ($categories as $category): ?>
                        <option
                            value="<?= htmlspecialchars($category['id']) ?>"
                            <?= ($category['id'] === $categoryCompany['id']) ? 'selected' : '' ?>>
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
                    data-save-path="images/companies/<?= htmlspecialchars($id) ?>/logo"
                    data-id="<?= htmlspecialchars($id) ?>"
                    required>
            </div>

            <div class="form__item">
                <label for="img" class="form__label">Основное изображение:</label>
                <input
                    id="img"
                    class="form__input"
                    type="file"
                    name="img"
                    data-save-path="images/companies/<?= htmlspecialchars($id) ?>"
                    data-id="<?= htmlspecialchars($id) ?>"
                    required>
            </div>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="city" class="form__label">Город:</label>
                    <input
                        id="city"
                        class="form__input"
                        type="text"
                        name="city"
                        value="<?= htmlspecialchars($company['city']) ?>"
                        data-editable
                        required>
                </div>
            </form>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="address" class="form__label">Адрес:</label>
                    <input
                        id="address"
                        class="form__input"
                        type="address"
                        name="address"
                        value="<?= htmlspecialchars($company['address']) ?>"
                        data-editable
                        required>
                </div>
            </form>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="link_map" class="form__label">Ссылка на карту:</label>
                    <input
                        id="link_map"
                        class="form__input"
                        type="link_map"
                        name="link_map"
                        value="<?= htmlspecialchars($company['link_map']) ?>"
                        data-editable
                        required>
                </div>
            </form>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="email" class="form__label">Электронная почта:</label>
                    <input
                        id="email"
                        class="form__input"
                        type="email"
                        name="email"
                        value="<?= htmlspecialchars($company['email']) ?>"
                        data-editable
                        required>
                </div>
            </form>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="phone" class="form__label">Основной номер телефон:</label>
                    <input
                        id="phone"
                        class="form__input"
                        type="phone"
                        name="phone"
                        value="<?= htmlspecialchars($company['phone']) ?>"
                        data-editable
                        required>
                </div>
            </form>

            <div class="form__item">
                <h3>Добавить дополнительные номера телефонов</h3>
                <div id="phone-container" class="input-group-wrap">
                    <?php foreach ($phonesCompany as $phone): ?>
                        <div class="input-group">
                            <form
                                class="form-edit-new"
                                method="POST"
                                data-page-handler="companies/edit">
                                <input
                                    class="input"
                                    type="phone"
                                    name="phone_<?= htmlspecialchars($phone['id']) ?>"
                                    value="<?= htmlspecialchars($phone['phone_number']) ?>"
                                    placeholder="Добавить телефон"
                                    data-editable
                                    required>
                            </form>
                            <form
                                class="form-delete-item"
                                method="POST"
                                data-page-handler="companies/edit">
                                <input type="hidden" name="type" value="phone">
                                <input type="hidden" name="phone_id" value="<?= htmlspecialchars($phone['id']) ?>">
                                <input type="hidden" name="id" value="<?= htmlspecialchars($company['id']) ?>">
                                <button class="remove-btn">❌</button>
                            </form>
                        </div>
                    <?php endforeach ?>
                </div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('phone')">
                    Добавить номер
                </button>
            </div>

            <div class="form__item">
                <h3>Добавить ссылки на мессенджеры или соц. сети</h3>
                <div id="links-container" class="input-group-wrap">
                    <?php foreach ($linksCompany as $link): ?>
                        <div class="input-group">
                            <input
                                class="input"
                                type="text"
                                name="link_<?= htmlspecialchars($link['id']) ?>"
                                value="<?= htmlspecialchars($link['link']) ?>"
                                placeholder="Ссылка"
                                required>
                            <input
                                class="input"
                                type="text"
                                name="link-text_<?= htmlspecialchars($link['id']) ?>"
                                value="<?= htmlspecialchars($link['text']) ?>"
                                placeholder="Название ссылки"
                                required>
                            <select
                                id="links"
                                class="form__select"
                                name="links_<?= htmlspecialchars($link['id']) ?>">
                                <?php foreach ($linksType as $type): ?>
                                    <option
                                        value="<?= htmlspecialchars($type) ?>"
                                        <?= ($link['type'] === $type) ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($type) ?>
                                    </option>
                                <?php endforeach ?>
                            </select>
                            <button class="remove-btn" onclick="deleteItem(this)">❌</button>
                        </div>
                    <?php endforeach ?>
                </div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('links')">
                    Добавить ссылку
                </button>
            </div>

            <div class="form__item">
                <h3>Добавить услуги</h3>
                <div id="service-container" class="input-group-wrap">
                    <?php foreach ($servicesCompany as $service): ?>
                        <div class="input-group">
                            <input
                                class="input"
                                type="text"
                                name="service_<?= htmlspecialchars($service['id']) ?>"
                                value="<?= htmlspecialchars($service['name']) ?>"
                                placeholder="Добавить услугу"
                                required>
                            <button class="remove-btn" onclick="deleteItem(this)">❌</button>
                        </div>
                    <?php endforeach ?>
                </div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('service')">
                    Добавить услугу
                </button>
            </div>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="url" class="form__label">Ссылка на сайт:</label>
                    <input
                        id="url"
                        class="form__input"
                        type="text"
                        name="site_url"
                        value="<?= htmlspecialchars($company['site_url']) ?>"
                        data-editable
                        required>
                </div>
            </form>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="experience" class="form__label">Опыт работы:</label>
                    <input
                        id="experience"
                        class="form__input"
                        type="number"
                        name="experience"
                        min="0"
                        max="200"
                        data-editable
                        value="<?= htmlspecialchars($company['experience']) ?>">
                </div>
            </form>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="intro-text" class="form__label">Краткое описание:</label>
                    <textarea
                        id="intro-text"
                        class="form__textarea"
                        name="intro_text"
                        data-editable><?= rtrim(htmlspecialchars($company['intro_text'])) ?></textarea>
                </div>
            </form>

            <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label for="editor" class="form__label">Описание для страницы:</label>
                    <div id="editor" class="form__editor"></div>
                    <input
                        id="editor-content"
                        type="hidden"
                        name="description"
                        data-editable>
                </div>
            </form>

            <div class="form__item">
                <h3>Добавить проекты</h3>
                <div id="projects-container" class="input-group-wrap">
                    <?php foreach ($projectsCompany as $project): ?>
                        <div class="input-group">
                            <input
                                class="input"
                                type="text"
                                name="project_<?= htmlspecialchars($project['id']) ?>"
                                value="<?= htmlspecialchars($project['name']) ?>"
                                placeholder="Название проекта"
                                required>
                            <input
                                type="file"
                                name="project_img_<?= htmlspecialchars($project['id']) ?>"
                                data-save-path="images/companies/portfolio/<?= htmlspecialchars($project['id']) ?>"
                                required>
                            <button class="remove-btn" onclick="deleteItem(this)">❌</button>
                        </div>
                    <?php endforeach ?>
                </div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('projects')">
                    Добавить проект
                </button>
            </div>
        </div>

        <!-- <button
            class="form__btn btn"
            type="submit"
            aria-label="Обновить компанию">
            Обновить
        </button> -->
    </div>

    <?php $time = time(); ?>
    <script>
        const editCompany_<?= $time ?> = () => {
            const elements_<?= $time ?> = document.querySelectorAll('input[data-editable], textarea[data-editable]');

            elements_<?= $time ?>.forEach(element => {
                let originalValue = element.value; // Исходное значение

                const btn = document.createElement('button');
                btn.textContent = 'Сохранить';
                btn.classList.add('btn', 'btn_success', 'btn_edit');
                btn.style.display = 'none';
                btn.type = 'submit';

                const hiddenInputs = document.querySelectorAll('input[type="hidden"][data-editable]');
                const relatedHidden = Array.from(hiddenInputs).find(hidden => hidden.name === element.name);

                const inputHidden = document.createElement('input');
                inputHidden.value = '<?= $id ?>'
                inputHidden.name = 'id';
                inputHidden.type = 'hidden';

                element.insertAdjacentElement('afterend', inputHidden);
                element.insertAdjacentElement('afterend', btn);

                // Функция для проверки изменений
                const checkValueChange = () => {
                    let currentValue = element.value;
                    if (relatedHidden) {
                        currentValue = relatedHidden.value;
                    }
                    btn.style.display = currentValue !== originalValue ? 'inline-block' : 'none';
                };

                // Обработчик ввода для input и textarea
                element.addEventListener('input', checkValueChange);

                // Отслеживание изменений hidden input (если есть)
                if (relatedHidden) {
                    const observer = new MutationObserver(checkValueChange);
                    observer.observe(relatedHidden, {
                        attributes: true,
                        attributeFilter: ['value']
                    });
                }
            });
        }

        editCompany_<?= $time ?>();

        const quill_<?= $time ?> = new Quill('#editor', {
            theme: 'snow',
        });

        const htmlContent_<?= $time ?> = `<?= htmlspecialchars_decode($company['description']) ?>`;

        quill_<?= $time ?>.clipboard.dangerouslyPasteHTML(0, htmlContent_<?= $time ?>);


        quill_<?= $time ?>.on('text-change', () => {
            const input_<?= $time ?> = document.getElementById('editor-content');
            input_<?= $time ?>.value = quill_<?= $time ?>.root.innerHTML;
        });


        const isValue_<?= time(); ?> = (wrap) => {
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
            const index = wrap.children.length + 1;

            const inputWrap = document.createElement('div');
            const form = document.createElement('form');
            const input = document.createElement('input');
            const btn = document.createElement('button');

            inputWrap.classList.add('input-group');
            form.classList.add('form-edit-new');
            form.method = 'POST';
            form.setAttribute('data-page-handler', 'companies/edit');
            input.classList.add('input');
            input.type = type;
            input.name = `${name}_${index}`;
            input.placeholder = `Добавить ${text}`;
            input.required = true;
            input.setAttribute('data-editable', '');
            btn.classList.add('remove-btn');
            btn.setAttribute('onclick', 'deleteItem(this)');
            btn.innerHTML = '❌';

            form.append(input);
            inputWrap.append(form);
            inputWrap.append(btn);

            isValue_<?= $time ?>(wrap) ? wrap.append(inputWrap) : alert('Заполните предыдущее поле перед добавлением нового!');
            editCompany_<?= $time ?>();
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
        generateAlias();
    </script>
<?php endif ?>