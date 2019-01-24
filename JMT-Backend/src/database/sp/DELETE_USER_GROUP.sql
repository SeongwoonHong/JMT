CREATE OR REPLACE FUNCTION public.delete_user_group(
	"_userId" integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
DELETE FROM USER_GROUP
WHERE "userId" = "_userId";
END;

$BODY$;

ALTER FUNCTION public.delete_user_group(integer)
    OWNER TO seong91;
