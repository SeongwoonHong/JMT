-- FUNCTION: public.insert_user(character varying, character varying, character varying, text)

-- DROP FUNCTION public.insert_user(character varying, character varying, character varying, text);

CREATE OR REPLACE FUNCTION public.insert_user(
	"displayName" character varying,
	password character varying,
	email character varying,
	"profilePicture" text DEFAULT NULL::text)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
INSERT INTO USERS
("displayName", password, email, "profilePicture")
VALUES ("displayName", password, email, "profilePicture");
END;

$BODY$;

ALTER FUNCTION public.insert_user(character varying, character varying, character varying, text)
    OWNER TO seong91;
