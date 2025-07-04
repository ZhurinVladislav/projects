<?php

/**
 * Функция получения IP-адреса пользователя
 * @return string ip пользователя, либо 'unknown'
 */
function getUserIP()
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function feedbackMainPage(): array
{
    global $pdo;

    $ipAddress = getUserIP();

    // Проверка, голосовал ли пользователь
    $stmt = $pdo->prepare("SELECT * FROM user_votes WHERE ip_address = :ip");
    $stmt->execute(['ip' => $ipAddress]);
    $hasVoted = $stmt->fetch() !== false;

    // Обработка голосования
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$hasVoted) {
        $option = (int) $_POST['vote'];
        $pdo->beginTransaction();
        try {
            // Увеличиваем количество голосов
            $stmt = $pdo->prepare("UPDATE votes SET count = count + 1 WHERE id = :id");
            $stmt->execute(['id' => $option]);

            // Сохраняем IP-адрес пользователя
            $stmt = $pdo->prepare("INSERT INTO user_votes (ip_address) VALUES (:ip)");
            $stmt->execute(['ip' => $ipAddress]);

            $pdo->commit();
            $hasVoted = true;
        } catch (Exception $e) {
            $pdo->rollBack();
            // die("Ошибка при голосовании: " . $e->getMessage());
            $hasVoted = false;
            echo "Ошибка при голосовании: " . $e->getMessage();
            // return false;
        }
    }

    // Получение статистики голосования
    $votes = $pdo->query("SELECT * FROM votes")->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $pdo->prepare("SELECT * FROM user_votes WHERE ip_address = :ip");
    $stmt->execute(['ip' => $ipAddress]);
    $hasVoted = $stmt->fetch() !== false;


    return ['votes' => $votes, 'hasVoted' => $hasVoted];
}
