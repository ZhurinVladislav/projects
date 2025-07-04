<?php

namespace App\Classes;

use Exception;
use Page;
use PDO;
use Rating;

require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Rating.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/classes/Page.php';

class Company
{
    private PDO $pdo;
    private Rating $ratingObj;
    private Page $pageObj;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->ratingObj = new Rating($pdo);
        $this->pageObj = new Page($pdo);
    }

    /**
     * Метод получения всех компаний
     * 
     * @return array массив компаний
     */
    public function index(): array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM companies");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения компании по id
     * 
     * @param int $id идентификатор компании
     * @return array|null массив компании, либо пустое значение
     */
    public function get(int $id): ?array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM companies WHERE id = :id");
        $stmt->execute([':id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * Метод получения id новой компании
     * 
     * @return int идентификатор новой компании
     */
    public function getNewId(): int
    {
        $stmt = $this->pdo->query("SHOW TABLE STATUS LIKE 'companies'");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return (int) ($result['Auto_increment'] ?? 1);
    }

    /**
     * Метод получения телефонов компании
     * 
     * @param int $id идентификатор компании
     * @return array|null массив телефонов, либо пустое значение
     */
    public function getPhones(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM company_phones WHERE id_company = :id');
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения ссылок компании
     * 
     * @param int $id идентификатор компании
     * @return array|null массив ссылок, либо пустое значение
     */
    public function getLinks(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM company_links WHERE id_company = :id');
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения услуг компании
     * 
     * @param int $id идентификатор компании
     * @return array|null массив услуг, либо пустое значение
     */
    public function getServices(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM company_services WHERE id_company = :id');
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод получения проектов компании
     * 
     * @param int $id идентификатор компании
     * @return array|null массив услуг, либо пустое значение
     */
    public function getProjects(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM company_portfolios WHERE id_company = :id');
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Метод создания новой компании
     * 
     * @param array $data суперглобальная переменная POST
     * @return bool успех создания компании
     */
    public function store(array $data): bool
    {
        try {
            $this->pdo->beginTransaction();

            $requiredFields = ['name', 'alias', 'categories', 'city', 'address', 'phone', 'site_url', 'logo', 'img'];
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    echo "Ошибка: поле '$field' обязательно для заполнения.";
                    return false;
                }
            }

            // Вставляем компанию без page_id (он обновится позже)
            $stmt = $this->pdo->prepare("
            INSERT INTO companies (user_id, name, category_id, city, address, email, phone, site_url, experience, intro_text, description, link_map, logo, img, page_id) 
            VALUES (:user_id, :name, :category_id, :city, :address, :email, :phone, :site_url, :experience, :intro_text, :description, :link_map, :logo, :img, :page_id)
        ");
            $stmt->execute([
                ':user_id' => 1,
                ':name' => $data['name'],
                ':category_id' => $data['categories'],
                ':city' => $data['city'],
                ':address' => $data['address'],
                ':link_map' => $data['link_map'] ?? null,
                ':email' => $data['email'] ?? null,
                ':phone' => $data['phone'],
                ':site_url' => $data['site_url'],
                ':experience' => $data['experience'] ?? null,
                ':intro_text' => $data['intro_text'] ?? null,
                ':description' => $data['description'] ?? null,
                ':logo' => $data['logo'],
                ':img' => $data['img'],
                ':page_id' => null,
            ]);

            // Получаем ID компании
            $companyId = (int) $this->pdo->lastInsertId();
            if ($companyId <= 0) {
                echo "Ошибка: не удалось получить ID созданной компании.";
                return false;
            }

            $category = $this->ratingObj->get((int) $data['categories']);
            $page = $category ? $this->pageObj->get((int) $category['page_id']) : null;

            // Вставляем запись в page_routes
            $stmt = $this->pdo->prepare("
            INSERT INTO page_routes (alias, type, title, description, content, template) 
            VALUES (:alias, :type, :title, :description, :content, :template)
        ");
            $stmt->execute([
                ':alias' => $page['alias'] . '/' .  $data['alias'],
                ':type' => 'company',
                ':title' => $data['name'],
                ':description' => $data['name'],
                ':content' => null,
                ':template' => 'default'
            ]);

            // Получаем ID созданной записи в page_routes
            $pageId = (int) $this->pdo->lastInsertId();
            if ($pageId <= 0) {
                echo "Ошибка: не удалось получить ID созданной страницы.";
                return false;
            }

            // Обновляем компанию, привязывая к ней page_id
            $stmt = $this->pdo->prepare("UPDATE companies SET page_id = :page_id WHERE id = :company_id");
            $stmt->execute([
                ':page_id' => $pageId,
                ':company_id' => $companyId
            ]);

            // Обработка телефонов
            $phones = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^phone_(\d+)$/', $key) && !empty($value)) {
                    $phones[] = ['id_company' => $companyId, 'phone_number' => $value];
                }
            }
            if (!empty($phones)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_phones (id_company, phone_number) VALUES (:id_company, :phone_number)");
                foreach ($phones as $phone) {
                    $stmt->execute($phone);
                }
            }

            // Обработка ссылок
            $links = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^link_(\d+)$/', $key, $matches) && !empty($value)) {
                    $index = $matches[1];

                    // Проверяем, есть ли связанные данные
                    if (!empty($data["link-text_{$index}"]) && !empty($data["links_{$index}"])) {
                        $links[] = [
                            'id_company' => $companyId,
                            'link' => $value,
                            'text' => $data["link-text_{$index}"],
                            'type' => $data["links_{$index}"]
                        ];
                    }
                }
            }

            if (!empty($links)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_links (id_company, link, text, type) VALUES (:id_company, :link, :text, :type)");

                foreach ($links as $link) {
                    $stmt->execute($link);
                }
            }

            // Обработка услуг
            $services = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^service_(\d+)$/', $key) && !empty($value)) {
                    $services[] = ['id_company' => $companyId, 'name' => $value];
                }
            }
            if (!empty($services)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_services (id_company, name) VALUES (:id_company, :name)");
                foreach ($services as $service) {
                    $stmt->execute($service);
                }
            }

            // Обработка портфолио
            $portfolios = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^project_(\d+)$/', $key, $matches) && !empty($value)) {
                    $index = $matches[1];

                    if (!empty($data["project_img_{$index}"])) {
                        $portfolios[] = [
                            'id_company' => $companyId,
                            'name' => $value,
                            'img' => $data["project_img_{$index}"]
                        ];
                    }
                }
            }

            if (!empty($portfolios)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_portfolios (id_company, name, img) VALUES (:id_company, :name, :img)");

                foreach ($portfolios as $portfolio) {
                    $stmt->execute($portfolio);
                }
            }

            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            error_log("Ошибка при добавлении компании: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Метод редактирования компании
     * 
     * @param array $data суперглобальная переменная POST
     * @return bool успех обновления компании
     */
    public function update(array $data): bool
    {
        try {
            $this->pdo->beginTransaction();

            $id = $data['id'] ?? null;

            if (!$id) {
                echo "Ошибка: не передан id компании";
                return false;
            }

            // Проверка существования компании
            $stmt = $this->pdo->prepare("SELECT * FROM companies WHERE id = :id");
            $stmt->execute([':id' => (int) $id]);

            $company = $stmt->fetch();
            if (!$company) {
                echo "Ошибка: компания не найдена";
                return false;
            }

            // Получение информации о маршруте страницы
            $stmt = $this->pdo->prepare("SELECT * FROM page_routes WHERE id = :id");
            $stmt->execute([':id' => (int) $company['page_id']]);
            $page = $stmt->fetch();

            // Обновление alias, если переданы name и alias
            if (!empty($data['name']) && !empty($data['alias'])) {
                $trimmedPath = dirname($page['alias']) . '/';
                $stmt = $this->pdo->prepare("UPDATE page_routes SET alias = :alias WHERE id = :id");
                $stmt->execute([
                    ':id' => (int) $company['page_id'],
                    ':alias' => $trimmedPath . $data['alias'],
                ]);
            }

            // Обновление alias, если переданы categories
            if (!empty($data['category_id'])) {
                $stmt = $this->pdo->prepare("SELECT * FROM categories WHERE id = :id");
                $stmt->execute([':id' => (int) $data['category_id']]);
                $category = $stmt->fetch();

                if (!$category) {
                    echo 'Не удалось получить категорию';
                    return false;
                }

                $stmt = $this->pdo->prepare("SELECT * FROM page_routes WHERE id = :id");
                $stmt->execute([':id' => $category['page_id']]);
                $getPage = $stmt->fetch();

                if (!$getPage) {
                    echo 'Не удалось получить страницу';
                    return false;
                }

                $oldUrl = $page['alias'];
                $partsOldUrl = explode("/", $oldUrl);
                $lastPart = '/' . end($partsOldUrl);

                $stmt = $this->pdo->prepare("UPDATE page_routes SET alias = :alias WHERE id = :id");
                $stmt->execute([
                    ':id' => (int) $company['page_id'],
                    ':alias' => $getPage['alias'] . $lastPart,
                ]);
            }

            // Формирование массива полей для обновления
            $updateFields = [];
            $params = [':id' => (int) $id];

            $allowedFields = [
                'name',
                'city',
                'address',
                'link_map',
                'category_id',
                'email',
                'phone',
                'site_url',
                'experience',
                'intro_text',
                'description'
            ];

            foreach ($allowedFields as $field) {
                if (!empty($data[$field])) {
                    $updateFields[] = "$field = :$field";
                    $params[":$field"] = $data[$field];
                }
            }

            // Если есть что обновлять, выполняем UPDATE
            if (!empty($updateFields)) {
                $stmt = $this->pdo->prepare("UPDATE companies SET " . implode(', ', $updateFields) . " WHERE id = :id");
                $stmt->execute($params);
            }

            // Получаем список существующих телефонов компании
            $existingPhones = [];
            $stmt = $this->pdo->prepare("SELECT id FROM company_phones WHERE id_company = :id_company");
            $stmt->execute([':id_company' => (int) $id]);

            foreach ($stmt->fetchAll() as $phone) {
                $existingPhones[] = $phone['id'];
            }

            // Обновление номера или создание нового номера
            $submittedPhones = [];
            foreach ($data as $key => $value) {
                if (strpos($key, 'phone_') === 0) {
                    $phoneId = str_replace('phone_', '', $key);
                    $submittedPhones[] = $phoneId;

                    // Проверяем, есть ли этот ID в базе
                    if (in_array($phoneId, $existingPhones)) {
                        // Обновление существующего номера
                        $stmt = $this->pdo->prepare("UPDATE company_phones SET phone_number = :phone WHERE id = :id AND id_company = :id_company");
                        $stmt->execute([
                            ':phone' => $value,
                            ':id' => (int) $phoneId,
                            ':id_company' => (int) $id,
                        ]);
                    } else {
                        // Если ID не найден в базе, добавляем новый номер
                        $stmt = $this->pdo->prepare("INSERT INTO company_phones (id_company, phone_number) VALUES (:id_company, :phone)");
                        $stmt->execute([
                            ':id_company' => (int) $id,
                            ':phone' => $value,
                        ]);
                    }
                }
            }

            // Получаем список существующих ссылок у компании
            // Получаем список существующих ссылок компании
            $existingLinks = [];
            $stmt = $this->pdo->prepare("SELECT id FROM company_links WHERE id_company = :id_company");
            $stmt->execute([':id_company' => (int) $id]);

            foreach ($stmt->fetchAll() as $link) {
                $existingLinks[] = $link['id'];
            }

            // Обновление ссылок или создание новых
            $submittedLinks = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^link(?:-text)?_(\d+)$/', $key, $matches)) {
                    $linkId = (int) $matches[1]; // ID ссылки
                    $submittedLinks[$linkId][$key] = $value; // Сохраняем данные по ID
                } elseif (preg_match('/^links_(\d+)$/', $key, $matches)) {
                    $linkId = (int) $matches[1];
                    $submittedLinks[$linkId][$key] = $value;
                }
            }

            foreach ($submittedLinks as $linkId => $fields) {
                if (in_array($linkId, $existingLinks)) {
                    // Обновляем только переданные поля
                    $updates = [];
                    $params = [':id' => $linkId, ':id_company' => (int) $id];

                    if (isset($fields["link_$linkId"])) {
                        $updates[] = "link = :link";
                        $params[':link'] = $fields["link_$linkId"];
                    }
                    if (isset($fields["link-text_$linkId"])) {
                        $updates[] = "text = :text";
                        $params[':text'] = $fields["link-text_$linkId"];
                    }
                    if (isset($fields["links_$linkId"])) {
                        $updates[] = "type = :type";
                        $params[':type'] = $fields["links_$linkId"];
                    }

                    if (!empty($updates)) {
                        $stmt = $this->pdo->prepare("UPDATE company_links SET " . implode(', ', $updates) . " WHERE id = :id AND id_company = :id_company");
                        $stmt->execute($params);
                    }
                } else {
                    // Создание новой записи
                    $stmt = $this->pdo->prepare("INSERT INTO company_links (id_company, link, text, type) VALUES (:id_company, :link, :text, :type)");
                    $stmt->execute([
                        ':id_company' => (int) $id,
                        ':link' => $fields["link_$linkId"] ?? '',
                        ':text' => $fields["link-text_$linkId"] ?? '',
                        ':type' => $fields["links_$linkId"] ?? ''
                    ]);
                }
            }

            // Получаем список существующих услуг компании
            $existingServices = [];
            $stmt = $this->pdo->prepare("SELECT id FROM company_services WHERE id_company = :id_company");
            $stmt->execute([':id_company' => (int) $id]);

            foreach ($stmt->fetchAll() as $service) {
                $existingServices[] = $service['id'];
            }

            // Обновление услуги или создание новой
            $submittedServices = [];
            foreach ($data as $key => $value) {
                if (strpos($key, 'service_') === 0) {
                    $serviceId = str_replace('service_', '', $key);
                    $submittedServices[] = $serviceId;

                    // Проверяем, есть ли этот ID в базе
                    if (in_array($serviceId, $existingServices)) {
                        // Обновление существующего номера
                        $stmt = $this->pdo->prepare("UPDATE company_services SET name = :name WHERE id = :id AND id_company = :id_company");
                        $stmt->execute([
                            ':name' => $value,
                            ':id' => (int) $serviceId,
                            ':id_company' => (int) $id,
                        ]);
                    } else {
                        // Если ID не найден в базе, добавляем новый номер
                        $stmt = $this->pdo->prepare("INSERT INTO company_services (id_company, name) VALUES (:id_company, :name)");
                        $stmt->execute([
                            ':id_company' => (int) $id,
                            ':name' => $value,
                        ]);
                    }
                }
            }

            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            echo 'Ошибка при обновлении компании: ' . $e->getMessage();
            return false;
        }

        // try {
        //     $this->pdo->beginTransaction();

        //     $id = $data['id'];
        //     if (!$id) {
        //         echo "Не передан id компании";
        //         return false;
        //     };

        //     $stmt = $this->pdo->prepare("SELECT * FROM companies WHERE id = :id");
        //     $stmt->execute([':id' => (int) $id]);

        //     $company = $stmt->fetch();
        //     if (!$company) {
        //         echo "Компания не найдена.";
        //         return false;
        //     }

        //     $stmt = $this->pdo->prepare("SELECT * FROM page_routes WHERE id = :id");

        //     $stmt->execute([':id' => (int) $company['page_id']]);
        //     $page = $stmt->fetch();

        //     if (!empty($data['name']) && !empty($data['alias'])) {
        //         $trimmedPath = dirname($page['alias']) . '/';

        //         $stmt = $this->pdo->prepare("UPDATE page_routes SET alias = :alias WHERE id = :id");

        //         $stmt->execute([
        //             ':id' => (int) $company['page_id'],
        //             ':alias' => $trimmedPath . $data['alias'],
        //         ]);

        //         $stmt = $this->pdo->prepare("UPDATE companies SET name = :name WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':name' => $data['name'],
        //         ]);
        //     };

        //     if (!empty($data['city'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET city = :city WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':city' => $data['city'],
        //         ]);
        //     };

        //     if (!empty($data['address'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET address = :address WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':address' => $data['address'],
        //         ]);
        //     };

        //     if (!empty($data['link_map'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET link_map = :link_map WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':link_map' => $data['link_map'],
        //         ]);
        //     };

        //     if (!empty($data['email'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET email = :email WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':email' => $data['email'],
        //         ]);
        //     };

        //     if (!empty($data['phone'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET phone = :phone WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':phone' => $data['phone'],
        //         ]);
        //     };

        //     if (!empty($data['site_url'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET site_url = :site_url WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':site_url' => $data['site_url'],
        //         ]);
        //     };

        //     if (!empty($data['experience'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET experience = :experience WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':experience' => $data['experience'],
        //         ]);
        //     };

        //     if (!empty($data['intro_text'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET intro_text = :intro_text WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':intro_text' => $data['intro_text'],
        //         ]);
        //     };

        //     if (!empty($data['description'])) {
        //         $stmt = $this->pdo->prepare("UPDATE companies SET description = :description WHERE id = :id");
        //         $stmt->execute([
        //             ':id' => (int) $id,
        //             ':description' => $data['description'],
        //         ]);
        //     };

        //     $this->pdo->commit();
        //     return true;
        // } catch (Exception $e) {
        //     $this->pdo->rollBack();
        //     error_log("Ошибка при обновлении компании: " . $e->getMessage());
        //     return false;
        // }








        return true;
        try {
            $this->pdo->beginTransaction();

            // Проверка существования компании
            $stmt = $this->pdo->prepare("SELECT * FROM companies WHERE id = :id");
            $stmt->execute([':id' => $companyId]);
            if (!$stmt->fetch()) {
                echo "Ошибка: компания не найдена.";
                return false;
            }

            // Обновление основных данных компании
            $stmt = $this->pdo->prepare("
            UPDATE companies 
            SET name = :name, category_id = :category_id, city = :city, address = :address, email = :email, 
                phone = :phone, site_url = :site_url, experience = :experience, intro_text = :intro_text, 
                description = :description, link_map = :link_map, logo = :logo, img = :img
            WHERE id = :company_id
        ");
            $stmt->execute([
                ':company_id' => $companyId,
                ':name' => $data['name'],
                ':category_id' => $data['categories'],
                ':city' => $data['city'],
                ':address' => $data['address'],
                ':email' => $data['email'] ?? null,
                ':phone' => $data['phone'],
                ':site_url' => $data['site_url'],
                ':experience' => $data['experience'] ?? null,
                ':intro_text' => $data['intro_text'] ?? null,
                ':description' => $data['description'] ?? null,
                ':link_map' => $data['link_map'] ?? null,
                ':logo' => $data['logo'],
                ':img' => $data['img']
            ]);

            // Обновление телефонов (очищаем старые и добавляем новые)
            $this->pdo->prepare("DELETE FROM company_phones WHERE id_company = :company_id")
                ->execute([':company_id' => $companyId]);

            $phones = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^phone_(\d+)$/', $key) && !empty($value)) {
                    $phones[] = ['id_company' => $companyId, 'phone_number' => $value];
                }
            }
            if (!empty($phones)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_phones (id_company, phone_number) VALUES (:id_company, :phone_number)");
                foreach ($phones as $phone) {
                    $stmt->execute($phone);
                }
            }

            // Обновление ссылок
            $this->pdo->prepare("DELETE FROM company_links WHERE id_company = :company_id")
                ->execute([':company_id' => $companyId]);

            $links = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^link_(\d+)$/', $key, $matches) && !empty($value)) {
                    $index = $matches[1];
                    if (!empty($data["link-text_{$index}"]) && !empty($data["links_{$index}"])) {
                        $links[] = [
                            'id_company' => $companyId,
                            'link' => $value,
                            'text' => $data["link-text_{$index}"],
                            'type' => $data["links_{$index}"]
                        ];
                    }
                }
            }
            if (!empty($links)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_links (id_company, link, text, type) VALUES (:id_company, :link, :text, :type)");
                foreach ($links as $link) {
                    $stmt->execute($link);
                }
            }

            // Обновление услуг
            $this->pdo->prepare("DELETE FROM company_services WHERE id_company = :company_id")
                ->execute([':company_id' => $companyId]);

            $services = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^service_(\d+)$/', $key) && !empty($value)) {
                    $services[] = ['id_company' => $companyId, 'name' => $value];
                }
            }
            if (!empty($services)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_services (id_company, name) VALUES (:id_company, :name)");
                foreach ($services as $service) {
                    $stmt->execute($service);
                }
            }

            // Обновление портфолио
            $this->pdo->prepare("DELETE FROM company_portfolios WHERE id_company = :company_id")
                ->execute([':company_id' => $companyId]);

            $portfolios = [];
            foreach ($data as $key => $value) {
                if (preg_match('/^project_(\d+)$/', $key, $matches) && !empty($value)) {
                    $index = $matches[1];
                    if (!empty($data["project_img_{$index}"])) {
                        $portfolios[] = [
                            'id_company' => $companyId,
                            'name' => $value,
                            'img' => $data["project_img_{$index}"]
                        ];
                    }
                }
            }
            if (!empty($portfolios)) {
                $stmt = $this->pdo->prepare("INSERT INTO company_portfolios (id_company, name, img) VALUES (:id_company, :name, :img)");
                foreach ($portfolios as $portfolio) {
                    $stmt->execute($portfolio);
                }
            }

            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            error_log("Ошибка при обновлении компании: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Удаление элемента из БД (например телефон)
     * 
     * @param array $data суперглобальная переменная POST
     * @return bool успех удаления компании
     */
    public function deleteItem(array $data): bool
    {
        if (empty($data['type'])) {
            echo 'Передайте тип элемента';
            return false;
        }

        try {
            $this->pdo->beginTransaction();

            switch ($data['type']) {
                case 'phone':
                    if (empty($data['phone_id'])) {
                        echo 'Передайте id телефона';
                        return false;
                    }
                    $stmt = $this->pdo->prepare("DELETE FROM company_phones WHERE id = :id");
                    $stmt->execute([
                        ':id' => (int) $data['phone_id']
                    ]);
                    break;
                case 'service':
                    if (empty($data['service_id'])) {
                        echo 'Ошибка: передайте id услуги';
                        return false;
                    }
                    $stmt = $this->pdo->prepare("DELETE FROM company_services WHERE id = :id");
                    $stmt->execute([
                        ':id' => (int) $data['service_id']
                    ]);
                    break;
                case 'link':
                    if (empty($data['link_id'])) {
                        echo 'Ошибка: передайте id ссылки';
                        return false;
                    }
                    $stmt = $this->pdo->prepare("DELETE FROM company_links WHERE id = :id");
                    $stmt->execute([
                        ':id' => (int) $data['link_id']
                    ]);
                    break;
                default:
                    break;
            }

            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            error_log("Ошибка при удалении компании: " . $e->getMessage());
            return false;
        }
    }


    /**
     * Метод удаления компании
     * 
     * @param array $data суперглобальная переменная POST
     * @return bool успех удаления компании
     */
    public function delete(array $data): bool
    {
        if (empty($data['id'])) {
            echo 'Не передан id';
            return false;
        }

        $id = (int) $data['id'];

        try {
            $this->pdo->beginTransaction();

            // Получаем page_id компании, чтобы удалить запись в page_routes
            $stmt = $this->pdo->prepare("SELECT page_id FROM companies WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $company = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$company) {
                throw new Exception("Компания с ID $id не найдена.");
            }

            $pageId = $company['page_id'];

            // Удаляем связанные записи в company_phones
            $stmt = $this->pdo->prepare("DELETE FROM company_phones WHERE id_company = :id");
            $stmt->execute([':id' => $id]);

            // Удаляем связанные записи в company_links
            $stmt = $this->pdo->prepare("DELETE FROM company_links WHERE id_company = :id");
            $stmt->execute([':id' => $id]);

            // Удаляем связанные записи в company_portfolios
            $stmt = $this->pdo->prepare("DELETE FROM company_portfolios WHERE id_company = :id");
            $stmt->execute([':id' => $id]);

            // Удаляем связанные записи в company_services
            $stmt = $this->pdo->prepare("DELETE FROM company_services WHERE id_company = :id");
            $stmt->execute([':id' => $id]);

            // Удаляем связанную запись в page_routes, если есть
            if ($pageId) {
                $stmt = $this->pdo->prepare("DELETE FROM page_routes WHERE id = :page_id");
                $stmt->execute([':page_id' => $pageId]);
            }

            // Удаляем саму компанию
            $stmt = $this->pdo->prepare("DELETE FROM companies WHERE id = :id");
            $stmt->execute([':id' => $id]);

            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            error_log("Ошибка при удалении компании: " . $e->getMessage());
            return false;
        }
    }
}
