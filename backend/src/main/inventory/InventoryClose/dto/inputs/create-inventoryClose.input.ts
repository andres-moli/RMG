import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsPositive, IsEnum } from 'class-validator';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { InventoryCloseEmun } from '../../emun/inventoryClose.emun';
@InputType()
export class CreateInventoryCloseDetailInput {
  
  @Field(()=> Float)
  @IsNumber()
  entryProduct: number

  @Field(()=> Float)
  @IsNumber()
  exitProduct: number

  
  @Field(()=> Float)
  @IsNumber()
  stock: number

  @Field(() => ID)
  @IsString()
  productId: string;

}
@InputType()
export class CreateInventoryCloseInput {
  
  @Field(()=> Date)
  @IsDate()
  date: Date

  @Field(() => String)
  @IsString()
  description: string; 

  @Field(() => ID)
  @IsString()
  companyId: string;

  @Field(() => InventoryCloseEmun, {nullable: true})
  @IsEnum(InventoryCloseEmun)
  status?: InventoryCloseEmun; 

  // @Field(()=> [CreateInventoryCloseDetailInput])
  // createInventoryCloseDetail: CreateInventoryCloseDetailInput
}

