import { IsString } from 'class-validator';
import { CreateInventoryCloseInput } from './create-inventoryClose.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryCloseInput extends PartialType(CreateInventoryCloseInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
