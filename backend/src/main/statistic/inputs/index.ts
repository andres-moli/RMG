import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class BalanceInput {
  @Field()
  @IsString()
  fechaInicio: string;

  @Field()
  @IsString()

  fechaFin: string;

  @Field()
  @IsString()
  companyId: string;
}

@InputType()
export class GetFacturadoPorTrabajadorInput {
  @Field(() => ID)
  @IsString()
  companyId: string;

  @Field(() => String)
  @IsString()

  fechaInicio: string;

  @Field(() => String)
  @IsString()
  fechaFin: string;
}
