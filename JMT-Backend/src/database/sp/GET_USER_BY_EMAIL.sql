-- FUNCTION: public.get_user_by_email(character varying)

-- DROP FUNCTION public.get_user_by_email(character varying);

CREATE OR REPLACE FUNCTION public.get_user_by_email(
	_email character varying)
    RETURNS TABLE(user_id integer, display_name character varying, password character varying, email character varying, avatar character varying, verified boolean, signup_date date) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

DECLARE
BEGIN
RETURN QUERY
SELECT * FROM USERS u
WHERE u.email = _email;
END;

$BODY$;

ALTER FUNCTION public.get_user_by_email(character varying)
    OWNER TO seong91;
