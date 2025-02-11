import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRepairty } from "./entities/orderRepair.entity";
import { OrderRepairService } from "./service/order-repair.service";
import { OrderRepairResolver } from "./resolvers/order-repair.resolver";
import { ClientModule } from "../client/client.module";
import { OrderRepairTypeModule } from "../repairType/order-repair-type.module";
import { CustomFieldValueModule } from "../customFieldValue/custom-field-value.module";
import { RepairFieldForm } from "./entities/repairFieldTypeForm";
import { FilesModule } from "src/general/files/files.module";
import { PdfGeneratorController } from "./controller/pdf-generator.controller";
import { PdfGeneratorService } from "./service/pdf-generator.service";


@Module({
  providers: [OrderRepairService,OrderRepairResolver, PdfGeneratorService],
  controllers: [PdfGeneratorController],
  imports:[
    TypeOrmModule.forFeature([OrderRepairty,RepairFieldForm ]),
    ClientModule,
    OrderRepairTypeModule,
    CustomFieldValueModule,
    FilesModule
  ],
  exports: [OrderRepairService]
})
export class OrderRepairModule {}
