import { IsString } from 'class-validator';
import { CreateProductOutflowInput } from './create-productsOutflow.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductsOutflowInput extends PartialType(CreateProductOutflowInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
