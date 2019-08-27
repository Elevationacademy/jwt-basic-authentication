CREATE DATABASE users_auth;

USE users_auth;

CREATE TABLE users (
  user_id int(5) NOT NULL,
  username varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  email varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  password varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO users (user_id, username, email, password) VALUES
(8953, 'omerico', 'omer.moradd@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(8954, 'finn-doyle', 'finn-doyle@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(8955, 'vernice-heathcote', 'vernice-heathcote@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(8956, 'horace-bahringer', 'horace-bahringer@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(8957, 'pietro-wiza', 'pietro-wiza@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
(8958, 'vance-turner', 'vance-turner@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b');

ALTER TABLE profiles
  ADD UNIQUE KEY user_id (user_id);

ALTER TABLE users
  ADD PRIMARY KEY (user_id),
  ADD UNIQUE KEY username (username),
  ADD UNIQUE KEY email (email);

ALTER TABLE users
  MODIFY user_id int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9052;
