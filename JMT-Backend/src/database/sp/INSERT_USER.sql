-- FUNCTION: public.insert_user(character varying, character varying, character varying, text)

-- DROP FUNCTION public.insert_user(character varying, character varying, character varying, text);

CREATE OR REPLACE FUNCTION public.insert_user(
	"displayName" character varying,
	password character varying,
	email character varying,
	avatar text DEFAULT NULL::text)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
INSERT INTO USERS
("displayName", password, email, avatar)
VALUES ("displayName", password, email, avatar);
END;

$BODY$;

ALTER FUNCTION public.insert_user(character varying, character varying, character varying, text)
    OWNER TO seong91;
