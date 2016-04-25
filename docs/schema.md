# Schema Information

## gym sessions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
muscles     | string    | not null
time        | date      | not null
user_id     | integer   | not null, foreign key (references users), indexed
gym_id      | integer   | not null, foreign key (references notebooks), indexed

## gyms
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
home_city_id| integer   | not null, foreign key (references notebooks), indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
gym_session_id| integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
