import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { paymentMethodEnum, StatusInvoice } from '../../emun/invoice.emun';

@InputType()
export class CreateInvoiceInput {
    
    @Field(() => Date)
    @IsDate()
    issueDate: Date;

    @Field(() => Date, {nullable: true})
    @IsDate()
    @IsOptional()
    dueDate: Date;

    @Field(() => ID)
    @IsString()
    clienteId: string;


    @Field(() => ID)
    @IsString()
    orderRepairId: string;

    @Field(()=> Float, {nullable: true})
    @IsOptional()
    subtotal?: number;

    @Field(()=> Float, {nullable: true})
    @IsOptional()
    tax?: number;

    @Field(()=> Float, {nullable: true})
    @IsOptional()
    total?: number;

    @Field(()=> Float, {nullable: true})
    @IsOptional()
    discount?: number;

    @Field(()=> StatusInvoice)
    @IsEnum(StatusInvoice)
    status: StatusInvoice;

    @Field(() => paymentMethodEnum, {nullable: true})
    @IsOptional()
    paymentMethod?:paymentMethodEnum;

    @Field(() => String, {nullable: true})
    @IsOptional()
    paymentReference?:string;

    
    @Field(() => String, {nullable: true})
    @IsOptional()
    description?:string;
}
