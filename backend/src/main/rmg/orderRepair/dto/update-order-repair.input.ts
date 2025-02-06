import { IsEnum, IsString } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateOrderRepairInput } from './create-order-repair.input';
import { OrderStatusEnum } from '../enum/emunOrderRepair';

@InputType()
export class UpdateOrderRepairInput extends PartialType(CreateOrderRepairInput) {
  
  @Field(() => ID)
  @IsString()
  id: string;
  
  @Field(() => OrderStatusEnum)
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
    
}
