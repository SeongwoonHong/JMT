-- FUNCTION: public.delete_user(integer)

-- DROP FUNCTION public.delete_user(integer);

CREATE OR REPLACE FUNCTION public.delete_user(
	_user_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
DELETE FROM USERS
WHERE user_id = _user_id;
END;

$BODY$;

ALTER FUNCTION public.delete_user(integer)
    OWNER TO seong91;
