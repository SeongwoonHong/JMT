CREATE OR REPLACE FUNCTION public.get_group(IN "_id" integer)
    RETURNS TABLE("id" integer, "date" date, categoryId integer, restaurantId character varying, restaurantName character varying)
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
	WHERE gr.id = "_id";
	
END;

$BODY$;

ALTER FUNCTION public.get_group(integer)
    OWNER TO seong91;