import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceService } from './services/invoice.service';
import { InvoiceResolver } from './resolvers/invoice.resolver';
import { CompanyModule } from 'src/main/company/company.module';
import { UsersModule } from 'src/security/users/users.module';
import { FilesModule } from 'src/general/files/files.module';
import { MailModule } from 'src/general/email/emial.module';
import { OrderRepairModule } from 'src/main/rmg/orderRepair/order-repair.module';
import { InvoiceController } from './controller/invoice.controller';
import { InvoiceServicePdf } from './services/invoice-pdf.service';


@Module({
  providers: [InvoiceService,InvoiceResolver,InvoiceServicePdf],
  controllers: [InvoiceController],
  imports:[
    TypeOrmModule.forFeature([Invoice]),
    CompanyModule,
    UsersModule,
    FilesModule,
    MailModule,
    OrderRepairModule
  ]
})
export class InvoiceModule {}
