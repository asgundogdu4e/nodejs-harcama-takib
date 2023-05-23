$ sudo su - postgres
$ psql 
                                                                
Create Role u_harcama 	with login CREATEDB CREATEROLE encrypted password 'kHcLeE42!';
ALTER USER u_harcama 	SET timezone = 'Europe/Istanbul';
ALTER USER u_harcama   WITH PASSWORD 'kHcLeE42!';


CREATE DATABASE db_harcama 
        WITH OWNER u_harcama
	TEMPLATE template0 
	ENCODING 'UTF-8' 
	LC_COLLATE 'tr_TR.UTF-8' 
	LC_CTYPE = 'tr_TR.UTF-8';


ALTER DATABASE postgres SET timezone TO 'Asia/Istanbul';

ALTER DATABASE db_harcama SET timezone TO 'Asia/Istanbul';
update pg_settings set setting = 'Asia/Istanbul' where name = 'TimeZone' ;

grant all privileges on database db_harcama to u_harcama;

\connect db_harcama

Create schema sch_harcama;
ALTER  schema sch_harcama OWNER TO u_harcama;
ALTER  ROLE   u_harcama   SET search_path = sch_harcama;


SELECT sum(numbackends) FROM pg_stat_database WHERE datname is not null; 
SELECT count(*) FROM pg_stat_activity WHERE datname is not null;

SELECT * FROM pg_stat_database WHERE datname is not null
;
SELECT client_addr, count(*) FROM pg_stat_activity WHERE datname is not null 

group by client_addr
order by client_addr
;

/*
psql -h localhost -p 5432 -U postgres -W postgres
psql -h localhost -p 5432 -U u_harcama -W db_harcama
psql -h localhost -p 5432 -U u_mpls -W db_harcama
psql -h localhost -p 5432 -U u_movie -W db_harcama

--Restore
psql -h localhost -p 5432 -U u_harcama -W db_harcama -a -f myInsertFile
*/

