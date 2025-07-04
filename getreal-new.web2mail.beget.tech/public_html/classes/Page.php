<?php

class Page
{
    private $pdo;

    /**
     * @param \PDO $pdo
     */
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Метод получения данных страницы по id
     * 
     * @param int id страницы
     * @return array|null массив с данными страницы, либо null
     */
    public function get(int $id): ?array
    {
        $sql = "SELECT * FROM page_routes WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ?: null;
    }
}
