<?php

namespace App\Classes;

use PDO;

class Category
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
     * Метод получения массива категорий
     * 
     * @return array массив категорий
     */
    public function list(): array
    {
        $stmt = $this->pdo->prepare("SELECT id, name FROM categories");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения массива категорий
     * 
     * @param int $id id категории
     * @return array|null массив категорий, либо null
     */
    public function get(int $id): ?array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM categories WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
}
