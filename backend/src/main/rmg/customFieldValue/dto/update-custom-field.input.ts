import { InputType, Field, Float, PartialType, ID } from '@nestjs/graphql';
import { IsString, ValidateNested, IsArray, IsEnum, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CreateCustomFieldValueInput } from './create-custom-field.input';

@InputType()
export class UpdateCustomFieldInput extends PartialType(CreateCustomFieldValueInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}