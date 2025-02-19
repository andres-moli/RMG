import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { NumberFilter } from 'src/patterns/crud-pattern/classes/inputs/number-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';


@InputType({ isAbstract: true })
class FindCotizacionWhere {
  @Field(() => StringFilter)
  description: StringFilter;

  @Field(() => DateFilter)
  client: DateFilter

  @Field(() => StringFilter)
  status:StringFilter
  
  @Field(() => StringFilter)
  company:StringFilter

  @Field(() => DateFilter)
  createdAt:DateFilter

}

@InputType({ isAbstract: true })
class FindCotizacionOrderBy {
  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;

}

@ArgsType()
export class FindCotizacionArgs extends FindArgs(
  FindCotizacionWhere,
  FindCotizacionOrderBy,
) {

}
