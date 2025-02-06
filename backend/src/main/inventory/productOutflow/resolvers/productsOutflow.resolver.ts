import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { ProductsOutflowService, serviceStructure } from '../services/productsOutflow.service';
import { ProductOutflow } from '../entities/productOuflow.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ProductsOutflowService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createProductOutflow",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateProductOutflow",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeProductOutflow",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"ProductOutflow",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "ProductsOutflows" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => ProductOutflow)
export class ProductsOutflowResolver extends CrudResolverFrom(resolverStructure) {
}
