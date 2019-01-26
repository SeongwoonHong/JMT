CREATE TABLE public.comments
(
    id integer,
    "groupId" integer NOT NULL,
    "userId" integer NOT NULL,
    content character varying(200) NOT NULL,
    date timestamp(4) without time zone NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.comments
    OWNER to seong91;
