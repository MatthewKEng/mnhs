--first time table is created will have to hard code the admin user BOOLEAN value as true
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(80) UNIQUE NOT NULL,
password varchar(120) NOT NULL,
admin BOOLEAN NOT NULL
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
alexander_ramsey_house BOOLEAN NOT NULL,
birch_coulee_battlefield BOOLEAN NOT NULL,
charles_a_lindbergh_historic_site BOOLEAN NOT NULL,
comstock_house BOOLEAN NOT NULL,
folsom_house BOOLEAN NOT NULL,
fort_ridgely BOOLEAN NOT NULL,
harkin_store BOOLEAN NOT NULL,
historic_forestville BOOLEAN NOT NULL,
historic_fort_snelling BOOLEAN NOT NULL,
james_j_hill_house BOOLEAN NOT NULL,
jeffers_petroglyphs BOOLEAN NOT NULL,
lac_qui_parle_mission BOOLEAN NOT NULL,
lower_sioux_agency BOOLEAN NOT NULL,
marine_mill BOOLEAN NOT NULL,
mill_city_museum BOOLEAN NOT NULL,
mille_lacs_indian_museum BOOLEAN NOT NULL,
minnehaha_depot BOOLEAN NOT NULL,
minnesota_history_center BOOLEAN NOT NULL,
gale_family_library BOOLEAN NOT NULL,
minnesota_state_capitol BOOLEAN NOT NULL,
north_west_company_fur_post BOOLEAN NOT NULL,
oliver_kelley_farm BOOLEAN NOT NULL,
sibley_historic_site BOOLEAN NOT NULL,
split_rock_lighthouse BOOLEAN NOT NULL,
traverse_des_sioux BOOLEAN NOT NULL,
w_w_mayo_house BOOLEAN NOT NULL
);
