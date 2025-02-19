import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { CotizacionService, serviceStructure } from '../service/cotizacion.service';
import { Cotizacion } from '../entities/cotizacion.entity';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:CotizacionService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCotizacion",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCotizacion",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCotizacion",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"Cotizacion",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "Cotizaciones" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Cotizacion)
export class CotizacionResolver extends CrudResolverFrom(resolverStructure) {
      // @AnyUser()
      // @Mutation(()=> Expense, {name: 'createExpensesWoker'})
      // public createExpensesWoker(
      //       @Args({ type: () => CreateExpensesWorkerInput, name: 'createInput' }) createInput: CreateExpensesWorkerInput,
      //       @CurrentContext() context: IContext,
      // ){
      //       return this.service.createExpensesWoker(context, createInput)
      // }

}
