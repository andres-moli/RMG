import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, ValidateNested, IsArray, IsEnum, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { FieldTypeEnum } from '../emun/FieldTypeEnum';

@InputType()
export class CreateRepairFieldInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => FieldTypeEnum)
  @IsEnum(FieldTypeEnum)
  type: FieldTypeEnum;

  @Field(() => Boolean)
  @IsBoolean()
  isRequired: boolean;

  @Field(() => Float, {nullable: true})
  @IsNumber()
  @IsOptional()
  minLength?: number;

  
  @Field(() => Float, {nullable: true})
  @IsNumber()
  @IsOptional()
  maxLength?: number;
}

@InputType()
export class CreateRepairTypeInput {
  @Field(() => String)
  @IsString()
  name: string;


  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  costEstimate?: number;

  @Field(() => [CreateRepairFieldInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRepairFieldInput)
  fields?: CreateRepairFieldInput[];
}
