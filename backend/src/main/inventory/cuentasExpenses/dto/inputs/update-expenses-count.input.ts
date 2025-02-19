import { IsString } from 'class-validator';
import { CreateCountExpensesInput } from './create-expenses-count.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCountExpensesInput extends PartialType(CreateCountExpensesInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
