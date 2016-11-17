CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(80) UNIQUE NOT NULL,
password varchar(120) NOT NULL
);
