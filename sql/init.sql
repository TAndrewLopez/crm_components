\copy public.user (first_name, last_name, username, email, role, phone_number, image_url, birthday) from '/Users/tandrewlopez/Downloads/csv/crm_app_users.csv' DELIMITER ',' CSV HEADER;

\copy public.submission (user_id, status, name, email, phone_number, preferred_pronouns, size, placement, color, description) from '/Users/tandrewlopez/Downloads/csv/crm_app_submissions.csv' DELIMITER ',' CSV HEADER;

\copy public.bookmark (owner_id, submission_id, label, status) from '/Users/tandrewlopez/Downloads/csv/crm_app_bookmarks.csv' DELIMITER ',' CSV HEADER;

\copy public.deposit (paid_to_id, email, amount, status, client_id) from '/Users/tandrewlopez/Downloads/csv/crm_app_deposits.csv' DELIMITER ',' CSV HEADER;