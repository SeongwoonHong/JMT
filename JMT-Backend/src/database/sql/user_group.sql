CREATE TABLE public.user_group
(
    "userId" integer NOT NULL,
    "groupId" integer NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.user_group
    OWNER to seong91;
