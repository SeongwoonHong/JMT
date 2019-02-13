-- FUNCTION: public.get_user_from_user_restaurant(integer, timestamp without time zone, character varying)

-- DROP FUNCTION public.get_user_from_user_restaurant(integer, timestamp without time zone, character varying);

CREATE OR REPLACE FUNCTION public.get_user_from_user_restaurant(
	"_userId" integer,
	"_scheduleDate" timestamp without time zone,
	"_restaurantId" character varying)
    RETURNS TABLE("userId" integer, "scheduleDate" timestamp without time zone, "restaurantId" character varying, "groupId" integer, "restaurantName" character varying) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

DECLARE
BEGIN
RETURN QUERY
SELECT * FROM user_restaurant as ur
WHERE ur."userId" = "_userId"
AND ur."restaurantId" = "_restaurantId"
AND ur."scheduleDate" = "_scheduleDate";

END;

$BODY$;

ALTER FUNCTION public.get_user_from_user_restaurant(integer, timestamp without time zone, character varying)
    OWNER TO seong91;
