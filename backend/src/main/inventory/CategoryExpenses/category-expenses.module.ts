import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryExpenses } from './entities/CategoryExpenses.entity';
import { CategoryExpensesService } from './services/category-expenses.service';
import {  CategoryExpensesResolver} from './resolvers/expenses.resolver';
// import { CompanyModule } from '../company/company.module';


@Module({
  providers: [CategoryExpensesService,CategoryExpensesResolver],
  imports:[
    TypeOrmModule.forFeature([CategoryExpenses]),
    // CompanyModule
  ],
  exports: [CategoryExpensesService]
})
export class CategoryExpensesModule {}
