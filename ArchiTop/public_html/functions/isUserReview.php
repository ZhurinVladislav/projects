<?php

function isUserReview(string $ipUser, int $idCompany)
{
    global $pdo;

    $sql = "SELECT id FROM user_reviews WHERE user_ip = :userIp AND company_id = :idCompany";

    $stmt = $pdo->prepare($sql);

    $stmt->execute(['userIp' => $ipUser, 'idCompany' => $idCompany]);

    return $stmt->fetch() !== false;
}
