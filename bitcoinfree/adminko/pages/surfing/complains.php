<?php

require_once '../functions/surf.php';

if ($_POST['action'] != 'get_page') {
	if ($_POST['action'] == 'search') {
?>
		<div class="table-row table-header">
			<div class="table-column" style="width: 5%">ID</div>
			<div class="table-column" style="width: 75%">Название сайта</div>
			<div class="table-column" style="width: 10%">Жалоб</div>
			<div class="table-column" style="width: 10%">Статус</div>
		</div>
		<?php
			$get_id = (int) $_POST['string'];
			if ($get_id > 0) {
				$site_search_list = site_search_id($get_id);
				if (count($site_search_list) > 0) {
		?>
					<p>Совпадения по ID сайта:</p>
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
						}
		?>
					<div class="table-row">
						<div class="table-column" style="width: 5%"><?= $value['id']; ?></div>
						<div class="table-column" style="width: 75%">
							<span data-edit="surfing/site_edit" data-id="<?= $value['id']; ?>"><?= $value['link_name']; ?></span>
						</div>
						<div class="table-column" style="width: 10%"><?= $value['complains']; ?></div>
						<div class="table-column" style="width: 10%"><?= $status; ?></div>
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
			<span class="form-item__description">Поиск по id пользователя</span>
		</label>
	</div>
</form>

<div class="table-default" data-placeholder="results_1">
	<div class="table-row table-header">
		<div class="table-column" style="width: 5%">ID</div>
		<div class="table-column" style="width: 75%">Название сайта</div>
		<div class="table-column" style="width: 10%">Жалоб</div>
		<div class="table-column" style="width: 10%">Статус</div>
	</div>
	<?php
		$site_list = sites_get_complains(20);
		
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
			}

	?>
		<div class="table-row">
			<div class="table-column" style="width: 5%"><?= $value['id']; ?></div>
			<div class="table-column" style="width: 75%">
				<span data-edit="surfing/complains_edit" data-id="<?= $value['id']; ?>"><?= $value['link_name']; ?></span>
			</div>
			<div class="table-column" style="width: 10%"><?= $value['complains']; ?></div>
			<div class="table-column" style="width: 10%"><?= $status; ?></div>
		</div>
	<?php
		}
	?>
</div>

<?php
}
?>