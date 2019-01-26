-- FUNCTION: public.update_password(character varying, character varying)

-- DROP FUNCTION public.update_password(character varying, character varying);

CREATE OR REPLACE FUNCTION public.update_password(
	_email character varying,
	_password character varying)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
UPDATE USERS
SET
	password = _password
WHERE email = _email;
END;

$BODY$;

ALTER FUNCTION public.update_password(character varying, character varying)
    OWNER TO seong91;
