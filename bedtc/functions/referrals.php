<?php

function referrals_get_list_first(int $user_id, int $page = 1, int $limit = 0) {
	global $pdo;

	$total_rows = $pdo->prepare('SELECT COUNT(user_id) as count FROM users_referrals WHERE ref_id_first = ?');
	$total_rows->execute(array($user_id));
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;

		$items_list = $pdo->prepare('SELECT * FROM users_referrals WHERE ref_id_first = ? ORDER BY user_id DESC LIMIT ?, ?');
		$items_list->execute(array($user_id, $start, $limit));

		$items = array();
		while ($logs_list_row = $items_list->fetch()) {
			$items[] = $logs_list_row;
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


function referrals_get_list(int $user_id, string $type, int $page = 1, int $limit = 0) {
	global $pdo;

	if ($type == 'all') {
		$where = 'ref_id_first = '.$user_id.' OR ref_id_second = '.$user_id.' OR ref_id_third = '.$user_id;
	} elseif ($type == 'first') {
		$where = 'ref_id_first = '.$user_id;
	} elseif ($type == 'second') {
		$where = 'ref_id_second = '.$user_id;
	} elseif ($type == 'third') {
		$where = 'ref_id_third = '.$user_id;
	}

	$total_rows = $pdo->query('SELECT COUNT(user_id) as count FROM users_referrals WHERE '.$where);
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;

		$items_list = $pdo->prepare('SELECT * FROM users_referrals WHERE '.$where.' ORDER BY user_id DESC LIMIT ?, ?');
		$items_list->execute(array($start, $limit));

		$items = array();
		while ($logs_list_row = $items_list->fetch()) {
			$items[] = $logs_list_row;
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