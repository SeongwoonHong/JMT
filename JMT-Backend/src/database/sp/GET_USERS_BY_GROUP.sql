CREATE OR REPLACE FUNCTION public.get_users_by_group(
	"_groupId" integer)
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
	JOIN user_group as ug
	ON ug."userId" = u."userId"
	WHERE ug.groupId = "_groupId";
	
END;

$BODY$;

ALTER FUNCTION public.get_users_by_group(integer)
    OWNER TO seong91;
