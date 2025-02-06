import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryClose } from './entities/inventoryClose.entity';
import { InventoryCloseService } from './services/iventoryClose.service';
import {  InventoryCloseResolver} from './resolvers/inventoryClose.resolver';
import { CompanyModule } from 'src/main/company/company.module';
import { MailModule } from 'src/general/email/emial.module';
import { InventoryCloseDetail } from './entities/inventoryCloseDetail.entity';
import { ProductsModule } from '../products/products.module';


@Module({
  providers: [InventoryCloseService,InventoryCloseResolver],
  imports:[
    TypeOrmModule.forFeature([InventoryClose, InventoryCloseDetail]),
    CompanyModule,
    MailModule,
    ProductsModule
  ],
  exports: [InventoryCloseService]
})
export class InventoryCloseModule {}
