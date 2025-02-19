import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/main/company/company.module';
import { UsersModule } from 'src/security/users/users.module';
import { ProductsModule } from '../products/products.module';
import { ClientModule } from 'src/main/rmg/client/client.module';
import { StatisticCardsModule } from 'src/main/statistic/statistic.module';
import { Cotizacion } from './entities/cotizacion.entity';
import { CotizacionProduct } from './entities/product-cotizacion.entity';
import { CotizacionServiceE } from './entities/service-cotizacion.entity';
import { CotizacionService as CotizacionServiceService } from './service/cotizacion.service';
import { CotizacionResolver } from './resolvers/cotizacion.resolver';
import { OrderRepairTypeModule } from 'src/main/rmg/repairType/order-repair-type.module';

@Module({
  providers: [CotizacionServiceService, CotizacionResolver],
  imports:[
    TypeOrmModule.forFeature([Cotizacion,CotizacionProduct,CotizacionServiceE]),
    CompanyModule,
    UsersModule,
    ProductsModule,
    ClientModule,
    StatisticCardsModule,
    OrderRepairTypeModule
  ]
})
export class CotizacionModule {}
