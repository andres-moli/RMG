import { Injectable } from '@nestjs/common';
import { OrderRepairty } from '../entities/orderRepair.entity';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CreateOrderRepairInput } from '../dto/create-order-repair.input';
import { UpdateOrderRepairInput } from '../dto/update-order-repair.input';
import { FindOrderRepairArgs } from '../dto/find-arg-order-repair';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { DataSource } from 'typeorm';
import { ClientService } from '../../client/services/client.service';
import { CreateOrderRepairFullInput } from '../dto/create-oder-repair-full.input';
import { OrderRepairTypeService } from '../../repairType/service/order-repair-type.service';
import { CustomFieldValueService } from '../../customFieldValue/service/custom-field-value.service';
import { RepairField } from '../../repairType/entities/repairFieldType';
import { CustomFieldValue } from '../../customFieldValue/entities/customFieldValue';
import { OrderStatusEnum } from '../enum/emunOrderRepair';
import * as QRCode from 'qrcode';
import { RepairStatusView } from '../entities/vStatusRepair.view.entity';
import { FieldTypeEnum } from '../../repairType/emun/FieldTypeEnum';
import { FilesService } from 'src/general/files/services/files.service';

export const serviceStructure = CrudServiceStructure({
  entityType: OrderRepairty,
  createInputType: CreateOrderRepairInput,
  updateInputType: UpdateOrderRepairInput,
  findArgsType: FindOrderRepairArgs,
});

@Injectable()
export class OrderRepairService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly dataSource: DataSource,
    private readonly clientService: ClientService,
    private readonly orderRepairTypeService: OrderRepairTypeService,
    private readonly customFieldValueService: CustomFieldValueService,
    private readonly fileService: FilesService
  ){
    super();
  }
  // CREAR SERVICIO DONDE RECIVA TODO, LOS DATOS DEL CLIENTE, LAS REPUESTA E IR GUARDANDO 
  // Y GENERAR EL CODIGO QR TODO EN UN SOLO SERVICIO
  async createOrderRepairFull(context: IContext, input: CreateOrderRepairFullInput){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const orderType = await this.orderRepairTypeService.findOne(context, input.repairTypeId, true)
      const client = await this.clientService.findOneOrCreate(queryRunner, input.client);
      const createOrderRepair = this.getRepository({user: undefined}).create({status: OrderStatusEnum.PENDING});
      createOrderRepair.client = client;
      createOrderRepair.repairType = orderType;
      //GUARDAR LOS FIELD QUE HABIAN EN ESE MOMENTO EN RepairFieldForm
      const savrOrderRepair = await queryRunner.manager.save(createOrderRepair);
      for(const field of input.fieldValues){
        const fieldFindOne = await queryRunner.manager.findOne(RepairField, {
          where: {
            id: field.fieldId
          }
        })
        if(fieldFindOne){
          const create =  queryRunner.manager.create(CustomFieldValue,field)
          create.orderRepair = createOrderRepair
          create.field = fieldFindOne
          if(fieldFindOne.type === FieldTypeEnum.IMAGE){
            if(field.valorFotoId){
              create.valorFoto = await this.fileService.findOne(context,field.valorFotoId,true)
            }
          }
          if(fieldFindOne.type === FieldTypeEnum.DATE){
            create.valorFecha = field.valorFecha
          }
          await queryRunner.manager.save(create)
        }
      }
      await queryRunner.commitTransaction();
      return this.generateQr(savrOrderRepair.id,true)
    }catch(error) {
      // Si algo falla, hacer rollback de toda la transacción
      await queryRunner.rollbackTransaction();
      throw error;  // Re-throw el error para que sea capturado por el controlador o middleware
    }finally{
      // Liberar el query runner
      await queryRunner.release();
    }
  }
  async generateQr(data: string, asBase64 = true): Promise<string> {
    if (asBase64) {
      return await QRCode.toDataURL(data, {}); // Retorna el QR en base64
    } else {
      return await QRCode.toString(data, { type: 'svg' }); // Retorna el QR en SVG
    }
  }
  async statictsByStatusRepair(){
    const data = await this.dataSource.query<RepairStatusView[]>('SELECT * FROM V_repair_status')
    return data?.[0]
  }
}
