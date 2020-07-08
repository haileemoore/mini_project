--creates table
CREATE DATABASE requestemojis;

--create emoji table
CREATE TABLE emojis(
  id serial primary KEY,
  name varchar(75),
  referenceimg varchar(300),
  description varchar(500)
);

--OPTIONAL - test Data
INSERT INTO emojis( name, referenceimg, description) 
  VALUES ('the_gopnik', 'https://upload.wikimedia.org/wikipedia/commons/7/79/%D0%93%D0%BE%D0%BF%D0%BD%D0%B8%D0%BA.jpg', 'member of slavic youth subculture');