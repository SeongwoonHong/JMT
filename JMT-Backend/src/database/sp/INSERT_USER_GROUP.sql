CREATE OR REPLACE FUNCTION public.insert_user_group("_userId" integer,"_groupId" integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100
AS $BODY$ 
DECLARE
BEGIN
	INSERT INTO user_group
	(
		"userId",
		"groupId"
	)
	VALUES
	(
		"_userId",
		"_groupId"
	);
	
END;

$BODY$;