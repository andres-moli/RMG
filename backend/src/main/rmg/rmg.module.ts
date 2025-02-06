import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { OrderRepairModule } from './orderRepair/order-repair.module';
import { OrderRepairTypeModule } from './repairType/order-repair-type.module';
import { CustomFieldValueModule } from './customFieldValue/custom-field-value.module';

@Module({
  imports: [ClientModule,OrderRepairModule,OrderRepairTypeModule,CustomFieldValueModule]
})
export class RmgModule {}
