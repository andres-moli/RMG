import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderRepairService,serviceStructure } from '../service/order-repair.service';
import { OrderRepairty } from '../entities/orderRepair.entity';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CreateOrderRepairFullInput } from '../dto/create-oder-repair-full.input';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { RepairStatusView } from '../entities/vStatusRepair.view.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:OrderRepairService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createOrderRepair",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateOrderRepair",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeOrderRepair",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"orderRepair",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "orderRepairs" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => OrderRepairty)
export class OrderRepairResolver extends CrudResolverFrom(resolverStructure) {
      @Mutation(() => String, { name: 'createOrderRepairFull' })
      @AnyUser()
      async createOrderRepairFull(
            @CurrentContext() context: IContext,
            @Args({ type: () => CreateOrderRepairFullInput, name: 'createOrderRepairFullInput' }) createOrderRepairFullInput: CreateOrderRepairFullInput,
      ): Promise<String> {
            return this.service.createOrderRepairFull(context,createOrderRepairFullInput)
      }
      @Query(() => String, { name: 'genrateQrByRepair' })
      @AnyUser()
      async genrateQrByRepair(
            @CurrentContext() context: IContext,
            @Args({ type: () => String, name: 'idRepair' }) idRepair: string,
      ): Promise<String> {
            return this.service.generateQr(idRepair)
      }
      @Query(() => RepairStatusView, { name: 'statictsByStatusRepair' })
      @AnyUser()
      async statictsByStatusRepair(
            @CurrentContext() context: IContext
      ): Promise<RepairStatusView> {
            return this.service.statictsByStatusRepair()
      }

      
}
