import { IsString } from 'class-validator';
import { CreateProductInput } from './create-products.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductsInput extends PartialType(CreateProductInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
