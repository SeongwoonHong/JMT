create table if not exists users
(
	"userId" serial not null
		constraint users_pkey
			primary key,
	"displayName" varchar(20) not null,
	password varchar(100) not null,
	email varchar(25) not null
		constraint users_email_key
			unique,
	avatar text,
	"signupDate" date default CURRENT_DATE
);

alter table users owner to seong91;

create table if not exists restaurants
(
	id serial not null
		constraint "Restaurant_pkey"
			primary key,
	name varchar(100) not null,
	"imageUrl" varchar(200),
	"locationId" bigint,
	"displayPhone" varchar(20),
	"restaurantId" varchar,
	rating double precision,
	latitude double precision,
	longitude double precision
);

alter table restaurants owner to seong91;

create table if not exists user_restaurant
(
	"userId" serial not null,
	"scheduleDate" timestamp(4),
	"restaurantId" varchar(40),
	"groupId" integer not null
);

alter table user_restaurant owner to seong91;

create table if not exists groups
(
	id integer,
	date timestamp(4) not null,
	"categoryId" integer not null,
	"restaurantId" varchar(40) not null,
	"restaurantName" varchar(200) not null
);

alter table groups owner to seong91;

create table if not exists user_group
(
	"userId" integer not null,
	"groupId" integer not null
);

alter table user_group owner to seong91;

create table if not exists comments
(
	id integer not null
		constraint comments_pkey
			primary key,
	"groupId" integer not null,
	"userId" integer not null,
	content varchar(200) not null,
	date timestamp(4) not null
);

alter table comments owner to seong91;

