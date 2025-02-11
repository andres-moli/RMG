import { InputType, Field, Float, PartialType, ID } from '@nestjs/graphql';
import { IsString, ValidateNested, IsArray, IsEnum, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { FieldTypeEnum } from '../emun/FieldTypeEnum';
import { CreateRepairTypeInput } from './create-repair-type.input';

@InputType()
export class UpdateRepairTypeInput extends PartialType(CreateRepairTypeInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
  
  @Field(()=> Boolean)
  @IsBoolean()
  status: boolean
}