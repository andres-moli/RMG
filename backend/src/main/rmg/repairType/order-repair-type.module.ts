import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepairType } from "./entities/repairType";
import { OrderRepairTypeResolver } from "./resolvers/order-repair-type.resolver";
import { OrderRepairTypeService } from "./service/order-repair-type.service";
import { RepairField } from "./entities/repairFieldType";


@Module({
  providers: [OrderRepairTypeResolver,OrderRepairTypeService],
  imports:[
    TypeOrmModule.forFeature([RepairType,RepairField]),
  ],
  exports: [OrderRepairTypeService]
})
export class OrderRepairTypeModule {}
