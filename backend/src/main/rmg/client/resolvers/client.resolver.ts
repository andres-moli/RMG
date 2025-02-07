import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientService, serviceStructure } from '../services/client.service';
import { Client } from '../entities/client.entity';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { ParseUUIDPipe } from '@nestjs/common';
import { ClientContactModel } from '../dto/model/client.model';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:ClientService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createClient",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateClient",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeClient",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"client",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "clients" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Client)
export class ClientResolver extends CrudResolverFrom(resolverStructure) {
      @Query(() => Client, { name: 'findOneByDocumentNumber', nullable: true })
      @AnyUser()
      async findOneByDocumentNumber(
            @CurrentContext() context: IContext,
            @Args({ type: () => String, name: 'numberDocument' }) numberDocument: string,
      ): Promise<Client> {
            return this.service.findOneByDocumentNumber(context,numberDocument)
      }
      @Query(() => Client, { name: 'findOneByNumberPhone', nullable: true })
      @AnyUser()
      async findOneByNumberPhone(
            @CurrentContext() context: IContext,
            @Args({ type: () => String, name: 'numberPhone' }) numberPhone: string,
      ): Promise<Client> {
            return this.service.findOneByNumberPhone(context,numberPhone)
      }
}
