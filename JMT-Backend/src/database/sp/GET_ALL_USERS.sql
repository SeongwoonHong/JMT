-- FUNCTION: public.get_all_users()

-- DROP FUNCTION public.get_all_users();

CREATE OR REPLACE FUNCTION public.get_all_users(
	)
    RETURNS TABLE(
      user_id integer,
      display_name character varying,
      password character varying,
      email character varying,
      avatar text,
      verified boolean,
      signup_date date
    )
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
