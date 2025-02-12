import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticCards } from '../entity/statistic-cards';
import { EstadoFinancieroViewRepository, StatisticCardsRepository, StockProductViewRepository, TotalAppointmentsByStatusPerCompanyRepository, TotalSalesByCompanyRepository } from '../repositoty/statistic-cards.repository'; // Asegúrate de tener la ruta correcta
import { TotalSalesByCompany } from '../entity/TotalSalesByCompany';
import { TotalAppointmentsByStatusPerCompany } from '../entity/status-cita';
import { StockProductView } from '../entity/stock-products';
import { EstadoFinancieroView } from '../entity/cards-saldo-contabilidad';
import { Balance, BalanceResponse, FacturadoPorTrabajador, OrderRepair, StockProductsFilterDay, SumGastos, TopProductosVendidos } from '../Model';
import { DateRangeInput, GetFacturadoPorTrabajadorInput } from '../inputs';

@Injectable()
export class StatisticService {
    constructor( 
        // @InjectRepository(StatisticCards)
        // private readonly statisticCardsRepository: StatisticCardsRepository,
        // @InjectRepository(TotalSalesByCompany)
        // private readonly totalSalesByCompanyRepository: TotalSalesByCompanyRepository,
        // @InjectRepository(TotalAppointmentsByStatusPerCompany)
        // private readonly totalAppointmentsByStatusPerCompanyRepository: TotalAppointmentsByStatusPerCompanyRepository,
        @InjectRepository(StockProductView)
        private readonly stockProductViewRepository: StockProductViewRepository,
        @InjectRepository(EstadoFinancieroView)
        private readonly estadoFinancieroViewRepository: EstadoFinancieroViewRepository
        
        
        
        
    ) {}

    // async staticCardsHome(id: string): Promise<StatisticCards> {
    //     return this.statisticCardsRepository.findOne({
    //         where: {
    //             companyId: id
    //         }
    //     });
    // }

    // async staticSalesData(id: string) {
    //     const result = await this.totalSalesByCompanyRepository.createQueryBuilder('sales')
    //     .select('sales.month', 'month')
    //     .addSelect('SUM(sales.total_sales)', 'totalSales')
    //     .where('sales.company_id = :companyId', { companyId: id })
    //     .groupBy('sales.month')
    //     .orderBy('sales.month')
    //     .getRawMany();
    //     return result.map((data) => ({
    //         month: this.getMonthName(data.month), // Convierte el número de mes a nombre
    //         totalSales: data.totalSales, // Asegúrate de que sea un número
    //     }));
    // }
    // async getTotalAppointmentsByStatus(id: string): Promise<TotalAppointmentsByStatusPerCompany> {
    //     return await this.totalAppointmentsByStatusPerCompanyRepository.findOne({
    //         where: {
    //             companyId: id
    //         }
    //     })
    // }
    async getEstadoCuentaByCompany(id: string){
        const findEstado = await this.estadoFinancieroViewRepository.findOne({
            
        })
        return findEstado
    }
    async getStockProducts(id: string){
        const stockProduct = await this.stockProductViewRepository.findOne({
            where: {
                id: id
            }
        })
        return stockProduct
    }
    async getStockProductsAll(){
        const stockProduct = await this.stockProductViewRepository.find({
            where: {
            }
        })
        return stockProduct
    }
    async getStockProductsFilterDay(fechaInicio: string, fechaFin: string, companyId: string){
        const query = `
          SELECT * FROM cierre_inventario($1, $2, $3)
        `;
        const result = await this.stockProductViewRepository.manager.query<StockProductsFilterDay[]>(query, [fechaInicio, fechaFin,companyId]);
        return result;
    }
    async obtenerBalanceEmpresa(fechaInicio: string, fechaFin: string,companyId: string) {
        const query = `
          SELECT * FROM obtener_balance_empresa($1, $2, $3)
          WHERE
          id = $3
        `;
        const result = await this.stockProductViewRepository.manager.query<BalanceResponse[]>(query, [fechaInicio, fechaFin,companyId]);
        return result[0];
    }
    async obtenerFacturadoPorTrabajador(input: GetFacturadoPorTrabajadorInput): Promise<FacturadoPorTrabajador[]> {
        const { fechaInicio, fechaFin, companyId } = input;
    
        const query = `
          SELECT * FROM obtener_facturado_por_trabajador($1, $2, $3)
        `;
        const result = await this.stockProductViewRepository.manager.query<FacturadoPorTrabajador[]>(query, [fechaInicio, fechaFin,companyId]);
        return result;
    }
    async obtenerTopProductosVendidos(input: GetFacturadoPorTrabajadorInput): Promise<TopProductosVendidos[]> {
        const { fechaInicio, fechaFin, companyId } = input;
    
        const query = `
          SELECT * FROM obtener_top_productos_vendidos($1, $2, $3)
        `;
        const result = await this.stockProductViewRepository.manager.query<TopProductosVendidos[]>(query, [fechaInicio, fechaFin,companyId]);
        return result;
    }
    async getOrdersByDateRange(dateRange: DateRangeInput): Promise<OrderRepair[]> {
        const { startDate, endDate } = dateRange;
    
        return this.stockProductViewRepository.manager.query(`
            SELECT 
                t.status,
                COUNT(*) AS total_por_estado
            FROM 
                public.cyt_order_repair AS t
            WHERE 
                t."createdAt" BETWEEN $1 AND $2
            GROUP BY 
                t.status
                UNION ALL
            SELECT
            'SIN_RECIBO' AS status,
            SUM(
                CASE
                    WHEN t."invoiceId" IS NULL THEN 1
                    ELSE 0
                END) AS total_por_estado
            FROM 
                public.cyt_order_repair AS t
            WHERE 
                t.status = 'COMPLETED'
                AND
                t."createdAt" BETWEEN $1 AND $2
            GROUP BY 
            t.status
        `, [startDate, endDate]);
      }
    
    async getGastosByDateRange(dateRange: DateRangeInput): Promise<SumGastos[]> {
        const { startDate, endDate } = dateRange;

        return this.stockProductViewRepository.query(`
        SELECT 
            total,
            dia AS day,
            mes AS month,
            ano AS year
        FROM 
            public.v_sum_gastos
        WHERE 
            TO_DATE(ano || '-' || mes || '-' || dia, 'YYYY-MM-DD') 
            BETWEEN $1 AND $2
        `, [startDate, endDate]);
    }
    async getBalanceByDateRange(dateRange: DateRangeInput): Promise<Balance> {
        const { startDate, endDate } = dateRange;
    
        const result = await this.stockProductViewRepository.query(
          `
          SELECT 
              COALESCE(pv.total_vendido_producto, 0::double precision) AS total_vendido_producto,
              COALESCE(fc.total_vendido_servicio, 0::bigint) AS total_vendido_servicio,
              COALESCE(gt.total_gasto, 0::bigint) AS total_gasto,
              COALESCE(fc.total_vendido_servicio, 0::bigint)::double precision + COALESCE(pv.total_vendido_producto, 0::double precision) AS total_recaudado,
              COALESCE(pv.total_vendido_producto, 0::double precision) + COALESCE(fc.total_vendido_servicio, 0::bigint)::double precision - COALESCE(gt.total_gasto, 0::bigint)::double precision AS saldo
          FROM 
              (SELECT SUM(fd.total) AS total_vendido_producto
              FROM "com_productOutFlow" f
              JOIN "com_productInvoice" fd ON f.id = fd."productOutflowId"
              WHERE f.status = 'PAGADA'
              AND f."createdAt" BETWEEN $1 AND $2) pv
          CROSS JOIN 
              (SELECT SUM(f.total) AS total_vendido_servicio
              FROM ag_invoice f
              WHERE f.status = 'PAGADA'
              AND f."createdAt" BETWEEN $1 AND $2) fc
          CROSS JOIN 
              (SELECT SUM(f.amount) AS total_gasto
              FROM com_expenses f
              WHERE f.status = 'PAGADA'
              AND f."createdAt" BETWEEN $1 AND $2) gt;
          `,
          [startDate, endDate],
        );
    
        return result[0]; // Retornar solo el primer resultado
    }
    async getProductByDateRange(dateRange: DateRangeInput): Promise<SumGastos[]> {
        const { startDate, endDate } = dateRange;

        return this.stockProductViewRepository.query(`
        SELECT 
            total,
            dia AS day,
            mes AS month,
            ano AS year
        FROM 
            public.v_sum_productos
        WHERE 
            TO_DATE(ano || '-' || mes || '-' || dia, 'YYYY-MM-DD') 
            BETWEEN $1 AND $2
        `, [startDate, endDate]);
    }
    async getServiceByDateRange(dateRange: DateRangeInput): Promise<SumGastos[]> {
        const { startDate, endDate } = dateRange;

        return this.stockProductViewRepository.query(`
        SELECT 
            total,
            dia AS day,
            mes AS month,
            ano AS year
        FROM 
            public.v_sum_service
        WHERE 
            TO_DATE(ano || '-' || mes || '-' || dia, 'YYYY-MM-DD') 
            BETWEEN $1 AND $2
        `, [startDate, endDate]);
    }
    private getMonthName(month: number): string {
        const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return monthNames[month - 1]; // Los meses en JS son indexados desde 0
    }
}
