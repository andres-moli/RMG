import { Module } from '@nestjs/common';
import { RmgModule } from './rmg/rmg.module';
import { CompanyModule } from './company/company.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [RmgModule,CompanyModule,InventoryModule]
})
export class MainModule {}
