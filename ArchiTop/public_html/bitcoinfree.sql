-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 30 2022 г., 17:16
-- Версия сервера: 5.6.38
-- Версия PHP: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bitcoinfree`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authorization_logs`
--

CREATE TABLE `authorization_logs` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` varchar(25) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `authorization_logs`
--

INSERT INTO `authorization_logs` (`id`, `user_id`, `ip`, `date`) VALUES
(1, 1, '127.0.0.1', 1653651867),
(2, 1, '127.0.0.1', 1653897854),
(3, 1, '127.0.0.1', 1653897995),
(4, 1, '127.0.0.1', 1653916070),
(5, 1, '127.0.0.1', 1653917404),
(6, 1, '127.0.0.1', 1653917761);

-- --------------------------------------------------------

--
-- Структура таблицы `bitcoin_withdraw`
--

CREATE TABLE `bitcoin_withdraw` (
  `id` int(11) NOT NULL,
  `withdraw_id` int(11) NOT NULL,
  `received_id` varchar(2550) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `chat_de`
--

CREATE TABLE `chat_de` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `text` mediumtext NOT NULL,
  `date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `chat_en`
--

CREATE TABLE `chat_en` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `text` mediumtext NOT NULL,
  `date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `chat_es`
--

CREATE TABLE `chat_es` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `text` mediumtext NOT NULL,
  `date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `chat_fr`
--

CREATE TABLE `chat_fr` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `text` mediumtext NOT NULL,
  `date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `chat_pt`
--

CREATE TABLE `chat_pt` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `text` mediumtext NOT NULL,
  `date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `chat_ru`
--

CREATE TABLE `chat_ru` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `text` mediumtext NOT NULL,
  `date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `email_queue`
--

CREATE TABLE `email_queue` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject_en` varchar(300) NOT NULL,
  `text_en` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `faq`
--

CREATE TABLE `faq` (
  `id` int(5) NOT NULL,
  `title_ru` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `title_de` varchar(255) NOT NULL,
  `title_pt` varchar(255) NOT NULL,
  `title_es` varchar(255) NOT NULL,
  `title_fr` varchar(255) NOT NULL,
  `content_ru` varchar(2500) NOT NULL,
  `content_en` varchar(2500) NOT NULL,
  `content_de` varchar(2500) NOT NULL,
  `content_pt` varchar(2500) NOT NULL,
  `content_es` varchar(2500) NOT NULL,
  `content_fr` varchar(2500) NOT NULL,
  `sort` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `faq`
--

INSERT INTO `faq` (`id`, `title_ru`, `title_en`, `title_de`, `title_pt`, `title_es`, `title_fr`, `content_ru`, `content_en`, `content_de`, `content_pt`, `content_es`, `content_fr`, `sort`) VALUES
(1, 'Можно ли восстановить или изменить пин-код?', 'Is it possible to reset or change the pincode?', 'Ist es möglich, den pincode wiederherzustellen oder zu ändern?', 'Pode-se reparar ou alterar o pin?', '¿Es posible restaurar o cambiar el código de color', 'Est-il possible de restaurer ou de modifier le code PIN', '<br>Пинкод восстановить или изменить нельзя!<br>\n<br>Он был введен для того, чтобы исключить мошеннические изменения кошельков и вывода Ваших средств, необходимо записать и хранить его в приватном месте, либо запомнить, при его первичном вводе, система предупреждает Вас об этом.', '<br>The pincode to repair or change it is impossible!<br>\n<br>It was introduced in order to eliminate fraudulent changes in wallets and withdrawals Of your funds, you need to record and store it in a private place, or remember when it is first entered, the system warns you about it.', '<br>Pincode kann nicht wiederhergestellt oder geändert werden!<br>\n<br>es wurde eingeführt, um betrügerische änderungen an Geldbörsen und Auszahlungen Ihrer Gelder auszuschließen, müssen Sie es aufzeichnen und an einem privaten Ort aufbewahren oder sich daran erinnern, wenn es primär eingegeben wird, warnt Das System Sie davor.', '<br>o código Pin restaurar ou mudar não é possível!<br>\n<br>Ele foi colocado para evitar a alteração fraudulenta de carteiras e de Sua retirada, deve gravar e armazená-lo em um lugar privado, ou lembrar, quando o primário você digita, o sistema avisa-o sobre isso.', '<br>¡no puedes restaurar o cambiar el código Rosa!<br>\n<br>se ha introducido con el fin de eliminar los cambios fraudulentos en las carteras y retiros de sus fondos, es necesario escribirlo y almacenarlo en un lugar privado, o recordar, cuando se introduce por primera vez, el sistema le avisa de ello.', '<br>Le code PIN ne peut pas être restauré ou modifié! <br> <br>Il a été introduit afin d\'exclure les modifications frauduleuses des portefeuilles et le retrait de vos fonds, vous devez l\'écrire et le stocker dans un endroit privé, ou vous rappeler que, lorsque vous y entrez pour la première fois, le système vous en avertit.', 9),
(2, 'Какая минимальная сумма для вывода средств по каждому из кошельков? ', 'What is the minimum withdrawal amount for each wallet?', 'Was ist der Mindestbetrag für die Auszahlung für jede der Geldbörsen? ', 'Qual o valor mínimo para saque em cada uma das bolsas?', '¿Cuál es la cantidad mínima para retirar fondos para cada una de las carteras?', 'Quel est le montant minimum de retrait pour chaque portefeuille?', '<br>Список минимальных сумм для вывода по каждой из платежных систем:<br> \n\n<br>Payeer-0.15$ или 30 рублей, \n<br>Qiwi-30 рублей, \n<br>Биткоин-0.001 BTC, \n<br>PerfectMoney-0.15$, \n<br>AdvCash-0.15$ или 30 рублей.', '<br>List of minimum withdrawal amounts for each payment system:<br> \n\n<br>Payeer-0.15$ or 30 rubles, \n<br>Qiwi-30 rubles, \n<br>Bitcoin-0.001 BTC, \n<br>PerfectMoney-0.15$, \n<br>AdvCash-0.15$ or 30 rubles.', '<br>Liste der Mindestbeträge für die Rückzahlung auf jedem der Zahlungssysteme:<br> \n\n<br>Payeer-0.15 $ oder 30 Rubel, \n<br>Qiwi - 30 Rubel, \n<br>Bitcoin-0.001 BTC, \n<br>PerfectMoney-0.15$, \n<br>AdvCash-0.15 $ oder 30 Rubel.', '<br>Lista de montantes mínimos para a saída em cada um dos sistemas de pagamento:<br> \n\n<br>Payeer-0.15$ ou 30 rublos, \n<br>Qiwi-30 rublos, \n<br>Биткоин-0.001 BTC, \n<br>PerfectMoney-0.15$, \n<br>AdvCash-0.15$ ou 30 rublos.', '<br>lista de cantidades mínimas para la retirada de cada uno de los sistemas de pago:<br> \n\n<br>Payeer-0.15 $ o 30 rublos, \n<br>QIWI-30 rublos, \n<br>Bitcoin-0.001 BTC, \n<br>PerfectMoney-0.15$, \n<br>AdvCash-0.15 $ o 30 rublos.\n', '<br>Liste des montants minimaux de retrait pour chacun des systèmes de paiement: <br>  <br>Payeer-0.15$ ou 30 roubles, <br>Qiwi-30 roubles, <br>Bitcoin-0.001 BTC, <br>PerfectMoney-0.15$, <br>AdvCash-0.15$ ou 30 roubles.', 10);

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(5) NOT NULL,
  `title_ru` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `title_de` varchar(255) NOT NULL,
  `title_pt` varchar(255) NOT NULL,
  `title_es` varchar(255) NOT NULL,
  `title_fr` varchar(255) NOT NULL,
  `title_hi` varchar(255) NOT NULL,
  `title_id` varchar(255) NOT NULL,
  `title_th` varchar(255) NOT NULL,
  `title_tr` varchar(255) NOT NULL,
  `title_zh` varchar(255) NOT NULL,
  `content_ru` longtext NOT NULL,
  `content_en` longtext NOT NULL,
  `content_de` longtext NOT NULL,
  `content_pt` longtext NOT NULL,
  `content_es` longtext NOT NULL,
  `content_fr` longtext NOT NULL,
  `content_hi` longtext NOT NULL,
  `content_id` longtext NOT NULL,
  `content_th` longtext NOT NULL,
  `content_tr` longtext NOT NULL,
  `content_zh` longtext NOT NULL,
  `image` varchar(50) NOT NULL DEFAULT '0',
  `date` int(11) NOT NULL,
  `admin_only` int(2) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `title_ru`, `title_en`, `title_de`, `title_pt`, `title_es`, `title_fr`, `title_hi`, `title_id`, `title_th`, `title_tr`, `title_zh`, `content_ru`, `content_en`, `content_de`, `content_pt`, `content_es`, `content_fr`, `content_hi`, `content_id`, `content_th`, `content_tr`, `content_zh`, `image`, `date`, `admin_only`) VALUES
(1, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653898196, 0),
(2, 'dsa', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653899834, 0),
(3, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900216, 0),
(4, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900248, 0),
(5, 'das', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900314, 0),
(6, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900382, 0),
(7, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', 'asd', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900456, 0),
(8, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900515, 0),
(9, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900575, 0),
(10, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900619, 0),
(11, 'gfsd', '', '', '', '', '', '', '', '', '', '', 'dfg', '', '', '', '', '', '', '', '', '', '', '598170.jpg', 1653900718, 0),
(12, 'gsd', '', '', '', '', '', '', '', '', '', '', 'dfg', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653900754, 0),
(13, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653901103, 0),
(14, 'das', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', '14', 1653901337, 0),
(15, 'fghhg', '', '', '', '', '', '', '', '', '', '', 'fgh', '', '', '', '', '', '', '', '', '', '', 'link.jpg', 1653901606, 0),
(16, 'fdg', '', '', '', '', '', '', '', '', '', '', 'dfg', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653903078, 0),
(17, 'fg', '', '', '', '', '', '', '', '', '', '', 'fgh', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653903124, 0),
(18, 'dfh', '', '', '', '', '', '', '', '', '', '', 'dfh', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653903169, 0),
(19, 'ghj', '', '', '', '', '', '', '', '', '', '', 'hjk', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653903199, 0),
(20, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653903297, 0),
(21, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'aga.jpg', 1653903482, 0),
(22, 'asd', '', '', '', '', '', '', '', '', '', '', 'asd', '', '', '', '', '', '', '', '', '', '', 'news22.jpg', 1653903838, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `markup_en` mediumtext NOT NULL,
  `markup_ru` mediumtext NOT NULL,
  `markup_de` mediumtext NOT NULL,
  `markup_pt` mediumtext NOT NULL,
  `markup_es` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `project_statistics`
--

CREATE TABLE `project_statistics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `project_statistics`
--

INSERT INTO `project_statistics` (`id`, `name`, `value`) VALUES
(1, 'users_total', '3'),
(2, 'replenishments_total', '0.00000000'),
(3, 'withdrawal_total', '0.00000000'),
(4, 'start_date', '1654041600'),
(5, 'fake_users_total', '0'),
(6, 'fake_replenishments_total', '0.00000000'),
(7, 'fake_withdrawal_total', '0.00000000'),
(8, 'fake_users_online', '5'),
(9, 'mails_unsended_register', '28');

-- --------------------------------------------------------

--
-- Структура таблицы `quest_bug`
--

CREATE TABLE `quest_bug` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(2500) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirm` int(11) NOT NULL,
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `quest_forum`
--

CREATE TABLE `quest_forum` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirm` int(11) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `quest_ref_earned`
--

CREATE TABLE `quest_ref_earned` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `quest_telegram_channel`
--

CREATE TABLE `quest_telegram_channel` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirm` int(11) NOT NULL,
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `quest_telegram_chat`
--

CREATE TABLE `quest_telegram_chat` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirm` int(11) NOT NULL,
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `quest_vk_repost`
--

CREATE TABLE `quest_vk_repost` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `link_sended` varchar(255) NOT NULL,
  `link_original` varchar(255) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirm` int(11) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `quest_youtube`
--

CREATE TABLE `quest_youtube` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirm` int(11) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `referrals_info`
--

CREATE TABLE `referrals_info` (
  `user_id` int(11) NOT NULL,
  `type` int(5) NOT NULL DEFAULT '1',
  `auto_ref_back` int(5) NOT NULL DEFAULT '0',
  `link_opened` int(11) NOT NULL DEFAULT '0',
  `referrals_first` int(11) NOT NULL DEFAULT '0',
  `referrals_second` int(11) NOT NULL DEFAULT '0',
  `referrals_third` int(11) NOT NULL DEFAULT '0',
  `money_earned_first` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `money_earned_second` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `money_earned_third` decimal(20,8) NOT NULL DEFAULT '0.00000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `referrals_info`
--

INSERT INTO `referrals_info` (`user_id`, `type`, `auto_ref_back`, `link_opened`, `referrals_first`, `referrals_second`, `referrals_third`, `money_earned_first`, `money_earned_second`, `money_earned_third`) VALUES
(1, 1, 25, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(2, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(3, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000');

-- --------------------------------------------------------

--
-- Структура таблицы `replenishments`
--

CREATE TABLE `replenishments` (
  `id` int(11) NOT NULL,
  `user_id` int(25) NOT NULL,
  `paysystem` varchar(25) NOT NULL,
  `currency` varchar(25) NOT NULL,
  `amount` decimal(20,8) NOT NULL,
  `amount_get` decimal(20,8) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirmed` int(11) NOT NULL,
  `action_percent` int(5) NOT NULL,
  `fake` int(5) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `answer` varchar(2500) NOT NULL DEFAULT '',
  `date` int(11) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `reviews_likes`
--

CREATE TABLE `reviews_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `opinion` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `settings`
--

INSERT INTO `settings` (`id`, `name`, `value`) VALUES
(1, 'currency_ratio', '60814.00'),
(2, 'money_accuracy', '8'),
(3, 'quest_vk_link', 'https://vk.com/wall-'),
(4, 'currency_usd', '73.12'),
(5, 'currency_btc_to_usd', '60814.00'),
(6, 'currency_usd_to_btc', '0.00001644'),
(7, 'currency_btc_to_rub', '4716479.84'),
(8, 'currency_rub_to_btc', '0.00000021'),
(9, 'currency_ltc_to_btc', '238.78301942'),
(10, 'currency_doge_to_btc', '846624.40722368'),
(11, 'currency_dash_to_btc', '210.84921179'),
(12, 'currency_eth_to_btc', '27.83670674'),
(13, 'action_percent', '0'),
(14, 'action_date_to', ' '),
(15, 'withdraw_minimum_btc', '0.00100000'),
(16, 'withdraw_minimum_usd', '0.15'),
(17, 'withdraw_minimum_rub', '10'),
(18, 'new_section', 'shop'),
(19, 'new_section_template', 'main_inner');

-- --------------------------------------------------------

--
-- Структура таблицы `settings_payments`
--

CREATE TABLE `settings_payments` (
  `id` int(11) NOT NULL,
  `paysystem` varchar(25) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `settings_payments`
--

INSERT INTO `settings_payments` (`id`, `paysystem`, `name`, `value`) VALUES
(1, 'qiwi', 'wallet', '79000000000'),
(2, 'advcash', 'sciname', 'sci'),
(3, 'advcash', 'scipass', 'pass'),
(4, 'advcash', 'apiname', 'apiname'),
(5, 'advcash', 'apipass', 'apipass'),
(6, 'advcash', 'scimail', 'scimail'),
(7, 'payeer', 'shopid', '1112223344'),
(8, 'payeer', 'secret', 'SeCrEt'),
(9, 'perfectmoney', 'account', 'U00011122'),
(10, 'perfectmoney', 'payeename', 'Payee Name'),
(11, 'yandex', 'wallet', '410011112222333'),
(12, 'yandex', 'secret', 'SeCrEtSeCrEtSeCrEt'),
(13, 'coinpayments', 'privatekey', 'privatekey64symbols'),
(14, 'coinpayments', 'publickey', 'publickey64symbols'),
(15, 'coinpayments', 'merchantid', 'id32symbols'),
(16, 'coinpayments', 'ipnsecret', 'SeCrEtSeCrEtSeCrEt'),
(17, 'perfectmoney', 'altphrase', 'CAPSLOCK'),
(18, 'perfectmoney', 'password', 'password123'),
(19, 'perfectmoney', 'accountid', '6311222'),
(20, 'payeer', 'account', 'P1011122233'),
(21, 'payeer', 'apisecret', 'SeCrEtSeCrEtSeCrEt'),
(22, 'payeer', 'apiid', '1211122233'),
(23, 'advcash', 'email', 'email@mail.com');

-- --------------------------------------------------------

--
-- Структура таблицы `surfing`
--

CREATE TABLE `surfing` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `link_name` varchar(150) NOT NULL,
  `link_desc` varchar(500) NOT NULL,
  `link_address` varchar(500) NOT NULL,
  `tariff` int(5) NOT NULL,
  `unlim` int(5) NOT NULL,
  `views` int(11) NOT NULL,
  `viewed` int(11) NOT NULL,
  `vip` int(5) NOT NULL DEFAULT '0',
  `colored` int(5) NOT NULL DEFAULT '0',
  `window` int(5) NOT NULL DEFAULT '0',
  `secure` int(5) NOT NULL DEFAULT '0',
  `complains` int(5) NOT NULL DEFAULT '0',
  `price` decimal(20,8) NOT NULL,
  `date` int(11) NOT NULL,
  `date_to` int(11) NOT NULL DEFAULT '0',
  `image` varchar(255) NOT NULL DEFAULT 'png',
  `status` int(5) NOT NULL DEFAULT '1',
  `iframe` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `surfing_complain`
--

CREATE TABLE `surfing_complain` (
  `id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `date_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `surfing_views`
--

CREATE TABLE `surfing_views` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `date` int(11) NOT NULL,
  `category` int(5) NOT NULL DEFAULT '1',
  `status` int(5) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `tickets_messages`
--

CREATE TABLE `tickets_messages` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `message` varchar(20000) NOT NULL,
  `date` int(11) NOT NULL,
  `is_answer` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `access_token` varchar(50) NOT NULL,
  `access_date` int(11) DEFAULT '0',
  `balance_buy` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `balance_withdrawal` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `level` int(11) NOT NULL DEFAULT '1',
  `experience` int(11) NOT NULL DEFAULT '0',
  `reg_date` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT '1',
  `can_communicate` int(5) NOT NULL DEFAULT '1' COMMENT 'Доступ к чату, личным сообщениям, отзывам и предложениям',
  `can_withdrawal` int(5) NOT NULL DEFAULT '1',
  `language` varchar(11) NOT NULL DEFAULT 'en',
  `avatar` varchar(6) NOT NULL DEFAULT '0' COMMENT 'формат файла аватарки, если указано 0 - аватар не загружен',
  `total_replenishments` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `total_withdrawal` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `total_spent` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `chat_moder` int(5) NOT NULL DEFAULT '0',
  `subscribed` int(5) NOT NULL DEFAULT '1',
  `email_confirmed` int(5) NOT NULL DEFAULT '0',
  `email_last_send` int(11) NOT NULL DEFAULT '0',
  `fake` int(5) NOT NULL DEFAULT '0',
  `test` int(5) NOT NULL DEFAULT '0' COMMENT 'Доступ к тестовому функционалу'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `pin`, `email`, `access_token`, `access_date`, `balance_buy`, `balance_withdrawal`, `level`, `experience`, `reg_date`, `status`, `can_communicate`, `can_withdrawal`, `language`, `avatar`, `total_replenishments`, `total_withdrawal`, `total_spent`, `chat_moder`, `subscribed`, `email_confirmed`, `email_last_send`, `fake`, `test`) VALUES
(1, 'admin', '17911360dc733f1796ba70b5bc79ea6e5dc85403fc0e4c28fe076be87632e203', '1212', 'info@bitcoinfree', '', 0, '0.00000000', '0.00000000', 1, 0, 1654041600, 1, 1, 1, 'ru', '0', '0.00000000', '0.00000000', '0.00000000', 1, 1, 1, 0, 0, 1),
(2, 'news', 'e5855c3bbfdd126e4ef1b837531dac727ddf6cbccf4dc9d180ac35f32ded0762', '0000', 'asd2@asd.com', '', 0, '0.00000000', '0.00000000', 1, 0, 1654041600, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(3, 'support', '0ce5db55be0ab3a4e9a7da632081e8f9c85439499b19e4a1d25b13eccb26a270', '0000', 'asd3@asd.com', '', 0, '0.00000000', '0.00000000', 1, 0, 1654041600, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users_credit`
--

CREATE TABLE `users_credit` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tariff` int(5) NOT NULL,
  `amount_get` decimal(20,8) NOT NULL,
  `amount_close` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `date_get` int(11) NOT NULL,
  `date_close` int(11) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL DEFAULT '1' COMMENT '1 - активен, 2 - закрыт, 3 - удален'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users_logs`
--

CREATE TABLE `users_logs` (
  `id` int(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `code` varchar(6) NOT NULL,
  `money` decimal(20,8) NOT NULL,
  `info` varchar(255) NOT NULL,
  `balance_buy` decimal(20,8) NOT NULL,
  `balance_withdrawal` decimal(20,8) NOT NULL,
  `ip` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users_plans_items`
--

CREATE TABLE `users_plans_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `item` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users_referrals`
--

CREATE TABLE `users_referrals` (
  `user_id` int(11) NOT NULL,
  `ref_id_first` int(11) NOT NULL,
  `ref_id_second` int(11) NOT NULL DEFAULT '0',
  `ref_id_third` int(11) NOT NULL DEFAULT '0',
  `money_to_first` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `money_to_second` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `money_to_third` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `source` varchar(10) NOT NULL,
  `url` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_referrals`
--

INSERT INTO `users_referrals` (`user_id`, `ref_id_first`, `ref_id_second`, `ref_id_third`, `money_to_first`, `money_to_second`, `money_to_third`, `source`, `url`) VALUES
(1, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000', 'ref', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users_wallets`
--

CREATE TABLE `users_wallets` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `qiwi` varchar(15) DEFAULT NULL,
  `payeer` varchar(20) DEFAULT NULL,
  `perfectmoney` varchar(20) DEFAULT NULL,
  `advcash` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `withdrawal`
--

CREATE TABLE `withdrawal` (
  `id` int(11) NOT NULL,
  `user_id` int(25) NOT NULL,
  `paysystem` varchar(25) NOT NULL,
  `currency` varchar(25) NOT NULL,
  `wallet` varchar(2550) NOT NULL,
  `amount` decimal(20,8) NOT NULL,
  `amount_get` decimal(20,8) NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_confirmed` int(11) NOT NULL,
  `fake` int(5) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authorization_logs`
--
ALTER TABLE `authorization_logs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `bitcoin_withdraw`
--
ALTER TABLE `bitcoin_withdraw`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `chat_de`
--
ALTER TABLE `chat_de`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `chat_en`
--
ALTER TABLE `chat_en`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `chat_es`
--
ALTER TABLE `chat_es`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `chat_fr`
--
ALTER TABLE `chat_fr`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `chat_pt`
--
ALTER TABLE `chat_pt`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `chat_ru`
--
ALTER TABLE `chat_ru`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `email_queue`
--
ALTER TABLE `email_queue`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `project_statistics`
--
ALTER TABLE `project_statistics`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quest_bug`
--
ALTER TABLE `quest_bug`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quest_forum`
--
ALTER TABLE `quest_forum`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quest_ref_earned`
--
ALTER TABLE `quest_ref_earned`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quest_telegram_channel`
--
ALTER TABLE `quest_telegram_channel`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quest_telegram_chat`
--
ALTER TABLE `quest_telegram_chat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quest_vk_repost`
--
ALTER TABLE `quest_vk_repost`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quest_youtube`
--
ALTER TABLE `quest_youtube`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `referrals_info`
--
ALTER TABLE `referrals_info`
  ADD PRIMARY KEY (`user_id`);

--
-- Индексы таблицы `replenishments`
--
ALTER TABLE `replenishments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviews_likes`
--
ALTER TABLE `reviews_likes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `settings_payments`
--
ALTER TABLE `settings_payments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `surfing`
--
ALTER TABLE `surfing`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `surfing_complain`
--
ALTER TABLE `surfing_complain`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `surfing_views`
--
ALTER TABLE `surfing_views`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tickets_messages`
--
ALTER TABLE `tickets_messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_credit`
--
ALTER TABLE `users_credit`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_logs`
--
ALTER TABLE `users_logs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_plans_items`
--
ALTER TABLE `users_plans_items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_referrals`
--
ALTER TABLE `users_referrals`
  ADD PRIMARY KEY (`user_id`);

--
-- Индексы таблицы `users_wallets`
--
ALTER TABLE `users_wallets`
  ADD PRIMARY KEY (`user_id`);

--
-- Индексы таблицы `withdrawal`
--
ALTER TABLE `withdrawal`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authorization_logs`
--
ALTER TABLE `authorization_logs`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `bitcoin_withdraw`
--
ALTER TABLE `bitcoin_withdraw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `chat_de`
--
ALTER TABLE `chat_de`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `chat_en`
--
ALTER TABLE `chat_en`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `chat_es`
--
ALTER TABLE `chat_es`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `chat_fr`
--
ALTER TABLE `chat_fr`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `chat_pt`
--
ALTER TABLE `chat_pt`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `chat_ru`
--
ALTER TABLE `chat_ru`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `email_queue`
--
ALTER TABLE `email_queue`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `project_statistics`
--
ALTER TABLE `project_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `quest_bug`
--
ALTER TABLE `quest_bug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `quest_forum`
--
ALTER TABLE `quest_forum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `quest_ref_earned`
--
ALTER TABLE `quest_ref_earned`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `quest_telegram_channel`
--
ALTER TABLE `quest_telegram_channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `quest_telegram_chat`
--
ALTER TABLE `quest_telegram_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `quest_vk_repost`
--
ALTER TABLE `quest_vk_repost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `quest_youtube`
--
ALTER TABLE `quest_youtube`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `replenishments`
--
ALTER TABLE `replenishments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `reviews_likes`
--
ALTER TABLE `reviews_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `settings_payments`
--
ALTER TABLE `settings_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `surfing`
--
ALTER TABLE `surfing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `surfing_complain`
--
ALTER TABLE `surfing_complain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `surfing_views`
--
ALTER TABLE `surfing_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `tickets_messages`
--
ALTER TABLE `tickets_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users_credit`
--
ALTER TABLE `users_credit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users_logs`
--
ALTER TABLE `users_logs`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users_plans_items`
--
ALTER TABLE `users_plans_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `withdrawal`
--
ALTER TABLE `withdrawal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
