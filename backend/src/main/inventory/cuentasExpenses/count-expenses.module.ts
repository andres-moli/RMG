import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountExpenses } from './entities/cuentasExpenses.entity';
import { CountExpensesService } from './services/category-count.service';
import {  CountExpensesResolver} from './resolvers/count-expenses.resolver';
// import { CompanyModule } from '../company/company.module';


@Module({
  providers: [CountExpensesService,CountExpensesResolver],
  imports:[
    TypeOrmModule.forFeature([CountExpenses]),
    // CompanyModule
  ],
  exports: [CountExpensesService]
})
export class CountExpensesModule {}
