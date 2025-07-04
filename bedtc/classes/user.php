<?php

class user {
	public $id;
	public $login = false;
	private $pass;
	public $pin;
	public $email;
	public $g_auth;
	public $g_auth_secret;
	public $balance_buy;
	public $balance_withdrawal;
	public $reg_date;
	public $level;
	public $experience;
	public $authority;
	public $trust;
	public $status;
	public $can_communicate;
	public $can_withdrawal;
	public $total_replenishments;
	public $total_withdrawal;
	public $total_spent;
	public $avatar;
	public $language;
	public $chat_moder;
	public $credit;
	public $email_confirmed;
	public $fake;
	public $test;

	function __construct() {
		
		global $languages;

		if (isset($_SESSION['login'])) {
			$this->load_data($_SESSION['login']);
		}

		if (isset($_SESSION['language'])) {
			$this->language = $_SESSION['language'];
		} else {
			//	тут $languages[0] - англ, $languages[1] - русский
			$_SESSION['language'] = $languages[0];
			$this->language = $languages[0];
		}

	}

	public function is_logged() {
		if ($this->login !== false) {
			return true;
		} else {
			return false;
		}
	}

	public function load_data($str) {
		global $pdo;

		$find_user = $pdo->prepare('SELECT * FROM users WHERE login LIKE ? LIMIT 1');
		$find_user->execute(array('%'.$str.'%'));

		$find_user_row = $find_user->fetch();

		$this->id = $find_user_row['id'];
		$this->login = $str;
		$this->pin = (int) $find_user_row['pin'];
		$this->email = $find_user_row['email'];
		$this->g_auth = $find_user_row['g_auth'];
		$this->g_auth_secret = $find_user_row['g_auth_secret'];
		$this->balance_buy = format_money($find_user_row['balance_buy']);
		$this->balance_withdrawal = format_money($find_user_row['balance_withdrawal']);
		$this->balance_bmt = format_money($find_user_row['balance_bmt']);
		$this->reg_date = $find_user_row['reg_date'];
		$this->level = $find_user_row['level'];
		$this->experience = $find_user_row['experience'];
		// $this->authority = $find_user_row['authority'];
		// $this->trust = $find_user_row['trust'];
		$this->status = $find_user_row['status'];
		$this->can_communicate = $find_user_row['can_communicate'];
		$this->can_withdrawal = $find_user_row['can_withdrawal'];
		$this->total_replenishments = $find_user_row['total_replenishments'];
		$this->total_withdrawal = $find_user_row['total_withdrawal'];
		$this->total_spent = $find_user_row['total_spent'];
		$this->chat_moder = $find_user_row['chat_moder'];
		$this->credit = $find_user_row['credit'];
		$this->email_confirmed = $find_user_row['email_confirmed'];
		$this->fake = $find_user_row['fake'];
		$this->test = $find_user_row['test'];

		$this->avatar = $find_user_row['avatar'];
		//	если у пользователя загружен аватар - создаем строку с именем файла
		if ($this->avatar != '0') {
			$this->avatar = $this->id.'.'.$this->avatar;
		} else {
			$this->avatar = 'default';
		}
		
		
		$_SESSION['login'] = $str;
		$_SESSION['id'] = $find_user_row['id'];

		return true;
	}
}