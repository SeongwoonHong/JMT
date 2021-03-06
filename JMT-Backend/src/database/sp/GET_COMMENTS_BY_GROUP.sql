CREATE OR REPLACE FUNCTION public.get_comments_by_group(IN "_groupId" integer)
    RETURNS TABLE("id" integer, "groupId" integer, "userId" integer, "content" character varying, "date" date)
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
AS $BODY$ 
DECLARE

BEGIN
	RETURN QUERY
	SELECT 
		c."id",
		c."groupId",
		c."userId",
		c."content",
		c."date"
	FROM comments as c
	WHERE c."groupId" = "_groupId";
	
END;

$BODY$;

ALTER FUNCTION public.get_comments_by_group(integer)
    OWNER TO seong91;
