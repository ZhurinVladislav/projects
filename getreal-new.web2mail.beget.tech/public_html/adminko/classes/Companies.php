<?php

namespace App\Classes;

use PDO;

class Companies
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
     * Метод получения массива компаний
     * @return array|null массив компаний, либо null
     */
    public function list(): array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM companies");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения компании
     * @param int id компании
     * @return array|null массив компании, либо null
     */
    public function get(int $id)
    {
        // 
    }

    /**
     * Метод получения id новой компании, используется в создание новой компании
     * @return int $id - id новой компании
     */
    public function getNewId()
    {
        $stmt = $this->pdo->prepare("SELECT id FROM companies ORDER BY id DESC LIMIT 1");
        $stmt->execute();

        return $stmt->fetch()['id'] + 1;
    }

    /**
     * Метод создания компании
     * @param int id компании
     * @return array|null массив компании, либо null
     */
    public function store()
    {
        // 
    }

    /**
     * Метод удаления компании
     * @param int id компании
     * @return array|null массив компании, либо null
     */
    public function delete(int $id)
    {
        // 
    }
}
