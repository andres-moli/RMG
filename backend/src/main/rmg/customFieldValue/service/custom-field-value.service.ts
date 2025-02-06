import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CustomFieldValue } from '../entities/customFieldValue';
import { CreateCustomFieldValueInput } from '../dto/create-custom-field.input';
import { UpdateCustomFieldInput } from '../dto/update-custom-field.input';
import { FindCustomFieldValueTypeArgs } from '../dto/find-arg-custom-field';


export const serviceStructure = CrudServiceStructure({
  entityType: CustomFieldValue,
  createInputType: CreateCustomFieldValueInput,
  updateInputType: UpdateCustomFieldInput,
  findArgsType: FindCustomFieldValueTypeArgs,
});

@Injectable()
export class CustomFieldValueService extends CrudServiceFrom(serviceStructure) {


}
