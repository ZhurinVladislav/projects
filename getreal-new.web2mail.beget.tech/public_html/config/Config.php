<?php

class Config
{
    // Настройки подключения к базе данных
    /** @var string хост БД */
    public const DB_HOST = 'localhost';

    /** @var string порт БД */
    public const DB_PORT = '443';

    /** @var string имя БД */
    public const DB_DATABASE = 'web2mail_getrean';

    /** @var string имя пользователя БД */
    public const DB_USERNAME = 'web2mail_getrean';

    /** @var string пароль пользователя БД */
    public const DB_PASSWORD = '8nNN&gvSpRFc';

    // Настройки приложения
    /** @var string URL */
    public const APP_URL = 'http://getreal-new.web2mail.beget.tech/';

    /** @var string имя приложения */
    public const APP_NAME = 'GetRealt';

    // Настройки для PHPMailer
    /** @var string хост SMTP */
    public const MAIL_HOST = 'smtp.yandex.com';

    /** @var string имя SMTP */
    public const MAIL_USERNAME = '';

    /** @var string пароль SMTP */
    public const MAIL_PASSWORD = '';

    /** @var string адрес электронной почты, от кого было отправлено письму для SMTP */
    public const MAIL_FROM_ADDRESS = '';

    /** @var string имя для письма SMTP */
    public const MAIL_FROM_NAME = self::APP_NAME;
}
