import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCompanyInput {
    
    
    @Field(() => String)
    @IsString()
    name:string;

    @Field(() => String)
    @IsString()
    description: string;

    @Field(() => String)
    @IsString()
    address: string;

    @Field(() => String)
    @IsString()
    @IsEmail()
    email: string;

    
    @Field(() => String)
    @IsString()
    nit: string

    @Field(() => String)
    @IsString()
    phone: string;


    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    facebook?: string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    instagram?: string;
    
    @Field(() => ID, {nullable: true})
    @IsString()
    @IsOptional()
    fileId?: string

    @Field(() => ID)
    @IsString()
    userId: string

}
