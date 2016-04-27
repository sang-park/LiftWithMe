# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
gym_id          | string    | foreign key (references gym), indexed

## home_city
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
city            | string    | not null

## gyms
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
name         | string    | not null
home_city_id | integer   | not null, foreign key (references home_city), indexed

## workouts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
date        | date      | not null
time        | time      | not null
user_id     | integer   | not null, foreign key (references users), indexed

## exercises
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## workout_exercises
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
workout_id      | integer   | not null, foreign key (references workouts), indexed
exercise_id     | integer   | not null, foreign key (references exercises), indexed

## muscles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## muscle taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
workouts_id | integer   | not null, foreign key (references workouts), indexed, unique [muscle_id]
muscle_id   | integer   | not null, foreign key (references muscles), indexed

## friends
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
friend_id   | integer   | not null, foreign key (references users), indexed
