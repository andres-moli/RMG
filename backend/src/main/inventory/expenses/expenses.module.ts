import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expenses.entity';
import { ExpensesService } from './services/expenses.service';
import {  ExpensesResolver} from './resolvers/expenses.resolver';
import { CategoryExpensesModule } from '../CategoryExpenses/category-expenses.module';
import { UsersModule } from 'src/security/users/users.module';


@Module({
  providers: [ExpensesService,ExpensesResolver],
  imports:[
    TypeOrmModule.forFeature([Expense]),
    CategoryExpensesModule,
    UsersModule
  ]
})
export class ExpensesModule {}
