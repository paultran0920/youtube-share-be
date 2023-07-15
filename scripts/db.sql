CREATE DATABASE youtube-share-db
    WITH
    OWNER = yeah_user
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `email` text NOT NULL,
  `password` text NOT NULL,
  `status` text NOT NULL,
  `role` text NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` text NOT NULL,
  `contact` text NOT NULL,
  `avatar` text,
  `account_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a39874be76793f8a9be22dcf4d` (`account_id`),
  CONSTRAINT `FK_a39874be76793f8a9be22dcf4df` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
);

-- Default password: Abc@123456
INSERT INTO `account` VALUES ('admin-acount-1','2022-12-11 10:10:29.155547','2022-12-27 07:17:44.000000','super.admin@gmail.com','$2b$10$X5LqgWCqBD4ENxD7C7CVeOUsN.SmqB.xabuGZG5i9kXRCsaJmj58m','Activated','Admin');
INSERT INTO `profile` VALUES ('admin-profile-1','2022-12-11 10:10:29.188080','2022-12-26 02:26:56.000000','Super Admin','+841234566','','admin-acount-1');
