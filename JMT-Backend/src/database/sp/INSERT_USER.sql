-- FUNCTION: public.insert_user(character varying, character varying, character varying, character varying)

-- DROP FUNCTION public.insert_user(character varying, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.insert_user(
	display_name character varying,
	password character varying,
	email character varying,
	avatar character varying DEFAULT NULL::character varying)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
INSERT INTO USERS
(display_name, password, email, avatar)
VALUES (display_name, password, email, avatar);
END;

$BODY$;

ALTER FUNCTION public.insert_user(character varying, character varying, character varying, character varying)
    OWNER TO seong91;
