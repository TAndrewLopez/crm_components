\copy public.submission (name, email, phone_number, preferred_pronouns, description, size, placement, color) from '/Users/tandrewlopez/Downloads/initial_submissions.csv' DELIMITER ',' CSV HEADER;

select Count(id) from public.submission;