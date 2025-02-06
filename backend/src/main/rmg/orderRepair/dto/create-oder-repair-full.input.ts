import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, ValidateNested, IsArray, IsObject } from 'class-validator';
import { CreateCustomFieldValueInput } from '../../customFieldValue/dto/create-custom-field.input';
import { Type } from 'class-transformer';
import { CreateClientInput } from '../../client/dto/inputs/create-client.input';
@InputType()
export class CreateOrderRepairFullInput {
    @Field(()=> CreateClientInput)
    @IsObject()
    client: CreateClientInput;
    
    @Field(() => String)
    @IsUUID()
    repairTypeId: string;

    @Field(() => [CreateCustomFieldValueInput], { nullable: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCustomFieldValueInput)
    fieldValues?: CreateCustomFieldValueInput[];
}
