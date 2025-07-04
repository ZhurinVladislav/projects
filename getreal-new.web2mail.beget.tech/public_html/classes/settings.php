<?php

class settings {

	//	настройки при первом вызове попадают в этот массив, при втором и последующем вызове запроса в базу не будет
	protected $array = array();

	public function get($str) {
		if (isset($array[$str])) {
			return $array[$str];
		} else {
			global $pdo;

			$find_setting = $pdo->prepare('SELECT value FROM settings WHERE name LIKE ? LIMIT 1');
			$find_setting->execute(array($str));

			$value = $find_setting->fetch();
			$value = $value['value'];

			$array[$str] = $value;
			return $value;
		}
	}

	public function update($setting, $value) {
		global $pdo;

		$update = $pdo->prepare('UPDATE settings SET value = ? WHERE name LIKE ? LIMIT 1');
		return $update->execute(array($value, $setting));
	}
}

class settings_payments {

	//	настройки при первом вызове попадают в этот массив, при втором и последующем вызове запроса в базу не будет
	protected $array = array();

	public function get($system, $name) {
		if (isset($array[$system][$name])) {
			return $array[$system][$name];
		} else {
			global $pdo;

			$find_setting = $pdo->prepare('SELECT value FROM settings_payments WHERE paysystem LIKE ? AND name LIKE ? LIMIT 1');
			$find_setting->execute(array($system, $name));

			$value = $find_setting->fetch();
			$value = $value['value'];

			$array[$system][$name] = $value;
			return $value;
		}
	}

	public function update($system, $setting, $value) {
		global $pdo;

		$update = $pdo->prepare('UPDATE settings_payments SET value = ? WHERE paysystem LIKE ? AND name LIKE ? LIMIT 1');
		return $update->execute(array($value, $system, $setting));
	}
}