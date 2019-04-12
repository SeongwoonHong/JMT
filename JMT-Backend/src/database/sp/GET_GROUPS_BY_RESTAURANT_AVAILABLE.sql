	
	CREATE OR REPLACE FUNCTION public.get_groups_by_restaurant_available(IN "_restaurantId" character varying)
    RETURNS TABLE("id" integer, "date" timestamp without time zone, "restaurantId" character varying, "restaurantName" character varying, "userCount" bigint)
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100    ROWS 1000 
AS $BODY$  
DECLARE

BEGIN
	RETURN QUERY
	SELECT gr."id", gr."date", gr."restaurantId", gr."restaurantName", count(ug."userId")
	FROM "groups" as gr
	JOIN user_group as ug
	ON ug."groupId" = gr."id"
	WHERE gr."restaurantId" = "_restaurantId" and gr."date" > CURRENT_TIMESTAMP
	GROUP BY gr."id", gr."date", gr."restaurantId", gr."restaurantName"
	ORDER BY date ASC;
	
END;

$BODY$;

ALTER FUNCTION public.get_groups_by_restaurant(character varying)
    OWNER TO seong91;
