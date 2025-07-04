<?php

function faq_get_list() {
	global $pdo;
	$array = array();

	$items_list = $pdo->prepare('SELECT * FROM faq ORDER BY sort ASC');
	$items_list->execute();
	while ($users_list_row = $items_list->fetch()) {
		$array[] = $users_list_row;
	}
	return $array;
}

function faq_add_item($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_th, $title_hi, $title_zh, $content_ru, $content_en, $content_de, $content_pt, $content_es, $content_fr, $content_th, $content_hi, $content_zh, $sort = 'auto') {
	global $pdo;
	
	if ($sort == 'auto') {
		$last_item = $pdo->prepare('SELECT COUNT(id) as last_item_id FROM faq');
		$last_item->execute();
		$item_sort = $last_item->fetch();
		$sort = $item_sort['last_item_id'] + 1;
	}

	$add_item = $pdo->prepare('INSERT INTO faq (title_ru, title_en, title_de, title_pt, title_es, title_fr, title_th, title_hi, title_zh, content_ru, content_en, content_de, content_pt, content_es, content_fr, content_th, content_hi, content_zh, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

	if ($add_item->execute(array($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_th, $title_hi, $title_zh, $content_ru, $content_en, $content_de, $content_pt, $content_es, $content_fr, $content_th, $content_hi, $content_zh, $sort))) {
		return true;
	} else {
		return false;
	}
}