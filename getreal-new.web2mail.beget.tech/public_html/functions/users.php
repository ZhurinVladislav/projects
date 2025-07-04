<?php

function users_get_last($limit) {
	global $pdo;
	$array = array();

	$users_list = $pdo->prepare('SELECT * FROM users ORDER BY id DESC LIMIT '.$limit);
	$users_list->execute();
	while ($users_list_row = $users_list->fetch()) {
		$array[] = $users_list_row;
	}
	return $array;
}

function users_search_id($id, $columns = '') {
	global $pdo;
	$array = array();

	if ($columns == '') {
		$users_list = $pdo->prepare('SELECT * FROM users WHERE id = ? ORDER BY id DESC LIMIT 1');
	} else {
		$users_list = $pdo->prepare('SELECT '.$columns.' FROM users WHERE id = ? ORDER BY id DESC LIMIT 1');
	}
	
	$users_list->execute(array($id));

	return $users_list->fetch();
}

function users_search_login($str, $columns = '') {
	global $pdo;
	$array = array();

	
	if ($columns == '') {
		$users_list = $pdo->prepare('SELECT * FROM users WHERE login LIKE ? ORDER BY id DESC');
	} else {
		$users_list = $pdo->prepare('SELECT '.$columns.' FROM users WHERE login LIKE ? ORDER BY id DESC');
	}
	
	$users_list->execute(array('%'.$str.'%'));
	while ($users_list_row = $users_list->fetch()) {
		$array[] = $users_list_row;
	}
	return $array;
}

function users_search_email($str, $columns = '') {
	global $pdo;
	$array = array();

	
	if ($columns == '') {
		$users_list = $pdo->prepare('SELECT * FROM users WHERE email LIKE ? ORDER BY id DESC');
	} else {
		$users_list = $pdo->prepare('SELECT '.$columns.' FROM users WHERE email LIKE ? ORDER BY id DESC');
	}
	
	$users_list->execute(array('%'.$str.'%'));
	while ($users_list_row = $users_list->fetch()) {
		$array[] = $users_list_row;
	}
	return $array;
}