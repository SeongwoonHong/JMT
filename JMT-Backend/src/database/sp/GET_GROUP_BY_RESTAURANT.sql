-- FUNCTION: public.get_group_by_restaurant(integer, timestamp without time zone, character varying, character varying)

-- DROP FUNCTION public.get_group_by_restaurant(integer, timestamp without time zone, character varying, character varying);

CREATE OR REPLACE FUNCTION public.get_group_by_restaurant(
	"_userId" integer,
	_date timestamp without time zone,
	"_restaurantId" character varying,
	"_restaurantName" character varying)
    RETURNS TABLE(id integer, date timestamp without time zone, "categoryId" integer, "restaurantId" character varying, "restaurantName" character varying) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

DECLARE
BEGIN
RETURN QUERY
SELECT * FROM groups as g
WHERE g."date" = "_date"
AND g."restaurantId" = "_restaurantId"
AND g."restaurantName" = "_restaurantName";

END;

$BODY$;

ALTER FUNCTION public.get_group_by_restaurant(integer, timestamp without time zone, character varying, character varying)
    OWNER TO seong91;
