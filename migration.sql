DROP TABLE IF EXISTS pets;  

CREATE TABLE pets (
    id SERIAL, 
    name TEXT, 
    kind TEXT, 
    age INTEGER
); 

INSERT INTO pets (name, kind, age)
    values ('bubbles','fish', 7); 
INSERT INTO pets (name, kind, age)
    values ('bob','duck', 4);
INSERT INTO pets (name, kind, age)
    values ('fido','dog', 3);  

Select * FROM pets; 