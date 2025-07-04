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
// $categories = $categoryObj->list();
$categoriesFullList = $categoryObj->getFullList();
$jsonList = json_encode($categoriesFullList, JSON_UNESCAPED_UNICODE);

if ($_POST['action'] === 'edit') {
    $companyObj->update($_POST['data']);
}

if ($_POST['action'] === 'delete') {
    $companyObj->deleteItem($_POST['data']);
}

$categoryCompany = $categoryObj->get((int) $company['category_id']);
$phonesCompany = $companyObj->getPhones($id);
$linksCompany = $companyObj->getLinks($id);
// $servicesCompany = $companyObj->getServices($id);
$projectsCompany = $companyObj->getProjects($id);
$getCategoriesCompany = $companyObj->getCompanyCategoryExcludedServices($id);
$jsonCategoriesList = 0;

if (!is_null($getCategoriesCompany)) {
    $jsonCategoriesList = json_encode($getCategoriesCompany, JSON_UNESCAPED_UNICODE);
}

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
                <form
                    class="form-edit-new"
                    method="POST"
                    data-page-handler="companies/edit">
                    <label class="form__label" for="categories">Категории:</label>
                    <div id="category-wrap" class="input-group-wrap"></div>
                    <input name="id" value="<?= $id ?>" type="hidden">
                    <button
                        id="category-btn-submit"
                        class="btn btn_success"
                        style="display: none;"
                        type="submit">
                        Сохранить
                    </button>
                </form>
                <button
                    id="category-btn"
                    class="btn btn_success"
                    type="button">
                    Добавить категорию
                </button>
            </div>

            <!-- <form
                class="form-edit-new"
                method="POST"
                data-page-handler="companies/edit">
                <div class="form__item">
                    <label class="form__label" for="category_id">Категория:</label>
                    <select id="category_id" class="form__select" name="category_id" data-editable>
                        <?php foreach ($categories as $category): ?>
                            <option
                                value="<?= htmlspecialchars($category['id']) ?>"
                                <?= ($category['id'] === $categoryCompany['id']) ? 'selected' : '' ?>>
                                <?= htmlspecialchars($category['name']) ?>
                            </option>
                        <?php endforeach ?>
                    </select>
                </div>
            </form> -->

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
                            <form
                                class="form-edit-new form-edit-new_row"
                                method="POST"
                                data-page-handler="companies/edit">

                                <input
                                    class="input"
                                    type="text"
                                    name="link_<?= htmlspecialchars($link['id']) ?>"
                                    value="<?= htmlspecialchars($link['link']) ?>"
                                    placeholder="Ссылка"
                                    data-editable
                                    required>
                                <input
                                    class="input"
                                    type="text"
                                    name="link-text_<?= htmlspecialchars($link['id']) ?>"
                                    value="<?= htmlspecialchars($link['text']) ?>"
                                    placeholder="Название ссылки"
                                    data-editable
                                    required>
                                <select
                                    id="links"
                                    class="form__select"
                                    name="links_<?= htmlspecialchars($link['id']) ?>"
                                    data-editable>
                                    <?php foreach ($linksType as $type): ?>
                                        <option
                                            value="<?= htmlspecialchars($type) ?>"
                                            <?= ($link['type'] === $type) ? 'selected' : '' ?>>
                                            <?= htmlspecialchars($type) ?>
                                        </option>
                                    <?php endforeach ?>
                                </select>
                            </form>
                            <form
                                class="form-delete-item"
                                method="POST"
                                data-page-handler="companies/edit">
                                <input type="hidden" name="type" value="link">
                                <input type="hidden" name="link_id" value="<?= htmlspecialchars($link['id']) ?>">
                                <input type="hidden" name="id" value="<?= htmlspecialchars($company['id']) ?>">
                                <button class="remove-btn">❌</button>
                            </form>
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

            <!-- <div class="form__item">
                <h3>Добавить услуги</h3>
                <div id="service-container" class="input-group-wrap">
                    <?php foreach ($servicesCompany as $service): ?>
                        <div class="input-group">
                            <form
                                class="form-edit-new"
                                method="POST"
                                data-page-handler="companies/edit">
                                <input
                                    class="input"
                                    type="text"
                                    name="service_<?= htmlspecialchars($service['id']) ?>"
                                    value="<?= htmlspecialchars($service['name']) ?>"
                                    placeholder="Добавить услугу"
                                    data-editable
                                    required>
                            </form>
                            <form
                                class="form-delete-item"
                                method="POST"
                                data-page-handler="companies/edit">
                                <input type="hidden" name="type" value="service">
                                <input type="hidden" name="service_id" value="<?= htmlspecialchars($service['id']) ?>">
                                <input type="hidden" name="id" value="<?= htmlspecialchars($company['id']) ?>">
                                <button class="remove-btn">❌</button>
                            </form>
                        </div>
                    <?php endforeach ?>
                </div>
                <button
                    class="btn btn_success"
                    type="button"
                    onclick="handlerCreateItem('service')">
                    Добавить услугу
                </button>
            </div> -->

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
    </div>

    <?php $time = time(); ?>
    <script>
        const editCompany_<?= $time ?> = () => {
            const forms_<?= $time ?> = document.querySelectorAll('.form-edit-new');

            forms_<?= $time ?>.forEach(form => {
                const elements_<?= $time ?> = form.querySelectorAll('input[data-editable], textarea[data-editable], select[data-editable]');

                elements_<?= $time ?>.forEach(element => {
                    let originalValue = element.value; // Исходное значение

                    const isBtn = form.querySelector('button.btn_edit');

                    const btn = document.createElement('button');
                    btn.textContent = 'Сохранить';
                    btn.classList.add('btn', 'btn_success', 'btn_edit');
                    btn.style.display = 'none';
                    btn.type = 'submit';

                    const hiddenInputs = document.querySelectorAll('input[type="hidden"][data-editable]');
                    const relatedHidden = Array.from(hiddenInputs).find(hidden => hidden.name === element.name);

                    const inputHidden = document.createElement('input');
                    inputHidden.value = '<?= $id ?>';
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

                    // Обработчик ввода для input, textarea и изменения select
                    element.addEventListener('input', checkValueChange);
                    if (element.tagName === 'SELECT') {
                        element.addEventListener('change', checkValueChange);
                    }

                    // Отслеживание изменений hidden input (если есть)
                    if (relatedHidden) {
                        const observer = new MutationObserver(checkValueChange);
                        observer.observe(relatedHidden, {
                            attributes: true,
                            attributeFilter: ['value']
                        });
                    }
                });
            })
        };

        // const editCompany_<?= $time ?> = () => {
        //     const forms_<?= $time ?> = document.querySelectorAll('.form-edit-new');

        //     forms_<?= $time ?>.forEach(form => {
        //         const elements_<?= $time ?> = form.querySelectorAll('input[data-editable], textarea[data-editable], select[data-editable]');

        //         elements_<?= $time ?>.forEach(element => {
        //             let originalValue = element.type === 'checkbox' ? element.checked : element.value; // Исходное значение

        //             const isBtn = form.querySelector('button.btn_edit');

        //             const btn = document.createElement('button');
        //             btn.textContent = 'Сохранить';
        //             btn.classList.add('btn', 'btn_success', 'btn_edit');
        //             btn.style.display = 'none';
        //             btn.type = 'submit';

        //             const hiddenInputs = document.querySelectorAll('input[type="hidden"][data-editable]');
        //             const relatedHidden = Array.from(hiddenInputs).find(hidden => hidden.name === element.name);

        //             const inputHidden = document.createElement('input');
        //             inputHidden.value = '<?= $id ?>';
        //             inputHidden.name = 'id';
        //             inputHidden.type = 'hidden';

        //             element.insertAdjacentElement('afterend', inputHidden);
        //             element.insertAdjacentElement('afterend', btn);

        //             // Функция для проверки изменений
        //             const checkValueChange = () => {
        //                 let currentValue;
        //                 if (element.type === 'checkbox') {
        //                     currentValue = element.checked;
        //                 } else if (relatedHidden) {
        //                     currentValue = relatedHidden.value;
        //                 } else {
        //                     currentValue = element.value;
        //                 }
        //                 btn.style.display = currentValue !== originalValue ? 'inline-block' : 'none';
        //             };

        //             // Обработчик ввода для input, textarea и изменения select
        //             element.addEventListener('input', checkValueChange);
        //             if (element.tagName === 'SELECT') {
        //                 element.addEventListener('change', checkValueChange);
        //             }

        //             // Обработчик для чекбоксов
        //             if (element.type === 'checkbox') {
        //                 element.addEventListener('change', checkValueChange);
        //             }

        //             // Отслеживание изменений hidden input (если есть)
        //             if (relatedHidden) {
        //                 const observer = new MutationObserver(checkValueChange);
        //                 observer.observe(relatedHidden, {
        //                     attributes: true,
        //                     attributeFilter: ['value']
        //                 });
        //             }
        //         });
        //     });
        // };

        editCompany_<?= $time ?>();

        const quill_<?= $time ?> = new Quill('#editor', {
            theme: 'snow',
        });

        const htmlContent_<?= $time ?> = `<?= htmlspecialchars_decode($company['description']) ?>`;

        quill_<?= $time ?>.clipboard.dangerouslyPasteHTML(0, htmlContent_<?= $time ?>);


        quill_<?= $time ?>.on('text-change', () => {
            document.getElementById('editor-content').value = quill_<?= $time ?>.root.innerHTML;
        });


        const isValue_<?= time(); ?> = wrap => {
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
            const index = wrap.children.length + 1;
            const optionArr = ['vk', 'tg', 'wa', 'inst', 'ok', 'yt', 'other'];

            const form = document.createElement('form');
            const inputWrap = document.createElement('div');
            const inputLink = document.createElement('input');
            const inputText = document.createElement('input');
            const select = document.createElement('select');
            const btn = document.createElement('button');
            const inputHidden = document.createElement('input');
            const btnSubmit = document.createElement('button');

            form.classList.add('form-edit-new');
            form.method = 'POST';
            form.setAttribute('data-page-handler', 'companies/edit');

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

            inputHidden.value = '<?= $id ?>';
            inputHidden.name = 'id';
            inputHidden.type = 'hidden';

            select.id = 'links';
            select.classList.add('form__select');
            select.name = `links_${index}`;

            btn.classList.add('remove-btn');
            btn.setAttribute('onclick', 'deleteItem(this)');
            btn.innerHTML = '❌';

            btnSubmit.classList.add('btn', 'btn_success', 'btn_edit');
            btnSubmit.type = 'submit';
            btnSubmit.textContent = 'Сохранить';

            inputWrap.append(inputLink);
            inputWrap.append(inputText);
            inputWrap.append(select);
            inputWrap.append(btn);
            inputWrap.append(inputHidden);
            form.append(inputWrap);
            form.append(btnSubmit);

            optionArr.forEach(el => {
                const option = document.createElement('option');
                option.setAttribute('value', el);
                option.textContent = el;

                select.append(option);
            });

            isValue_<?= $time ?>(wrap) ? wrap.append(form) : alert('Заполните предыдущее поле перед добавлением нового!');
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

        /**
         * Транслит для поля с алиасам
         */
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

        /**
         * Генерация алиаса для страницы проекта
         */
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

        /**
         * Функция удаления списка с услугами
         */
        const removeServicesList_<?= $time ?> = wrap => {
            if (!wrap) {
                console.error('Не передан wrap');
                return;
            }

            const servicesList = wrap.querySelector('.js-services-list');

            if (!servicesList) {
                console.error('Не удалось найти js-services-list');
                return;
            };

            servicesList.remove();
        }

        /** 
         * Событие для select категорий
         */
        const handleCategory_<?= $time ?> = (categoryId, data, wrap) => {
            if (!categoryId) {
                console.error('Не передан id категории');
                return;
            } else if (!data || data.length === 0) {
                console.error('Массив с данными пуст');
                return;
            } else if (!wrap) {
                console.error('Не передан родитель элементов');
                return;
            }

            data.forEach(el => {
                if (el.id === parseInt(categoryId)) {
                    removeServicesList_<?= $time ?>(wrap);
                    const services = el.services;

                    createServiceList_<?= $time ?>(wrap, services);
                }
            })
        }

        /**
         * Функция создания списка с услугами
         */
        const createServiceList_<?= $time ?> = (wrap, data, getData = null) => {
            if (!data || data.length === 0) {
                console.error('Массив с данным пуст.');
                return;
            } else if (!wrap) {
                console.error('Не существует блока, необходимого для отрисовки.');
                return;
            }
            const list = document.createElement('ul');
            list.classList.add('form__item-checkbox-list', 'js-services-list');

            data.forEach(el => {
                const item = document.createElement('li');
                const input = document.createElement('input');
                const label = document.createElement('label');

                item.classList.add('form__item-checkbox-list-item');

                input.id = `service-${el.id}`;
                input.type = 'checkbox';
                input.name = `service_${el.id}`;
                input.value = el.id;

                if (getData && getData !== null && getData.length !== 0) {
                    getData.forEach(element => {
                        if (element.id === el.id) input.checked = true;
                    })
                }
                input.setAttribute('data-editable', '');

                label.setAttribute('for', `service-${el.id}`);
                label.textContent = el.name.trim();

                item.append(input);
                item.append(label);
                list.append(item);
                wrap.append(list);
            });
            editCategory_<?= $time ?>(true);
        }

        /**
         * Функция удаления категории
         */
        const deleteItemCategory_<?= $time ?> = el => {
            if (!el) {
                console.error('Не передан элемент для удаления');
                return;
            } else {
                el.remove();
            }
        }

        /**
         * Функция создания списка категорий
         */
        const createItemCategory_<?= $time ?> = (wrap, data, services = null, index = 1) => {
            if (!data || data.length === 0) {
                console.error('Массив с данными пуст.');
                return;
            } else if (!wrap) {
                console.error('Не существует блока, необходимого для отрисовки.');
                return;
            }

            // Создание элементов
            const item = document.createElement('div');
            const selectWrap = document.createElement('div');
            const select = document.createElement('select');
            const btnDelete = document.createElement('button');
            const wrapServiceList = document.createElement('div');
            const serviceListTitle = document.createElement('p');
            const serviceListWrap = document.createElement('div');

            // Добавление необходимых классов и атрибутов
            item.classList.add('input-group', 'input-group_clm', 'js-category-item');

            selectWrap.classList.add('form__select-wrap');

            select.id = `categories-${index}`;
            select.classList.add('form__select', 'js-select-category');
            select.name = `category_${index}`;
            select.setAttribute('data-editable', '');

            btnDelete.classList.add('remove-btn');
            btnDelete.innerHTML = '❌';

            wrapServiceList.classList.add('form__item-inner');

            serviceListTitle.classList.add('form__item-title');
            serviceListTitle.textContent = 'Выберите услуги, которые нужно исключить:';

            serviceListWrap.classList.add('form__item-list-wrap', 'js-services-list-wrap');

            // Добавление элементов в разметку
            selectWrap.append(select);
            selectWrap.append(btnDelete);
            item.append(selectWrap);
            item.append(wrapServiceList);
            wrapServiceList.append(serviceListTitle);
            wrapServiceList.append(serviceListWrap);

            // Заполнение select
            data.forEach(el => {
                const option = document.createElement('option');
                option.value = el.id;
                option.textContent = el.name.trim();
                select.append(option);
            });

            // Заполнение списка с услугами
            if (services === null) {
                services = data[0].services;
            }

            // Создание элементов в списке услуг
            if (services && services.length > 0) {
                createServiceList_<?= $time ?>(serviceListWrap, services);
            }

            wrap.append(item);

            // Событие для select
            select.addEventListener('change', () => {
                handleCategory_<?= $time ?>(select.value, data, serviceListWrap);
            });

            // Событие для удаления из DOM категории
            btnDelete.addEventListener('click', ev => {
                ev.preventDefault();

                if (confirm('Вы уверены в том, что хотите удалить данную категорию?')) {
                    deleteItemCategory_<?= $time ?>(item);
                }
            });
        }

        const createItemsCategories_<?= $time ?> = (wrap, data, getData) => {
            if (!data || data.length === 0 || !getData || getData.length === 0) {
                console.error('Массив с данными пуст.');
                return;
            } else if (!wrap) {
                console.error('Не существует блока, необходимого для отрисовки.');
                return;
            }

            getData.forEach((element, index) => {
                // Создание элементов
                const item = document.createElement('div');
                const selectWrap = document.createElement('div');
                const select = document.createElement('select');
                const btnDelete = document.createElement('button');
                const wrapServiceList = document.createElement('div');
                const serviceListTitle = document.createElement('p');
                const serviceListWrap = document.createElement('div');

                // Добавление необходимых классов и атрибутов
                item.classList.add('input-group', 'input-group_clm', 'js-category-item');

                selectWrap.classList.add('form__select-wrap');

                select.id = `categories-${index}`;
                select.classList.add('form__select', 'js-select-category');
                select.name = `category_${index}`;
                select.setAttribute('data-editable', '');

                btnDelete.classList.add('remove-btn');
                btnDelete.innerHTML = '❌';

                wrapServiceList.classList.add('form__item-inner');

                serviceListTitle.classList.add('form__item-title');
                serviceListTitle.textContent = 'Выберите услуги, которые нужно исключить:';

                serviceListWrap.classList.add('form__item-list-wrap', 'js-services-list-wrap');

                // Добавление элементов в разметку
                selectWrap.append(select);
                selectWrap.append(btnDelete);
                item.append(selectWrap);
                item.append(wrapServiceList);
                wrapServiceList.append(serviceListTitle);
                wrapServiceList.append(serviceListWrap);

                // Заполнение select
                data.forEach(el => {
                    const option = document.createElement('option');
                    option.value = el.id;
                    option.textContent = el.name.trim();

                    if (element.id === el.id) {
                        option.selected = true;
                        createServiceList_<?= $time ?>(serviceListWrap, el.services, element.services);
                    }

                    select.append(option);
                });

                wrap.append(item);

                // Событие для select
                select.addEventListener('change', () => {
                    handleCategory_<?= $time ?>(select.value, data, serviceListWrap);
                });

                // Событие для удаления из DOM категории
                btnDelete.addEventListener('click', ev => {
                    ev.preventDefault();

                    if (confirm('Вы уверены в том, что хотите удалить данную категорию?')) {
                        deleteItemCategory_<?= $time ?>(item);
                    }
                });
            })
        }

        /**
         * Функция редактирования категории
         */
        const editCategory_<?= $time ?> = (isNew = false) => {
            const categories = document.querySelectorAll('.js-category-item');
            if (!categories || categories.length === 0) {
                console.error('Не найдены категории');
                return;
            }
            const btn = document.getElementById('category-btn-submit');
            if (!btn) {
                console.error('Не найдена кнопка');
                return;
            }

            if (!isNew) {

                btn.style.display = 'none';

                categories.forEach(category => {
                    const inputs = category.querySelectorAll('input[data-editable], select[data-editable]');

                    if (!inputs || inputs.length === 0) {
                        console.error('Не найдены inputs');
                        return;
                    }

                    inputs.forEach(input => {
                        let originalValue = input.type === 'checkbox' ? input.checked : input.value;

                        const checkValueChange = () => {
                            let currentValue;
                            if (input.type === 'checkbox') {
                                currentValue = input.checked;
                            } else {
                                currentValue = input.value;
                            }
                            btn.style.display = currentValue !== originalValue ? 'inline-block' : 'none';
                        };

                        // Обработчик ввода для input, textarea и изменения select
                        input.addEventListener('input', checkValueChange);
                        if (input.tagName === 'SELECT') {
                            input.addEventListener('change', checkValueChange);
                        }

                        // Обработчик для чекбоксов
                        if (input.type === 'checkbox') {
                            input.addEventListener('change', checkValueChange);
                        }
                    })
                })
            } else {
                btn.style.display = 'flex';
            }
        };

        /**
         * Событие на создание новой категории
         */
        const handleAddNewCategory_<?= $time ?> = (wrap, data) => {
            const btn = document.getElementById('category-btn');

            if (!data || data.length === 0) {
                console.error('Массив с данным пуст.');
                return;
            } else if (!wrap) {
                console.error('Не существует блока, необходимого для отрисовки.');
                return;
            } else if (!btn) {
                console.error('Не удалось обнаружить кнопку');
                return;
            }

            btn.addEventListener('click', () => {
                const selects = wrap.querySelectorAll('.js-select-category');
                const categoriesIds = [];

                if (selects.length !== 0) {
                    selects.forEach(el => categoriesIds.push(parseInt(el.value)));

                    const newData = data.filter(el => !categoriesIds.includes(el.id));

                    if (newData.length !== 0) {
                        createItemCategory_<?= $time ?>(wrap, newData, null, ++selects.length);
                    }
                } else {
                    createItemCategory_<?= $time ?>(wrap, data);
                }
            })
        }

        /**
         * Инициализация функций для отрисовки и событий категорий
         */
        const initCategory_<?= $time ?> = () => {
            const wrap = document.getElementById('category-wrap');
            const data = <?= $jsonList ?>;
            const getData = <?= $jsonCategoriesList ?>;

            if (!data || data.length === 0) {
                console.error('Массив с данными пуст.');
                return;
            } else if (!wrap) {
                console.error('Не существует блока, необходимого для отрисовки.');
                return;
            }

            if (getData && getData.length !== 0 && getData !== 0) {
                createItemsCategories_<?= $time ?>(wrap, data, getData);
                handleAddNewCategory_<?= $time ?>(wrap, data);
                editCategory_<?= $time ?>();
            } else {
                handleAddNewCategory_<?= $time ?>(wrap, data);
            }
            // handleAddNewCategory_<?= $time ?>(wrap, data);
            // editCategory_<?= $time ?>();
        }

        initCategory_<?= $time ?>();
    </script>
<?php endif ?>