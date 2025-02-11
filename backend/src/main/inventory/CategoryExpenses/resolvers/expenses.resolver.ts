import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { CategoryExpensesService, serviceStructure } from '../services/category-expenses.service';
import { CategoryExpenses } from '../entities/CategoryExpenses.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:CategoryExpensesService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCategoryExpense",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCategoryExpense",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCategoryExpense",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"CategoryExpense",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "CategoryExpenses" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CategoryExpenses)
export class CategoryExpensesResolver extends CrudResolverFrom(resolverStructure) {
}
