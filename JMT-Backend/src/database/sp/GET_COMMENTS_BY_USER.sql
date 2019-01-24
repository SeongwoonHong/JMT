CREATE OR REPLACE FUNCTION public.get_comments_by_user(IN "_userId" integer)
    RETURNS TABLE("id" integer, "groupId" integer, userId integer, content character varying, date date)
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
	WHERE c.userId = "_userId";
	
END;

$BODY$;

ALTER FUNCTION public.get_comments_by_user(integer)
    OWNER TO seong91;