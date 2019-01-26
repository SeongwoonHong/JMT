CREATE TABLE public.user_group
(
    user_id integer NOT NULL,
    group_id integer NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.user_group
    OWNER to seong91;