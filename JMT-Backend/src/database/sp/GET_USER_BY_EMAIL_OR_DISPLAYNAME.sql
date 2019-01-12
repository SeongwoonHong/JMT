-- FUNCTION: public.get_user_by_email_or_displayname(character varying)

-- DROP FUNCTION public.get_user_by_email_or_displayname(character varying);

CREATE OR REPLACE FUNCTION public.get_user_by_email_or_displayname(
	_text character varying)
    RETURNS TABLE("userId" integer, "displayName" character varying, password character varying, email character varying, avatar text, "signupDate" date) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

DECLARE
BEGIN
RETURN QUERY
	SELECT * FROM USERS u
	WHERE u.email = _text OR u."displayName" = _text;
END;

$BODY$;

ALTER FUNCTION public.get_user_by_email_or_displayname(character varying)
    OWNER TO seong91;
