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
     * @param array $exception массив исключаемых id категорий
     * @return array массив категорий
     */
    public function list(array $exception = []): array
    {
        $sql = "SELECT id, name FROM categories";

        if (!empty($exception)) {
            $placeholders = implode(',', array_fill(0, count($exception), '?'));
            $sql .= " WHERE id NOT IN ($placeholders)";
        }

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($exception);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения услуг категории
     * 
     * @param int $categoryId id категории
     * @return array|null массив с услугами, либо null, если услуг нет или id некорректный
     */
    public function listServicesByCategory(int $categoryId): ?array
    {
        // Проверяем, что переданный categoryId больше 0
        if ($categoryId <= 0) {
            return null;
        }

        $stmt = $this->pdo->prepare('SELECT * FROM services WHERE category_id = :categoryId');

        // Выполняем запрос, явно приводя categoryId к int
        $stmt->execute(['categoryId' => (int) $categoryId]);

        $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Если массив пустой, возвращаем null
        return !empty($services) ? $services : null;
    }

    /**
     * Метод получения всех категорий с привязанными услугами
     * 
     * @return array|null массив категорий с услугами, либо пустое значение
     */
    public function getFullList(): ?array
    {
        $sql = '
                SELECT c.id as category_id, c.name as category_name, 
                s.id as service_id, s.name as service_name 
                FROM categories c 
                LEFT JOIN services s ON c.id = s.category_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$results) {
            return null;
        }

        $categories = [];
        foreach ($results as $row) {
            $categoryId = $row['category_id'];
            if (!isset($categories[$categoryId])) {
                $categories[$categoryId] = [
                    'id' => $categoryId,
                    'name' => $row['category_name'],
                    'services' => []
                ];
            }
            if ($row['service_id']) {
                $categories[$categoryId]['services'][] = [
                    'id' => $row['service_id'],
                    'name' => $row['service_name']
                ];
            }
        }

        return array_values($categories);
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
