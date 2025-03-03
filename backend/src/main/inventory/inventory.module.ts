import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ProductOutflowsModule } from './productOutflow/productsOutflow.module';
import { ProductInflowsModule } from './productInflow/productsInflow.module';
import { InventoryCloseModule } from './InventoryClose/inventoryClose.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CategoryExpensesModule } from './CategoryExpenses/category-expenses.module';
import { ExpensesModule } from './expenses/expenses.module';
import { CotizacionModule } from './cotizacion/productsOutflow.module';
import { CountExpensesModule } from './cuentasExpenses/count-expenses.module';

@Module({
  imports: [ProductsModule, ProductOutflowsModule, ProductInflowsModule,InventoryCloseModule,InvoiceModule
    ,CategoryExpensesModule
    ,ExpensesModule
    ,CotizacionModule
    ,CountExpensesModule
  ]
})
export class InventoryModule {}
