CREATE OR REPLACE FUNCTION public.get_groups_by_restaurant(IN "_restaurantId" character varying)
    RETURNS TABLE(id integer, date date, categoryid integer, restaurantid character varying, restaurantname character varying)
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100    ROWS 1000 
AS $BODY$  
DECLARE

BEGIN
	RETURN QUERY
	SELECT 
		gr."id",
		gr."date",
		gr.categoryId,
		gr.restaurantId,
		gr.restaurantName
	FROM groups as gr
	WHERE gr.restaurantId = "_restaurantId";
	
END;

$BODY$;

ALTER FUNCTION public.get_groups_by_restaurant(character varying)
    OWNER TO seong91;