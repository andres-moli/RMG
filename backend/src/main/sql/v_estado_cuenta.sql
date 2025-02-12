-- View: public.v_estado_cuenta

-- DROP VIEW public.v_estado_cuenta;

CREATE OR REPLACE VIEW public.v_estado_cuenta
 AS
 SELECT COALESCE(pv.total_vendido_producto, 0::double precision) AS total_vendido_producto,
    COALESCE(fc.total_vendido_servicio, 0::bigint) AS total_vendido_servicio,
    COALESCE(gt.total_gasto, 0::bigint) AS total_gasto,
    COALESCE(fc.total_vendido_servicio, 0::bigint)::double precision + COALESCE(pv.total_vendido_producto, 0::double precision) AS total_recaudado,
    COALESCE(pv.total_vendido_producto, 0::double precision) + COALESCE(fc.total_vendido_servicio, 0::bigint)::double precision - COALESCE(gt.total_gasto, 0::bigint)::double precision AS saldo
   FROM ( SELECT sum(fd.total) AS total_vendido_producto
           FROM "com_productOutFlow" f
             JOIN "com_productInvoice" fd ON f.id = fd."productOutflowId"
          WHERE f.status::text = 'PAGADA'::text) pv
     CROSS JOIN ( SELECT sum(f.total) AS total_vendido_servicio
           FROM ag_invoice f
          WHERE f.status::text = 'PAGADA'::text) fc
     CROSS JOIN ( SELECT sum(f.amount) AS total_gasto
           FROM com_expenses f
          WHERE f.status::text = 'PAGADA'::text) gt;

ALTER TABLE public.v_estado_cuenta
    OWNER TO postgres;

