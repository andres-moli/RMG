import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsPositive, IsNotEmpty, IsEnum } from 'class-validator';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { CreateInvoiceProductInput, CreateInvoiceServiceInput } from './CreateInvoiceProduct.input';
import {paymentMethodEnum, StatusInvoice } from 'src/main/inventory/invoice/emun/invoice.emun';
@InputType()
export class CreateProductOutflowInput {

  @Field(()=> StatusInvoice)
  @IsEnum(StatusInvoice)
  status: StatusInvoice;
  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  inflowDate: Date;
  @Field(() => paymentMethodEnum)
  paymentMethod?:paymentMethodEnum;
  @Field(() => String)
  clientId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string; 
  @Field(() => [CreateInvoiceProductInput])
  invoiceProducts: CreateInvoiceProductInput[];

  @Field(() => [CreateInvoiceServiceInput])
  invoiceServices: CreateInvoiceServiceInput[];
}
