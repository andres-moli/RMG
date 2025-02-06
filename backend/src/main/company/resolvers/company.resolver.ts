import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { CompanyService, serviceStructure } from '../services/company.service';
import { Company } from '../entities/company.entity';
import { AddClienteNewCompanyInput } from '../dto/inputs/add-cliente-new-company';
import { CurrentContext } from 'src/patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:CompanyService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCompany",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCompany",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCompany",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"Company",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "Companys" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => Company)
export class CompanyResolver extends CrudResolverFrom(resolverStructure) {

}
