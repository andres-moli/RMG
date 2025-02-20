import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOutflow } from './entities/productOuflow.entity';
import { ProductsOutflowService } from './services/productsOutflow.service';
import { ProductsOutflowResolver } from './resolvers/productsOutflow.resolver';
import { InvoiceProduct } from './entities/InvoiceProduct.entity';
import { CompanyModule } from 'src/main/company/company.module';
import { UsersModule } from 'src/security/users/users.module';
import { ProductsModule } from '../products/products.module';
import { ClientModule } from 'src/main/rmg/client/client.module';
import { StatisticCardsModule } from 'src/main/statistic/statistic.module';
import { InvoiceService } from './entities/InvoiceService.entity';
import { OrderRepairTypeModule } from 'src/main/rmg/repairType/order-repair-type.module';


@Module({
  providers: [ProductsOutflowService,ProductsOutflowResolver],
  imports:[
    TypeOrmModule.forFeature([ProductOutflow,InvoiceProduct,InvoiceService]),
    CompanyModule,
    UsersModule,
    ProductsModule,
    ClientModule,
    StatisticCardsModule,
    OrderRepairTypeModule
  ]
})
export class ProductOutflowsModule {}
