-- View: public.v_sum_gastos

-- DROP VIEW public.v_sum_gastos;

CREATE OR REPLACE VIEW public.v_sum_gastos
 AS
 SELECT sum(amount) AS total,
    EXTRACT(day FROM "createdAt") AS dia,
    EXTRACT(month FROM "createdAt") AS mes,
    EXTRACT(year FROM "createdAt") AS ano
   FROM com_expenses t
  WHERE status::text = 'PAGADA'::text
  GROUP BY (EXTRACT(day FROM "createdAt")), (EXTRACT(month FROM "createdAt")), (EXTRACT(year FROM "createdAt"));

ALTER TABLE public.v_sum_gastos
    OWNER TO postgres;

