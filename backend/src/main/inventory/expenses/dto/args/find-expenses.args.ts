import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { NumberFilter } from 'src/patterns/crud-pattern/classes/inputs/number-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';


@InputType({ isAbstract: true })
class FindExpensesWhere {
  @Field(() => StringFilter)
  description: StringFilter;

  @Field(() => DateFilter)
  expenseDate: DateFilter

  @Field(() => StringFilter)
  status:StringFilter
  
  @Field(() => StringFilter)
  company:StringFilter

  @Field(() => StringFilter)
  createdBy:StringFilter

}

@InputType({ isAbstract: true })
class FindExpensesOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

}

@ArgsType()
export class FindExpensesArgs extends FindArgs(
  FindExpensesWhere,
  FindExpensesOrderBy,
) {

}
