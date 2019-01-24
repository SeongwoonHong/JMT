CREATE OR REPLACE FUNCTION public.delete_comment(
	"_id" integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
DELETE FROM COMMENTS
WHERE "id" = "_id";
END;

$BODY$;

ALTER FUNCTION public.delete_comment(integer)
    OWNER TO seong91;
