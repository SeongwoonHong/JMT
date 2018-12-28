-- FUNCTION: public.delete_user(integer)

-- DROP FUNCTION public.delete_user(integer);

CREATE OR REPLACE FUNCTION public.delete_user(
	"_userId" integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
DELETE FROM USERS
WHERE "userId" = "_userId";
END;

$BODY$;

ALTER FUNCTION public.delete_user(integer)
    OWNER TO seong91;
