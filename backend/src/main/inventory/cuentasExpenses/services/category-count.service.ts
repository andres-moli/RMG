import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CountExpenses } from '../entities/cuentasExpenses.entity';
import { CreateCountExpensesInput } from '../dto/inputs/create-expenses-count.input';
import { UpdateCountExpensesInput } from '../dto/inputs/update-expenses-count.input';
import { FindCountExpensesArgs } from '../dto/args/find-count-expenses.args';
// import { CompanyService } from '../../company/services/company.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { UsersService } from 'src/security/users/services/users.service';

export const serviceStructure = CrudServiceStructure({
  entityType: CountExpenses,
  createInputType: CreateCountExpensesInput,
  updateInputType: UpdateCountExpensesInput,
  findArgsType: FindCountExpensesArgs,
});

@Injectable()
export class CountExpensesService extends CrudServiceFrom(serviceStructure) {
  // constructor(
  //   private readonly companyService: CompanyService
  // ){ super(); }

}
