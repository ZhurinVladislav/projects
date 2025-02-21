<?php

class Company
{
    private $pdo;
    protected $userIP;

    /**
     * @param \PDO $pdo
     */
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->userIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    }

    /**
     * Метод получения компании по id
     * 
     * @param int $id id категории
     * @return array|null компания
     */
    public function get(int $id): ?array
    {
        $sql = 'SELECT * FROM companies WHERE id = :id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения массива компаний
     * 
     * @return array|null компании
     */
    public function list(): ?array
    {
        $sql = "SELECT * FROM companies";

        $stmt = $this->pdo->query($sql);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения компаний по id категории с алиасами
     * 
     * @param int $id id категории
     * @return array|null массив компаний с алиасами
     */
    public function getListByCategoryId(int $id): ?array
    {
        $sql = "SELECT c.*, pr.alias 
        FROM companies c
        JOIN page_routes pr ON c.page_id = pr.id
        WHERE c.category_id = :category_id
    ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['category_id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /** 
     * Метод получения телефонов по id компании
     * 
     * @param int id компании
     * @return array|null массив телефонов
     * */
    public function getPhones(int $id): ?array
    {
        $sql = 'SELECT phone_number FROM company_phones WHERE id_company = :id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /** 
     * Метод получения последнего телефона по id компании
     * 
     * @param int id компании
     * @return string последний телефон компании  
     * */
    public function getLastPhones(int $id): ?string
    {
        $sql = 'SELECT phone_number FROM company_phones WHERE id_company = :id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        $list = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $listItem = end($list);

        return $listItem['phone_number'];
    }

    /**
     * Метод получения ссылок на мессенджеры и соц. сети
     * 
     * @param int $id id компании
     * @param array массив ссылок
     */
    public function getLinks(int $id): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM company_links WHERE id_company = :id');
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /** 
     * Метод получениЯ компании по id страницы
     * 
     * @param int id страницы
     * @return array|null компания
     * */
    public function getCompanyByPageId(int $id): ?array
    {
        $sql = "SELECT id, name FROM companies WHERE page_id = :page_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['page_id' => $id]);
        $company = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$company) {
            return null;
        }

        return $company;
    }

    /**
     * Метод получения алиаса и названия категории компании
     * 
     * @param int $companyId ID компании
     * @return array|null Массив с данными или null, если не найдено
     */
    public function getCompanyCategoryById(int $companyId): ?array
    {
        $sql = "SELECT c.id AS company_id, cat.name AS category_name, pr.alias 
        FROM companies c
        JOIN categories cat ON c.category_id = cat.id
        JOIN page_routes pr ON cat.page_id = pr.id
        WHERE c.id = :company_id";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['company_id' => $companyId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ?: null; // Вернем null, если ничего не найдено
    }

    /**
     * Метод получения услуг компании по id
     * 
     * @param int $id id компании
     * @return array|null массив услуг
     */
    public function getServices(int $id): ?array
    {
        $sql = 'SELECT * FROM company_services WHERE id_company = :id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения портфолио компании по id
     * 
     * @param int $id id компании
     * @return array|null массив портфолио
     */
    public function getPortfolio(int $id): ?array
    {
        $sql = 'SELECT * FROM company_portfolios WHERE id_company = :id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // public function createReview($idCompany, $firstName, $lastName, $email, $text, $rating, $ipAddress)
    // {
    //     // Проверка, голосовал ли пользователь
    //     $stmt = $this->pdo->prepare("SELECT * FROM user_votes WHERE ip_address = :ip");
    //     // if (!in_array($userId, [0, 1])) {
    //     //     throw new Exception("Invalid user ID.");
    //     // }

    //     if ($rating < 1 || $rating > 5) {
    //         throw new Exception("Rating must be between 1 and 5.");
    //     }

    //     $stmt = $this->pdo->prepare("INSERT INTO company_reviews (user_id,ip_address, id_company, first_name, last_name, email, text, rating, ip_address) VALUES (:user_id, :ip_address, :id_company, :first_name, :last_name, :email, :text, :rating)");

    //     $userId = 1;
    //     $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    //     $stmt->bindParam(':ip_address', $ipAddress, PDO::PARAM_STR);
    //     $stmt->bindParam(':id_company', $idCompany, PDO::PARAM_INT);
    //     $stmt->bindParam(':first_name', $firstName, PDO::PARAM_STR);
    //     $stmt->bindParam(':last_name', $lastName, PDO::PARAM_STR);
    //     $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    //     $stmt->bindParam(':text', $text, PDO::PARAM_STR);
    //     $stmt->bindParam(':rating', $rating, PDO::PARAM_INT);

    //     if ($stmt->execute()) {
    //         return "Review created successfully!";
    //     } else {
    //         throw new Exception("Error creating review: " . $stmt->errorInfo()[2]);
    //     }
    // }

    // public function getReviewsInfo()
    // {
    //     $sql = 'SELECT name, img FROM company_portfolios WHERE id_company = :id';
    // }

    /**
     * Метод получения отзывов компании по id
     * @param int $id id компании
     * @return array|null массив отзывов
     */
    public function getReviews(int $id)
    {
        $sql = "SELECT first_name, last_name, review_text, created_at, rating FROM company_reviews WHERE company_id = :id";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения количество отзывов
     * @return int количество отзывов
     */
    public function countReviews()
    {
        $sql = "SELECT COUNT(*) AS total FROM company_reviews";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total'] ?? 0;
    }

    /**
     * Метод получения рейтинга компании по id
     * @param int $id id компании
     * @return int рейтинг компании
     */
    public function getRating(int $id)
    {
        $sql = "SELECT ROUND(AVG(rating), 1) AS average_rating 
        FROM company_reviews 
        WHERE company_id = :id";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['average_rating'] ?? 0;
    }

    /**
     * Метод получения количество компаний
     * @return int количество компаний
     */
    public function count()
    {
        $sql = "SELECT COUNT(*) AS total FROM companies";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total'] ?? 0;
    }
}
