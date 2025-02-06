import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { Company } from '../entities/company.entity';
import { CreateCompanyInput } from '../dto/inputs/create-company.input';
import { UpdateCompanyInput } from '../dto/inputs/update-company.input';
import { FindCompanysArgs } from '../dto/args/find-company.args';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { UsersService } from 'src/security/users/services/users.service';
import { FilesService } from 'src/general/files/services/files.service';
import { ParameterService } from 'src/general/parameters/service/parameter.service';
import { AddClienteNewCompanyInput } from '../dto/inputs/add-cliente-new-company';

export const serviceStructure = CrudServiceStructure({
  entityType: Company,
  createInputType: CreateCompanyInput,
  updateInputType: UpdateCompanyInput,
  findArgsType: FindCompanysArgs,
});

@Injectable()
export class CompanyService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FilesService,
    private readonly paramaterService: ParameterService
  ){ super(); }
  async afterCreate(context: IContext, repository: Repository<Company>, entity: Company, createInput: CreateCompanyInput): Promise<void> {
    await this.createDefaultCategoryExpense(context,entity);
    await this.createDefaultParameter(context,entity)
  }
  async addClientToNewCompany(context: IContext, arg: AddClienteNewCompanyInput){

  }
  async createDefaultParameter(context: IContext, entity: Company){
    // const parametersDefualt: CreateParametersInput[] = [
    //   {
    //     companyId: entity.id,
    //     name: 'HORA DE APERTURA',
    //     codigo: 'HOURS-OPEN',
    //     descripcion:  'HORA DE APERTURA DE LA SUCURSAL HORA MILITAR EJEMPLO (8 - 9 - 10)',
    //     type: TypeParameterEnum.number,
    //     valueInt: 8
    //   },
    //   {
    //     companyId: entity.id,
    //     name: 'HORA DE CIERRE',
    //     codigo: 'HOURS-CLOSE',
    //     descripcion:  'HORA DE CIERRE DE LA SUCURSAL HORA MILITAR EJEMPLO (20 - 21 - 22)',
    //     type: TypeParameterEnum.number,
    //     valueInt: 20
    //   }
    // ]
    // for(const parameterDefualt of parametersDefualt){
    //   await this.paramaterService.create(context, parameterDefualt)
    // }
  }
  async createDefaultCategoryExpense(context: IContext, entity:Company){
    // const cateogoryExpenses = [
    //   {
    //     company: entity,
    //     isDefualtCategory: true,
    //     name: 'PAGO DE PERSONAL',
    //     status: StatusCategoryExpenses.ACTIVO,
    //     description: 'PAGO DE PERSONAL CREADO POR DEFECTO'
    //   },
    //   {
    //     company: entity,
    //     isDefualtCategory: true,
    //     name: 'PAGO DE SOFTWARE ADMISTRATIVO',
    //     status: StatusCategoryExpenses.ACTIVO,
    //     description: 'PAGO DE SOFTWARE ADMISTRATIVO'
    //   }
    // ]
    // const repository = this.getRepository(context);
    // const manager = repository.manager;
    // const create =  manager.create(CategoryExpenses,cateogoryExpenses);
    // await manager.save(create);

  }
  async beforeCreate(context: IContext, repository: Repository<Company>, entity: Company, createInput: CreateCompanyInput): Promise<void> {
    entity.user = await this.usersService.findOne(context, createInput.userId,true);
    if(createInput.fileId){
      entity.file = await this.fileService.findOne(context,createInput.fileId,true)
    }
  }

}
