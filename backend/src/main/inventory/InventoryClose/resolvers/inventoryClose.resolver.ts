import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { InventoryCloseService, serviceStructure } from '../services/iventoryClose.service';
import { InventoryClose } from '../entities/inventoryClose.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:InventoryCloseService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createInventoryClose",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateInventoryClose",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeInventoryClose",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"InventoryClose",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "InventoryCloses" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => InventoryClose)
export class InventoryCloseResolver extends CrudResolverFrom(resolverStructure) {
}
