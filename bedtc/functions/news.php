<?php

function news_get_list($page = 1, $limit = 0) {
	global $pdo, $user;

	if ($user->id == 1) {
		$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM news');
	} else {
		$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM news WHERE admin_only = 0');
	}
	
	$total_rows->execute();
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;
		
		if ($user->id == 1) {
			$items_list = $pdo->prepare('SELECT * FROM news ORDER BY date DESC LIMIT ?, ?');
		} else {
			$items_list = $pdo->prepare('SELECT * FROM news WHERE admin_only = 0 ORDER BY date DESC LIMIT ?, ?');
		}
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

function news_add_item($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_hi, $title_id, $title_th, $title_tr, $title_zh, $annotation_ru, $annotation_en, $annotation_de, $annotation_pt, $annotation_es, $annotation_fr, $annotation_hi, $annotation_id, $annotation_th, $annotation_tr, $annotation_zh, $content_ru, $content_en, $content_de, $content_pt, $content_es, $content_fr, $content_hi, $content_id, $content_th, $content_tr, $content_zh, $image, $admin_only) {
	global $pdo;

	$contents_text = array(
		'ru' => $content_ru,
		'en' => $content_en,
		'de' => $content_de,
		'pt' => $content_pt,
		'es' => $content_es,
		'fr' => $content_fr,
		'hi' => $content_hi,
		'id' => $content_id,
		'th' => $content_th,
		'tr' => $content_tr,
		'zh' => $content_zh
	);

	$add_item = $pdo->prepare('INSERT INTO news (title_ru, title_en, title_de, title_pt, title_es, title_fr, title_hi, title_id, title_th, title_tr, title_zh, annotation_ru, annotation_en, annotation_de, annotation_pt, annotation_es, annotation_fr, annotation_hi, annotation_id, annotation_th, annotation_tr, annotation_zh, image, date, admin_only) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

	if ($add_item->execute(array($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_hi, $title_id, $title_th, $title_tr, $title_zh, $annotation_ru, $annotation_en, $annotation_de, $annotation_pt, $annotation_es, $annotation_fr, $annotation_hi, $annotation_id, $annotation_th, $annotation_tr, $annotation_zh, $image, time(), $admin_only))) {

		$id_of_news = $pdo->lastInsertId();
		file_put_contents('../pages/news/items/news'.$id_of_news.'.json', json_encode($contents_text));

		return true;

	} else {
		return false;
	}

	return true;
}

function news_get_item(int $id) {
	global $pdo, $user;

	if ($id > 0) {
		if ($user->id == 1) {
			$get_news_item = $pdo->prepare('SELECT * FROM news WHERE id = ? LIMIT 1');
		} else {
			$get_news_item = $pdo->prepare('SELECT * FROM news WHERE id = ? AND admin_only = 0 LIMIT 1');
		}

		$get_news_item->execute(array($id));
		
		if (!is_bool($news_item = $get_news_item->fetch())) {
			return $news_item;
		} else {
			return false;
		}

	} else {
		return false;
	}
}

function news_etf_get_list($page = 1, $limit = 0) {
	global $pdo, $user;

	if ($user->id == 1) {
		$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM news_etf');
	} else {
		$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM news_etf WHERE admin_only = 0');
	}
	
	$total_rows->execute();
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;
		
		if ($user->id == 1) {
			$items_list = $pdo->prepare('SELECT * FROM news_etf ORDER BY date DESC LIMIT ?, ?');
		} else {
			$items_list = $pdo->prepare('SELECT * FROM news_etf WHERE admin_only = 0 ORDER BY date DESC LIMIT ?, ?');
		}
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

function news_etf_add_item($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_hi, $title_id, $title_th, $title_tr, $title_zh, $annotation_ru, $annotation_en, $annotation_de, $annotation_pt, $annotation_es, $annotation_fr, $annotation_hi, $annotation_id, $annotation_th, $annotation_tr, $annotation_zh, $content_ru, $content_en, $content_de, $content_pt, $content_es, $content_fr, $content_hi, $content_id, $content_th, $content_tr, $content_zh, $image, $admin_only) {
	global $pdo;

	$contents_text = array(
		'ru' => $content_ru,
		'en' => $content_en,
		'de' => $content_de,
		'pt' => $content_pt,
		'es' => $content_es,
		'fr' => $content_fr,
		'hi' => $content_hi,
		'id' => $content_id,
		'th' => $content_th,
		'tr' => $content_tr,
		'zh' => $content_zh
	);

	$add_item = $pdo->prepare('INSERT INTO news_etf (title_ru, title_en, title_de, title_pt, title_es, title_fr, title_hi, title_id, title_th, title_tr, title_zh, annotation_ru, annotation_en, annotation_de, annotation_pt, annotation_es, annotation_fr, annotation_hi, annotation_id, annotation_th, annotation_tr, annotation_zh, image, date, admin_only) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

	if ($add_item->execute(array($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_hi, $title_id, $title_th, $title_tr, $title_zh, $annotation_ru, $annotation_en, $annotation_de, $annotation_pt, $annotation_es, $annotation_fr, $annotation_hi, $annotation_id, $annotation_th, $annotation_tr, $annotation_zh, $image, time(), $admin_only))) {

		$id_of_news = $pdo->lastInsertId();
		file_put_contents('../pages/news-etf/items/news'.$id_of_news.'.json', json_encode($contents_text));

		return true;

	} else {
		return false;
	}

	return true;
}

function news_etf_get_item(int $id) {
	global $pdo, $user;

	if ($id > 0) {
		if ($user->id == 1) {
			$get_news_item = $pdo->prepare('SELECT * FROM news_etf WHERE id = ? LIMIT 1');
		} else {
			$get_news_item = $pdo->prepare('SELECT * FROM news_etf WHERE id = ? AND admin_only = 0 LIMIT 1');
		}

		$get_news_item->execute(array($id));
		
		if (!is_bool($news_item = $get_news_item->fetch())) {
			return $news_item;
		} else {
			return false;
		}

	} else {
		return false;
	}
}