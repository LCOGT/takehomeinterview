drop table if exists planets;
create table planets (
    planet_id integer primary key autoincrement,
    ordinality integer,
    name text,
    size float,
    distance float,
    description text
);