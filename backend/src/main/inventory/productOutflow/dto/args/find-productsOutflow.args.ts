import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { NumberFilter } from 'src/patterns/crud-pattern/classes/inputs/number-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';


@InputType({ isAbstract: true })
class FindProductsOutflowWhere {
  @Field(() => StringFilter)
  description: StringFilter;

  @Field(() => StringFilter)
  company: StringFilter

  @Field(() => StringFilter)
  client: StringFilter

  @Field(() => DateFilter)
  inflowDate:DateFilter
  
  @Field(() => StringFilter)
  user: StringFilter

  @Field(() => StringFilter)
  status: StringFilter
}

@InputType({ isAbstract: true })
class FindProductsOutflowOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

}

@ArgsType()
export class FindProductsOutflowArgs extends FindArgs(
  FindProductsOutflowWhere,
  FindProductsOutflowOrderBy,
) {

}
