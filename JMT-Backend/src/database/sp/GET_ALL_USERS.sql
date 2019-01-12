-- FUNCTION: public.get_all_users()

-- DROP FUNCTION public.get_all_users();

CREATE OR REPLACE FUNCTION public.get_all_users(
	)
    RETURNS TABLE("userId" integer, "displayName" character varying, password character varying, email character varying, "profilePicture" text, "signupDate" date) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

DECLARE
users users_type;
BEGIN
RETURN QUERY
SELECT * FROM users;
END;

$BODY$;

ALTER FUNCTION public.get_all_users()
    OWNER TO seong91;
