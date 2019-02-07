-- FUNCTION: public.insert_join_restaurant(integer, timestamp without time zone, character varying, character varying)

-- DROP FUNCTION public.insert_join_restaurant(integer, timestamp without time zone, character varying, character varying);

CREATE OR REPLACE FUNCTION public.insert_join_restaurant(
	"_userId" integer,
	_date timestamp without time zone,
	"_restaurantId" character varying,
	"_restaurantName" character varying)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

 
DECLARE
BEGIN
	INSERT INTO groups
	(
		"date",
		"categoryId",
		"restaurantId",
		"restaurantName"
	)
	VALUES
	(
		"_date",
		1,
		"_restaurantId",
		"_restaurantName"
	);

	INSERT INTO user_group
	(
		"userId",
		"groupId"
	)
	VALUES
	(
		"_userId",
		currval(pg_get_serial_sequence('groups', 'id'))
	);

	INSERT INTO user_restaurant
	(
		"userId",
		"scheduleDate",
		"restaurantId",
		"groupId",
		"restaurantName"
	)
	VALUES
	(
		"_userId",
		"_date",
		"_restaurantId",
		currval(pg_get_serial_sequence('groups', 'id')),
		"_restaurantName"
	);
	
END;

$BODY$;

ALTER FUNCTION public.insert_join_restaurant(integer, timestamp without time zone, character varying, character varying)
    OWNER TO seong91;
