-- View: public.v_repair_status

-- DROP VIEW public.v_repair_status;

CREATE OR REPLACE VIEW public.v_repair_status
 AS
 SELECT count(status) AS total,
    sum(
        CASE
            WHEN status::text = 'PENDING'::text THEN 1
            ELSE 0
        END) AS total_pendiente,
    sum(
        CASE
            WHEN status::text = 'COMPLETED'::text THEN 1
            ELSE 0
        END) AS total_completa,
    sum(
        CASE
            WHEN status::text = 'CANCELED'::text THEN 1
            ELSE 0
        END) AS total_cancelada
   FROM cyt_order_repair t;

ALTER TABLE public.v_repair_status
    OWNER TO postgres;

