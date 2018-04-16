-- GWAT Simple Task--
-- Author: Adrian Palenzuela --
-- Date: 14/04/18 --


-- Database
DROP DATABASE IF EXISTS `gwat-simple-task`;
CREATE DATABASE `gwat-simple-task`;
USE `gwat-simple-task`;

-- Post Table
CREATE TABLE `Post` (
  `id` INT(100) NOT NULL  AUTO_INCREMENT, 
  `title` varchar(200) NOT NULL,
  `body` varchar(1000) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subject` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;
ALTER TABLE `Post` ADD INDEX(`category_id`);


-- Category Table 
CREATE TABLE `Category` ( 
	`id` INT(11) NOT NULL  AUTO_INCREMENT, 
	`name` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`)
);


-- Category Foreign Key
ALTER TABLE `Post` ADD CONSTRAINT `fk_category_post_category_id` 
FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;



-- View to Retrieve both Post and its Category
CREATE VIEW Posts AS
SELECT p.id, p.title, p.body, p.subject, c.name AS category
FROM Post p
INNER JOIN Category c ON c.id = p.category_id;






-- Data
INSERT INTO Category(name) VALUES ('Lifestyle');
INSERT INTO Category(name) VALUES ('Travel');
INSERT INTO Category(name) VALUES ('Video');
INSERT INTO Post(title, body, category_id, subject) VALUES ('Global Work and Travel', 'Talk about a clean and fresh design. Personally one of my favourite websites out there.', 2, 'https://globalworkandtravel.com');
INSERT INTO Post(title, body, category_id) VALUES ('Google', 'I find everything here. Amazing.', 3);
