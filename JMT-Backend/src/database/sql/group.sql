CREATE TABLE public."group"
(
    id integer,
    date timestamp(4) without time zone NOT NULL,
    category_id integer NOT NULL,
    restaurant_id character varying(40) NOT NULL,
    restaurant_name character varying(200) NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."group"
    OWNER to seong91;