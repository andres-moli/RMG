import { Entity, Column, ViewEntity } from 'typeorm';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
@ViewEntity({
  name: 'total_sales_by_company',
  expression: `
    SELECT
        main.company_id,
        main.month,
        main.total_sales,
        main.total_invoices,
        monthly_sales_by_company.monthly_sales,
        daily_sales_by_company.daily_sales
    FROM (
        SELECT
            company.id AS company_id,
            MAX(company.name) AS company_name,
            EXTRACT(MONTH FROM invoice."issueDate") AS month,
            SUM(invoice.total) AS total_sales,
            COUNT(invoice.id) AS total_invoices,
            MAX(invoice.total) AS max_invoice_total,
            MIN(invoice.total) AS min_invoice_total
        FROM
            ag_invoice AS invoice
        INNER JOIN
            public.com_company AS company
            ON company.id = invoice."companyId"
        WHERE
            invoice.status = 'PAGADA'
        GROUP BY
            company.id,
            EXTRACT(MONTH FROM invoice."issueDate")
    ) AS main
    LEFT JOIN (
        SELECT
            company.id AS company_id,
            EXTRACT(MONTH FROM invoice."issueDate") AS month,
            SUM(invoice.total) AS monthly_sales
        FROM
            ag_invoice AS invoice
        INNER JOIN
            public.com_company AS company
            ON company.id = invoice."companyId"
        WHERE
            invoice.status = 'PAGADA'
        GROUP BY
            company.id,
            EXTRACT(MONTH FROM invoice."issueDate")
    ) AS monthly_sales_by_company
    ON main.company_id = monthly_sales_by_company.company_id
    AND main.month = monthly_sales_by_company.month
    LEFT JOIN (
        SELECT
            company.id AS company_id,
            EXTRACT(MONTH FROM invoice."issueDate") AS month,
            SUM(invoice.total) AS daily_sales
        FROM
            ag_invoice AS invoice
        INNER JOIN
            public.com_company AS company
            ON company.id = invoice."companyId"
        WHERE
            invoice.status = 'PAGADA'
        GROUP BY
            company.id,
            EXTRACT(MONTH FROM invoice."issueDate")
    ) AS daily_sales_by_company
    ON main.company_id = daily_sales_by_company.company_id
    AND main.month = daily_sales_by_company.month;
  `,
})
export class TotalSalesByCompany {
  @Field(() => String)
  @Column({ name: 'company_id' })
  companyId: string;

  @Field(() => Int)
  @Column({ name: 'month' })
  month: number;

  @Field(() => Int)
  @Column({ name: 'day' })
  day: number;

  @Field(() => Float)
  @Column({ name: 'total_sales' })
  totalSales: number;

  @Field(() => Float)
  @Column({ name: 'total_invoices' })
  totalInvoices: number;

  @Field(() => Float)
  @Column({ name: 'monthly_sales' })
  monthlySales: number;

  @Field(() => Float)
  @Column({ name: 'daily_sales' })
  dailySales: number;
}
