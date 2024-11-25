<?php

function reviews_get_list($page = 1, $limit = 0) {
	global $pdo;

	$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM reviews WHERE status = 1');
	$total_rows->execute();
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;

		$items_list = $pdo->prepare('SELECT * FROM reviews WHERE status = 1 ORDER BY date DESC LIMIT ?, ?');
		$items_list->execute(array($start, $limit));

		$items = array();
		while ($users_list_row = $items_list->fetch()) {
			$items[] = $users_list_row;
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

function reviews_delete($id) {
	global $pdo;

	$delete_review = $pdo->prepare('UPDATE reviews SET status = 0 WHERE id = ? LIMIT 1');
	if ($delete_review->execute(array($id))) {
		return true;
	} else {
		return false;
	}
}