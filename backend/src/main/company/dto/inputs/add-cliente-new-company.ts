import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class AddClienteNewCompanyInput {
    

    @Field(() => ID)
    @IsString()
    userId: string

    @Field(() => ID)
    @IsString()
    companyId: string;

}
