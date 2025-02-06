import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ProductOutflowsModule } from './productOutflow/productsOutflow.module';
import { ProductInflowsModule } from './productInflow/productsInflow.module';
import { InventoryCloseModule } from './InventoryClose/inventoryClose.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [ProductsModule, ProductOutflowsModule, ProductInflowsModule,InventoryCloseModule,InvoiceModule]
})
export class InventoryModule {}
