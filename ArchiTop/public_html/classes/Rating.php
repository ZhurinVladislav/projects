<?php

class Rating
{
    private $pdo;
    private $page_id;

    /**
     * @param \PDO $pdo
     */
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->page_id = (int)$_GET['page_id'];
    }

    public function test()
    {
        echo $this->page_id;
    }

    /** 
     * Метод получения категорий
     * 
     * @return array|null массив категорий
     * */
    public function getList(): ?array
    {
        $sql = "SELECT 
                c.id, 
                c.name, 
                COUNT(s.id) AS count,
                p.alias
            FROM 
                categories c
            LEFT JOIN 
                services s ON c.id = s.category_id
            LEFT JOIN 
                page_routes p ON c.page_id = p.id
            GROUP BY 
                c.id, c.name, p.alias
            ORDER BY 
                c.name ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения категории по id
     * 
     * @param int id категории
     * @return array|null массив категории
     */
    public function get(int $id): ?array
    {
        $sql = "SELECT * FROM categories WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ?: null;
    }

    /** 
     * Метод получения категории по id страницы
     * 
     * @param int id страницы
     * @return array|null массив категорий
     * */
    public function getCategoryByPageId(int $id): ?array
    {
        $sql = "SELECT id, name FROM categories WHERE page_id = :page_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['page_id' => $id]);
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        return $category ?: null;
    }

    /** 
     * Метод получения услуг по id категории 
     * 
     * @param int id категории
     * @return array|null массив услуг
     * */
    public function getServicesListById(int $id): ?array
    {
        $sql = "SELECT name FROM services WHERE category_id = :category_id ORDER BY name ASC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['category_id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /** 
     * Метод получения количество услуг
     * 
     * @return int количество услуг
     * */
    public function countServices(): int
    {
        $sql = "SELECT COUNT(*) AS count FROM services";
        $stmt = $this->pdo->query($sql);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['count'] ?? 0;
    }
}
