<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Получение данных из формы
    $rating = htmlspecialchars(trim($_POST['rating-review']));
    $firstName = htmlspecialchars(trim($_POST['first-name']));
    $lastName = htmlspecialchars(trim($_POST['last-name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['comment']));

    // Honeypot-проверка
    if (!empty($_POST['honeypot'])) {
        die("Ошибка: обнаружен бот.");
    }

    // Проверка времени отправки (не слишком быстрое заполнение)
    $form_start_time = $_POST['form_start_time'] ?? 0;
    if (time() - $form_start_time < 5) {
        die("Ошибка: форма заполнена слишком быстро.");
    }

    // Убедитесь, что все поля заполнены
    if (!empty($rating) && !empty($firstName) && !empty($lastName) && !empty($email) && !empty($message)) {
        // Укажите адрес, на который отправлять заявку
        $to = "advert.01.web2@yandex.ru";

        // Тема письма
        $subject = "Новая заявка с сайта";

        // Содержимое письма
        $body = "Рейтинг: $rating\nИмя: $firstName\nФамилия: $lastName\nEmail: $email\nСообщение:\n$message";

        // Заголовки письма
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

        // Отправка письма
        if (mail($to, $subject, $body, $headers)) {
            echo "Сообщение успешно отправлено!";
        } else {
            echo "Ошибка отправки сообщения.";
        }
    } else {
        echo "Пожалуйста, заполните все поля.";
    }
} else {
    echo "Некорректный метод запроса.";
}
