import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { ProductsInflowService, serviceStructure } from '../services/productsInflow.service';
import { ProductInflow } from '../entities/productInflow.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ProductsInflowService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createProductInflow",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateProductInflow",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeProductInflow",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"ProductInflow",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "ProductsInflows" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => ProductInflow)
export class ProductsInflowResolver extends CrudResolverFrom(resolverStructure) {
}
