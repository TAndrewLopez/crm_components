drop table if exists submission;
drop type if exists color;

create type color_options as enum ('black and grey', 'color');

create table submission (
	id serial primary key,
	name varchar(255),
	email varchar(255),
	phone_number varchar(255),
	preferred_pronouns varchar(255),
	description text,
	size varchar(255),
	placement varchar(255),
	color varchar(255)
);

\copy public.submission (name, email, phone_number, preferred_pronouns, description, size, placement, color) from '/Users/tandrewlopez/git-dev/crm_components/csv/initial_submissions.csv' DELIMITER ',' CSV HEADER;

select * from submission;