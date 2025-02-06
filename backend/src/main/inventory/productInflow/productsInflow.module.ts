import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInflow } from './entities/productInflow.entity';
import { ProductsInflowService } from './services/productsInflow.service';
import { ProductsInflowResolver } from './resolvers/productsInflow.resolver';
import { CompanyModule } from 'src/main/company/company.module';
import { UsersModule } from 'src/security/users/users.module';
import { ProductsModule } from '../products/products.module';


@Module({
  providers: [ProductsInflowService,ProductsInflowResolver],
  imports:[
    TypeOrmModule.forFeature([ProductInflow]),
    CompanyModule,
    UsersModule,
    ProductsModule
  ]
})
export class ProductInflowsModule {}
