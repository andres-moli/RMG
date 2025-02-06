import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvoiceService, serviceStructure } from '../services/invoice.service';
import { Invoice } from '../entities/invoice.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:InvoiceService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createInvoice",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateInvoice",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeInvoice",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"Invoice",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "Invoices" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Invoice)
export class InvoiceResolver extends CrudResolverFrom(resolverStructure) {
}
