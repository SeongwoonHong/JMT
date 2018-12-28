-- FUNCTION: public.get_users_by_restaurant(integer, date)

-- DROP FUNCTION public.get_users_by_restaurant(integer, date);

CREATE OR REPLACE FUNCTION public.get_users_by_restaurant(
	"_restaurantId" integer,
	"_scheduleDate" date)
    RETURNS TABLE("userId" integer, "displayName" character varying, password character varying, email character varying, avatar text, verified boolean, "signupDate" date) 
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

DECLARE

BEGIN
	RETURN QUERY
	SELECT 
		u."userId",
		u."displayName",
		u.password,
		u.email,
		u.avatar,
		u.verified,
		u."signupDate"
	FROM users as u
	JOIN user_restaurant as us
	ON us."userId" = u."userId" AND us."scheduleDate" = "_scheduleDate"
	JOIN restaurants
	ON restaurants.id = us."restaurantId"
	WHERE restaurants.id = "_restaurantId";
	
END;

$BODY$;

ALTER FUNCTION public.get_users_by_restaurant(integer, date)
    OWNER TO seong91;
