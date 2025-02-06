import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DateFilter } from 'src/patterns/crud-pattern/classes/inputs/date-filter.input';
import { StringFilter } from 'src/patterns/crud-pattern/classes/inputs/string-filter.input';
import { OrderByTypes } from 'src/patterns/crud-pattern/enums/order-by-type.enum';
import { FindArgs } from 'src/patterns/crud-pattern/mixins/find-args.mixin';


@InputType({ isAbstract: true })
class FindInvoiceWhere {
  @Field(() => StringFilter)
  invoiceNumber: StringFilter;

  @Field(() => DateFilter)
  issueDate: DateFilter;

  @Field(() => StringFilter)
  cliente: StringFilter

  @Field(() => StringFilter)
  worker: StringFilter

  @Field(() => StringFilter)
  company: StringFilter

  @Field(() => StringFilter)
  cita: StringFilter

  @Field(() => StringFilter)
  status: StringFilter
}

@InputType({ isAbstract: true })
class FindInvoiceOrderBy {
  @Field(() => OrderByTypes)
  invoiceNumber: OrderByTypes;

  @Field(() => OrderByTypes)
  issueDate: OrderByTypes;

  @Field(() => OrderByTypes)
  createdAt: OrderByTypes;
}

@ArgsType()
export class FindInvoicesArgs extends FindArgs(
  FindInvoiceWhere,
  FindInvoiceOrderBy,
) {
  // @Field()
  // forced:boolean;
}
