import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsPositive, IsNotEmpty } from 'class-validator';
import { Field, Float, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInflowInput {
  @Field(() => ID)
  @IsNotEmpty()
  productId: number;

  @Field(() => ID)
  @IsNotEmpty()
  companyId: number;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  inflowDate: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string; 
}
