import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsPositive } from 'class-validator';
import { Field, Float, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  
  @IsString()
  @Field(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsNumber()
  @IsPositive()
  @Field(() => Float)
  salePrice: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Field(() => Float, { nullable: true })
  costPrice?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Field(() => Float, { nullable: true })
  minStock?: number;
  
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Field(() => Float, { nullable: true })
  tax?: number;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  unitOfMeasure?: string;

  @IsBoolean()
  @Field(() => Boolean)
  isActive: boolean;
  @Field(() => Boolean, {nullable: true})
  @IsOptional()
  isShowPublic?: boolean
  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  expirationDate?: Date;
  @Field(() => ID, {nullable: true})
  @IsString()
  @IsOptional()
  fileId?: string
  @IsString()
  @Field(() => ID)
  companyId: string;  // Assuming you would be referencing the `Company` by its ID
}
