import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticCards } from '../entity/statistic-cards';
import { EstadoFinancieroViewRepository, StatisticCardsRepository, StockProductViewRepository, TotalAppointmentsByStatusPerCompanyRepository, TotalSalesByCompanyRepository } from '../repositoty/statistic-cards.repository'; // Asegúrate de tener la ruta correcta
import { TotalSalesByCompany } from '../entity/TotalSalesByCompany';
import { TotalAppointmentsByStatusPerCompany } from '../entity/status-cita';
import { StockProductView } from '../entity/stock-products';
import { EstadoFinancieroView } from '../entity/cards-saldo-contabilidad';
import { BalanceResponse, FacturadoPorTrabajador, StockProductsFilterDay, TopProductosVendidos } from '../Model';
import { GetFacturadoPorTrabajadorInput } from '../inputs';

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
        // @InjectRepository(EstadoFinancieroView)
        // private readonly estadoFinancieroViewRepository: EstadoFinancieroViewRepository
        
        
        
        
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
    // async getEstadoCuentaByCompany(id: string){
    //     const findEstado = await this.estadoFinancieroViewRepository.findOne({
    //         where: {
    //             id: id
    //         }
    //     })
    //     return findEstado
    // }
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
    private getMonthName(month: number): string {
        const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return monthNames[month - 1]; // Los meses en JS son indexados desde 0
    }
}
