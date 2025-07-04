<?php

global $pdo;

if (isset($_POST['vote'])) {
    $option = $_POST['vote'];
    echo 'asd';
    // echo json_encode($results);
    // echo $option;
    // echo json_encode($option);
}


// require_once('./functions/feedback.php');

// $ipAddress = getUserIP();
// $stmt = $pdo->prepare("SELECT * FROM user_votes WHERE ip_address = :ip");
// $stmt->execute(['ip' => $ipAddress]);
// $hasVoted = $stmt->fetch() !== false;

// if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$hasVoted) {
// 	$option = (int) $_POST['vote'];
// 	$pdo->beginTransaction();
// 	try {
// 		$stmt = $pdo->prepare("UPDATE votes SET count = count + 1 WHERE id = :id");
// 		$stmt->execute(['id' => $option]);

// 		$stmt = $pdo->prepare("INSERT INTO user_votes (ip_address) VALUES (:ip)");
// 		$stmt->execute(['ip' => $ipAddress]);

// 		$pdo->commit();
// 		$hasVoted = true;
// 	} catch (Exception $e) {
// 		$pdo->rollBack();
// 		// die("Ошибка при голосовании: " . $e->getMessage());

// 		echo 'Ошибка при голосовании: ' . $e->getMessage();
// 		// return null;
// 	}
// }

// // Получение статистики голосования
// $votes = $pdo->query("SELECT * FROM votes")->fetchAll(PDO::FETCH_ASSOC);
// header('Content-Type: application/json');

// $results = ['votes' => $votes, 'hasVoted' => $hasVoted];

// echo json_encode($results);


// function getUserIP()
// {
// 	return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
// }

// echo json_encode($_POST['choice']);
// echo $_POST;
// if(isset($_POST[])) {

// }

// if (
// 	$_SERVER['REQUEST_METHOD'] === 'POST'
// ) {
	// $option = (int) $_POST['vote'];
	// $pdo->beginTransaction();
	// try {
	// Увеличиваем количество голосов
	// $stmt = $pdo->prepare("UPDATE votes SET count = count + 1 WHERE id = :id");
	// $stmt->execute(['id' => $option]);

	// Сохраняем IP-адрес пользователя
	// $stmt = $pdo->prepare("INSERT INTO user_votes (ip_address) VALUES (:ip)");
	// $stmt->execute(['ip' => $ipAddress]);

	// $pdo->commit();
	// $hasVoted = true;
	// } catch (Exception $e) {
	// $pdo->rollBack();
	// die("Ошибка при голосовании: " . $e->getMessage());

	// return null;
	// }

	// $votes = $pdo->query("SELECT * FROM votes")->fetchAll(PDO::FETCH_ASSOC);


	// echo 'asd';

	// header('Content-Type: application/json');
	// echo json_encode($votes);
// }







// Получение IP-адреса пользователя
// function getUserIP()
// {
// 	return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
// }

// function feedbackMainPage(): array
// {
// 	global $pdo;

// 	$ipAddress = getUserIP();
// 	// Проверка, голосовал ли пользователь
// 	$stmt = $pdo->prepare("SELECT * FROM user_votes WHERE ip_address = :ip");
// 	$stmt->execute(['ip' => $ipAddress]);
// 	$hasVoted = $stmt->fetch() !== false;

// 	// Обработка голосования
// 	if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$hasVoted) {
// 		$option = (int) $_POST['vote'];
// 		$pdo->beginTransaction();
// 		try {
// 			// Увеличиваем количество голосов
// 			$stmt = $pdo->prepare("UPDATE votes SET count = count + 1 WHERE id = :id");
// 			$stmt->execute(['id' => $option]);

// 			// Сохраняем IP-адрес пользователя
// 			$stmt = $pdo->prepare("INSERT INTO user_votes (ip_address) VALUES (:ip)");
// 			$stmt->execute(['ip' => $ipAddress]);

// 			$pdo->commit();
// 			$hasVoted = true;
// 		} catch (Exception $e) {
// 			$pdo->rollBack();
// 			die("Ошибка при голосовании: " . $e->getMessage());

// 			return null;
// 		}
// 	}

// 	// Получение статистики голосования
// 	$votes = $pdo->query("SELECT * FROM votes")->fetchAll(PDO::FETCH_ASSOC);

// 	return ['votes' => $votes, 'hasVoted' => $hasVoted];
// }
