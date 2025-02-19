import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { Expense } from '../entities/expenses.entity';
import { CreateExpensesInput, CreateExpensesWorkerInput } from '../dto/inputs/create-expenses.input';
import { UpdateExpensesInput } from '../dto/inputs/update-expenses.input';
import { FindExpensesArgs } from '../dto/args/find-expenses.args';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
// import { CompanyService } from '../../company/services/company.service';
import { CategoryExpensesService } from '../../CategoryExpenses/services/category-expenses.service';
import { User } from 'src/security/users/entities/user.entity';
import { StatusExpenses } from '../emun/expenses.emun';
import { UsersService } from 'src/security/users/services/users.service';
import { formatCurrency } from 'src/common/functions';
import { CountExpensesService } from '../../cuentasExpenses/services/category-count.service';

export const serviceStructure = CrudServiceStructure({
  entityType: Expense,
  createInputType: CreateExpensesInput,
  updateInputType: UpdateExpensesInput,
  findArgsType: FindExpensesArgs,
});

@Injectable()
export class ExpensesService extends CrudServiceFrom(serviceStructure) {
  constructor(
    // private readonly companyService: CompanyService,
    private readonly categoryExpensesService: CategoryExpensesService,
    private readonly usersService: UsersService,
    private readonly countService: CountExpensesService
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<Expense>, entity: Expense, createInput: CreateExpensesInput): Promise<void> {
    entity.createdBy = context.user as User
    entity.category = await this.categoryExpensesService.findOne(context,createInput.categoryId,true);
    entity.count = await this.countService.findOne(context,createInput.countId,true)
    // entity.company = await this.companyService.findOne(context,createInput.companyId,true);
    entity.invoiceNumber = await this.generateInvoiceNumber(repository,createInput);
    entity.status = StatusExpenses.PAGADA
  }

  async createExpensesWoker(context: IContext, input: CreateExpensesWorkerInput){

  }

  async generateInvoiceNumber(repository: Repository<Expense>, createInput: CreateExpensesInput) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);  // Mes con dos dígitos
    const day = ('0' + currentDate.getDate()).slice(-2);  // Día con dos dígitos


    const baseInvoiceNumber = `EXP${year}${month}${day}`;

    // Obtener el último número de factura generado para el mismo día
    const lastFactura = await repository
      .createQueryBuilder('expense')
      .where('expense.invoiceNumber LIKE :baseInvoiceNumber', { baseInvoiceNumber: `${baseInvoiceNumber}%` })
      // .andWhere('expense.company = :companyId', {companyId: createInput.companyId})
      .orderBy('expense.invoiceNumber', 'DESC')
      .getOne();

    let sequenceNumber = '000001';  // Si no hay facturas previas, empezamos en 000001

    if (lastFactura) {
      // Obtener el número de secuencia de la última factura del día
      const lastSequence = parseInt(lastFactura.invoiceNumber.split('-')[1], 10);
      sequenceNumber = ('000000' + (lastSequence + 1)).slice(-6);  // Aumentar el número y asegurarse de que tenga 6 dígitos
    }

    // Asignar el número de factura final
    return `${baseInvoiceNumber}-${sequenceNumber}`;
  }
}
