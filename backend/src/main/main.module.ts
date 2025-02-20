import { Module } from '@nestjs/common';
import { RmgModule } from './rmg/rmg.module';
import { CompanyModule } from './company/company.module';
import { InventoryModule } from './inventory/inventory.module';
import { StatisticCardsModule } from './statistic/statistic.module';
import { EmailDocumentModule } from './emailDocument/emailDocument.module';

@Module({
  imports: [RmgModule,CompanyModule,InventoryModule,StatisticCardsModule,EmailDocumentModule]
})
export class MainModule {}
