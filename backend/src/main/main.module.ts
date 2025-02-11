import { Module } from '@nestjs/common';
import { RmgModule } from './rmg/rmg.module';
import { CompanyModule } from './company/company.module';
import { InventoryModule } from './inventory/inventory.module';
import { StatisticCardsModule } from './statistic/statistic.module';

@Module({
  imports: [RmgModule,CompanyModule,InventoryModule,StatisticCardsModule]
})
export class MainModule {}
