-- View: public.v_sum_service

-- DROP VIEW public.v_sum_service;

CREATE OR REPLACE VIEW public.v_sum_service
 AS
 SELECT sum(total) AS total,
    EXTRACT(day FROM "createdAt") AS dia,
    EXTRACT(month FROM "createdAt") AS mes,
    EXTRACT(year FROM "createdAt") AS ano
   FROM ag_invoice t
  WHERE status::text = 'PAGADA'::text
  GROUP BY (EXTRACT(day FROM "createdAt")), (EXTRACT(month FROM "createdAt")), (EXTRACT(year FROM "createdAt"));

ALTER TABLE public.v_sum_service
    OWNER TO postgres;

