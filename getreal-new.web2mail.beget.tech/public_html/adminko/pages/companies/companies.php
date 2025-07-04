<?php if ($_POST['action'] == 'get_page'): ?>
    <?php
    global $pdo;
    require_once $_SERVER['DOCUMENT_ROOT'] . '/adminko/classes/Companies.php';

    $companiesObj = new Companies($pdo);
    $companiesList = $companiesObj->list();
    ?>

    <?php if (count($companiesList) > 0): ?>
        <table class="table">
            <thead class="table__thead">
                <tr class="table__tr">
                    <th class="table__th">ID</th>
                    <th class="table__th">Название</th>
                    <th class="table__th">Дата создания</th>
                    <th class="table__th">Дата редактирования</th>
                    <th class="table__th">Действия</th>
                </tr>
            </thead>
            <tbody class="table__tbody">

                <?php foreach ($companiesList as $company): ?>
                    <tr class="table__tr">
                        <form class="table__form" method="POST">
                            <td class="table__td">
                                <?= htmlspecialchars($company['id']) ?>
                            </td>
                            <td class="table__td">
                                <?= htmlspecialchars($company['name']) ?>
                            </td>
                            <td class="table__td">
                                <?= htmlspecialchars($company['date_created']) ?>
                            </td>
                            <td class="table__td">
                                <?= htmlspecialchars($company['date_update']) ?>
                            </td>
                            <td class="table__td">
                                <div class="table__btn-wrap">
                                    <button class="table__link link-text link-text_success" data-edit="companies/edit" data-id="<?= htmlspecialchars($company['id']) ?>">
                                        Редактировать
                                    </button>
                                    <button class=" table__link link-text link-text_delete">
                                        Удалить
                                    </button>
                                </div>
                            </td>
                        </form>
                    </tr>
                <?php endforeach ?>

            </tbody>
        </table>
    <?php else: ?>
        <p>
            Список компаний пуст
        </p>
    <?php endif ?>
    <button></button>
<?php endif ?>