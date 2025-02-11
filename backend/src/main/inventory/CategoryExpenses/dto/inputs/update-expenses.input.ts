import { IsString } from 'class-validator';
import { CreateCategoryExpensesInput } from './create-expenses.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryExpensesInput extends PartialType(CreateCategoryExpensesInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
