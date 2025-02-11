import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDate, IsDecimal, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TypeClientEnum } from '../../emun/client.enum';
import { UserDocumentTypes } from 'src/common/enum/document-type.enum';

@InputType()
export class CreateClientInput {
    @Field(() => String)
    @IsString()
    name:string;

    @Field(() => String)
    @IsString()
    lastName:string;
    @Field(() => UserDocumentTypes)
    @IsNotEmpty()
    @IsEnum(UserDocumentTypes)
    identificationType:UserDocumentTypes;
    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    numberDocument?:string;

    @Field(() => String)
    @IsString()
    celular: string;
  
    @Field(() => String, {nullable: true})
    @IsEmail()
    @IsOptional()
    email?:string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    address?:string;
}
