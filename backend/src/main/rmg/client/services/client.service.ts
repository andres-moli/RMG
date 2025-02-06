import { Injectable } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateClientInput } from '../dto/inputs/create-client.input';
import { UpdateClientInput } from '../dto/inputs/update-client.input';
import { FindCitiesArgs } from 'src/general/city/dto/args/find-cities.arg';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { ClientNotificationService } from './client.notification.service';
import { FindClientArgs } from '../dto/args/find-client.args';
import { User } from 'src/security/users/entities/user.entity';
import { DepartmentService } from 'src/general/department/services/department.service';
import { CityService } from 'src/general/city/services/city.service';
import { MailService } from 'src/general/email/service/email.service';
import { ClientContactService } from './client-contact.service';
import { ClientContact } from '../entities/client-contact.entity';
import { UsersService } from 'src/security/users/services/users.service';
import { City } from 'src/general/city/entities/city.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: Client,
  createInputType: CreateClientInput,
  updateInputType: UpdateClientInput,
  findArgsType: FindClientArgs,
});

@Injectable()
export class ClientService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly clientNotification:ClientNotificationService,
    private readonly departmentService: DepartmentService,
    private readonly cityService: CityService,
    private readonly mailService: MailService,
    private readonly userService: UsersService

  ){ super(); }

  async beforeCreate(context:IContext,repository: Repository<Client>, entity: Client, createInput: CreateClientInput): Promise<void> {
    const oldClient = await repository.findOne({
      where: {
        numberDocument: createInput.numberDocument
      }
    })
    if(oldClient) throw new Error(`ya existe un cliente con este nit - [${createInput.numberDocument}]`)
  }

  async beforeUpdate(context: IContext, repository: Repository<Client>, entity: Client, updateInput: UpdateClientInput): Promise<void> {

  }

  async findOneOrCreate(queryRunner: QueryRunner,createInput: CreateClientInput){
    const findOne = await queryRunner.manager.findOne(Client,{
      where: {
        numberDocument: createInput.numberDocument
      }
    })
    if(findOne){
      return findOne
    }
    const create = this.getRepository({user: undefined}).create(createInput);
    const save = await queryRunner.manager.save(create)
    return save
  }
  async findOneByDocumentNumber(context: IContext, numberDocument: string){
    const findOne = await this.getRepository(context).findOne({
      where: {
        numberDocument: numberDocument
      }
    })
    return findOne
  }

}
