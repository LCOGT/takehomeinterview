drop table if exists planets;
create table planets (
    planet_id integer primary key autoincrement,
    ordinality int,
    planet_name text,
    size real,
    distance real,
    description text,
    constraint unique_planet_name UNIQUE (planet_name),
    constraint unique_ordinality UNIQUE (ordinality)
);