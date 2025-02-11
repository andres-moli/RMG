import { registerEnumType } from '@nestjs/graphql';

export enum FieldTypeEnum {
  TEXT = 'TEXT',
  LONG_TEXT = 'LONG_TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  IMAGE = 'IMAGE',
  SELECTOR = 'SELECTOR'
}

registerEnumType(FieldTypeEnum, { name: 'FieldTypeEnum' });
