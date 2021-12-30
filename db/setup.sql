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