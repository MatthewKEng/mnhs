--first time table is created will have to hard code the admin user BOOLEAN value as true
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(80) UNIQUE NOT NULL,
password varchar(120) NOT NULL,
admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE departments (
id SERIAL PRIMARY KEY,
department varchar(120) NOT NULL
);

--url is the url of the image on s3
CREATE TABLE images (
id SERIAL PRIMARY KEY,
url_image varchar(1000) NOT NULL,
department_id int NOT NULL
);

--url is the url of the brand on s3
CREATE TABLE brands (
id SERIAL PRIMARY KEY,
url_brand varchar(1000) NOT NULL,
department_id int NOT NULL
);

--only users with admin value of true have access to this table
CREATE TABLE admin_comments (
id SERIAL PRIMARY KEY,
comment varchar(500),
user_id int NOT NULL,
submission_id int NOT NULL
);

CREATE TABLE user_comments (
id SERIAL PRIMARY KEY,
comment varchar(500),
user_id int NOT NULL,
submition_id int NOT NULL
);

CREATE TABLE submissions (
id SERIAL PRIMARY KEY,
saved_edit varchar(5000),
status varchar(120),
user_id int NOT NULL,
department_id int,
image_id int,
brand_id int
);

CREATE TABLE access (
id SERIAL PRIMARY KEY,
user_id int NOT NULL,
alexander_ramsey_house BOOLEAN DEFAULT FALSE,
birch_coulee_battlefield BOOLEAN DEFAULT FALSE,
charles_a_lindbergh_historic_site BOOLEAN DEFAULT FALSE,
comstock_house BOOLEAN DEFAULT FALSE,
folsom_house BOOLEAN DEFAULT FALSE,
fort_ridgely BOOLEAN DEFAULT FALSE,
harkin_store BOOLEAN DEFAULT FALSE,
historic_forestville BOOLEAN DEFAULT FALSE,
historic_fort_snelling BOOLEAN DEFAULT FALSE,
james_j_hill_house BOOLEAN DEFAULT FALSE,
jeffers_petroglyphs BOOLEAN DEFAULT FALSE,
lac_qui_parle_mission BOOLEAN DEFAULT FALSE,
lower_sioux_agency BOOLEAN DEFAULT FALSE,
marine_mill BOOLEAN DEFAULT FALSE,
mill_city_museum BOOLEAN DEFAULT FALSE,
mille_lacs_indian_museum BOOLEAN DEFAULT FALSE,
minnehaha_depot BOOLEAN DEFAULT FALSE,
minnesota_history_center BOOLEAN DEFAULT FALSE,
gale_family_library BOOLEAN DEFAULT FALSE,
minnesota_state_capitol BOOLEAN DEFAULT FALSE,
north_west_company_fur_post BOOLEAN DEFAULT FALSE,
oliver_kelley_farm BOOLEAN DEFAULT FALSE,
sibley_historic_site BOOLEAN DEFAULT FALSE,
split_rock_lighthouse BOOLEAN DEFAULT FALSE,
traverse_des_sioux BOOLEAN DEFAULT FALSE,
w_w_mayo_house BOOLEAN DEFAULT FALSE
);
