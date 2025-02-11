import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsPositive, IsEnum } from 'class-validator';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { StatusCategoryExpenses } from '../../emun/expenses.emun';

@InputType()
export class CreateCategoryExpensesInput {
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string; // Descripción del gasto
  @Field(() => String)
  @IsString()
  name: string; // Fecha del gasto



  @Field(() => StatusCategoryExpenses, { nullable: true })
  @IsOptional()
  @IsEnum(StatusCategoryExpenses)
  status?: StatusCategoryExpenses; 
}
