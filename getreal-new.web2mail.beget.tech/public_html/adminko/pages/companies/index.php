<?php

use App\Classes\Company;

global $pdo;

require_once $_SERVER['DOCUMENT_ROOT'] . '/adminko/classes/Company.php';

$company = new Company($pdo);

if ($_POST['action'] === 'delete') {
    $company->delete($_POST['data']);
}
?>

<?php if ($_POST['action'] === 'get_page'): ?>
    <?php
    $companiesList = $company->index();
    ?>

    <button
        class="button-d"
        style="margin-bottom: 30px;"
        data-store="companies/store">
        Создать
    </button>

    <?php if (count($companiesList) > 0): ?>
        <table class="table">
            <thead class="table__thead">
                <tr class="table__tr">
                    <th class="table__th">Название</th>
                    <th class="table__th">Дата создания</th>
                    <th class="table__th">Дата редактирования</th>
                    <th class="table__th">Действия</th>
                </tr>
            </thead>
            <tbody class="table__tbody">

                <?php foreach ($companiesList as $company): ?>
                    <tr class="table__tr">
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
                                <button
                                    class="table__link link-text link-text_success"
                                    data-edit="companies/edit"
                                    data-id="<?= htmlspecialchars($company['id']) ?>">
                                    Редактировать
                                </button>
                                <form
                                    class="form-delete"
                                    method="POST"
                                    data-page-handler="companies/index">
                                    <input type="hidden" name="id" value="<?= htmlspecialchars($company['id']) ?>">
                                    <button
                                        class="table__link link-text link-text_delete" type="submit">
                                        Удалить
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                <?php endforeach ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>
            Список компаний пуст
        </p>
    <?php endif ?>
<?php endif ?>