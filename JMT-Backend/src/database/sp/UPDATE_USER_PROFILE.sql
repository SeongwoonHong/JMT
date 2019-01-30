-- FUNCTION: public.update_user_profile(character varying, character varying, character varying, text)

-- DROP FUNCTION public.update_user_profile(character varying, character varying, character varying, text);

CREATE OR REPLACE FUNCTION public.update_user_profile(
	_email character varying,
	"_displayName" character varying,
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
	"displayName" = "_displayName",
	password = _password
WHERE email = _email;
END;

$BODY$;

ALTER FUNCTION public.update_user_profile(character varying, character varying, character varying, text)
    OWNER TO seong91;
