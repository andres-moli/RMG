import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { ProductsService, serviceStructure } from '../services/products.service';
import { Products } from '../entities/products.entity';
import { StockProductView } from 'src/main/statistic/entity/stock-products';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { StatisticService } from 'src/main/statistic/service/statistic.service';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ProductsService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createProduct",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateProduct",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeProduct",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"Product",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "Products" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Products)
export class ProductsResolver extends CrudResolverFrom(resolverStructure) {
      @ResolveField(() => StockProductView, {name: "stock"})
      fullName(
        @Parent() product: Products,
        @CurrentContext() context:IContext,
        ): Promise<StockProductView> {
        return this.service.getSctockProductById(product.id);
      }
}
