-- FUNCTION: public.get_users_by_restaurant(integer, date)

-- DROP FUNCTION public.get_users_by_restaurant(integer, date);

CREATE OR REPLACE FUNCTION public.get_users_by_restaurant(
	_restaurant_id integer,
	_schedule_date date)
    RETURNS TABLE(
      user_id integer,
      display_name character varying,
      password character varying,
      email character varying,
      avatar text,
      verified boolean, signup_date date
    )
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

DECLARE

BEGIN
	RETURN QUERY
	SELECT 
		u.user_id,
		u.display_name,
		u.password,
		u.email,
		u.avatar,
		u.verified,
		u.signup_date
	FROM users as u
	JOIN user_restaurant as us
	ON us.user_id = u.user_id AND us.schedule_date = _schedule_date
	JOIN restaurants
	ON restaurants.id = us.restaurant_id
	WHERE restaurants.id = _restaurant_id;
	
END;

$BODY$;

ALTER FUNCTION public.get_users_by_restaurant(integer, date)
    OWNER TO seong91;
