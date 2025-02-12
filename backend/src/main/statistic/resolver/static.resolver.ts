import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatisticCards } from '../entity/statistic-cards';
import { StatisticService } from '../service/statistic.service';
import { Balance, BalanceResponse, FacturadoPorTrabajador, MonthlySalesModel, OrderRepair, SumGastos, TopProductosVendidos } from '../Model';
import { TotalAppointmentsByStatusPerCompany } from '../entity/status-cita';
import { StockProductView } from '../entity/stock-products';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { applyClassDecorators } from 'src/patterns/crud-pattern/utils/decorators.utils';
import { EstadoFinancieroView } from '../entity/cards-saldo-contabilidad';
import { BalanceInput, DateRangeInput, GetFacturadoPorTrabajadorInput } from '../inputs';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { Products } from 'src/main/inventory/products/entities/products.entity';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';

@Resolver()
export class StatisticResolver {
    constructor(
        private readonly statisticService: StatisticService
    ) {}
    // @AnyUser()
    // @Query(() => StatisticCards, { name: 'statisticsCards' })
    // async getStatisticCards(
    //     @Args('companyId') companyId: string
    // ): Promise<StatisticCards> {
    //     return this.statisticService.staticCardsHome(companyId);
    // }
    // @AnyUser()
    // @Query(() => [MonthlySalesModel])
    // async getMonthlySales(@Args('companyId') companyId: string) {
    //   return this.statisticService.staticSalesData(companyId);
    // }
    // @AnyUser()
    // @Query(() => TotalAppointmentsByStatusPerCompany)
    // async totalAppointmentsByStatus(
    //     @Args('companyId') companyId: string
    // ) {
    //     return this.statisticService.getTotalAppointmentsByStatus(companyId);
    // }
    @Query(() => StockProductView)
    getStockProduct(
        @Args('productId') productId: string
    ) {
        return this.statisticService.getStockProducts(productId);
    }
    // @Query(() => EstadoFinancieroView)
    // getEstadoCuentaByCompany(
    //     @Args('id') id: string
    // ) {
    //     return this.statisticService.getEstadoCuentaByCompany(id);
    // }
    @Query(() => BalanceResponse) // Retorna un array de BalanceResponse
    async obtenerBalanceEmpresaByDate(@Args('input') input: BalanceInput): Promise<BalanceResponse> {
      return this.statisticService.obtenerBalanceEmpresa(input.fechaInicio, input.fechaFin,input.companyId);
    }
    @Query(() => [FacturadoPorTrabajador], { name: 'obtenerFacturadoPorTrabajador' })
    async obtenerFacturadoPorTrabajador(
      @Args('input') input: GetFacturadoPorTrabajadorInput,
    ): Promise<FacturadoPorTrabajador[]> {
      return this.statisticService.obtenerFacturadoPorTrabajador(input);
    }

    @Query(() => [TopProductosVendidos], { name: 'obtenerTopProductosVendidos' })
    async obtenerTopProductosVendidos(
      @Args('input') input: GetFacturadoPorTrabajadorInput,
    ): Promise<TopProductosVendidos[]> {
      return this.statisticService.obtenerTopProductosVendidos(input);
    }
    
    @Query(() => [OrderRepair])
    async getOrdersByDateRange(
      @Args('dateRange') dateRange: DateRangeInput,
    ): Promise<OrderRepair[]> {
      return this.statisticService.getOrdersByDateRange(dateRange);
    }

    @Query(() => [SumGastos])
    async getGastosByDateRange(
      @Args('dateRange') dateRange: DateRangeInput,
    ): Promise<SumGastos[]> {
      return this.statisticService.getGastosByDateRange(dateRange);
    }
    @Query(() => [SumGastos])
    async getProductByDateRange(
      @Args('dateRange') dateRange: DateRangeInput,
    ): Promise<SumGastos[]> {
      return this.statisticService.getProductByDateRange(dateRange);
    }
    @Query(() => [SumGastos])
    async getServiceByDateRange(
      @Args('dateRange') dateRange: DateRangeInput,
    ): Promise<SumGastos[]> {
      return this.statisticService.getServiceByDateRange(dateRange);
    }
    
    @Query(() => Balance)
    async getBalanceByDateRange(
      @Args('dateRange') dateRange: DateRangeInput,
    ): Promise<Balance> {
      return this.statisticService.getBalanceByDateRange(dateRange);
    }
    
}
