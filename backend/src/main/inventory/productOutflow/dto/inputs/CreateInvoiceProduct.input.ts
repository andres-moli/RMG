import { Field, InputType, Float, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceProductInput {
  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field(() => Float, { nullable: true })
  tax?: number;
  @Field(() => Float, { nullable: true })
  total?: number;

  @Field(() => ID)
  productId: string;
}
@InputType()
export class CreateInvoiceServiceInput {
  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field(() => Float, { nullable: true })
  tax?: number;

  @Field(() => Float, { nullable: true })
  total?: number;

  @Field(() => ID)
  serviceId: string;
}