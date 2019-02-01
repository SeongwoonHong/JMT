-- FUNCTION: public.update_profile_picture(integer, text)

-- DROP FUNCTION public.update_profile_picture(integer, text);

CREATE OR REPLACE FUNCTION public.update_profile_picture(
	"_userId" integer,
	"_profilePicture" text)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
UPDATE USERS
SET
	"profilePicture" = "_profilePicture"
WHERE "userId" = "_userId";
END;

$BODY$;

ALTER FUNCTION public.update_profile_picture(integer, text)
    OWNER TO seong91;
