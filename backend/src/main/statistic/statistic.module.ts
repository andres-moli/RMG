import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticCards } from './entity/statistic-cards';
import { StatisticService } from './service/statistic.service';
import { StatisticCardsRepository } from './repositoty/statistic-cards.repository';
import { StatisticResolver } from './resolver/static.resolver';
import { TotalSalesByCompany } from './entity/TotalSalesByCompany';
import { TotalAppointmentsByStatusPerCompany } from './entity/status-cita';
import { StockProductView } from './entity/stock-products';
import { EstadoFinancieroView } from './entity/cards-saldo-contabilidad';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            //StatisticCards,
            // TotalSalesByCompany,
            // TotalAppointmentsByStatusPerCompany,
            StockProductView,
            EstadoFinancieroView
        ]
        )
    ],
    exports: [StatisticService],
    providers: [StatisticService, StatisticCardsRepository,StatisticResolver ],
})
export class StatisticCardsModule {}
