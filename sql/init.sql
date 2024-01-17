\copy public.user (username, email, phone_number, role) from '/Users/tandrewlopez/Downloads/csv/crm_app_users.csv' DELIMITER ',' CSV HEADER;

\copy public.submission (name, author_id, status, email, phone_number, preferred_pronouns, size, placement, color, description) from '/Users/tandrewlopez/Downloads/csv/crm_app_submissions.csv' DELIMITER ',' CSV HEADER;

\copy public.deposit (email, amount, client_id, owner_id, created_at) from '/Users/tandrewlopez/Downloads/csv/crm_app_deposits.csv' DELIMITER ',' CSV HEADER;

\copy public.favorite (label, user_id, submission_id, created_at) from '/Users/tandrewlopez/Downloads/csv/crm_app_favorites.csv' DELIMITER ',' CSV HEADER;