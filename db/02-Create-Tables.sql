drop TABLE girisler ;
CREATE TABLE girisler (
    id SERIAL PRIMARY KEY,
    tarih DATE not null,
    miktar numeric(10, 2) not null
);

CREATE TABLE harcama_turu (
    id SERIAL PRIMARY KEY,
    tur varchar(250) not null
);

drop TABLE cikislar ;

CREATE TABLE cikislar (
    id SERIAL PRIMARY KEY,
    tarih DATE not null,
    tur int not null,
    miktar numeric(10, 2) not null,
    FOREIGN KEY(tur) REFERENCES harcama_turu(id)
);