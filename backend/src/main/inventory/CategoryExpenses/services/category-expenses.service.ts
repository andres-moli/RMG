import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CategoryExpenses } from '../entities/CategoryExpenses.entity';
import { CreateCategoryExpensesInput } from '../dto/inputs/create-expenses.input';
import { UpdateCategoryExpensesInput } from '../dto/inputs/update-expenses.input';
import { FindCategoryExpensesArgs } from '../dto/args/find-category-expenses.args';
// import { CompanyService } from '../../company/services/company.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { UsersService } from 'src/security/users/services/users.service';

export const serviceStructure = CrudServiceStructure({
  entityType: CategoryExpenses,
  createInputType: CreateCategoryExpensesInput,
  updateInputType: UpdateCategoryExpensesInput,
  findArgsType: FindCategoryExpensesArgs,
});

@Injectable()
export class CategoryExpensesService extends CrudServiceFrom(serviceStructure) {
  // constructor(
  //   private readonly companyService: CompanyService
  // ){ super(); }

  public async findOneCategoryDefualt(context: IContext, key: string, orfail?: boolean){
    const repository = this.getRepository(context);
    if(!key && orfail) throw new Error(`NO SE ENVIO EL PARAMETRO ${key} PARA REALIZAR EL GASTO`);
    const findOne = await repository.findOne({
      where: {
        name: key,
        isDefualtCategory: true
      }
    })
    if(!findOne && orfail)  throw new Error(`NO SE ENCONTRO EL PARAMETRO ${key} EN LA DB PARA REALIZAR EL GASTO`);
    return findOne

  }
}
