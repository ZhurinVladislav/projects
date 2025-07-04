<?php

global $pdo;

require_once './functions/getUserIP.php';

$ipAddress = getUserIP();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $companyName = htmlspecialchars(trim($_POST['data']['companyName']));
    $rating = htmlspecialchars(trim($_POST['data']['rating']));
    $firstName = htmlspecialchars(trim($_POST['data']['firstName']));
    $lastName = htmlspecialchars(trim($_POST['data']['lastName']));
    $email = htmlspecialchars(trim($_POST['data']['email']));
    $message = htmlspecialchars(trim($_POST['data']['message']));

    // Honeypot-проверка
    if (!empty($_POST['data']['honeypot'])) {
        die("Ошибка: обнаружен бот.");
    }

    // Проверка времени отправки (не слишком быстрое заполнение)
    $form_start_time = $_POST['data']['formStartTime'] ?? 0;

    if (time() - $form_start_time < 5) {
        die("Ошибка: форма заполнена слишком быстро.");
    }

    // Убедитесь, что все поля заполнены
    if (!empty($companyName) && !empty($rating) && !empty($firstName) && !empty($lastName) && !empty($email) && !empty($message)) {
        $to = "advert.01.web2@yandex.ru";

        // Тема письма
        $subject = "Новый отзыв для компании $companyName";

        // Содержимое письма
        $body = "Компания: $companyName\nРейтинг: $rating\nИмя: $firstName\nФамилия: $lastName\nEmail: $email\nСообщение:\n$message";

        // Заголовки письма
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

        // Отправка письма
        if (mail($to, $subject, $body, $headers)) {
            try {
                $idCompany = isset($_GET['id']) ? intval($_GET['id']) : 1;
                $sql = "INSERT INTO user_reviews (user_ip, company_id) VALUES (:userIp, :companyId)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(['userIp' => $ipAddress, 'companyId' => $idCompany]);
                $pdo->commit();

                echo true;
            } catch (Exception $e) {
                $pdo->rollBack();
                echo false;
                // echo "Ошибка выполнения запроса: " . $e->getMessage();
            }

            // $stmt->close();

            // echo "Сообщение успешно отправлено!";

        } else {
            echo false;
            // echo "Ошибка отправки сообщения.";
        }
    } else {
        echo false;
        // echo "Пожалуйста, заполните все поля.";
    }
} else {
    echo false;
    // echo "Некорректный метод запроса.";
}
