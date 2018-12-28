-- FUNCTION: public.insert_user_restaurant(integer, character varying, timestamp without time zone)

-- DROP FUNCTION public.insert_user_restaurant(integer, character varying, timestamp without time zone);

CREATE OR REPLACE FUNCTION public.insert_user_restaurant(
	"_userId" integer,
	"_restaurantId" character varying,
	"_scheduleDate" timestamp without time zone)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
	INSERT INTO user_restaurant
	(
		"userId",
		"restaurantId",
		"scheduleDate"
	)
	VALUES
	(
		"_userId",
		"_restaurantId",
		"_scheduleDate"
	);
	
END;

$BODY$;

ALTER FUNCTION public.insert_user_restaurant(integer, character varying, timestamp without time zone)
    OWNER TO seong91;
