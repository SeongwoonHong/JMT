CREATE OR REPLACE FUNCTION public.get_users_by_group(
	"_groupId" integer)
    RETURNS TABLE("userId" integer, "displayName" character varying, "email" character varying, "profilePicture" text, "signupDate" date) 
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
		u."email",
		u."profilePicture",
		u."signupDate"
	FROM users as u
	JOIN user_group as ug
	ON ug."userId" = u."userId"
	WHERE ug."groupId" = "_groupId";
	
END;

$BODY$;

ALTER FUNCTION public.get_users_by_group(integer)
    OWNER TO seong91;
