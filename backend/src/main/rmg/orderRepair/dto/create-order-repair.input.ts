import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCustomFieldValueInput } from '../../customFieldValue/dto/create-custom-field.input';

@InputType()
export class CreateOrderRepairInput {

  @Field(() => String)
  @IsUUID()
  clientId: string;

  @Field(() => String)
  @IsUUID()
  repairTypeId: string;

  @Field(() => [CreateCustomFieldValueInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomFieldValueInput)
  fieldValues?: CreateCustomFieldValueInput[];
}
