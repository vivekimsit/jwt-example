create table movie (
  id serial primary key,
  title varchar(64),
  format varchar(20),
  release_date date not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

