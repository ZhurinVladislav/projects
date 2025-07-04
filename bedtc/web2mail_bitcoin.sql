-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Ноя 13 2024 г., 15:06
-- Версия сервера: 5.7.21-20-beget-5.7.21-20-1-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `web2mail_bitcoin`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authorization_logs`
--
-- Создание: Янв 29 2024 г., 10:53
-- Последнее обновление: Ноя 12 2024 г., 14:28
--

DROP TABLE IF EXISTS `authorization_logs`;
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
(6, 1, '127.0.0.1', 1653917761),
(7, 1, '127.0.0.1', 1654172302),
(8, 1, '127.0.0.1', 1656934543),
(9, 1, '127.0.0.1', 1657021347),
(10, 1, '127.0.0.1', 1657114688),
(11, 1, '127.0.0.1', 1657116615),
(12, 1, '127.0.0.1', 1657175009),
(13, 1, '127.0.0.1', 1657176739),
(14, 1, '127.0.0.1', 1657200160),
(15, 1, '127.0.0.1', 1657528426),
(16, 1, '127.0.0.1', 1657530222),
(17, 1, '127.0.0.1', 1657535414),
(18, 1, '127.0.0.1', 1657632663),
(19, 1, '127.0.0.1', 1657634063),
(20, 1, '127.0.0.1', 1657695369),
(21, 1, '127.0.0.1', 1657699257),
(22, 1, '127.0.0.1', 1657713125),
(23, 1, '127.0.0.1', 1657780543),
(24, 1, '127.0.0.1', 1658999177),
(25, 1, '127.0.0.1', 1659595895),
(26, 1, '127.0.0.1', 1659621809),
(27, 1, '127.0.0.1', 1660026832),
(28, 1, '127.0.0.1', 1660137721),
(29, 1, '127.0.0.1', 1660223642),
(30, 1, '127.0.0.1', 1661417945),
(31, 1, '127.0.0.1', 1661498179),
(32, 1, '127.0.0.1', 1662030374),
(33, 1, '127.0.0.1', 1662115956),
(34, 1, '127.0.0.1', 1662378846),
(35, 1, '127.0.0.1', 1669272750),
(36, 1, '127.0.0.1', 1669358413),
(37, 1, '127.0.0.1', 1669628411),
(38, 1, '127.0.0.1', 1669628727),
(39, 1, '127.0.0.1', 1669708311),
(40, 1, '127.0.0.1', 1669799923),
(41, 1, '127.0.0.1', 1669891977),
(42, 1, '127.0.0.1', 1669990203),
(43, 1, '127.0.0.1', 1670223732),
(44, 1, '127.0.0.1', 1670307799),
(45, 1, '127.0.0.1', 1670410088),
(46, 1, '127.0.0.1', 1670497200),
(47, 1, '127.0.0.1', 1670509610),
(48, 5, '127.0.0.1', 1670510925),
(49, 6, '127.0.0.1', 1670511276),
(50, 1, '127.0.0.1', 1670569581),
(51, 7, '127.0.0.1', 1670570182),
(52, 1, '127.0.0.1', 1670832509),
(53, 1, '127.0.0.1', 1670834476),
(54, 1, '127.0.0.1', 1670931217),
(55, 1, '127.0.0.1', 1671005095),
(56, 1, '127.0.0.1', 1671091095),
(57, 1, '127.0.0.1', 1671175778),
(58, 1, '127.0.0.1', 1684479051),
(59, 1, '127.0.0.1', 1684736219),
(60, 1, '127.0.0.1', 1684823950),
(61, 1, '127.0.0.1', 1684910191),
(62, 1, '127.0.0.1', 1684995533),
(63, 1, '127.0.0.1', 1685426443),
(64, 1, '127.0.0.1', 1685429871),
(65, 1, '127.0.0.1', 1685429926),
(66, 1, '127.0.0.1', 1688374679),
(67, 1, '127.0.0.1', 1688455292),
(68, 1, '127.0.0.1', 1688455346),
(69, 1, '127.0.0.1', 1688559454),
(70, 1, '127.0.0.1', 1688971262),
(71, 1, '127.0.0.1', 1689056761),
(72, 1, '127.0.0.1', 1689239476),
(73, 1, '127.0.0.1', 1689318193),
(74, 1, '127.0.0.1', 1689591717),
(75, 1, '127.0.0.1', 1689664406),
(76, 1, '127.0.0.1', 1689750230),
(77, 1, '127.0.0.1', 1689841652),
(78, 8, '127.0.0.1', 1705650767),
(79, 8, '127.0.0.1', 1705666899),
(80, 8, '127.0.0.1', 1705905704),
(81, 1, '127.0.0.1', 1705911331),
(82, 1, '127.0.0.1', 1705912966),
(83, 8, '127.0.0.1', 1705919697),
(84, 1, '127.0.0.1', 1705932176),
(85, 1, '127.0.0.1', 1706001590),
(86, 1, '127.0.0.1', 1706094085),
(87, 8, '127.0.0.1', 1706099567),
(88, 1, '127.0.0.1', 1706099824),
(89, 1, '127.0.0.1', 1706188866),
(90, 1, '127.0.0.1', 1706252336),
(91, 1, '127.0.0.1', 1706513804),
(92, 1, '192.162.0.167', 1706525717),
(93, 1, '192.162.0.167', 1706532678),
(94, 1, '192.162.0.167', 1706532873),
(95, 1, '192.162.0.167', 1706606859),
(96, 1, '192.162.0.167', 1706687422),
(97, 1, '192.162.0.167', 1706699988),
(98, 1, '192.162.0.167', 1706701042),
(99, 1, '192.162.0.167', 1706701175),
(100, 1, '192.162.0.167', 1706701199),
(101, 1, '192.162.0.167', 1706701378),
(102, 1, '192.162.0.167', 1706701439),
(103, 1, '192.162.0.167', 1706776741),
(104, 1, '192.162.0.167', 1706797697),
(105, 1, '192.162.0.167', 1707134698),
(106, 1, '192.162.0.167', 1707137434),
(107, 1, '192.162.0.167', 1707295650),
(108, 1, '192.162.0.167', 1707377934),
(109, 1, '192.162.0.167', 1707728320),
(110, 1, '192.162.0.167', 1707834063),
(111, 1, '192.162.0.167', 1707998909),
(112, 1, '192.162.0.167', 1708008452),
(113, 1, '192.162.0.167', 1708071314),
(114, 1, '192.162.0.167', 1708073356),
(115, 1, '192.162.0.167', 1708084507),
(116, 1, '192.162.0.167', 1708345419),
(117, 1, '192.162.0.167', 1708346808),
(118, 1, '192.162.0.167', 1708414087),
(119, 1, '192.162.0.167', 1708414166),
(120, 1, '192.162.0.167', 1708417416),
(121, 9, '192.162.0.167', 1708420392),
(122, 9, '192.162.0.167', 1708420505),
(123, 9, '192.162.0.167', 1708420664),
(124, 9, '192.162.0.167', 1708420709),
(125, 9, '80.88.48.224', 1708421112),
(126, 1, '192.162.0.167', 1708432043),
(127, 9, '192.162.0.167', 1708432279),
(128, 9, '192.162.0.167', 1708432408),
(129, 9, '192.162.0.167', 1708432549),
(130, 9, '192.162.0.167', 1708432744),
(131, 1, '192.162.0.167', 1708517257),
(132, 1, '192.162.0.167', 1708586056),
(133, 9, '80.88.48.224', 1708774629),
(134, 1, '192.162.0.167', 1708930950),
(135, 1, '192.162.0.167', 1708958362),
(136, 1, '192.162.0.167', 1709041983),
(137, 1, '192.162.0.167', 1709106032),
(138, 1, '192.162.0.167', 1709111063),
(139, 1, '192.162.0.167', 1709198300),
(140, 1, '192.162.0.167', 1709206214),
(141, 1, '192.162.0.167', 1709215035),
(142, 1, '192.162.0.167', 1709215139),
(143, 1, '192.162.0.167', 1709283639),
(144, 1, '192.162.0.167', 1709300815),
(145, 1, '192.162.0.167', 1709713636),
(146, 1, '192.162.0.167', 1709727551),
(147, 1, '192.162.0.167', 1709730474),
(148, 1, '192.162.0.167', 1709816861),
(149, 1, '192.162.0.167', 1709820383),
(150, 1, '192.162.0.167', 1709820799),
(151, 1, '192.162.0.167', 1710159143),
(152, 1, '192.162.0.167', 1710250861),
(153, 1, '192.162.0.167', 1710330661),
(154, 1, '192.162.0.167', 1710340271),
(155, 1, '192.162.0.167', 1710399534),
(156, 1, '192.162.0.167', 1710424449),
(157, 1, '192.162.0.167', 1711089583),
(158, 1, '192.162.0.167', 1711456562),
(159, 1, '192.162.0.167', 1718627211),
(160, 1, '192.162.0.167', 1718698561),
(161, 1, '192.162.0.167', 1718721820),
(162, 1, '192.162.0.167', 1718786466),
(163, 1, '192.162.0.167', 1719995335),
(164, 1, '192.162.0.167', 1720007895),
(165, 1, '192.162.0.167', 1720077692),
(166, 1, '192.162.0.167', 1720168737),
(167, 1, '192.162.0.167', 1720183682),
(168, 1, '192.162.0.167', 1720425379),
(169, 1, '192.162.0.167', 1720449916),
(170, 1, '192.162.0.167', 1720529507),
(171, 1, '192.162.0.167', 1720620936),
(172, 1, '192.162.0.167', 1720624849),
(173, 1, '192.162.0.167', 1720685086),
(174, 1, '192.162.0.167', 1720697201),
(175, 1, '192.162.0.167', 1720784120),
(176, 1, '192.162.0.167', 1720787255),
(177, 1, '192.162.0.167', 1720788133),
(178, 1, '192.162.0.167', 1720793520),
(179, 1, '192.162.0.167', 1720794194),
(180, 1, '192.162.0.167', 1720794553),
(181, 1, '192.162.0.167', 1720794784),
(182, 1, '192.162.0.167', 1720795860),
(183, 1, '192.162.0.167', 1721139073),
(184, 1, '192.162.0.167', 1721217355),
(185, 1, '192.162.0.167', 1721221120),
(186, 1, '192.162.0.167', 1721221421),
(187, 1, '192.162.0.167', 1721286822),
(188, 1, '192.162.0.167', 1721307072),
(189, 1, '192.162.0.167', 1721372323),
(190, 1, '192.162.0.167', 1721372694),
(191, 1, '192.162.0.167', 1721801408),
(192, 1, '192.162.0.167', 1722249959),
(193, 1, '37.78.171.175', 1722520319),
(194, 1, '192.162.0.167', 1723702459),
(195, 1, '192.162.0.167', 1724401160),
(196, 1, '192.162.0.167', 1724401182),
(197, 1, '192.162.0.167', 1725259142),
(198, 1, '192.162.0.167', 1730805804),
(199, 1, '15.204.32.50', 1730898410),
(200, 1, '192.162.0.167', 1730904151),
(201, 1, '192.162.0.167', 1730963422),
(202, 1, '192.162.0.167', 1731421736);

-- --------------------------------------------------------

--
-- Структура таблицы `bitcoin_withdraw`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `bitcoin_withdraw`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `chat_de`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `chat_en`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `chat_es`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `chat_fr`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `chat_pt`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `chat_ru`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `email_queue`;
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
-- Создание: Фев 28 2024 г., 11:08
--

DROP TABLE IF EXISTS `faq`;
CREATE TABLE `faq` (
  `id` int(5) NOT NULL,
  `title_ru` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `title_de` varchar(255) NOT NULL,
  `title_pt` varchar(255) NOT NULL,
  `title_es` varchar(255) NOT NULL,
  `title_fr` varchar(255) NOT NULL,
  `title_th` varchar(255) NOT NULL,
  `title_hi` varchar(255) NOT NULL,
  `title_zh` varchar(255) NOT NULL,
  `content_ru` varchar(2500) NOT NULL,
  `content_en` varchar(2500) NOT NULL,
  `content_de` varchar(2500) NOT NULL,
  `content_pt` varchar(2500) NOT NULL,
  `content_es` varchar(2500) NOT NULL,
  `content_fr` varchar(2500) NOT NULL,
  `content_th` text NOT NULL,
  `content_hi` text NOT NULL,
  `content_zh` text NOT NULL,
  `sort` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `faq`
--

INSERT INTO `faq` (`id`, `title_ru`, `title_en`, `title_de`, `title_pt`, `title_es`, `title_fr`, `title_th`, `title_hi`, `title_zh`, `content_ru`, `content_en`, `content_de`, `content_pt`, `content_es`, `content_fr`, `content_th`, `content_hi`, `content_zh`, `sort`) VALUES
(5, 'Что такое “Баланс на покупки” и “Баланс на вывод”', 'What is the “Balance for purchases” and “Balance for withdrawal”?', 'Was sind \"Kaufguthaben\" und \"Auszahlungsguthaben\"', 'O que é \"saldo de compra\" e \"saldo de retirada\"', 'Qué Es \" saldo de compra \"y\"Saldo de retiro\"', '', '', '', '', 'Qu\'est-ce que le “Solde d\'achat \"et le\" Solde de retrait”', '\"ยอดคงเหลือสำหรับการซื้อ\"และ\"ยอดคงเหลือสำหรับการถอนเงิน\"คืออะไร?', '', '', '', '', '', '', '', 0),
(6, 'rmjrrmjrtjrtyjrt', '', '', '', '', '', '', '', '', '', '', '', '', 'rtyjrtjtyjrtyjrtyj', '', '', '', '', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `game_tiles_sessions`
--
-- Создание: Фев 29 2024 г., 11:45
--

DROP TABLE IF EXISTS `game_tiles_sessions`;
CREATE TABLE `game_tiles_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `result` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `game_tiles_sessions`
--

INSERT INTO `game_tiles_sessions` (`id`, `user_id`, `date`, `result`) VALUES
(1, 1, 1709211383, 0),
(2, 1, 1709211440, 0),
(3, 1, 1709211484, 0),
(4, 1, 1709211560, 0),
(5, 1, 1709211646, 0),
(6, 1, 1709211785, 0),
(7, 1, 1709211823, 0),
(8, 1, 1709211878, 0),
(9, 1, 1709211970, 0),
(10, 1, 1709212032, 0),
(11, 1, 1709212081, 0),
(12, 1, 1709212171, 0),
(13, 1, 1709212222, 0),
(14, 1, 1709212283, 0),
(15, 1, 1709212317, 0),
(16, 1, 1709212376, 0),
(17, 1, 1709212565, 0),
(18, 1, 1709212633, 0),
(19, 1, 1709212719, 0),
(20, 1, 1709212820, 0),
(21, 1, 1709212861, 0),
(22, 1, 1709213029, 0),
(23, 1, 1709213131, 0),
(24, 1, 1709213166, 0),
(25, 1, 1709213340, 0),
(26, 1, 1709213375, 0),
(27, 1, 1709213422, 0),
(28, 1, 1709213456, 0),
(29, 1, 1709213920, 0),
(30, 1, 1709214020, 0),
(31, 1, 1709214222, 0),
(32, 1, 1709214858, 0),
(33, 1, 1709214900, 0),
(34, 1, 1709215057, 0),
(35, 1, 1709215100, 0),
(36, 1, 1709215137, 0),
(37, 1, 1709215171, 0),
(38, 1, 1709215191, 0),
(39, 1, 1709154000, 1),
(40, 1, 1709217256, 0),
(41, 1, 1709217599, 0),
(42, 1, 1709217633, 0),
(43, 1, 1709217857, 0),
(44, 1, 1709304429, 1),
(45, 1, 1710255783, 0),
(46, 1, 1718627284, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--
-- Создание: Июл 08 2024 г., 14:53
--

DROP TABLE IF EXISTS `news`;
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
  `annotation_ru` longtext NOT NULL,
  `annotation_en` longtext NOT NULL,
  `annotation_de` longtext NOT NULL,
  `annotation_pt` longtext NOT NULL,
  `annotation_es` longtext NOT NULL,
  `annotation_fr` longtext NOT NULL,
  `annotation_hi` longtext NOT NULL,
  `annotation_id` longtext NOT NULL,
  `annotation_th` longtext NOT NULL,
  `annotation_tr` longtext NOT NULL,
  `annotation_zh` longtext NOT NULL,
  `image` varchar(50) NOT NULL DEFAULT '0',
  `date` int(11) NOT NULL,
  `admin_only` int(2) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `title_ru`, `title_en`, `title_de`, `title_pt`, `title_es`, `title_fr`, `title_hi`, `title_id`, `title_th`, `title_tr`, `title_zh`, `annotation_ru`, `annotation_en`, `annotation_de`, `annotation_pt`, `annotation_es`, `annotation_fr`, `annotation_hi`, `annotation_id`, `annotation_th`, `annotation_tr`, `annotation_zh`, `image`, `date`, `admin_only`) VALUES
(22, 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '', 'news22.jpg', 1653903838, 0),
(23, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', '', '', '', '', '', '', '', '', '', 'news23.jpg', 1709733182, 0),
(24, 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', '', '', '', '', '', '', '', '', '', '', '', 'news24.jpg', 1709733263, 0),
(25, 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', '', '', '', '', '', '', '', '', '', '', '', 'news25.jpg', 1709733411, 0),
(26, 'Тест', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', '', '', '', '', '', '', '', '', '', '', '', 'news26.jpg', 1709733786, 0),
(27, 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'news27.jpg', 1720450565, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `news_etf`
--
-- Создание: Июл 09 2024 г., 12:31
--

DROP TABLE IF EXISTS `news_etf`;
CREATE TABLE `news_etf` (
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
  `annotation_ru` longtext NOT NULL,
  `annotation_en` longtext NOT NULL,
  `annotation_de` longtext NOT NULL,
  `annotation_pt` longtext NOT NULL,
  `annotation_es` longtext NOT NULL,
  `annotation_fr` longtext NOT NULL,
  `annotation_hi` longtext NOT NULL,
  `annotation_id` longtext NOT NULL,
  `annotation_th` longtext NOT NULL,
  `annotation_tr` longtext NOT NULL,
  `annotation_zh` longtext NOT NULL,
  `image` varchar(50) NOT NULL DEFAULT '0',
  `date` int(11) NOT NULL,
  `admin_only` int(2) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Дамп данных таблицы `news_etf`
--

INSERT INTO `news_etf` (`id`, `title_ru`, `title_en`, `title_de`, `title_pt`, `title_es`, `title_fr`, `title_hi`, `title_id`, `title_th`, `title_tr`, `title_zh`, `annotation_ru`, `annotation_en`, `annotation_de`, `annotation_pt`, `annotation_es`, `annotation_fr`, `annotation_hi`, `annotation_id`, `annotation_th`, `annotation_tr`, `annotation_zh`, `image`, `date`, `admin_only`) VALUES
(22, 'Запуск проекта ETF', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.</p><p>Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.</p>\r\n<p>Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p>', '', 'news22.jpg', 1653903838, 0),
(23, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', '', '', '', '', '', '', '', '', '', 'news23.jpg', 1709733182, 0),
(24, 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', 'asd2', '', '', '', '', '', '', '', '', '', '', '', 'news24.jpg', 1709733263, 0),
(25, 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', 'Запуск проекта BitcoinFree.ee', '', '', '', '', '', '', '', '', '', '', '', 'news25.jpg', 1709733411, 0),
(26, 'Тест', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', '', '', '', '', '', '', '', '', '', '', '', 'news26.jpg', 1709733786, 0),
(27, 'test etfnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews1', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'test newnews annotanion', 'news27.jpg', 1720450565, 0),
(28, 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'test etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'text etf 1\ntext etf 1\ntext etf 1\ntext etf 1\ntext etf 1', 'news28.jpg', 1720529717, 0),
(29, 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'test etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'annotation etf 2', 'news29.jpg', 1720530038, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `pages`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `pages`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `project_statistics`;
CREATE TABLE `project_statistics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `project_statistics`
--

INSERT INTO `project_statistics` (`id`, `name`, `value`) VALUES
(1, 'users_total', '13'),
(2, 'replenishments_total', '0.00000000'),
(3, 'withdrawal_total', '0.00000000'),
(4, 'start_date', '1654041600'),
(5, 'fake_users_total', '0'),
(6, 'fake_replenishments_total', '0.00000000'),
(7, 'fake_withdrawal_total', '0.00000000'),
(8, 'fake_users_online', '5'),
(9, 'mails_unsended_register', '32'),
(10, 'total_games_played', '1');

-- --------------------------------------------------------

--
-- Структура таблицы `quest_bug`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `quest_bug`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `quest_forum`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `quest_ref_earned`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `quest_telegram_channel`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `quest_telegram_chat`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `quest_vk_repost`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `quest_youtube`;
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
-- Создание: Июл 05 2024 г., 13:12
--

DROP TABLE IF EXISTS `referrals_info`;
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
(1, 1, 0, 5, 4, 1, 1, '0.00000000', '0.00000000', '0.03000002'),
(2, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(3, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(4, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(5, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(6, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(7, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(8, 1, 0, 1, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(9, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(10, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000'),
(11, 1, 0, 0, 0, 0, 0, '0.00000000', '0.09000005', '0.00000000'),
(12, 3, 0, 0, 0, 0, 0, '0.15000017', '0.00000000', '0.00000000'),
(13, 1, 0, 0, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000');

-- --------------------------------------------------------

--
-- Структура таблицы `replenishments`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `replenishments`;
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

--
-- Дамп данных таблицы `replenishments`
--

INSERT INTO `replenishments` (`id`, `user_id`, `paysystem`, `currency`, `amount`, `amount_get`, `date_created`, `date_confirmed`, `action_percent`, `fake`, `status`) VALUES
(1, 1, 'payeer', 'USD', '1000.00000000', '0.01644358', 1669723548, 1720788152, 0, 0, 2),
(2, 1, 'qiwi', 'RUB', '100.00000000', '0.00002249', 1684752370, 1720788152, 5, 0, 2),
(3, 1, 'qiwi', 'RUB', '250.00000000', '0.00005622', 1684752463, 1720788151, 5, 0, 2),
(4, 11, 'coinpayments', 'BTC', '1.00000000', '100.00000000', 1720624481, 1720788150, 5, 1, 2),
(5, 13, 'coinpayments', 'BTC', '0.01000000', '1.00000000', 1720787248, 1720787261, 5, 1, 1),
(6, 13, 'coinpayments', 'BTC', '0.01000000', '1.00000000', 1720788128, 1720788154, 5, 1, 1),
(7, 13, 'coinpayments', 'BTC', '0.02000000', '2.00000000', 1720793513, 1720793527, 5, 1, 1),
(8, 1, 'coinpayments', 'BTC', '0.00500000', '0.50000000', 1724402621, 0, 5, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `answer` varchar(2500) NOT NULL DEFAULT '',
  `date` int(11) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '0',
  `status` int(5) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `content`, `answer`, `date`, `rating`, `status`) VALUES
(1, 1, 'test test test test', '', 1657116643, 0, 1),
(2, 1, 'oiejg;seijg;sjg; sdg dfg s', '', 1657118611, 1, 1),
(3, 1, '222222222222 3333333333333333 44444444444 5555', '', 1670586629, 0, 1),
(4, 1, 'qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty', '', 1670589116, 0, 1),
(8, 1, 'aaaaaaaa', '', 1684829965, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews_likes`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `reviews_likes`;
CREATE TABLE `reviews_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `opinion` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `reviews_likes`
--

INSERT INTO `reviews_likes` (`id`, `user_id`, `review_id`, `opinion`) VALUES
(1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `settings`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `settings`
--

INSERT INTO `settings` (`id`, `name`, `value`) VALUES
(1, 'currency_ratio', '608.14'),
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
(13, 'action_percent', '5'),
(14, 'action_date_to', ' '),
(15, 'withdraw_minimum_btc', '0.00100000'),
(16, 'withdraw_minimum_usd', '0.15'),
(17, 'withdraw_minimum_rub', '10'),
(18, 'new_section', 'shop'),
(19, 'new_section_template', 'main_inner'),
(20, 'withdraw_minimum_eur', '0.15');

-- --------------------------------------------------------

--
-- Структура таблицы `settings_payments`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `settings_payments`;
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
-- Создание: Фев 28 2024 г., 08:08
--

DROP TABLE IF EXISTS `surfing`;
CREATE TABLE `surfing` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `link_name` varchar(150) NOT NULL,
  `link_desc` varchar(500) NOT NULL,
  `link_address` varchar(500) NOT NULL,
  `tariff` int(5) NOT NULL,
  `visited` int(11) NOT NULL,
  `viewed` int(11) NOT NULL,
  `time_placement` varchar(255) NOT NULL DEFAULT '0',
  `number_viewing` varchar(255) NOT NULL DEFAULT '0',
  `time_viewing` varchar(255) NOT NULL DEFAULT '0',
  `language` varchar(255) NOT NULL DEFAULT '0',
  `mandatory_transition` int(5) NOT NULL DEFAULT '0',
  `material` int(5) NOT NULL,
  `date` int(11) NOT NULL,
  `date_to` int(11) NOT NULL DEFAULT '0',
  `image` varchar(255) NOT NULL DEFAULT 'png',
  `status` int(5) NOT NULL DEFAULT '1',
  `viewcost` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `surfing`
--

INSERT INTO `surfing` (`id`, `user_id`, `link_name`, `link_desc`, `link_address`, `tariff`, `visited`, `viewed`, `time_placement`, `number_viewing`, `time_viewing`, `language`, `mandatory_transition`, `material`, `date`, `date_to`, `image`, `status`, `viewcost`) VALUES
(1, 1, 'i--gu.ru', 'Сайт i--gu.ru. Описание', 'http://i--gu.ru/phpthumb', 2, 0, 2000, '', '2500', '10', 'Ru', 0, 0, 1688456515, 0, 'png', 0, 0.000000017),
(17, 1, 'google.com', 'Сайт www.google.com. Поисковик прозападный', 'https://google.com/', 2, 0, 0, '', '500', '10', 'Все языки', 0, 0, 1689599272, 0, 'png', 0, 0.000000017),
(21, 1, 'rudrastyh.com', 'Сайт https://rudrastyh.com/ не понятно зачем нужен и зачем он здесь', 'https://rudrastyh.com/', 2, 0, 0, '', '1000', '10', 'Все языки', 0, 0, 1689852593, 0, 'png', 1, 0.000000017),
(26, 1, 'cctld.ru', 'https://cctld.ru/ Отличный сайт с отличной историей.', 'https://cctld.ru/', 2, 0, 2, '', '1500', '30', 'Все языки', 0, 0, 1689853995, 0, 'png', 0, 0.000000025),
(27, 1, 'webstool.ru', 'https://webstool.ru/ Исторический сайт с великой историей', 'https://webstool.ru/', 2, 15, 7, '', '500', '10', 'Все языки', 1, 0, 1689854402, 0, 'png', 0, 0.0000000213),
(29, 1, 'selection-studio.com', 'https://selection-studio.com/ Сайт созданный для великих свершений и seo завоеваний', 'https://selection-studio.com/', 2, 9, 4, '', '1000', '30', 'Все языки', 1, 0, 1689854771, 0, 'png', 0, 0.0000000313),
(30, 1, 'github.com', 'Гитхаб нам всем в помощь.', 'https://github.com/malihu/malihu-custom-scrollbar-plugin', 2, 6, 5, '', '1500', '60', 'Все языки', 0, 0, 1689854800, 0, 'png', 0, 0.0000000345),
(31, 1, 'docs.modx.org', 'modx инструкция для modx ', 'https://docs.modx.org/current/ru/extending-modx/tutorials/developing-an-extra', 2, 5, 5, '', '2000', '10', 'Все языки', 1, 0, 1689859170, 0, 'png', 0, 0.0000000213),
(32, 1, 'jbzoo.ru', 'https://jbzoo.ru/docs/item-templates', 'https://jbzoo.ru/docs/item-templates', 2, 3, 20, '', '2000', '10', 'En', 0, 0, 1707834716, 0, 'png', 0, 0.000000017),
(33, 1, 'https://www.php.net/manual/ru/function.strip-tags.php', 'https://www.php.net/manual/ru/function.strip-tags.php', 'https://www.php.net/manual/ru/function.strip-tags.php', 2, 6, 5, '', '500', '30', 'Все языки', 0, 0, 1707814448, 0, 'png', 0, 0.000000025),
(35, 1, 'test 220', 'test 220 by asd', 'https://surfe.be/', 2, 0, 3, '', '500', '10', 'Все языки', 0, 0, 1721221249, 0, 'png', 1, 0.0000017),
(36, 1, 'test 221', 'asdasd', 'https://surfe.be/', 2, 0, 2, '', '500', '10', 'Все языки', 0, 0, 1721221924, 0, 'png', 1, 0.0000017),
(37, 1, 'test 222', 'asd', 'https://surfe.be/', 2, 0, 1, '', '500', '10', 'Все языки', 0, 0, 1721222206, 0, 'png', 1, 0.0000017),
(38, 1, 'text-compare.com', 'Сравнение текстов', 'https://text-compare.com/', 2, 2, 2, '', '500', '10', 'Все языки', 1, 0, 1721374260, 0, 'png', 1, 0.00000213),
(39, 1, ' бугугашка чебурашка', 'бугугашка чебурашка', ' бугугашка чебурашка', 2, 0, 0, '', '500', '10', 'Все языки', 1, 0, 1721374642, 0, 'png', 0, 0.00000213),
(41, 1, 'Википедия ', 'Свободная энциклопедия', 'https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0', 2, 2, 2, '', '500', '10', 'Ru', 1, 0, 1724401574, 0, 'png', 1, 0.00000213);

-- --------------------------------------------------------

--
-- Структура таблицы `surfing_complain`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `surfing_complain`;
CREATE TABLE `surfing_complain` (
  `id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `date_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `surfing_complain`
--

INSERT INTO `surfing_complain` (`id`, `site_id`, `user_id`, `text`, `date_created`) VALUES
(1, 35, 1, '', 1709284076),
(2, 31, 1, '', 1711457531),
(3, 17, 1, '', 1711457544),
(4, 30, 1, '', 1711457556),
(5, 27, 1, '', 1711457720),
(6, 27, 1, '', 1711457730),
(7, 40, 1, '', 1722250134),
(8, 40, 1, '', 1724401676);

-- --------------------------------------------------------

--
-- Структура таблицы `surfing_views`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `surfing_views`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `date` int(11) NOT NULL,
  `category` int(5) NOT NULL DEFAULT '1',
  `status` int(5) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tickets`
--

INSERT INTO `tickets` (`id`, `user_id`, `subject`, `date`, `category`, `status`) VALUES
(1, 1, 'Все пропало', 1707137392, 1, 2),
(2, 1, 'Не понятно что за что начисляется', 1724403423, 3, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `tickets_messages`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `tickets_messages`;
CREATE TABLE `tickets_messages` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `message` varchar(20000) NOT NULL,
  `date` int(11) NOT NULL,
  `is_answer` int(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tickets_messages`
--

INSERT INTO `tickets_messages` (`id`, `ticket_id`, `message`, `date`, `is_answer`) VALUES
(1, 1, 'Все горит и все пропало', 1707137392, 0),
(2, 1, 'Забирайте компьютер и убегайте', 1707137464, 1),
(3, 1, 'Спасибо помогло!', 1707137501, 0),
(4, 1, 'Обращайтесь еще', 1707138034, 1),
(5, 1, 'Непременно', 1707138046, 0),
(6, 1, 'Опять все плохо', 1707138184, 0),
(7, 1, 'А у нас все норм', 1707138203, 1),
(8, 2, 'Дорогие разработчики, пожалуйста проверьте систему начисления вознаграждений за просмотр рекламы', 1724403423, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Янв 29 2024 г., 13:16
-- Последнее обновление: Ноя 12 2024 г., 14:46
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(24) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `g_auth` int(5) NOT NULL DEFAULT '0',
  `g_auth_secret` varchar(255) NOT NULL DEFAULT '',
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

INSERT INTO `users` (`id`, `login`, `password`, `pin`, `email`, `g_auth`, `g_auth_secret`, `access_token`, `access_date`, `balance_buy`, `balance_withdrawal`, `level`, `experience`, `reg_date`, `status`, `can_communicate`, `can_withdrawal`, `language`, `avatar`, `total_replenishments`, `total_withdrawal`, `total_spent`, `chat_moder`, `subscribed`, `email_confirmed`, `email_last_send`, `fake`, `test`) VALUES
(1, 'admin', '17911360dc733f1796ba70b5bc79ea6e5dc85403fc0e4c28fe076be87632e203', '1212', 'info@bitcoinfree', 0, '', '', 1706701439, '0.03094693', '0.00001022', 1, 0, 1654041600, 1, 1, 1, 'ru', '0', '0.00000000', '0.00094904', '0.00000000', 1, 1, 1, 0, 0, 1),
(2, 'news', 'e5855c3bbfdd126e4ef1b837531dac727ddf6cbccf4dc9d180ac35f32ded0762', '0000', 'asd2@asd.com', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1654041600, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(3, 'support', '0ce5db55be0ab3a4e9a7da632081e8f9c85439499b19e4a1d25b13eccb26a270', '0000', 'asd3@asd.com', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1654041600, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(4, 'asd', 'be59bd817dd8523a383a9728e33f238c', '1212', 'asd@asd.com', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1669628428, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 1, 0),
(5, 'user5', '85dd23bd22a4a1ec2e92acd1b4e6840918465b8ea769b75ddccbd9150ab7b7fe', '425', 'test12@gmail.com', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1670510925, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(6, 'user6', '85dd23bd22a4a1ec2e92acd1b4e6840918465b8ea769b75ddccbd9150ab7b7fe', '1212', 'test14@asd.com', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1670511276, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(7, 'user7', 'e1d72a81aa2ca75e13136e5f2e416cafbea8cc970aca27ba8bb16b8dff30de86', '1234', 'asd4@asd.com', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1670570182, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(8, 'user8', '85dd23bd22a4a1ec2e92acd1b4e6840918465b8ea769b75ddccbd9150ab7b7fe', '0425', 'web2developer2@yandex.ru', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1705650767, 1, 1, 1, 'ru', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(9, 'user9', '0c084d5495ce7c659db1b3a7c06e0c40f4a9c20a0ed6a55d5677aabdb72940f8', '1234', 'macol91056@ebuthor.com', 0, '', '', 0, '0.00000000', '0.00000000', 1, 0, 1708420392, 1, 1, 1, 'ru', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 0, 0),
(10, 'valera01', '3fbf33a942120e843a5774f10f598995f1e8d277b99935b3a9f0c87e12c370f0', '1212', 'valera01@asd.com', 0, '', '', 0, '0.00000000', '0.00005000', 1, 0, 1709820715, 1, 1, 1, 'en', '0', '0.00000000', '0.00005000', '0.00000000', 0, 1, 0, 0, 1, 0),
(11, 'testref1', 'bb1be40c7d591cfb9a7ce96fc4859f3ca1f43d44480881c491fd154651e487c8', '1212', 'testref1@asd.com', 0, '', '', 0, '0.00000000', '0.09000005', 1, 0, 1720624286, 1, 1, 1, 'en', '0', '10.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 1, 0),
(12, 'testref2', 'd48b7f63762ce9d836ea804cae9dbbce989b2f5d683108a4e8e340fc11129657', '1212', 'testref2@asd.com', 0, '', '', 0, '0.00000000', '0.15000017', 1, 0, 1720784888, 1, 1, 1, 'en', '0', '0.00000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 1, 0),
(13, 'testref3', '54f9791c9fc35e73ff8dab2ff9498ca3c127391caf14758dc77fb1cdd6d0418e', '1212', 'testref3@asd.com', 0, '', '', 0, '0.00000000', '0.00000175', 1, 0, 1720784893, 1, 1, 1, 'en', '0', '4.20000000', '0.00000000', '0.00000000', 0, 1, 0, 0, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users_credit`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `users_credit`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `users_logs`;
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

--
-- Дамп данных таблицы `users_logs`
--

INSERT INTO `users_logs` (`id`, `user_id`, `date`, `code`, `money`, `info`, `balance_buy`, `balance_withdrawal`, `ip`) VALUES
(1, 1, 1706018400, '02011', '0.00099988', 'adcs d fg dfg dfgdg dg dg dg d', '0.00098988', '0.00012312', NULL),
(2, 1, 1706018082, '03001', '0.00088899', 'fgfgfgfgf  f fgf gf', '0.00077777', '0.00088888', NULL),
(3, 1, 1674482082, '03004', '0.00078978', 'fgfgfgfgf  f fgf gf', '0.00077777', '0.00088888', NULL),
(4, 1, 1709215203, '07031', '0.00000040', '39', '0.00005915', '0.00088888', '192.162.0.167'),
(5, 1, 1720626106, '03001', '1.31250000', '11', '0.00004215', '1.31252000', '192.162.0.167'),
(6, 11, 1720626106, '03004', '3.93750000', '', '110.00000000', '3.93750000', '192.162.0.167'),
(7, 12, 1720787261, '03001', '0.05250000', '13', '0.00000000', '0.05250000', '192.162.0.167'),
(8, 11, 1720787261, '03002', '0.03150000', '13', '10.00000000', '3.96900000', '192.162.0.167'),
(9, 1, 1720787261, '03003', '0.01050000', '13', '0.00004215', '1.32302000', '192.162.0.167'),
(10, 12, 1720788154, '03001', '0.05000000', '13', '0.00000000', '0.05000000', '192.162.0.167'),
(11, 11, 1720788154, '03002', '0.03000000', '13', '0.00000000', '0.03000000', '192.162.0.167'),
(12, 1, 1720788154, '03003', '0.01000000', '13', '0.00000000', '0.01000000', '192.162.0.167'),
(13, 12, 1720793527, '03001', '0.10000000', '13', '0.00000000', '0.15000000', '192.162.0.167'),
(14, 11, 1720793527, '03002', '0.06000000', '13', '0.00000000', '0.09000000', '192.162.0.167'),
(15, 1, 1720793527, '03003', '0.02000000', '13', '0.00000000', '0.03000000', '192.162.0.167'),
(16, 12, 1720794771, '03005', '0.00000000', '13', '0.00000000', '0.15000000', '192.162.0.167'),
(17, 11, 1720794771, '03006', '0.00000000', '13', '0.00000000', '0.09000000', '192.162.0.167'),
(18, 1, 1720794771, '03007', '0.00000000', '13', '0.00000000', '0.03000004', '192.162.0.167'),
(19, 12, 1720795850, '03005', '0.00000000', '13', '0.00000000', '0.15000000', '192.162.0.167'),
(20, 11, 1720795850, '03006', '0.00000000', '13', '0.00000000', '0.09000000', '192.162.0.167'),
(21, 1, 1720795850, '03007', '0.00000000', '13', '0.00000000', '0.03000004', '192.162.0.167'),
(22, 12, 1721221406, '03005', '0.00000017', '13', '0.00000000', '0.15000017', '192.162.0.167'),
(23, 11, 1721221406, '03006', '0.00000005', '13', '0.00000000', '0.09000005', '192.162.0.167'),
(24, 1, 1721221406, '03007', '0.00000002', '13', '0.00000000', '0.03000006', '192.162.0.167'),
(25, 1, 1721374260, '05001', '0.00213000', '', '0.00787000', '0.03000006', '192.162.0.167'),
(26, 1, 1721395955, '05002', '0.00000000', '', '0.00617000', '0.03000006', '192.162.0.167'),
(27, 1, 1721395982, '05001', '0.00000000', '', '0.00617000', '0.03000006', '192.162.0.167'),
(28, 1, 1721396062, '05001', '0.00340000', '', '0.00277000', '0.03000006', '192.162.0.167'),
(29, 1, 1722521051, '01003', '0.03000000', '', '0.03307000', '0.00000686', '37.78.171.175'),
(30, 1, 1722521081, '01003', '0.00000686', '', '0.03307693', '0.00000000', '37.78.171.175'),
(31, 1, 1723702492, '05001', '0.00000000', '', '0.03307693', '0.00000000', '192.162.0.167'),
(32, 1, 1723702500, '05002', '0.00000000', '', '0.03307693', '0.00000000', '192.162.0.167'),
(33, 1, 1724401574, '05001', '0.00213000', '', '0.03094693', '0.00000000', '192.162.0.167'),
(34, 1, 1724401822, '05002', '0.00000000', '', '0.03094693', '0.00000426', '192.162.0.167');

-- --------------------------------------------------------

--
-- Структура таблицы `users_plans_items`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `users_plans_items`;
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
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `users_referrals`;
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
(1, 0, 0, 0, '0.00000000', '0.00000000', '0.00000000', 'ref', ''),
(5, 1, 0, 0, '0.00000000', '0.00000000', '0.00000000', 'ref', ''),
(6, 1, 0, 0, '0.00000000', '0.00000000', '0.00000000', 'ref', ''),
(7, 1, 0, 0, '0.00000000', '0.00000000', '0.00000000', 'ref', ''),
(11, 1, 0, 0, '0.00000000', '0.00000000', '0.00000000', 'ref', ''),
(12, 11, 1, 0, '0.00000000', '0.00000000', '0.00000000', 'ref', ''),
(13, 12, 11, 1, '0.15000017', '0.09000005', '0.03000002', 'ref', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users_wallets`
--
-- Создание: Фев 12 2024 г., 09:04
--

DROP TABLE IF EXISTS `users_wallets`;
CREATE TABLE `users_wallets` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `qiwi` varchar(15) DEFAULT NULL,
  `payeer` varchar(20) DEFAULT NULL,
  `perfectmoney` varchar(20) DEFAULT NULL,
  `advcash` varchar(20) DEFAULT NULL,
  `bitcoin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_wallets`
--

INSERT INTO `users_wallets` (`user_id`, `qiwi`, `payeer`, `perfectmoney`, `advcash`, `bitcoin`) VALUES
(1, 'srgsrg', 'P1241412412', 'wsrgwrgwrg', '', 'wrgwrgwrg'),
(2, NULL, NULL, NULL, NULL, ''),
(3, NULL, NULL, NULL, NULL, ''),
(4, NULL, NULL, NULL, NULL, ''),
(5, NULL, NULL, NULL, NULL, ''),
(6, NULL, NULL, NULL, NULL, ''),
(7, NULL, NULL, NULL, NULL, ''),
(8, NULL, NULL, NULL, NULL, ''),
(9, NULL, NULL, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL, NULL),
(11, NULL, NULL, NULL, NULL, NULL),
(12, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `withdrawal`
--
-- Создание: Янв 29 2024 г., 10:53
--

DROP TABLE IF EXISTS `withdrawal`;
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
-- Дамп данных таблицы `withdrawal`
--

INSERT INTO `withdrawal` (`id`, `user_id`, `paysystem`, `currency`, `wallet`, `amount`, `amount_get`, `date_created`, `date_confirmed`, `fake`, `status`) VALUES
(1, 1, 'payeer', 'RUB', 'P00000', '0.00008892', '375.63000000', 1709820464, 1709820659, 0, 1),
(2, 10, 'payeer', 'RUB', 'P000012', '0.00005000', '211.22000000', 1709820789, 1709820811, 1, 1),
(3, 1, 'payeer', 'RUB', 'P00000', '0.00080012', '3380.01000000', 1720079848, 0, 0, 0),
(4, 1, 'payeer', 'RUB', 'P00000', '0.00001000', '42.24000000', 1720080776, 0, 0, 0),
(5, 1, 'payeer', 'RUB', 'P00000', '0.00001000', '42.24000000', 1720081733, 0, 0, 0),
(6, 1, 'payeer', 'RUB', 'P00000', '0.00001000', '42.24000000', 1720081913, 0, 0, 0),
(7, 1, 'payeer', 'RUB', 'P00000', '0.00001000', '42.24000000', 1720081980, 0, 0, 0),
(8, 1, 'payeer', 'RUB', 'P00000', '0.00001000', '42.24000000', 1720082132, 0, 0, 0),
(9, 1, 'payeer', 'RUB', 'P00000', '0.00001000', '42.24000000', 1720082435, 0, 0, 0);

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
-- Индексы таблицы `game_tiles_sessions`
--
ALTER TABLE `game_tiles_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news_etf`
--
ALTER TABLE `news_etf`
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
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `game_tiles_sessions`
--
ALTER TABLE `game_tiles_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `news_etf`
--
ALTER TABLE `news_etf`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `project_statistics`
--
ALTER TABLE `project_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `reviews_likes`
--
ALTER TABLE `reviews_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `settings_payments`
--
ALTER TABLE `settings_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `surfing`
--
ALTER TABLE `surfing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT для таблицы `surfing_complain`
--
ALTER TABLE `surfing_complain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `surfing_views`
--
ALTER TABLE `surfing_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `tickets_messages`
--
ALTER TABLE `tickets_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `users_credit`
--
ALTER TABLE `users_credit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users_logs`
--
ALTER TABLE `users_logs`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблицы `users_plans_items`
--
ALTER TABLE `users_plans_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `withdrawal`
--
ALTER TABLE `withdrawal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
