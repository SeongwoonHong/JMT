CREATE OR REPLACE FUNCTION public.insert_comment("_groupId" integer, "_userId" integer, "_content" character varying, "_date" timestamp without time zone)
    RETURNS void
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100
AS $BODY$ 
DECLARE
BEGIN
	INSERT INTO comments
	(
		"groupId",
		"userId",
		"content",
		"date"
	)
	VALUES
	(
		"_groupId",
		"_userId",
		"_content",
		"_date"
	);
	
END;

$BODY$;