CREATE OR REPLACE FUNCTION public.update_comment(
	"_id" integer,
	"_content" character varying,
	"_date" timestamp without time zone)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
UPDATE COMMENTS
SET
	"content" = "_content",
	"date" = "_date"
WHERE "id" = "_id";
END;

$BODY$;

ALTER FUNCTION public.update_comment(integer, character varying, timestamp without time zone)
    OWNER TO seong91;
