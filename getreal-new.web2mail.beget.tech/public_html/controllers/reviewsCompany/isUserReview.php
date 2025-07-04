<?php

function isUserReview(string $ipUser, string $idCompany)
{
    global $pdo;

    $sql = "SELECT id FROM user_reviews WHERE user_ip = :userIp AND company_id = :idCompany";

    $stmt = $pdo->prepare($sql);

    $stmt->execute(['user_ip' => $ipUser, 'company_id' => $idCompany]);

    return $stmt->fetch() !== false;
}
