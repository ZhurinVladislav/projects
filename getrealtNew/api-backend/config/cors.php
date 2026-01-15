<?php

return [
	'paths' => ['api/*', 'login'],
	'allowed_methods' => ['*'],
	'allowed_origins' => [
		'http://localhost:3000',
		'http://localhost:3001',
		'https://getrealt.ru',
		'https://admin.getrealt.ru'
	],
	'allowed_headers' => ['*'],
	'supports_credentials' => true,
];
