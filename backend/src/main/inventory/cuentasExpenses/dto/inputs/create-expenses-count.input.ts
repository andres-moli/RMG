import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsPositive, IsEnum } from 'class-validator';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { StatusCountExpenses } from '../../emun/countExpenses.emun';

@InputType()
export class CreateCountExpensesInput {
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string; // Descripción del gasto

  @Field(() => String)
  @IsString()
  name: string; 

  @Field(() => String)
  @IsString()
  numberCount: string
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  nameBank?: string; // Descripción del gasto

  @Field(() => StatusCountExpenses, { nullable: true })
  @IsOptional()
  @IsEnum(StatusCountExpenses)
  status?: StatusCountExpenses; 
}
