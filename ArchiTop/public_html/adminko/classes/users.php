<?php

class users
{
    public $array;
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function get_last($limit)
    {
        $users_list = $this->db->prepare('SELECT * FROM users ORDER BY id DESC LIMIT ' . $limit);
        $users_list->execute();
        while ($users_list_row = $users_list->fetch()) {
            $this->array[] = $users_list_row;
        }
    }
}
