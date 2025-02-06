import { IsEnum, IsString } from 'class-validator';
import { CreateProductInflowInput } from './create-productsInflow.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { ProductInflowEmun } from '../../emun/productInflow.emun';

@InputType()
export class UpdateProductsInflowInput extends PartialType(CreateProductInflowInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
  
  @Field(() => ProductInflowEmun, {nullable: true})
  @IsEnum(ProductInflowEmun)
  status?: ProductInflowEmun
}
