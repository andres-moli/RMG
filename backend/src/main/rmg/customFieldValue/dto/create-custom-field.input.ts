import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCustomFieldValueInput {
  @Field(() => String)
  @IsUUID()
  fieldId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  valorTexto?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  valorFecha?: Date;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  valorNumerico?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  valorTextoLargo?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  valorFotoId?: string;

  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  valorSeletor?: string
}
