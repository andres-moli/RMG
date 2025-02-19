import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { CountExpensesService, serviceStructure } from '../services/category-count.service';
import { CountExpenses } from '../entities/cuentasExpenses.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:CountExpensesService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCountExpense",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCountExpense",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCountExpense",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"CountExpense",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "CountExpenses" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CountExpenses)
export class CountExpensesResolver extends CrudResolverFrom(resolverStructure) {
}
