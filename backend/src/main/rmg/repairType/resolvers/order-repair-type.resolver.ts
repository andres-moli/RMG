import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderRepairTypeService,serviceStructure } from '../service/order-repair-type.service';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { RepairType } from '../entities/repairType';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:OrderRepairTypeService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createOrderRepairType",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateOrderRepairType",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeOrderRepairType",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"orderRepairType",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "orderRepairsType" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => RepairType)
export class OrderRepairTypeResolver extends CrudResolverFrom(resolverStructure) {
}
