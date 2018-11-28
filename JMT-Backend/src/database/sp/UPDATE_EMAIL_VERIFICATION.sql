-- FUNCTION: public.update_email_verification(character varying)

-- DROP FUNCTION public.update_email_verification(character varying);

CREATE OR REPLACE FUNCTION public.update_email_verification(
	_email character varying)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
BEGIN
UPDATE USERS
SET verified = true
WHERE email = _email;
END;

$BODY$;

ALTER FUNCTION public.update_email_verification(character varying)
    OWNER TO seong91;
