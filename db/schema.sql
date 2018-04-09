/* See:  http://flask.pocoo.org/docs/0.12/tutorial/schema/ */
drop table if exists planets;
create table planets (
planet_id integer primary key autoincrement,
ordinality int,
planet_name text,
size real,
distance real,
description text,
constraint unique_ordinality UNIQUE (ordinality),
constraint unique_planet_name UNIQUE (planet_name),
);