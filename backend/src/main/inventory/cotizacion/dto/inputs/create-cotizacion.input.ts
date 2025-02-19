import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsPositive, IsOptional, IsString } from "class-validator";


@InputType()
export class ItemDto {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  discount: number;

  @Field(() => Float)
  tax: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float)
  total: number;
}
@InputType()
export class CreateCotizacionInput {

  @Field(() => String)
  @IsString()
  clientId: string; // Descripción de la cotización
  
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string; // Descripción de la cotización

  @Field(() => [ItemDto])
  items: ItemDto[];
}

