CREATE OR REPLACE FUNCTION update_user_profile(
	_email character varying,
	_display_name character varying,
	_password character varying,
	_avatar text
)
    RETURNS void
    LANGUAGE 'plpgsql'
AS $BODY$

DECLARE
BEGIN
UPDATE USERS
SET
	display_name = _display_name,
	password = _password,
	avatar = _avatar
WHERE email = _email;
END;

$BODY$;
