-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.11.7-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para moonlight
CREATE DATABASE IF NOT EXISTS `moonlight` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `moonlight`;

-- Copiando estrutura para tabela moonlight.mission
CREATE TABLE IF NOT EXISTS `mission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_creator` int(11) DEFAULT NULL,
  `id_rocket` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_mission_users_creator` (`id_creator`),
  KEY `FK_mission_rocket` (`id_rocket`),
  CONSTRAINT `FK_mission_rocket` FOREIGN KEY (`id_rocket`) REFERENCES `rocket` (`id`),
  CONSTRAINT `FK_mission_users_creator` FOREIGN KEY (`id_creator`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela moonlight.mission: ~0 rows (aproximadamente)
DELETE FROM `mission`;

-- Copiando estrutura para tabela moonlight.missionastronaut
CREATE TABLE IF NOT EXISTS `missionastronaut` (
  `id_mission` int(11) DEFAULT NULL,
  `id_astronaut` int(11) DEFAULT NULL,
  KEY `FK_missionAstronaut_mission` (`id_mission`),
  KEY `FK_missionAstronaut_users` (`id_astronaut`),
  CONSTRAINT `FK_missionAstronaut_mission` FOREIGN KEY (`id_mission`) REFERENCES `mission` (`id`),
  CONSTRAINT `FK_missionAstronaut_users` FOREIGN KEY (`id_astronaut`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela moonlight.missionastronaut: ~0 rows (aproximadamente)
DELETE FROM `missionastronaut`;

-- Copiando estrutura para tabela moonlight.rocket
CREATE TABLE IF NOT EXISTS `rocket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_creator` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` blob DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_rocket_users_creator` (`id_creator`),
  CONSTRAINT `FK_rocket_users_creator` FOREIGN KEY (`id_creator`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela moonlight.rocket: ~0 rows (aproximadamente)
DELETE FROM `rocket`;

-- Copiando estrutura para tabela moonlight.userpassword
CREATE TABLE IF NOT EXISTS `userpassword` (
  `id` int(11) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_userPassword_users` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela moonlight.userpassword: ~0 rows (aproximadamente)
DELETE FROM `userpassword`;

-- Copiando estrutura para tabela moonlight.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_creator` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `type_user` varchar(20) DEFAULT NULL,
  `image` blob DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela moonlight.users: ~0 rows (aproximadamente)
DELETE FROM `users`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
