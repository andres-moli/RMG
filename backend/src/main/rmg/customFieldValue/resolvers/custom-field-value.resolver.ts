import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CrudResolverStructure } from 'src/security/auth/utils/crud.utils';
import { AnyUser } from 'src/security/auth/decorators/user-types.decorator';
import { CrudResolverFrom } from 'src/patterns/crud-pattern/mixins/crud-resolver.mixin';
import { CustomFieldValue } from '../entities/customFieldValue';
import { CustomFieldValueService, serviceStructure } from '../service/custom-field-value.service';

export const resolverStructure = CrudResolverStructure({
      ...serviceStructure,
      serviceType:CustomFieldValueService,
      //if you want to disable any crud method just comment one of the following lines
      create:{ 
            name:"createCustomFieldValue",
            decorators:[AnyUser],
      },
      update:{ 
            name:"updateCustomFieldValue",
            decorators:[AnyUser],
      },
      remove:{ 
            name:"removeCustomFieldValue",
            decorators:[AnyUser],
      },
      findOne: { 
            name:"customFieldValue",
            decorators:[AnyUser], 
      },
      findAll: { 
            name: "customFieldValues" ,
            decorators:[AnyUser], 
      },
      //Class Decorators
      classDecorators:[
          //not needed because its used by default  
          //  () => UseGuards(SecurityAuthGuard)
      ]
})


@Resolver((of) => CustomFieldValue)
export class CustomFieldValueResolver extends CrudResolverFrom(resolverStructure) {
}
