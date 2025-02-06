import { Injectable } from '@nestjs/common';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { RepairType } from '../entities/repairType';
import { CreateRepairTypeInput } from '../dto/create-repair-type.input';
import { FindOrderRepairTypeArgs } from '../dto/find-arg-order-type-repair';
import { UpdateRepairTypeInput } from '../dto/update-repair-type.input';

export const serviceStructure = CrudServiceStructure({
  entityType: RepairType,
  createInputType: CreateRepairTypeInput,
  updateInputType: UpdateRepairTypeInput,
  findArgsType: FindOrderRepairTypeArgs,
});

@Injectable()
export class OrderRepairTypeService extends CrudServiceFrom(serviceStructure) {


}
