DROP DATABASE IF EXISTS character_sheet_db;
CREATE DATABASE character_sheet_db;
\c character_sheet_db;

CREATE TABLE users(
    id INT,
    username VARCHAR(120),
    password TEXT,
    campaigns_id INT[],
    characters_id INT[],
    current_campaign VARCHAR(80)
);

CREATE TABLE campaigns(
    id SERIAL PRIMARY KEY,
    name VARCHAR(80),
    password VARCHAR(6),
    characters_id INT[],
    dm_id INT
);