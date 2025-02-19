import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsPositive, IsEnum } from 'class-validator';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { StatusExpenses } from '../../emun/expenses.emun';
import { paymentMethodEnum } from 'src/main/inventory/invoice/emun/invoice.emun';

@InputType()
export class CreateExpensesInput {
  
  @Field(() => String)
  @IsString()
  description: string; // Descripción del gasto

  @Field(() => Float)
  @IsNumber()
  amount: number; // Monto del gasto

  @Field(() => Date)
  @IsDate()
  expenseDate?: Date; // Fecha del gasto

  @Field(() => ID)
  @IsString()
  categoryId: string; // Categoría del gasto
  @Field(() => ID)
  @IsString()
  countId: string; // Categoría del gasto

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean; // Si el gasto es recurrente

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  nextDueDate?: Date; // Próxima fecha de pago si es recurrente

  @Field(() => paymentMethodEnum)
  @IsString()
  paymentMethod: paymentMethodEnum; // Método de pago

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  referenceNumber?: string; // Número de referencia (opcional)

  @Field(() => StatusExpenses, { nullable: true })
  @IsOptional()
  @IsEnum(StatusExpenses)
  status?: StatusExpenses; // Estado del gasto (Pendiente, Pagado, Cancelado)
}
@InputType()
export class CreateExpensesWorkerInput {
  
  @Field(() => Float)
  @IsNumber()
  amount: number; // Monto del gasto

  @Field(() => ID)
  @IsString()
  companyId: string;

  @Field(() => ID)
  @IsString()
  workerId: string;

  @Field(() => paymentMethodEnum)
  @IsEnum(paymentMethodEnum)
  paymentMethod: paymentMethodEnum 

}
