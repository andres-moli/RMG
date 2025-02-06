import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomFieldValue } from "./entities/customFieldValue";
import { CustomFieldValueService } from "./service/custom-field-value.service";
import { CustomFieldValueResolver } from "./resolvers/custom-field-value.resolver";


@Module({
  providers: [CustomFieldValueService,CustomFieldValueResolver],
  imports:[
    TypeOrmModule.forFeature([CustomFieldValue]),
  ],
  exports: [CustomFieldValueService]
})
export class CustomFieldValueModule {}
