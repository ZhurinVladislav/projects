<?php

require_once '../functions/surf.php';

if ($_POST['action'] != 'get_page') {
	if ($_POST['action'] == 'search') {
?>
		<div class="table-row table-header">
			<div class="table-column" style="width: 70%">Название сайта</div>
			<div class="table-column" style="width: 30%">Статус</div>
		</div>
		<?php
			$get_id = (int) $_POST['string'];
			if ($get_id > 0) {
				$site_search_list = site_search_user($get_id);
				if (count($site_search_list) > 0) {
		?>
					<p>Совпадения по ID пользователя:</p>
		<?php
					foreach ($site_search_list as $key => $value) {

						switch ($value['status']) {
							case '1':
								$status = 'Работает';
								break;
							case '2':
								$status = 'Остановлен';
								break;
							case '3':
								$status = 'Удален пользователем';
								break;
							case '4':
								$status = 'Закончились просмотры';
								break;
							default:
								$status = 'Отключен нами';
								break;
						}

						switch ($value['secure']) {
							case '1':
								$secure = 'background-color: rgba(0, 255, 0, 0.3)';
								break;
							case '0':
								$secure = 'background-color: rgba(255, 0, 0, 0.3)';
								break;
						}
		?>
					<div class="table-row" style="<?= $secure; ?>">
						<div class="table-column" style="width: 70%">
							<span data-edit="surfing/site_edit" data-id="<?= $value['id']; ?>"><?= $value['link_name']; ?></span>
						</div>
						<div class="table-column" style="width: 30%"><?= $status; ?></div>
					</div>
		<?php
					}
				}
			} else {
		?>
				<div class="table-row table-row-error">
					<div class="table-column" style="width: 100%">Не найдено</div>
				</div>
		<?php
			}
		?>
<?php
	}
} else {
?>

<form class="form-default form-search" data-result="results_1">
	<div class="form-item form-item-search">
		<label>
			<span class="form-item__header">Поиск</span>
			<input class="form-item__input" type="text" name="search">
			<button type="submit" class="form-item__button button-d">Поиск</button>
			<span class="form-item__description">Поиск по ID сайта</span>
		</label>
	</div>
</form>

<div><span style="color: green">Проверенный</span> | <span style="color: red">Не проверенный</span></div>
<br><br>

<div class="table-default" data-placeholder="results_1">
	<div class="table-row table-header">
		<div class="table-column" style="width: 70%">Название сайта</div>
		<div class="table-column" style="width: 30%">Статус</div>
	</div>
	<?php
		$site_list = sites_get_list(20);
		
		foreach ($site_list as $key => $value) {

			switch ($value['status']) {
				case '1':
					$status = 'Работает';
					break;
				case '2':
					$status = 'Остановлен';
					break;
				case '3':
					$status = 'Удален пользователем';
					break;
				case '4':
					$status = 'Закончились просмотры';
					break;
				default:
					$status = 'Отключен нами';
					break;
			}

			switch ($value['secure']) {
				case '1':
					$secure = 'background-color: rgba(0, 255, 0, 0.3)';
					break;
				case '0':
					$secure = 'background-color: rgba(255, 0, 0, 0.3)';
					break;
			}

	?>
		<div class="table-row" style="<?= $secure; ?>">
			<div class="table-column" style="width: 70%">
				<span data-edit="surfing/site_edit" data-id="<?= $value['id']; ?>"><?= $value['link_name']; ?></span>
			</div>
			<div class="table-column" style="width: 30%"><?= $status; ?></div>
		</div>
	<?php
		}
	?>
</div>

<?php
}
?>