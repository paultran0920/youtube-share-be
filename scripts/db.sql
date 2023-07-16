CREATE DATABASE `youtube-share-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(2048) DEFAULT NULL,
  `account_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a39874be76793f8a9be22dcf4d` (`account_id`),
  CONSTRAINT `FK_a39874be76793f8a9be22dcf4df` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `youtube` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `video_id` varchar(255) NOT NULL,
  `url` varchar(2048) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `thumbnail_url` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Default password: Abc@123456
INSERT INTO `account` VALUES ('admin-acount-1','2022-12-11 10:10:29.155547','2022-12-27 07:17:44.000000','super.admin@gmail.com','$2b$10$X5LqgWCqBD4ENxD7C7CVeOUsN.SmqB.xabuGZG5i9kXRCsaJmj58m','Activated','Admin');
INSERT INTO `account` VALUES('0f55ba2e-eeeb-4ed8-9a76-2e1130570e34', '2023-07-16 09:49:14.156136', '2023-07-16 09:49:14.156136', 'paul.tran.user.1@gmail.com', '$2b$10$eXsTKx3kmkdQT7J0XraEseTKCDrzz4mMHbkPcZzVNi9M8WpLE51XS', 'Activated', 'User');
INSERT INTO `account` VALUES('4e66529c-be91-48f7-a966-9a8bbace8645', '2023-07-16 09:49:00.036866', '2023-07-16 09:49:00.036866', 'paul.tran.user@gmail.com', '$2b$10$0/8yjfBA1dom3d2HLE/lFeNPHndiSiSQb/ohgh3ddJaBkS13x3tHi', 'Activated', 'User');

INSERT INTO `profile` VALUES ('admin-profile-1','2022-12-11 10:10:29.188080','2022-12-26 02:26:56.000000','Super Admin','+841234566','','admin-acount-1');
INSERT INTO `profile`
VALUES('0801a2ac-940c-4bd8-b15b-c7a60415b4a8', '2023-07-16 09:49:14.183511', '2023-07-16 09:51:38.466442', 'Paul Tran User 1', '12355667899', NULL, '0f55ba2e-eeeb-4ed8-9a76-2e1130570e34');
INSERT INTO `profile`
VALUES('dccb4325-e5b0-4c7a-8fe9-e0dc59364c28', '2023-07-16 09:49:00.057927', '2023-07-16 09:49:00.057927', 'Paul Tran User', '12355667899', NULL, '4e66529c-be91-48f7-a966-9a8bbace8645');
