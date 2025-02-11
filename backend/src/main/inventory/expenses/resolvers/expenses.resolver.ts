import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { ExpensesService, serviceStructure } from '../services/expenses.service';
import { Expense } from '../entities/expenses.entity';
import { CreateExpensesWorkerInput } from '../dto/inputs/create-expenses.input';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ExpensesService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createExpense",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateExpense",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeExpense",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"Expense",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "Expenses" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Expense)
export class ExpensesResolver extends CrudResolverFrom(resolverStructure) {
      @AnyUser()
      @Mutation(()=> Expense, {name: 'createExpensesWoker'})
      public createExpensesWoker(
            @Args({ type: () => CreateExpensesWorkerInput, name: 'createInput' }) createInput: CreateExpensesWorkerInput,
            @CurrentContext() context: IContext,
      ){
            return this.service.createExpensesWoker(context, createInput)
      }

}
