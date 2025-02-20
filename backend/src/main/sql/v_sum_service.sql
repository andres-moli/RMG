-- View: public.v_sum_service

-- DROP VIEW public.v_sum_service;

CREATE OR REPLACE VIEW public.v_sum_service
 AS
 SELECT sum(fd.total) AS total,
    EXTRACT(day FROM f."createdAt") AS dia,
    EXTRACT(month FROM f."createdAt") AS mes,
    EXTRACT(year FROM f."createdAt") AS ano
  FROM "com_productOutFlow" f
  JOIN "com_serviceInvoice" fd ON f.id = fd."productOutflowId"
  WHERE f.status::text = 'PAGADA'::text
  GROUP BY (EXTRACT(day FROM f."createdAt")), (EXTRACT(month FROM f."createdAt")), (EXTRACT(year FROM f."createdAt"));

ALTER TABLE public.v_sum_service
    OWNER TO postgres;

