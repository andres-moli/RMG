import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { InventoryClose } from '../entities/inventoryClose.entity';
import { CreateInventoryCloseInput } from '../dto/inputs/create-inventoryClose.input';
import { UpdateInventoryCloseInput } from '../dto/inputs/update-inventoryClose.input';
import { FindInventoryCloseArgs } from '../dto/args/find-inventoryClose.args';
import { CompanyService } from 'src/main/company/services/company.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Not, Repository } from 'typeorm';
import { User } from 'src/security/users/entities/user.entity';
import moment from 'moment';
import { MailService } from 'src/general/email/service/email.service';
import { formatCurrency } from 'src/common/functions';
import { InventoryCloseDetail } from '../entities/inventoryCloseDetail.entity';
import { ProductsService } from '../../products/services/products.service';
import { InventoryCloseEmun } from '../emun/inventoryClose.emun';

export const serviceStructure = CrudServiceStructure({
  entityType: InventoryClose,
  createInputType: CreateInventoryCloseInput,
  updateInputType: UpdateInventoryCloseInput,
  findArgsType: FindInventoryCloseArgs,
});

@Injectable()
export class InventoryCloseService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly companyService: CompanyService,
    private readonly mailService: MailService,
    private readonly productService: ProductsService
  ){ super(); }

  async beforeCreate(context: IContext, repository: Repository<InventoryClose>, entity: InventoryClose, createInput: CreateInventoryCloseInput): Promise<void> {
    // if(createInput.companyId){
    //   entity.company = await this.companyService.findOne(context, createInput.companyId, true);
    // }
    entity.status = InventoryCloseEmun.REALIZADO;
    entity.user = (context.user as User);
  }

  async afterCreate(context: IContext, repository: Repository<InventoryClose>, entity: InventoryClose, createInput: CreateInventoryCloseInput): Promise<void> {
    // const fechaInicio = await this.lastOneDateInventory(context, entity);
    // const data = await this.statisticService.getStockProductsFilterDay(fechaInicio,moment().format('YYYY-MM-DD HH:mm:ss'),createInput.companyId);
    // const manager = repository.manager;
    // for(const detail of data){
    //   const product = await this.productService.findOne(context,detail.id);
    //   if(product){
    //     const create = manager.create(InventoryCloseDetail, {
    //       company: await entity.company,
    //       entryProduct: detail.entrada_producto,
    //       exitProduct: detail.salida_producto,
    //       stock: detail.stock,
    //       product: product,
    //       InventoryClose: entity,
    //     })
    //     await manager.save(create)
    //   }
    // }
    // this.sendMail(entity)
  }
  async sendMail(InventoryClose:InventoryClose ){
  }
  async lastOneDateInventory(context: IContext, entity: InventoryClose){
    const repository = this.getRepository(context);
    const findOneLast = await repository.findOne({
      order: {
        date: 'DESC'
      },
      where:{
        // company:  {
        //   id:  (await entity.company).id
        // },
        id: Not(entity.id)
      }
    })
    return findOneLast ? moment(findOneLast.date).format('YYYY-MM-DD HH:mm:ss') : moment().subtract(2, 'months').format('YYYY-MM-DD HH:mm:ss')

  }

}
