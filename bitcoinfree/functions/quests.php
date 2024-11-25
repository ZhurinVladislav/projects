<?php

function quests_get_list($table, int $status = 0, int $page = 1, int $limit = 0) {
	global $pdo;

	$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM quest_'.$table.' WHERE status = ? OR status = 3');
	$total_rows->execute(array($status));
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;

		$items_list = $pdo->prepare('SELECT * FROM quest_'.$table.' WHERE status = ? OR status = 3 ORDER BY status DESC, date_created DESC LIMIT ?, ?');
		$items_list->execute(array($status, $start, $limit));

		$items = array();
		while ($row = $items_list->fetch()) {
			$items[] = $row;
		}
		$array['items'] = $items;

		$pagination = array();

		$pagination['prev'] = $page != 1 ? $page - 1 : false;
		$pagination['minustwo'] = $page - 2 > 0 ? $page - 2 : false;
		$pagination['minusone'] = $page - 1 > 0 ? $page - 1 : false;
		$pagination['current'] = $page;
		$pagination['plusone'] = $page + 1 <= $total ? $page + 1 : false;
		$pagination['plustwo'] = $page + 2 <= $total ? $page + 2 : false;
		$pagination['next'] = $page != $total ? $page + 1 : false;

		$array['pagination'] = $pagination;

		return $array;

	} else {
		return 'empty';
	}
}