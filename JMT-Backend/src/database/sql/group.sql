CREATE TABLE public."group"
(
    id integer,
    date timestamp(4) without time zone NOT NULL,
    "categoryId" integer NOT NULL,
    "restaurantId" character varying(40) NOT NULL,
    "restaurantName" character varying(200) NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."group"
    OWNER to seong91;
