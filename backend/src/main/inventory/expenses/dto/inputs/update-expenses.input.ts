import { IsOptional, IsString } from 'class-validator';
import { CreateExpensesInput } from './create-expenses.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateExpensesInput extends PartialType(CreateExpensesInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => ID, {nullable: true})
  @IsOptional()
  @IsString()
  autorizoById?: string;

  @Field(() => ID, {nullable: true})
  @IsOptional()
  @IsString()
  canceldById?: string
    
}
