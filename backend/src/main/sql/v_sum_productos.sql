-- View: public.v_sum_productos

-- DROP VIEW public.v_sum_productos;

CREATE OR REPLACE VIEW public.v_sum_productos
 AS
 SELECT sum(td.total) AS total,
    EXTRACT(day FROM t."createdAt") AS dia,
    EXTRACT(month FROM t."createdAt") AS mes,
    EXTRACT(year FROM t."createdAt") AS ano
   FROM "com_productOutFlow" t
     JOIN "com_productInvoice" td ON t.id = td."productOutflowId"
  WHERE t.status::text = 'PAGADA'::text
  GROUP BY (EXTRACT(day FROM t."createdAt")), (EXTRACT(month FROM t."createdAt")), (EXTRACT(year FROM t."createdAt"));

ALTER TABLE public.v_sum_productos
    OWNER TO postgres;

