CREATE OR REPLACE FUNCTION public.get_groups_by_user(IN "_userId" integer)
    RETURNS TABLE("id" integer, "date" date, "categoryId" integer, "restaurantId" character varying, "restaurantName" character varying)
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
AS $BODY$ 
DECLARE

BEGIN
	RETURN QUERY
	SELECT 
		gr."id",
		gr."date",
		gr."categoryId",
		gr."restaurantId",
		gr."restaurantName"
	FROM groups as gr
	JOIN user_group ug
	ON gr."groupId" = ug."groupId"
	WHERE ug."userId" = "_userId";
	
END;

$BODY$;

ALTER FUNCTION public.get_groups_by_user(integer)
    OWNER TO seong91;
