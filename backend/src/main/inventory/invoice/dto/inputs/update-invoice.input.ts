import { IsString } from 'class-validator';
import { CreateInvoiceInput } from './create-invoice.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
    
}
