import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  ValidatePassword: { input: any; output: any; }
};

export type AddAndRemoveRoleInput = {
  roleId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ApprovalTokenInput = {
  code: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type City = {
  __typename?: 'City';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']['output']>;
  celular: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  numberDocument: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ClientContact = {
  __typename?: 'ClientContact';
  celular: Scalars['String']['output'];
  client?: Maybe<Client>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  telefono?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CodeConfirmationInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Company = {
  __typename?: 'Company';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nit: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAndRemoveRoleFxInput = {
  permissions: Array<Scalars['String']['input']>;
  role: Scalars['ID']['input'];
};

export type CreateClientContactInput = {
  celular: Scalars['String']['input'];
  clientId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  position: Scalars['String']['input'];
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  celular: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numberDocument: Scalars['String']['input'];
};

export type CreateCompanyInput = {
  address: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  facebook?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  nit: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateCustomFieldValueInput = {
  fieldId: Scalars['String']['input'];
  valorFecha?: InputMaybe<Scalars['DateTime']['input']>;
  valorFotoId?: InputMaybe<Scalars['String']['input']>;
  valorNumerico?: InputMaybe<Scalars['Float']['input']>;
  valorTexto?: InputMaybe<Scalars['String']['input']>;
  valorTextoLargo?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentTypeInput = {
  document: Scalars['String']['input'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField: Scalars['DateTime']['input'];
  thirdField: Scalars['Float']['input'];
};

export type CreateGroupInput = {
  name: Scalars['String']['input'];
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInventoryCloseInput = {
  companyId: Scalars['ID']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  status?: InputMaybe<InventoryCloseEmun>;
};

export type CreateInvoiceInput = {
  clienteId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  issueDate: Scalars['DateTime']['input'];
  orderRepairId: Scalars['ID']['input'];
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  paymentReference?: InputMaybe<Scalars['String']['input']>;
  status: StatusInvoice;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateInvoiceProductInput = {
  discount?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
  tax?: InputMaybe<Scalars['Float']['input']>;
  unitPrice: Scalars['Float']['input'];
};

export type CreateMultikeyRegisterInput = {
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id: MultikeyRegisterIdInput;
};

export type CreateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype: Scalars['String']['input'];
  type: NotificationType;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  metadata: Scalars['String']['input'];
  name: Scalars['String']['input'];
  notificationConfigId: Scalars['ID']['input'];
};

export type CreateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  metadata: Scalars['String']['input'];
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  notificationGroupName?: InputMaybe<Scalars['ID']['input']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig: Scalars['String']['input'];
  type: TypeNotification;
  typeConfig: NotificationType;
  userId?: InputMaybe<Scalars['ID']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type CreateOrderRepairFullInput = {
  client: CreateClientInput;
  fieldValues?: InputMaybe<Array<CreateCustomFieldValueInput>>;
  repairTypeId: Scalars['String']['input'];
};

export type CreateOrderRepairInput = {
  clientId: Scalars['String']['input'];
  fieldValues?: InputMaybe<Array<CreateCustomFieldValueInput>>;
  repairTypeId: Scalars['String']['input'];
};

export type CreatePageLinkInput = {
  arguments?: InputMaybe<Array<Scalars['String']['input']>>;
  routeType?: InputMaybe<RouterType>;
  target?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateParametersInput = {
  codigo: Scalars['String']['input'];
  descripcion: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: TypeParameterEnum;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePositionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInflowInput = {
  companyId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  inflowDate: Scalars['DateTime']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateProductInput = {
  companyId: Scalars['ID']['input'];
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  isActive: Scalars['Boolean']['input'];
  isShowPublic?: InputMaybe<Scalars['Boolean']['input']>;
  minStock?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  salePrice: Scalars['Float']['input'];
  tax?: InputMaybe<Scalars['Float']['input']>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductOutflowInput = {
  companyId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  inflowDate: Scalars['DateTime']['input'];
  invoiceProducts: Array<CreateInvoiceProductInput>;
  paymentMethod: PaymentMethodEnum;
  status: StatusInvoice;
  userId: Scalars['String']['input'];
};

export type CreateProfileInput = {
  city: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  document: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  region: Scalars['Int']['input'];
};

export type CreateRepairFieldInput = {
  isRequired: Scalars['Boolean']['input'];
  maxLength?: InputMaybe<Scalars['Float']['input']>;
  minLength?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  type: FieldTypeEnum;
};

export type CreateRepairTypeInput = {
  costEstimate?: InputMaybe<Scalars['Float']['input']>;
  fields?: InputMaybe<Array<CreateRepairFieldInput>>;
  name: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  address: Scalars['String']['input'];
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  hasRural?: InputMaybe<Scalars['Boolean']['input']>;
  identificationNumber: Scalars['String']['input'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
  phoneCountryCode?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
  position?: InputMaybe<Scalars['String']['input']>;
  secondSurname?: InputMaybe<Scalars['String']['input']>;
  type: UserTypes;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type CustomFieldValue = {
  __typename?: 'CustomFieldValue';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  field: RepairField;
  id: Scalars['ID']['output'];
  orderRepair: OrderRepairty;
  updatedAt: Scalars['DateTime']['output'];
  valorFecha?: Maybe<Scalars['DateTime']['output']>;
  valorFoto?: Maybe<FileInfo>;
  valorNumerico?: Maybe<Scalars['Float']['output']>;
  valorTexto?: Maybe<Scalars['String']['output']>;
  valorTextoLargo?: Maybe<Scalars['String']['output']>;
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _eq?: InputMaybe<Scalars['DateTime']['input']>;
  _gt?: InputMaybe<Scalars['DateTime']['input']>;
  _gte?: InputMaybe<Scalars['DateTime']['input']>;
  _in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _lt?: InputMaybe<Scalars['DateTime']['input']>;
  _lte?: InputMaybe<Scalars['DateTime']['input']>;
  _neq?: InputMaybe<Scalars['DateTime']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['Int']['output'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DocumentType = {
  __typename?: 'DocumentType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  document: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DoubleVerificationInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  emailVerification?: InputMaybe<Scalars['Boolean']['input']>;
  phoneVerification?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstField: Scalars['String']['output'];
  group?: Maybe<DummyGroup>;
  id: Scalars['ID']['output'];
  items: Array<DummyItem>;
  notification?: Maybe<Notification>;
  phone: Scalars['String']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  type?: Maybe<DummyType>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  family?: Maybe<DummyFamily>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  dummy: Dummy;
  firstField: Scalars['String']['output'];
  fourthField: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyType = {
  __typename?: 'DummyType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmailRecipient = {
  email: Scalars['String']['input'];
  type: RecipientType;
};

export enum FieldTypeEnum {
  Date = 'DATE',
  Image = 'IMAGE',
  LongText = 'LONG_TEXT',
  Number = 'NUMBER',
  Text = 'TEXT'
}

export type FileInfo = {
  __typename?: 'FileInfo';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fileExtension: Scalars['String']['output'];
  fileMode: FileModes;
  fileMongoId?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export enum FileModes {
  Buffer = 'buffer',
  Mongo = 'mongo',
  Url = 'url'
}

export type FindClientContactOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientContactWhere = {
  _and?: InputMaybe<Array<FindClientContactWhere>>;
  _or?: InputMaybe<Array<FindClientContactWhere>>;
  client?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
};

export type FindClientOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientWhere = {
  _and?: InputMaybe<Array<FindClientWhere>>;
  _or?: InputMaybe<Array<FindClientWhere>>;
  city?: InputMaybe<StringFilter>;
  department?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindCompanyOrderBy = {
  name?: InputMaybe<OrderTypes>;
};

export type FindCompanyWhere = {
  _and?: InputMaybe<Array<FindCompanyWhere>>;
  _or?: InputMaybe<Array<FindCompanyWhere>>;
  name?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindCustomFieldValueTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCustomFieldValueTypeWhere = {
  _and?: InputMaybe<Array<FindCustomFieldValueTypeWhere>>;
  _or?: InputMaybe<Array<FindCustomFieldValueTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  field?: InputMaybe<StringFilter>;
};

export type FindDummyFamilyWhere = {
  _and?: InputMaybe<Array<FindDummyFamilyWhere>>;
  _or?: InputMaybe<Array<FindDummyFamilyWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyGroupWhere = {
  _and?: InputMaybe<Array<FindDummyGroupWhere>>;
  _or?: InputMaybe<Array<FindDummyGroupWhere>>;
  family?: InputMaybe<FindDummyFamilyWhere>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyOrderBy = {
  firstField?: InputMaybe<OrderTypes>;
  secondField?: InputMaybe<OrderTypes>;
  thirdField?: InputMaybe<OrderTypes>;
};

export type FindDummyTypeWhere = {
  _and?: InputMaybe<Array<FindDummyTypeWhere>>;
  _or?: InputMaybe<Array<FindDummyTypeWhere>>;
  name?: InputMaybe<StringFilter>;
};

export type FindDummyWhere = {
  _and?: InputMaybe<Array<FindDummyWhere>>;
  _or?: InputMaybe<Array<FindDummyWhere>>;
  firstField?: InputMaybe<StringFilter>;
  group?: InputMaybe<FindDummyGroupWhere>;
  secondField?: InputMaybe<DateFilter>;
  thirdField?: InputMaybe<NumberFilter>;
  type?: InputMaybe<FindDummyTypeWhere>;
};

export type FindInventoryCloseOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindInventoryCloseWhere = {
  _and?: InputMaybe<Array<FindInventoryCloseWhere>>;
  _or?: InputMaybe<Array<FindInventoryCloseWhere>>;
  company?: InputMaybe<StringFilter>;
  date?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindInvoiceOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  invoiceNumber?: InputMaybe<OrderTypes>;
  issueDate?: InputMaybe<OrderTypes>;
};

export type FindInvoiceWhere = {
  _and?: InputMaybe<Array<FindInvoiceWhere>>;
  _or?: InputMaybe<Array<FindInvoiceWhere>>;
  cita?: InputMaybe<StringFilter>;
  cliente?: InputMaybe<StringFilter>;
  company?: InputMaybe<StringFilter>;
  invoiceNumber?: InputMaybe<StringFilter>;
  issueDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindOrderRepairOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindOrderRepairTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindOrderRepairTypeWhere = {
  _and?: InputMaybe<Array<FindOrderRepairTypeWhere>>;
  _or?: InputMaybe<Array<FindOrderRepairTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  name?: InputMaybe<StringFilter>;
};

export type FindOrderRepairWhere = {
  _and?: InputMaybe<Array<FindOrderRepairWhere>>;
  _or?: InputMaybe<Array<FindOrderRepairWhere>>;
  client?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  repairType?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindProductsInflowOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindProductsInflowWhere = {
  _and?: InputMaybe<Array<FindProductsInflowWhere>>;
  _or?: InputMaybe<Array<FindProductsInflowWhere>>;
  company?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  inflowDate?: InputMaybe<DateFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindProductsOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindProductsOutflowOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindProductsOutflowWhere = {
  _and?: InputMaybe<Array<FindProductsOutflowWhere>>;
  _or?: InputMaybe<Array<FindProductsOutflowWhere>>;
  company?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  inflowDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindProductsWhere = {
  _and?: InputMaybe<Array<FindProductsWhere>>;
  _or?: InputMaybe<Array<FindProductsWhere>>;
  company?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type FindUsersOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  email?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindUsersWhere = {
  _and?: InputMaybe<Array<FindUsersWhere>>;
  _or?: InputMaybe<Array<FindUsersWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<Array<UserTypes>>;
};

export type FunctionalityModel = {
  __typename?: 'FunctionalityModel';
  children?: Maybe<Array<FunctionalityModel>>;
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tags?: Maybe<Array<FunctionalityTag>>;
};

export enum FunctionalityTag {
  Controller = 'CONTROLLER',
  Custom = 'CUSTOM',
  Method = 'METHOD',
  Module = 'MODULE',
  Parent = 'PARENT',
  Resolver = 'RESOLVER',
  Standard = 'STANDARD'
}

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notificationConfig?: Maybe<NotificationConfig>;
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type InventoryClose = {
  __typename?: 'InventoryClose';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invoiceProducts: Array<InventoryCloseDetail>;
  status: InventoryCloseEmun;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type InventoryCloseDetail = {
  __typename?: 'InventoryCloseDetail';
  InventoryClose: InventoryClose;
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  entryProduct: Scalars['Float']['output'];
  exitProduct: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  product: Products;
  stock: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum InventoryCloseEmun {
  Cancelado = 'CANCELADO',
  Realizado = 'REALIZADO'
}

export type Invoice = {
  __typename?: 'Invoice';
  cliente: Client;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  invoiceNumber: Scalars['String']['output'];
  issueDate: Scalars['DateTime']['output'];
  orrderReapirty: OrderRepairty;
  paymentMethod?: Maybe<PaymentMethodEnum>;
  paymentReference?: Maybe<Scalars['String']['output']>;
  status: StatusInvoice;
  subtotal?: Maybe<Scalars['Float']['output']>;
  tax?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type InvoiceProduct = {
  __typename?: 'InvoiceProduct';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  product: Products;
  productOutflow: ProductOutflow;
  quantity: Scalars['Int']['output'];
  subtotal: Scalars['Float']['output'];
  tax?: Maybe<Scalars['Float']['output']>;
  total: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']['output']>;
  itemsPerPage?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type MultikeyRegister = {
  __typename?: 'MultikeyRegister';
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: MultikeyRegisterId;
};

export type MultikeyRegisterId = {
  __typename?: 'MultikeyRegisterId';
  id: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type MultikeyRegisterIdInput = {
  id: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserRole: User;
  codeConfirmation: User;
  create: RoleFx;
  createClient: Client;
  createClientContact: ClientContact;
  createCompany: Company;
  createCustomFieldValue: CustomFieldValue;
  createDefaultRoles: Array<Role>;
  createDocumentType: DocumentType;
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createGroup: Group;
  createInventoryClose: InventoryClose;
  createInvoice: Invoice;
  createMultiKeyRegister: MultikeyRegister;
  createNotification: Notification;
  createNotificationConfig: NotificationConfig;
  createNotificationGroup: NotificationGroup;
  createOrderRepair: OrderRepairty;
  createOrderRepairFull: Scalars['String']['output'];
  createOrderRepairType: RepairType;
  createPageLinkInput: PageLink;
  createParameter: Parameter;
  createPositionInput: Position;
  createProduct: Products;
  createProductInflow: ProductInflow;
  createProductOutflow: ProductOutflow;
  createProfile: Profile;
  createRole: Role;
  createRoleFx: Array<RoleFx>;
  createUser: User;
  enableAndDisableDoubleVerification: Scalars['String']['output'];
  i18nTest: Scalars['String']['output'];
  recoverPassword: Scalars['String']['output'];
  remove: NotificationGroup;
  removeClient: Client;
  removeClientContact: ClientContact;
  removeCompany: Company;
  removeCustomFieldValue: CustomFieldValue;
  removeDocumentType: DocumentType;
  removeDummy: Dummy;
  removeGroup: Group;
  removeInventoryClose: InventoryClose;
  removeInvoice: Invoice;
  removeMultiKeyRegister: MultikeyRegister;
  removeNotification: Notification;
  removeNotificationConfig: NotificationConfig;
  removeOrderRepair: OrderRepairty;
  removeOrderRepairType: RepairType;
  removePageLink: PageLink;
  removeParameter: Parameter;
  removePosition: Position;
  removeProduct: Products;
  removeProductInflow: ProductInflow;
  removeProductOutflow: ProductOutflow;
  removeProfile: Profile;
  removeRole: Role;
  removeRoleFx: Array<Scalars['String']['output']>;
  removeUser: User;
  removeUserRole: User;
  replaceAllRolesFx: Array<RoleFx>;
  resetPassword: User;
  resetSuperAdmin: User;
  sendCodeDoubleVerification: Scalars['String']['output'];
  signInAdmin: AuthResponse;
  signUpWithDocument: AuthResponse;
  signUpWithEmail: AuthResponse;
  signin: AuthResponse;
  update: NotificationGroup;
  updateClient: Client;
  updateClientContact: ClientContact;
  updateCompany: Company;
  updateCustomFieldValue: CustomFieldValue;
  updateDocumentType: DocumentType;
  updateDummy: Dummy;
  updateGroup: Group;
  updateInventoryClose: InventoryClose;
  updateInvoice: Invoice;
  updateMultiKeyRegister: MultikeyRegister;
  updateNotification: Notification;
  updateNotificationConfig: NotificationConfig;
  updateOrderRepair: OrderRepairty;
  updateOrderRepairType: RepairType;
  updatePageLinkInput: PageLink;
  updateParameter: Parameter;
  updatePassword: User;
  updatePositionInput: Position;
  updateProduct: Products;
  updateProductInflow: ProductInflow;
  updateProductOutflow: ProductOutflow;
  updateProfile: Profile;
  updateRole: Role;
  updateUser: User;
  updateUserInformation: User;
  updateUserPassword: User;
};


export type MutationAddUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationCodeConfirmationArgs = {
  createInput: CodeConfirmationInput;
};


export type MutationCreateArgs = {
  createInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateClientArgs = {
  createInput: CreateClientInput;
};


export type MutationCreateClientContactArgs = {
  createInput: CreateClientContactInput;
};


export type MutationCreateCompanyArgs = {
  createInput: CreateCompanyInput;
};


export type MutationCreateCustomFieldValueArgs = {
  createInput: CreateCustomFieldValueInput;
};


export type MutationCreateDocumentTypeArgs = {
  createInput: CreateDocumentTypeInput;
};


export type MutationCreateDummyArgs = {
  createInput: CreateDummyInput;
};


export type MutationCreateGroupArgs = {
  createInput: CreateGroupInput;
};


export type MutationCreateInventoryCloseArgs = {
  createInput: CreateInventoryCloseInput;
};


export type MutationCreateInvoiceArgs = {
  createInput: CreateInvoiceInput;
};


export type MutationCreateMultiKeyRegisterArgs = {
  createInput: CreateMultikeyRegisterInput;
};


export type MutationCreateNotificationArgs = {
  createInput: CreateNotificationInput;
};


export type MutationCreateNotificationConfigArgs = {
  createInput: CreateNotificationConfigInput;
};


export type MutationCreateNotificationGroupArgs = {
  createInput: CreateNotificationGroupInput;
};


export type MutationCreateOrderRepairArgs = {
  createInput: CreateOrderRepairInput;
};


export type MutationCreateOrderRepairFullArgs = {
  createOrderRepairFullInput: CreateOrderRepairFullInput;
};


export type MutationCreateOrderRepairTypeArgs = {
  createInput: CreateRepairTypeInput;
};


export type MutationCreatePageLinkInputArgs = {
  createInput: CreatePageLinkInput;
};


export type MutationCreateParameterArgs = {
  createInput: CreateParametersInput;
};


export type MutationCreatePositionInputArgs = {
  createInput: CreatePositionInput;
};


export type MutationCreateProductArgs = {
  createInput: CreateProductInput;
};


export type MutationCreateProductInflowArgs = {
  createInput: CreateProductInflowInput;
};


export type MutationCreateProductOutflowArgs = {
  createInput: CreateProductOutflowInput;
};


export type MutationCreateProfileArgs = {
  createInput: CreateProfileInput;
};


export type MutationCreateRoleArgs = {
  createInput: CreateRoleInput;
};


export type MutationCreateRoleFxArgs = {
  createRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateUserArgs = {
  createInput: CreateUserInput;
};


export type MutationEnableAndDisableDoubleVerificationArgs = {
  doubleVerificationInput: DoubleVerificationInput;
};


export type MutationRecoverPasswordArgs = {
  recoverPasswordInput: RecoverPasswordInput;
};


export type MutationRemoveArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveClientContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCustomFieldValueArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDocumentTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveInventoryCloseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrderRepairArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrderRepairTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePageLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProductInflowArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProductOutflowArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoleFxArgs = {
  removeRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationReplaceAllRolesFxArgs = {
  replaceAllRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationSendCodeDoubleVerificationArgs = {
  sendDoubleVerificationInput: SendDoubleVerificationInput;
};


export type MutationSignInAdminArgs = {
  signInAdminInput: SigninAdminInput;
};


export type MutationSignUpWithDocumentArgs = {
  signupInput: SignupInput;
};


export type MutationSignUpWithEmailArgs = {
  signupInput: SignupEmailInput;
};


export type MutationSigninArgs = {
  signinInput: SigninInput;
};


export type MutationUpdateArgs = {
  updateInput: UpdateNotificationGroupInput;
};


export type MutationUpdateClientArgs = {
  updateInput: UpdateClientInput;
};


export type MutationUpdateClientContactArgs = {
  updateInput: UpdateClientContactInput;
};


export type MutationUpdateCompanyArgs = {
  updateInput: UpdateCompanyInput;
};


export type MutationUpdateCustomFieldValueArgs = {
  updateInput: UpdateCustomFieldInput;
};


export type MutationUpdateDocumentTypeArgs = {
  updateInput: UpdateDocumentTypeInput;
};


export type MutationUpdateDummyArgs = {
  updateInput: UpdateDummyInput;
};


export type MutationUpdateGroupArgs = {
  updateInput: UpdateGroupInput;
};


export type MutationUpdateInventoryCloseArgs = {
  updateInput: UpdateInventoryCloseInput;
};


export type MutationUpdateInvoiceArgs = {
  updateInput: UpdateInvoiceInput;
};


export type MutationUpdateMultiKeyRegisterArgs = {
  updateInput: UpdateMultikeyRegisterInput;
};


export type MutationUpdateNotificationArgs = {
  updateInput: UpdateNotificationInput;
};


export type MutationUpdateNotificationConfigArgs = {
  updateInput: UpdateNotificationConfigInput;
};


export type MutationUpdateOrderRepairArgs = {
  updateInput: UpdateOrderRepairInput;
};


export type MutationUpdateOrderRepairTypeArgs = {
  updateInput: UpdateRepairTypeInput;
};


export type MutationUpdatePageLinkInputArgs = {
  updateInput: CreatePageLinkInput;
};


export type MutationUpdateParameterArgs = {
  updateInput: UpdateParametersInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdatePositionInputArgs = {
  updateInput: UpdatePositionInput;
};


export type MutationUpdateProductArgs = {
  updateInput: UpdateProductsInput;
};


export type MutationUpdateProductInflowArgs = {
  updateInput: UpdateProductsInflowInput;
};


export type MutationUpdateProductOutflowArgs = {
  updateInput: UpdateProductsOutflowInput;
};


export type MutationUpdateProfileArgs = {
  updateInput: UpdateProfileInput;
};


export type MutationUpdateRoleArgs = {
  updateInput: UpdateRoleInput;
};


export type MutationUpdateUserArgs = {
  updateInput: UpdateUserInput;
};


export type MutationUpdateUserInformationArgs = {
  updateUserInformationInput: UpdateUserInformationInput;
};


export type MutationUpdateUserPasswordArgs = {
  updateUserPasswordInput: UpdateUserPasswordInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  externalId?: Maybe<Scalars['ID']['output']>;
  externalMessage?: Maybe<Scalars['String']['output']>;
  hasPersistent: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  notificationConfig: NotificationConfig;
  notificationGroup?: Maybe<NotificationGroup>;
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  stateNotification: StateNotification;
  statePersistent?: Maybe<StatePersistent>;
  type: TypeNotification;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  emailDuplicateCode?: Maybe<Scalars['ID']['output']>;
  emailPrincipalCode?: Maybe<Scalars['ID']['output']>;
  hasEmail: Scalars['Boolean']['output'];
  hasPersistent: Scalars['Boolean']['output'];
  hasPush: Scalars['Boolean']['output'];
  hasSms: Scalars['Boolean']['output'];
  hasTwoStepsEmail: Scalars['Boolean']['output'];
  hasTwoStepsPush: Scalars['Boolean']['output'];
  hasTwoStepsSms: Scalars['Boolean']['output'];
  hasTwoStepsWss: Scalars['Boolean']['output'];
  hasWss: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  persistentHtml?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  smsBody?: Maybe<Scalars['String']['output']>;
  subtype: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  wssCode?: Maybe<Scalars['ID']['output']>;
};

export type NotificationGroup = {
  __typename?: 'NotificationGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  group: Group;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notificationConfig: NotificationConfig;
  stateNotificationGroup: StateNotificationGroup;
  typeNotificationGroup: TypeNotificationGroup;
  updatedAt: Scalars['DateTime']['output'];
};

export enum NotificationType {
  Token = 'Token'
}

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']['input']>>;
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type OrderRepairty = {
  __typename?: 'OrderRepairty';
  client: Client;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryDate?: Maybe<Scalars['DateTime']['output']>;
  fieldValues?: Maybe<Array<CustomFieldValue>>;
  id: Scalars['ID']['output'];
  invoice?: Maybe<Invoice>;
  repairFieldForm?: Maybe<Array<RepairFieldForm>>;
  repairType: RepairType;
  status: OrderStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export enum OrderStatusEnum {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export enum OrderTypes {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageLink = {
  __typename?: 'PageLink';
  arguments?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  routeType?: Maybe<RouterType>;
  target?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Pagination = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Parameter = {
  __typename?: 'Parameter';
  codigo: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: TypeParameterEnum;
  updatedAt: Scalars['DateTime']['output'];
  valueDate?: Maybe<Scalars['DateTime']['output']>;
  valueFile?: Maybe<FileInfo>;
  valueInt?: Maybe<Scalars['Float']['output']>;
  valueString?: Maybe<Scalars['String']['output']>;
};

export enum PersonTypes {
  Legal = 'Legal',
  Natural = 'Natural'
}

export type Position = {
  __typename?: 'Position';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductInflow = {
  __typename?: 'ProductInflow';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inflowDate: Scalars['DateTime']['output'];
  product: Products;
  quantity: Scalars['Int']['output'];
  status: ProductInflowEmun;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum ProductInflowEmun {
  Cancelado = 'CANCELADO',
  Realizado = 'REALIZADO'
}

export type ProductOutflow = {
  __typename?: 'ProductOutflow';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inflowDate: Scalars['DateTime']['output'];
  invoiceProducts: Array<InvoiceProduct>;
  paymentMethod: PaymentMethodEnum;
  status: StatusInvoice;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Products = {
  __typename?: 'Products';
  costPrice?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expirationDate?: Maybe<Scalars['DateTime']['output']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isShowPublic: Scalars['Boolean']['output'];
  minStock?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  salePrice: Scalars['Float']['output'];
  tax?: Maybe<Scalars['Float']['output']>;
  unitOfMeasure?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  city: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  document: Scalars['String']['output'];
  email: Scalars['String']['output'];
  externalId: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  region: Scalars['Int']['output'];
  stateAws?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  Company: Company;
  Companys: Array<Company>;
  CompanysCount: MetadataPagination;
  Count: MetadataPagination;
  InventoryClose: InventoryClose;
  InventoryCloses: Array<InventoryClose>;
  InventoryClosesCount: MetadataPagination;
  Invoice: Invoice;
  Invoices: Array<Invoice>;
  InvoicesCount: MetadataPagination;
  NotificationGroup: NotificationGroup;
  NotificationGroups: Array<NotificationGroup>;
  NotificationGroupsCount: MetadataPagination;
  Product: Products;
  ProductInflow: ProductInflow;
  ProductOutflow: ProductOutflow;
  Products: Array<Products>;
  ProductsCount: MetadataPagination;
  ProductsInflows: Array<ProductInflow>;
  ProductsInflowsCount: MetadataPagination;
  ProductsOutflows: Array<ProductOutflow>;
  ProductsOutflowsCount: MetadataPagination;
  approvalJwt: AuthResponse;
  cities: Array<City>;
  city: City;
  client: Client;
  clientContact: ClientContact;
  clientContacts: Array<ClientContact>;
  clientContactsCount: MetadataPagination;
  clients: Array<Client>;
  clientsCount: MetadataPagination;
  codeRecoverPassword: Scalars['String']['output'];
  countries: Array<Country>;
  country: Country;
  customFieldValue: CustomFieldValue;
  customFieldValues: Array<CustomFieldValue>;
  customFieldValuesCount: MetadataPagination;
  department: Department;
  departments: Array<Department>;
  documentType: DocumentType;
  documentTypes: Array<DocumentType>;
  documentTypesCount: MetadataPagination;
  dummies: Array<Dummy>;
  dummiesCount: MetadataPagination;
  dummy: Dummy;
  file: FileInfo;
  findAll: Array<UserKey>;
  findOne: UserKey;
  findOneArg?: Maybe<Position>;
  findOneByDocumentNumber?: Maybe<Client>;
  findOneByNumberPhone?: Maybe<Client>;
  functionalities: FunctionalityModel;
  genrateQrByRepair: Scalars['String']['output'];
  group: Group;
  groups: Array<Group>;
  groupsCount: MetadataPagination;
  multiKeyRegister: MultikeyRegister;
  multiKeyRegisters: Array<MultikeyRegister>;
  multiKeyRegistersCount: MetadataPagination;
  notification: Notification;
  notificationConfig: NotificationConfig;
  notificationConfigs: Array<NotificationConfig>;
  notificationConfigsCount: MetadataPagination;
  notifications: Array<Notification>;
  notificationsCount: MetadataPagination;
  orderRepair: OrderRepairty;
  orderRepairType: RepairType;
  orderRepairs: Array<OrderRepairty>;
  orderRepairsCount: MetadataPagination;
  orderRepairsType: Array<RepairType>;
  orderRepairsTypeCount: MetadataPagination;
  pageLink: PageLink;
  pageLinks: Array<PageLink>;
  pageLinksCount: MetadataPagination;
  parameter: Parameter;
  parameters: Array<Parameter>;
  parametersCount: MetadataPagination;
  position: Position;
  positions: Array<Position>;
  positionsCount: MetadataPagination;
  profile: Profile;
  profiles: Array<Profile>;
  profilesCount: MetadataPagination;
  revalidate: AuthResponse;
  role: Role;
  roleFx: RoleFx;
  roles: Array<Role>;
  rolesCount: MetadataPagination;
  rolesFx: Array<RoleFx>;
  rolesFxCount: MetadataPagination;
  sendEmailRecovryPassword: Scalars['String']['output'];
  statictsByStatusRepair: RepairStatusView;
  user: User;
  users: Array<User>;
  usersCount: MetadataPagination;
  validateUserToken: User;
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCompanysArgs = {
  orderBy?: InputMaybe<Array<FindCompanyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCompanyWhere>;
};


export type QueryCompanysCountArgs = {
  orderBy?: InputMaybe<Array<FindCompanyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCompanyWhere>;
};


export type QueryCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryInventoryCloseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInventoryClosesArgs = {
  orderBy?: InputMaybe<Array<FindInventoryCloseOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindInventoryCloseWhere>;
};


export type QueryInventoryClosesCountArgs = {
  orderBy?: InputMaybe<Array<FindInventoryCloseOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindInventoryCloseWhere>;
};


export type QueryInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInvoicesArgs = {
  orderBy?: InputMaybe<Array<FindInvoiceOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindInvoiceWhere>;
};


export type QueryInvoicesCountArgs = {
  orderBy?: InputMaybe<Array<FindInvoiceOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindInvoiceWhere>;
};


export type QueryNotificationGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductInflowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductOutflowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  orderBy?: InputMaybe<Array<FindProductsOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductsWhere>;
};


export type QueryProductsCountArgs = {
  orderBy?: InputMaybe<Array<FindProductsOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductsWhere>;
};


export type QueryProductsInflowsArgs = {
  orderBy?: InputMaybe<Array<FindProductsInflowOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductsInflowWhere>;
};


export type QueryProductsInflowsCountArgs = {
  orderBy?: InputMaybe<Array<FindProductsInflowOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductsInflowWhere>;
};


export type QueryProductsOutflowsArgs = {
  orderBy?: InputMaybe<Array<FindProductsOutflowOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductsOutflowWhere>;
};


export type QueryProductsOutflowsCountArgs = {
  orderBy?: InputMaybe<Array<FindProductsOutflowOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductsOutflowWhere>;
};


export type QueryApprovalJwtArgs = {
  approvalTokenInput: ApprovalTokenInput;
};


export type QueryCitiesArgs = {
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCityArgs = {
  departmentId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientContactsArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientContactsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientsArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryClientsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryCodeRecoverPasswordArgs = {
  codeRecoverPasswordInput: CodeRecoverPasswordInput;
};


export type QueryCountriesArgs = {
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCountryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomFieldValueArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomFieldValuesArgs = {
  orderBy?: InputMaybe<Array<FindCustomFieldValueTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCustomFieldValueTypeWhere>;
};


export type QueryCustomFieldValuesCountArgs = {
  orderBy?: InputMaybe<Array<FindCustomFieldValueTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCustomFieldValueTypeWhere>;
};


export type QueryDepartmentArgs = {
  countryId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryDepartmentsArgs = {
  countryId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryDocumentTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDocumentTypesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDocumentTypesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDummiesArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummiesCountArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindAllArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFindOneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneArgArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryFindOneByDocumentNumberArgs = {
  numberDocument: Scalars['String']['input'];
};


export type QueryFindOneByNumberPhoneArgs = {
  numberPhone: Scalars['String']['input'];
};


export type QueryGenrateQrByRepairArgs = {
  idRepair: Scalars['String']['input'];
};


export type QueryGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type QueryMultiKeyRegistersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegistersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationConfigsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryOrderRepairArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderRepairTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderRepairsArgs = {
  orderBy?: InputMaybe<Array<FindOrderRepairOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindOrderRepairWhere>;
};


export type QueryOrderRepairsCountArgs = {
  orderBy?: InputMaybe<Array<FindOrderRepairOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindOrderRepairWhere>;
};


export type QueryOrderRepairsTypeArgs = {
  orderBy?: InputMaybe<Array<FindOrderRepairTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindOrderRepairTypeWhere>;
};


export type QueryOrderRepairsTypeCountArgs = {
  orderBy?: InputMaybe<Array<FindOrderRepairTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindOrderRepairTypeWhere>;
};


export type QueryPageLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPageLinksArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinksCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParameterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParametersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParametersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPositionsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleFxArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QuerySendEmailRecovryPasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryUsersCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryValidateUserTokenArgs = {
  validateTokenInput: ValidateTokenInput;
};

export enum RecipientType {
  Bcc = 'Bcc',
  Cc = 'Cc',
  Destinatary = 'Destinatary'
}

export type RecoverPasswordInput = {
  email: Scalars['String']['input'];
};

export type RepairField = {
  __typename?: 'RepairField';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isRequired: Scalars['Boolean']['output'];
  maxLength?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  repairType: RepairType;
  type: FieldTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export type RepairFieldForm = {
  __typename?: 'RepairFieldForm';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isRequired: Scalars['Boolean']['output'];
  maxLength?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  orderRepairty: OrderRepairty;
  type: FieldTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export type RepairStatusView = {
  __typename?: 'RepairStatusView';
  total: Scalars['Float']['output'];
  total_cancelada: Scalars['Float']['output'];
  total_completa: Scalars['Float']['output'];
  total_pendiente: Scalars['Float']['output'];
};

export type RepairType = {
  __typename?: 'RepairType';
  costEstimate?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fields?: Maybe<Array<RepairField>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  defaultForType?: Maybe<UserTypes>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roleFx: Array<RoleFx>;
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type RoleFx = {
  __typename?: 'RoleFx';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  permission: Scalars['String']['output'];
  role?: Maybe<Role>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum RouterType {
  ExternalRoute = 'ExternalRoute',
  InternalRouteWithArguments = 'InternalRouteWithArguments',
  InternaltRoute = 'InternaltRoute'
}

export type SendDoubleVerificationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type SigninAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  verificationTypes?: InputMaybe<VerificationTypes>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  personType?: InputMaybe<PersonTypes>;
  verificationDigit?: InputMaybe<Scalars['String']['input']>;
};

export type SignupEmailInput = {
  confirmationPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
};

export type SignupInput = {
  address: Scalars['String']['input'];
  cityId: Scalars['ID']['input'];
  confirmationEmail: Scalars['String']['input'];
  confirmationPassword: Scalars['String']['input'];
  countryId: Scalars['ID']['input'];
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  hasRural: Scalars['Boolean']['input'];
  identificationNumber: Scalars['String']['input'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
  phoneCountryCode: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  secondSurname?: InputMaybe<Scalars['String']['input']>;
};

export type SmsRecipient = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};

export enum StateNotification {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error'
}

export enum StateNotificationGroup {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error',
  PartialComplete = 'PartialComplete',
  Process = 'Process'
}

export enum StatePersistent {
  NoPersistent = 'NoPersistent',
  Open = 'Open',
  Receive = 'Receive',
  Send = 'Send'
}

export enum StatusInvoice {
  Anulada = 'ANULADA',
  Elaborada = 'ELABORADA',
  Pagada = 'PAGADA',
  Vencida = 'VENCIDA'
}

export type StringFilter = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _endswith?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _notcontains?: InputMaybe<Scalars['String']['input']>;
  _notendswith?: InputMaybe<Scalars['String']['input']>;
  _notlike?: InputMaybe<Scalars['String']['input']>;
  _notstartswith?: InputMaybe<Scalars['String']['input']>;
  _startswith?: InputMaybe<Scalars['String']['input']>;
};

export enum TypeNotification {
  Email = 'Email',
  Push = 'Push',
  Sms = 'Sms',
  Wss = 'Wss'
}

export enum TypeNotificationGroup {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export enum TypeParameterEnum {
  Date = 'date',
  File = 'file',
  Number = 'number',
  String = 'string'
}

export enum TypeWorker {
  Externo = 'externo',
  Interno = 'interno'
}

export type UpdateClientContactInput = {
  celular?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  celular?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  identificationType?: InputMaybe<UserDocumentTypes>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  numberDocument?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCompanyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facebook?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  instagram?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nit?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateCustomFieldInput = {
  fieldId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  valorFecha?: InputMaybe<Scalars['DateTime']['input']>;
  valorFotoId?: InputMaybe<Scalars['String']['input']>;
  valorNumerico?: InputMaybe<Scalars['Float']['input']>;
  valorTexto?: InputMaybe<Scalars['String']['input']>;
  valorTextoLargo?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDocumentTypeInput = {
  document?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField?: InputMaybe<Scalars['DateTime']['input']>;
  thirdField?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateGroupInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInventoryCloseInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  status?: InputMaybe<InventoryCloseEmun>;
};

export type UpdateInvoiceInput = {
  clienteId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  issueDate?: InputMaybe<Scalars['DateTime']['input']>;
  orderRepairId?: InputMaybe<Scalars['ID']['input']>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  paymentReference?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<StatusInvoice>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateMultikeyRegisterInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: MultikeyRegisterIdInput;
};

export type UpdateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['ID']['input']>;
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  id: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  notificationGroupName?: InputMaybe<Scalars['ID']['input']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeNotification>;
  typeConfig?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type UpdateOrderRepairInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  fieldValues?: InputMaybe<Array<CreateCustomFieldValueInput>>;
  id: Scalars['ID']['input'];
  repairTypeId?: InputMaybe<Scalars['String']['input']>;
  status: OrderStatusEnum;
};

export type UpdateParametersInput = {
  codigo?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeParameterEnum>;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordInput = {
  password: Scalars['ValidatePassword']['input'];
  passwordConfirm: Scalars['ValidatePassword']['input'];
  token: Scalars['String']['input'];
};

export type UpdatePositionInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductsInflowInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  inflowDate?: InputMaybe<Scalars['DateTime']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ProductInflowEmun>;
};

export type UpdateProductsInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isShowPublic?: InputMaybe<Scalars['Boolean']['input']>;
  minStock?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
  unitOfMeasure?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductsOutflowInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  inflowDate?: InputMaybe<Scalars['DateTime']['input']>;
  invoiceProducts?: InputMaybe<Array<CreateInvoiceProductInput>>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  status?: InputMaybe<StatusInvoice>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  city?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRepairTypeInput = {
  costEstimate?: InputMaybe<Scalars['Float']['input']>;
  fields?: InputMaybe<Array<CreateRepairFieldInput>>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInformationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hasRural?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['ValidatePassword']['input']>;
  phoneCountryCode?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  secondSurname?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserStatusTypes>;
  type?: InputMaybe<UserTypes>;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword']['input'];
  newPassword: Scalars['ValidatePassword']['input'];
  newPasswordConfirm: Scalars['ValidatePassword']['input'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  confirmationCode?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  dateIssue?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  email: Scalars['String']['output'];
  emailVerification: Scalars['Boolean']['output'];
  fullName: Scalars['String']['output'];
  hasRural?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  identificationNumber?: Maybe<Scalars['String']['output']>;
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']['output']>;
  legalRepresentativeIdentificationNumber?: Maybe<Scalars['String']['output']>;
  legalRepresentativeIdentificationType?: Maybe<UserDocumentTypes>;
  middleName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneCountryCode?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneVerification: Scalars['Boolean']['output'];
  position?: Maybe<Scalars['String']['output']>;
  secondSurname?: Maybe<Scalars['String']['output']>;
  status: UserStatusTypes;
  type: UserTypes;
  typeWoker?: Maybe<TypeWorker>;
  updatedAt: Scalars['DateTime']['output'];
  userRoles: Array<Role>;
  userRolesFx: Array<RoleFx>;
};

export enum UserDocumentTypes {
  CitizenshipCard = 'CitizenshipCard',
  DiplomaticCard = 'DiplomaticCard',
  ForeignerIdentityCard = 'ForeignerIdentityCard',
  IdentityCard = 'IdentityCard',
  Nit = 'Nit',
  Passport = 'Passport',
  SafeConduct = 'SafeConduct',
  SpecialPermissionToStay = 'SpecialPermissionToStay',
  TemporaryProtectionPermit = 'TemporaryProtectionPermit'
}

export type UserKey = {
  __typename?: 'UserKey';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expirationCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  origin: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export enum UserStatusTypes {
  Active = 'Active',
  Inactive = 'Inactive',
  PartlyActive = 'PartlyActive'
}

export enum UserTypes {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

export type ValidateTokenInput = {
  token: Scalars['String']['input'];
};

export enum VerificationTypes {
  Email = 'Email',
  Phone = 'Phone'
}

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  phonePrefix?: InputMaybe<Scalars['String']['input']>;
};

export enum PaymentMethodEnum {
  Efectivo = 'EFECTIVO',
  Tarjeta = 'TARJETA',
  Transferencia = 'TRANSFERENCIA'
}

export type SigninMutationVariables = Exact<{
  signinInput: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, phoneNumber?: string | null, address?: string | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } } };

export type UpdateClientMutationVariables = Exact<{
  updateInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: string } };

export type ValidateUserTokenQueryVariables = Exact<{
  validateTokenInput: ValidateTokenInput;
}>;


export type ValidateUserTokenQuery = { __typename?: 'Query', validateUserToken: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, phoneNumber?: string | null, address?: string | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } };

export type FindOneByDocumentNumberQueryVariables = Exact<{
  numberDocument: Scalars['String']['input'];
}>;


export type FindOneByDocumentNumberQuery = { __typename?: 'Query', findOneByDocumentNumber?: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string, identificationType?: UserDocumentTypes | null } | null };

export type ClientsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientOrderBy> | FindClientOrderBy>;
  where?: InputMaybe<FindClientWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }> };

export type FindOneByNumberPhoneQueryVariables = Exact<{
  numberPhone: Scalars['String']['input'];
}>;


export type FindOneByNumberPhoneQuery = { __typename?: 'Query', findOneByNumberPhone?: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string } | null };

export type CreateInvoiceMutationVariables = Exact<{
  createInput: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: { __typename?: 'Invoice', id: string } };

export type CreateOrderRepairFullMutationVariables = Exact<{
  createOrderRepairFullInput: CreateOrderRepairFullInput;
}>;


export type CreateOrderRepairFullMutation = { __typename?: 'Mutation', createOrderRepairFull: string };

export type OrderRepairQueryVariables = Exact<{
  orderRepairId: Scalars['ID']['input'];
}>;


export type OrderRepairQuery = { __typename?: 'Query', orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null, invoice?: { __typename?: 'Invoice', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, invoiceNumber: string, issueDate: any, dueDate?: any | null, subtotal?: number | null, tax?: number | null, total?: number | null, discount?: number | null, status: StatusInvoice, paymentMethod?: PaymentMethodEnum | null, paymentReference?: string | null, description?: string | null, cliente: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }, orrderReapirty: { __typename?: 'OrderRepairty', repairType: { __typename?: 'RepairType', name: string, costEstimate?: number | null } } } | null } };

export type OrderRepairsTypeQueryVariables = Exact<{
  where?: InputMaybe<FindOrderRepairTypeWhere>;
  orderBy?: InputMaybe<Array<FindOrderRepairTypeOrderBy> | FindOrderRepairTypeOrderBy>;
}>;


export type OrderRepairsTypeQuery = { __typename?: 'Query', orderRepairsType: Array<{ __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }> };

export type OrderRepairsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindOrderRepairOrderBy> | FindOrderRepairOrderBy>;
  where?: InputMaybe<FindOrderRepairWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type OrderRepairsQuery = { __typename?: 'Query', orderRepairs: Array<{ __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null }, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null }> };

export type GenrateQrByRepairQueryVariables = Exact<{
  idRepair: Scalars['String']['input'];
}>;


export type GenrateQrByRepairQuery = { __typename?: 'Query', genrateQrByRepair: string };

export type StatictsByStatusRepairQueryVariables = Exact<{ [key: string]: never; }>;


export type StatictsByStatusRepairQuery = { __typename?: 'Query', statictsByStatusRepair: { __typename?: 'RepairStatusView', total: number, total_pendiente: number, total_completa: number, total_cancelada: number } };

export type UpdateOrderRepairMutationVariables = Exact<{
  updateInput: UpdateOrderRepairInput;
}>;


export type UpdateOrderRepairMutation = { __typename?: 'Mutation', updateOrderRepair: { __typename?: 'OrderRepairty', id: string } };


export const SigninDocument = gql`
    mutation Signin($signinInput: SigninInput!) {
  signin(signinInput: $signinInput) {
    token
    user {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      phoneNumber
      address
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      signinInput: // value for 'signinInput'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($updateInput: UpdateClientInput!) {
  updateClient(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const ValidateUserTokenDocument = gql`
    query ValidateUserToken($validateTokenInput: ValidateTokenInput!) {
  validateUserToken(validateTokenInput: $validateTokenInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    middleName
    lastName
    secondSurname
    email
    identificationType
    identificationNumber
    phoneNumber
    address
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    fullName
  }
}
    `;

/**
 * __useValidateUserTokenQuery__
 *
 * To run a query within a React component, call `useValidateUserTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateUserTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateUserTokenQuery({
 *   variables: {
 *      validateTokenInput: // value for 'validateTokenInput'
 *   },
 * });
 */
export function useValidateUserTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables> & ({ variables: ValidateUserTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
      }
export function useValidateUserTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export function useValidateUserTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export type ValidateUserTokenQueryHookResult = ReturnType<typeof useValidateUserTokenQuery>;
export type ValidateUserTokenLazyQueryHookResult = ReturnType<typeof useValidateUserTokenLazyQuery>;
export type ValidateUserTokenSuspenseQueryHookResult = ReturnType<typeof useValidateUserTokenSuspenseQuery>;
export type ValidateUserTokenQueryResult = Apollo.QueryResult<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>;
export const FindOneByDocumentNumberDocument = gql`
    query FindOneByDocumentNumber($numberDocument: String!) {
  findOneByDocumentNumber(numberDocument: $numberDocument) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    lastName
    numberDocument
    email
    address
    celular
    identificationType
  }
}
    `;

/**
 * __useFindOneByDocumentNumberQuery__
 *
 * To run a query within a React component, call `useFindOneByDocumentNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneByDocumentNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneByDocumentNumberQuery({
 *   variables: {
 *      numberDocument: // value for 'numberDocument'
 *   },
 * });
 */
export function useFindOneByDocumentNumberQuery(baseOptions: Apollo.QueryHookOptions<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables> & ({ variables: FindOneByDocumentNumberQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>(FindOneByDocumentNumberDocument, options);
      }
export function useFindOneByDocumentNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>(FindOneByDocumentNumberDocument, options);
        }
export function useFindOneByDocumentNumberSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>(FindOneByDocumentNumberDocument, options);
        }
export type FindOneByDocumentNumberQueryHookResult = ReturnType<typeof useFindOneByDocumentNumberQuery>;
export type FindOneByDocumentNumberLazyQueryHookResult = ReturnType<typeof useFindOneByDocumentNumberLazyQuery>;
export type FindOneByDocumentNumberSuspenseQueryHookResult = ReturnType<typeof useFindOneByDocumentNumberSuspenseQuery>;
export type FindOneByDocumentNumberQueryResult = Apollo.QueryResult<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>;
export const ClientsDocument = gql`
    query Clients($orderBy: [FindClientOrderBy!], $where: FindClientWhere, $pagination: Pagination) {
  clients(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    identificationType
    lastName
    numberDocument
    email
    address
    celular
  }
}
    `;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export function useClientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsSuspenseQueryHookResult = ReturnType<typeof useClientsSuspenseQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const FindOneByNumberPhoneDocument = gql`
    query FindOneByNumberPhone($numberPhone: String!) {
  findOneByNumberPhone(numberPhone: $numberPhone) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    identificationType
    lastName
    numberDocument
    email
    address
    celular
  }
}
    `;

/**
 * __useFindOneByNumberPhoneQuery__
 *
 * To run a query within a React component, call `useFindOneByNumberPhoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneByNumberPhoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneByNumberPhoneQuery({
 *   variables: {
 *      numberPhone: // value for 'numberPhone'
 *   },
 * });
 */
export function useFindOneByNumberPhoneQuery(baseOptions: Apollo.QueryHookOptions<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables> & ({ variables: FindOneByNumberPhoneQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>(FindOneByNumberPhoneDocument, options);
      }
export function useFindOneByNumberPhoneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>(FindOneByNumberPhoneDocument, options);
        }
export function useFindOneByNumberPhoneSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>(FindOneByNumberPhoneDocument, options);
        }
export type FindOneByNumberPhoneQueryHookResult = ReturnType<typeof useFindOneByNumberPhoneQuery>;
export type FindOneByNumberPhoneLazyQueryHookResult = ReturnType<typeof useFindOneByNumberPhoneLazyQuery>;
export type FindOneByNumberPhoneSuspenseQueryHookResult = ReturnType<typeof useFindOneByNumberPhoneSuspenseQuery>;
export type FindOneByNumberPhoneQueryResult = Apollo.QueryResult<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>;
export const CreateInvoiceDocument = gql`
    mutation CreateInvoice($createInput: CreateInvoiceInput!) {
  createInvoice(createInput: $createInput) {
    id
  }
}
    `;
export type CreateInvoiceMutationFn = Apollo.MutationFunction<CreateInvoiceMutation, CreateInvoiceMutationVariables>;

/**
 * __useCreateInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceMutation, { data, loading, error }] = useCreateInvoiceMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CreateInvoiceDocument, options);
      }
export type CreateInvoiceMutationHookResult = ReturnType<typeof useCreateInvoiceMutation>;
export type CreateInvoiceMutationResult = Apollo.MutationResult<CreateInvoiceMutation>;
export type CreateInvoiceMutationOptions = Apollo.BaseMutationOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const CreateOrderRepairFullDocument = gql`
    mutation CreateOrderRepairFull($createOrderRepairFullInput: CreateOrderRepairFullInput!) {
  createOrderRepairFull(createOrderRepairFullInput: $createOrderRepairFullInput)
}
    `;
export type CreateOrderRepairFullMutationFn = Apollo.MutationFunction<CreateOrderRepairFullMutation, CreateOrderRepairFullMutationVariables>;

/**
 * __useCreateOrderRepairFullMutation__
 *
 * To run a mutation, you first call `useCreateOrderRepairFullMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderRepairFullMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderRepairFullMutation, { data, loading, error }] = useCreateOrderRepairFullMutation({
 *   variables: {
 *      createOrderRepairFullInput: // value for 'createOrderRepairFullInput'
 *   },
 * });
 */
export function useCreateOrderRepairFullMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderRepairFullMutation, CreateOrderRepairFullMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderRepairFullMutation, CreateOrderRepairFullMutationVariables>(CreateOrderRepairFullDocument, options);
      }
export type CreateOrderRepairFullMutationHookResult = ReturnType<typeof useCreateOrderRepairFullMutation>;
export type CreateOrderRepairFullMutationResult = Apollo.MutationResult<CreateOrderRepairFullMutation>;
export type CreateOrderRepairFullMutationOptions = Apollo.BaseMutationOptions<CreateOrderRepairFullMutation, CreateOrderRepairFullMutationVariables>;
export const OrderRepairDocument = gql`
    query OrderRepair($orderRepairId: ID!) {
  orderRepair(id: $orderRepairId) {
    id
    createdAt
    updatedAt
    deletedAt
    status
    deliveryDate
    client {
      id
      createdAt
      updatedAt
      deletedAt
      name
      lastName
      numberDocument
      email
      address
      celular
    }
    repairType {
      id
      createdAt
      updatedAt
      deletedAt
      name
      costEstimate
      fields {
        id
        createdAt
        updatedAt
        deletedAt
        name
        type
        isRequired
        minLength
        maxLength
      }
    }
    fieldValues {
      id
      createdAt
      updatedAt
      deletedAt
      field {
        id
        createdAt
        updatedAt
        deletedAt
        name
        type
        isRequired
        minLength
        maxLength
      }
      valorTexto
      valorFecha
      valorNumerico
      valorTextoLargo
      valorFoto {
        id
        createdAt
        updatedAt
        deletedAt
        fileName
        fileExtension
        fileMode
        fileMongoId
        fileUrl
        url
      }
    }
    invoice {
      id
      createdAt
      updatedAt
      deletedAt
      invoiceNumber
      issueDate
      dueDate
      subtotal
      tax
      total
      discount
      status
      paymentMethod
      paymentReference
      description
      cliente {
        id
        createdAt
        updatedAt
        deletedAt
        name
        lastName
        numberDocument
        email
        address
        celular
      }
      orrderReapirty {
        repairType {
          name
          costEstimate
        }
      }
    }
  }
}
    `;

/**
 * __useOrderRepairQuery__
 *
 * To run a query within a React component, call `useOrderRepairQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderRepairQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderRepairQuery({
 *   variables: {
 *      orderRepairId: // value for 'orderRepairId'
 *   },
 * });
 */
export function useOrderRepairQuery(baseOptions: Apollo.QueryHookOptions<OrderRepairQuery, OrderRepairQueryVariables> & ({ variables: OrderRepairQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderRepairQuery, OrderRepairQueryVariables>(OrderRepairDocument, options);
      }
export function useOrderRepairLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderRepairQuery, OrderRepairQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderRepairQuery, OrderRepairQueryVariables>(OrderRepairDocument, options);
        }
export function useOrderRepairSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderRepairQuery, OrderRepairQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderRepairQuery, OrderRepairQueryVariables>(OrderRepairDocument, options);
        }
export type OrderRepairQueryHookResult = ReturnType<typeof useOrderRepairQuery>;
export type OrderRepairLazyQueryHookResult = ReturnType<typeof useOrderRepairLazyQuery>;
export type OrderRepairSuspenseQueryHookResult = ReturnType<typeof useOrderRepairSuspenseQuery>;
export type OrderRepairQueryResult = Apollo.QueryResult<OrderRepairQuery, OrderRepairQueryVariables>;
export const OrderRepairsTypeDocument = gql`
    query OrderRepairsType($where: FindOrderRepairTypeWhere, $orderBy: [FindOrderRepairTypeOrderBy!]) {
  orderRepairsType(where: $where, orderBy: $orderBy) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    costEstimate
    fields {
      id
      createdAt
      updatedAt
      deletedAt
      name
      type
      isRequired
      minLength
      maxLength
    }
  }
}
    `;

/**
 * __useOrderRepairsTypeQuery__
 *
 * To run a query within a React component, call `useOrderRepairsTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderRepairsTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderRepairsTypeQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useOrderRepairsTypeQuery(baseOptions?: Apollo.QueryHookOptions<OrderRepairsTypeQuery, OrderRepairsTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderRepairsTypeQuery, OrderRepairsTypeQueryVariables>(OrderRepairsTypeDocument, options);
      }
export function useOrderRepairsTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderRepairsTypeQuery, OrderRepairsTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderRepairsTypeQuery, OrderRepairsTypeQueryVariables>(OrderRepairsTypeDocument, options);
        }
export function useOrderRepairsTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderRepairsTypeQuery, OrderRepairsTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderRepairsTypeQuery, OrderRepairsTypeQueryVariables>(OrderRepairsTypeDocument, options);
        }
export type OrderRepairsTypeQueryHookResult = ReturnType<typeof useOrderRepairsTypeQuery>;
export type OrderRepairsTypeLazyQueryHookResult = ReturnType<typeof useOrderRepairsTypeLazyQuery>;
export type OrderRepairsTypeSuspenseQueryHookResult = ReturnType<typeof useOrderRepairsTypeSuspenseQuery>;
export type OrderRepairsTypeQueryResult = Apollo.QueryResult<OrderRepairsTypeQuery, OrderRepairsTypeQueryVariables>;
export const OrderRepairsDocument = gql`
    query OrderRepairs($orderBy: [FindOrderRepairOrderBy!], $where: FindOrderRepairWhere, $pagination: Pagination) {
  orderRepairs(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    status
    deliveryDate
    client {
      id
      createdAt
      updatedAt
      deletedAt
      name
      identificationType
      lastName
      numberDocument
      email
      address
      celular
    }
    repairType {
      id
      createdAt
      updatedAt
      deletedAt
      name
      costEstimate
      fields {
        id
        createdAt
        updatedAt
        deletedAt
        name
        type
        isRequired
        minLength
        maxLength
      }
    }
    fieldValues {
      id
      createdAt
      updatedAt
      deletedAt
      orderRepair {
        id
        createdAt
        updatedAt
        deletedAt
        status
        deliveryDate
      }
      field {
        id
        createdAt
        updatedAt
        deletedAt
        name
        type
        isRequired
        minLength
        maxLength
      }
      valorTexto
      valorFecha
      valorNumerico
      valorTextoLargo
      valorFoto {
        id
        createdAt
        updatedAt
        deletedAt
        fileName
        fileExtension
        fileMode
        fileMongoId
        fileUrl
        url
      }
    }
  }
}
    `;

/**
 * __useOrderRepairsQuery__
 *
 * To run a query within a React component, call `useOrderRepairsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderRepairsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderRepairsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOrderRepairsQuery(baseOptions?: Apollo.QueryHookOptions<OrderRepairsQuery, OrderRepairsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderRepairsQuery, OrderRepairsQueryVariables>(OrderRepairsDocument, options);
      }
export function useOrderRepairsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderRepairsQuery, OrderRepairsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderRepairsQuery, OrderRepairsQueryVariables>(OrderRepairsDocument, options);
        }
export function useOrderRepairsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderRepairsQuery, OrderRepairsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderRepairsQuery, OrderRepairsQueryVariables>(OrderRepairsDocument, options);
        }
export type OrderRepairsQueryHookResult = ReturnType<typeof useOrderRepairsQuery>;
export type OrderRepairsLazyQueryHookResult = ReturnType<typeof useOrderRepairsLazyQuery>;
export type OrderRepairsSuspenseQueryHookResult = ReturnType<typeof useOrderRepairsSuspenseQuery>;
export type OrderRepairsQueryResult = Apollo.QueryResult<OrderRepairsQuery, OrderRepairsQueryVariables>;
export const GenrateQrByRepairDocument = gql`
    query genrateQrByRepair($idRepair: String!) {
  genrateQrByRepair(idRepair: $idRepair)
}
    `;

/**
 * __useGenrateQrByRepairQuery__
 *
 * To run a query within a React component, call `useGenrateQrByRepairQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenrateQrByRepairQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenrateQrByRepairQuery({
 *   variables: {
 *      idRepair: // value for 'idRepair'
 *   },
 * });
 */
export function useGenrateQrByRepairQuery(baseOptions: Apollo.QueryHookOptions<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables> & ({ variables: GenrateQrByRepairQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>(GenrateQrByRepairDocument, options);
      }
export function useGenrateQrByRepairLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>(GenrateQrByRepairDocument, options);
        }
export function useGenrateQrByRepairSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>(GenrateQrByRepairDocument, options);
        }
export type GenrateQrByRepairQueryHookResult = ReturnType<typeof useGenrateQrByRepairQuery>;
export type GenrateQrByRepairLazyQueryHookResult = ReturnType<typeof useGenrateQrByRepairLazyQuery>;
export type GenrateQrByRepairSuspenseQueryHookResult = ReturnType<typeof useGenrateQrByRepairSuspenseQuery>;
export type GenrateQrByRepairQueryResult = Apollo.QueryResult<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>;
export const StatictsByStatusRepairDocument = gql`
    query StatictsByStatusRepair {
  statictsByStatusRepair {
    total
    total_pendiente
    total_completa
    total_cancelada
  }
}
    `;

/**
 * __useStatictsByStatusRepairQuery__
 *
 * To run a query within a React component, call `useStatictsByStatusRepairQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatictsByStatusRepairQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatictsByStatusRepairQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatictsByStatusRepairQuery(baseOptions?: Apollo.QueryHookOptions<StatictsByStatusRepairQuery, StatictsByStatusRepairQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatictsByStatusRepairQuery, StatictsByStatusRepairQueryVariables>(StatictsByStatusRepairDocument, options);
      }
export function useStatictsByStatusRepairLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatictsByStatusRepairQuery, StatictsByStatusRepairQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatictsByStatusRepairQuery, StatictsByStatusRepairQueryVariables>(StatictsByStatusRepairDocument, options);
        }
export function useStatictsByStatusRepairSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StatictsByStatusRepairQuery, StatictsByStatusRepairQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StatictsByStatusRepairQuery, StatictsByStatusRepairQueryVariables>(StatictsByStatusRepairDocument, options);
        }
export type StatictsByStatusRepairQueryHookResult = ReturnType<typeof useStatictsByStatusRepairQuery>;
export type StatictsByStatusRepairLazyQueryHookResult = ReturnType<typeof useStatictsByStatusRepairLazyQuery>;
export type StatictsByStatusRepairSuspenseQueryHookResult = ReturnType<typeof useStatictsByStatusRepairSuspenseQuery>;
export type StatictsByStatusRepairQueryResult = Apollo.QueryResult<StatictsByStatusRepairQuery, StatictsByStatusRepairQueryVariables>;
export const UpdateOrderRepairDocument = gql`
    mutation UpdateOrderRepair($updateInput: UpdateOrderRepairInput!) {
  updateOrderRepair(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateOrderRepairMutationFn = Apollo.MutationFunction<UpdateOrderRepairMutation, UpdateOrderRepairMutationVariables>;

/**
 * __useUpdateOrderRepairMutation__
 *
 * To run a mutation, you first call `useUpdateOrderRepairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderRepairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderRepairMutation, { data, loading, error }] = useUpdateOrderRepairMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateOrderRepairMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderRepairMutation, UpdateOrderRepairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderRepairMutation, UpdateOrderRepairMutationVariables>(UpdateOrderRepairDocument, options);
      }
export type UpdateOrderRepairMutationHookResult = ReturnType<typeof useUpdateOrderRepairMutation>;
export type UpdateOrderRepairMutationResult = Apollo.MutationResult<UpdateOrderRepairMutation>;
export type UpdateOrderRepairMutationOptions = Apollo.BaseMutationOptions<UpdateOrderRepairMutation, UpdateOrderRepairMutationVariables>;