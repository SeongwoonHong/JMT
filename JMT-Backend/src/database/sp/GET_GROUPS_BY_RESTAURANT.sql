-- FUNCTION: public.get_groups_by_restaurant(character varying)

-- DROP FUNCTION public.get_groups_by_restaurant(character varying);

CREATE OR REPLACE FUNCTION public.get_groups_by_restaurant(
	"_restaurantId" character varying)
    RETURNS TABLE(id integer, date timestamp without time zone, "restaurantId" character varying, "restaurantName" character varying, "groupCount" bigint) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

BEGIN
	RETURN QUERY
	
	SELECT gr.id, gr.date, gr."restaurantId", gr."restaurantName", count(ug."userId")
	FROM groups as gr
	JOIN user_group as ug
	ON ug."groupId" = gr.id
	WHERE gr."restaurantId" = "_restaurantId"
	GROUP BY gr.id, gr.date, gr."restaurantId", gr."restaurantName"
	ORDER BY date ASC;
	
END;

$BODY$;

ALTER FUNCTION public.get_groups_by_restaurant(character varying)
    OWNER TO seong91;
