import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { CompanyModule } from 'src/main/company/company.module';
import { FilesModule } from 'src/general/files/files.module';
import { StatisticCardsModule } from 'src/main/statistic/statistic.module';
import { ProductsController } from './controllers/products.controller';


@Module({
  providers: [ProductsService,ProductsResolver],
  imports:[
    TypeOrmModule.forFeature([Products]),
    CompanyModule,
    FilesModule,
    StatisticCardsModule
  ],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
