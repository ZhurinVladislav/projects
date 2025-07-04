<?php

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

    public function list()
    {
        $sql = "SELECT * FROM companies";

        $stmt = $this->pdo->query($sql);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
