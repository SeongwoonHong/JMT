-- FUNCTION: public.insert_user_restaurant(integer, integer, date)

-- DROP FUNCTION public.insert_user_restaurant(integer, integer, date);

CREATE OR REPLACE FUNCTION public.insert_user_restaurant(
	_user_id integer,
	_restaurant_id integer,
	_schedule_date date)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
	INSERT INTO user_restaurant
	(
		user_id,
		restaurant_id,
		schedule_date
	)
	VALUES
	(
		_user_id,
		_restaurant_id,
		_schedule_date
	);
	
END;

$BODY$;

ALTER FUNCTION public.insert_user_restaurant(integer, integer, date)
    OWNER TO seong91;
