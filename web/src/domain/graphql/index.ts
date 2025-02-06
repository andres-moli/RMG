import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ValidatePassword: any;
};

export type AddAndRemoveRoleInput = {
  roleId: Scalars['String'];
  userId: Scalars['String'];
};

export type ApprovalTokenInput = {
  code: Scalars['String'];
  token: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  user: User;
};

export type City = {
  __typename?: 'City';
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  celular: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ClientContact = {
  __typename?: 'ClientContact';
  celular: Scalars['String'];
  client?: Maybe<Client>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['String'];
  telefono?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CodeConfirmationInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID'];
  instagram?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nit: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateAndRemoveRoleFxInput = {
  permissions: Array<Scalars['String']>;
  role: Scalars['ID'];
};

export type CreateClientContactInput = {
  celular: Scalars['String'];
  clientId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  identificationType: UserDocumentTypes;
  lastName: Scalars['String'];
  name: Scalars['String'];
  numberDocument: Scalars['String'];
};

export type CreateCompanyInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  facebook?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['ID']>;
  instagram?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nit: Scalars['String'];
  phone: Scalars['String'];
  userId: Scalars['ID'];
};

export type CreateCustomFieldValueInput = {
  fieldId: Scalars['String'];
  valorFecha?: InputMaybe<Scalars['DateTime']>;
  valorFotoId?: InputMaybe<Scalars['String']>;
  valorNumerico?: InputMaybe<Scalars['Float']>;
  valorTexto?: InputMaybe<Scalars['String']>;
  valorTextoLargo?: InputMaybe<Scalars['String']>;
};

export type CreateDocumentTypeInput = {
  document: Scalars['String'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']>;
  firstField: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
};

export type CreateGroupInput = {
  name: Scalars['String'];
  notificationConfigId?: InputMaybe<Scalars['ID']>;
};

export type CreateInventoryCloseInput = {
  companyId: Scalars['ID'];
  date: Scalars['DateTime'];
  description: Scalars['String'];
  status?: InputMaybe<InventoryCloseEmun>;
};

export type CreateInvoiceInput = {
  clienteId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Float']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  issueDate: Scalars['DateTime'];
  orderRepairId: Scalars['ID'];
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  paymentReference?: InputMaybe<Scalars['String']>;
  status: StatusInvoice;
  subtotal?: InputMaybe<Scalars['Float']>;
  tax?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
};

export type CreateInvoiceProductInput = {
  discount?: InputMaybe<Scalars['Float']>;
  productId: Scalars['ID'];
  quantity: Scalars['Float'];
  tax?: InputMaybe<Scalars['Float']>;
  unitPrice: Scalars['Float'];
};

export type CreateMultikeyRegisterInput = {
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: MultikeyRegisterIdInput;
};

export type CreateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']>;
  hasEmail?: InputMaybe<Scalars['Boolean']>;
  hasPush?: InputMaybe<Scalars['Boolean']>;
  hasSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']>;
  hasWss?: InputMaybe<Scalars['Boolean']>;
  html?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profileId: Scalars['ID'];
  smsBody?: InputMaybe<Scalars['String']>;
  subtype: Scalars['String'];
  type: NotificationType;
  wssCode?: InputMaybe<Scalars['String']>;
};

export type CreateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  metadata: Scalars['String'];
  name: Scalars['String'];
  notificationConfigId: Scalars['ID'];
};

export type CreateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  metadata: Scalars['String'];
  notificationGroupId?: InputMaybe<Scalars['ID']>;
  notificationGroupName?: InputMaybe<Scalars['ID']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig: Scalars['String'];
  type: TypeNotification;
  typeConfig: NotificationType;
  userId?: InputMaybe<Scalars['ID']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type CreateOrderRepairFullInput = {
  client: CreateClientInput;
  fieldValues?: InputMaybe<Array<CreateCustomFieldValueInput>>;
  repairTypeId: Scalars['String'];
};

export type CreateOrderRepairInput = {
  clientId: Scalars['String'];
  fieldValues?: InputMaybe<Array<CreateCustomFieldValueInput>>;
  repairTypeId: Scalars['String'];
};

export type CreatePageLinkInput = {
  arguments?: InputMaybe<Array<Scalars['String']>>;
  routeType?: InputMaybe<RouterType>;
  target?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type CreateParametersInput = {
  codigo: Scalars['String'];
  descripcion: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  type: TypeParameterEnum;
  valueDate?: InputMaybe<Scalars['DateTime']>;
  valueFileId?: InputMaybe<Scalars['ID']>;
  valueInt?: InputMaybe<Scalars['Float']>;
  valueString?: InputMaybe<Scalars['String']>;
};

export type CreatePositionInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreateProductInflowInput = {
  companyId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  inflowDate: Scalars['DateTime'];
  productId: Scalars['ID'];
  quantity: Scalars['Float'];
};

export type CreateProductInput = {
  companyId: Scalars['ID'];
  costPrice?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  expirationDate?: InputMaybe<Scalars['DateTime']>;
  fileId?: InputMaybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  isShowPublic?: InputMaybe<Scalars['Boolean']>;
  minStock?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  salePrice: Scalars['Float'];
  tax?: InputMaybe<Scalars['Float']>;
  unitOfMeasure?: InputMaybe<Scalars['String']>;
};

export type CreateProductOutflowInput = {
  companyId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  inflowDate: Scalars['DateTime'];
  invoiceProducts: Array<CreateInvoiceProductInput>;
  paymentMethod: PaymentMethodEnum;
  status: StatusInvoice;
  userId: Scalars['String'];
};

export type CreateProfileInput = {
  city: Scalars['Int'];
  description: Scalars['String'];
  document: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  region: Scalars['Int'];
};

export type CreateRepairFieldInput = {
  isRequired: Scalars['Boolean'];
  maxLength?: InputMaybe<Scalars['Float']>;
  minLength?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  type: FieldTypeEnum;
};

export type CreateRepairTypeInput = {
  costEstimate?: InputMaybe<Scalars['Float']>;
  fields?: InputMaybe<Array<CreateRepairFieldInput>>;
  name: Scalars['String'];
};

export type CreateRoleInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  address: Scalars['String'];
  cityId?: InputMaybe<Scalars['ID']>;
  countryId?: InputMaybe<Scalars['ID']>;
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  hasRural?: InputMaybe<Scalars['Boolean']>;
  identificationNumber: Scalars['String'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
  phoneCountryCode?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  position?: InputMaybe<Scalars['String']>;
  secondSurname?: InputMaybe<Scalars['String']>;
  type: UserTypes;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type CustomFieldValue = {
  __typename?: 'CustomFieldValue';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  field: RepairField;
  id: Scalars['ID'];
  orderRepair: OrderRepairty;
  updatedAt: Scalars['DateTime'];
  valorFecha?: Maybe<Scalars['DateTime']>;
  valorFoto?: Maybe<FileInfo>;
  valorNumerico?: Maybe<Scalars['Float']>;
  valorTexto?: Maybe<Scalars['String']>;
  valorTextoLargo?: Maybe<Scalars['String']>;
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']>>;
  _eq?: InputMaybe<Scalars['DateTime']>;
  _gt?: InputMaybe<Scalars['DateTime']>;
  _gte?: InputMaybe<Scalars['DateTime']>;
  _in?: InputMaybe<Array<Scalars['DateTime']>>;
  _lt?: InputMaybe<Scalars['DateTime']>;
  _lte?: InputMaybe<Scalars['DateTime']>;
  _neq?: InputMaybe<Scalars['DateTime']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['Int'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DocumentType = {
  __typename?: 'DocumentType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  document: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type DoubleVerificationInput = {
  code?: InputMaybe<Scalars['String']>;
  emailVerification?: InputMaybe<Scalars['Boolean']>;
  phoneVerification?: InputMaybe<Scalars['Boolean']>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstField: Scalars['String'];
  group?: Maybe<DummyGroup>;
  id: Scalars['ID'];
  items: Array<DummyItem>;
  notification?: Maybe<Notification>;
  phone: Scalars['String'];
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
  type?: Maybe<DummyType>;
  updatedAt: Scalars['DateTime'];
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  family?: Maybe<DummyFamily>;
  id: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  dummy: Dummy;
  firstField: Scalars['String'];
  fourthField: Scalars['Int'];
  id: Scalars['ID'];
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type DummyType = {
  __typename?: 'DummyType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EmailRecipient = {
  email: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fileExtension: Scalars['String'];
  fileMode: FileModes;
  fileMongoId?: Maybe<Scalars['String']>;
  fileName: Scalars['String'];
  fileUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<Array<UserTypes>>;
};

export type FunctionalityModel = {
  __typename?: 'FunctionalityModel';
  children?: Maybe<Array<FunctionalityModel>>;
  description?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  name: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationConfig?: Maybe<NotificationConfig>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type InventoryClose = {
  __typename?: 'InventoryClose';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  invoiceProducts: Array<InventoryCloseDetail>;
  status: InventoryCloseEmun;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type InventoryCloseDetail = {
  __typename?: 'InventoryCloseDetail';
  InventoryClose: InventoryClose;
  company: Company;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  entryProduct: Scalars['Float'];
  exitProduct: Scalars['Float'];
  id: Scalars['ID'];
  product: Products;
  stock: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export enum InventoryCloseEmun {
  Cancelado = 'CANCELADO',
  Realizado = 'REALIZADO'
}

export type Invoice = {
  __typename?: 'Invoice';
  cliente: Client;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  invoiceNumber: Scalars['String'];
  issueDate: Scalars['DateTime'];
  orrderReapirty: OrderRepairty;
  paymentMethod?: Maybe<PaymentMethodEnum>;
  paymentReference?: Maybe<Scalars['String']>;
  status: StatusInvoice;
  subtotal?: Maybe<Scalars['Float']>;
  tax?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type InvoiceProduct = {
  __typename?: 'InvoiceProduct';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  product: Products;
  productOutflow: ProductOutflow;
  quantity: Scalars['Int'];
  subtotal: Scalars['Float'];
  tax?: Maybe<Scalars['Float']>;
  total: Scalars['Float'];
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']>;
  itemsPerPage?: Maybe<Scalars['Int']>;
  totalItems?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type MultikeyRegister = {
  __typename?: 'MultikeyRegister';
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: MultikeyRegisterId;
};

export type MultikeyRegisterId = {
  __typename?: 'MultikeyRegisterId';
  id: Scalars['Int'];
  year: Scalars['Int'];
};

export type MultikeyRegisterIdInput = {
  id: Scalars['Int'];
  year: Scalars['Int'];
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
  createOrderRepairFull: Scalars['String'];
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
  enableAndDisableDoubleVerification: Scalars['String'];
  i18nTest: Scalars['String'];
  recoverPassword: Scalars['String'];
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
  removeRoleFx: Array<Scalars['String']>;
  removeUser: User;
  removeUserRole: User;
  replaceAllRolesFx: Array<RoleFx>;
  resetPassword: User;
  resetSuperAdmin: User;
  sendCodeDoubleVerification: Scalars['String'];
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
  id: Scalars['ID'];
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveClientContactArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCustomFieldValueArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDocumentTypeArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveInventoryCloseArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveInvoiceArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveNotificationConfigArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveOrderRepairArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveOrderRepairTypeArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePageLinkArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProductInflowArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProductOutflowArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRoleFxArgs = {
  removeRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationReplaceAllRolesFxArgs = {
  replaceAllRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  externalId?: Maybe<Scalars['ID']>;
  externalMessage?: Maybe<Scalars['String']>;
  hasPersistent: Scalars['Boolean'];
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['String']>;
  notificationConfig: NotificationConfig;
  notificationGroup?: Maybe<NotificationGroup>;
  persistentExpiration?: Maybe<Scalars['DateTime']>;
  stateNotification: StateNotification;
  statePersistent?: Maybe<StatePersistent>;
  type: TypeNotification;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailDuplicateCode?: Maybe<Scalars['ID']>;
  emailPrincipalCode?: Maybe<Scalars['ID']>;
  hasEmail: Scalars['Boolean'];
  hasPersistent: Scalars['Boolean'];
  hasPush: Scalars['Boolean'];
  hasSms: Scalars['Boolean'];
  hasTwoStepsEmail: Scalars['Boolean'];
  hasTwoStepsPush: Scalars['Boolean'];
  hasTwoStepsSms: Scalars['Boolean'];
  hasTwoStepsWss: Scalars['Boolean'];
  hasWss: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  persistentExpiration?: Maybe<Scalars['DateTime']>;
  persistentHtml?: Maybe<Scalars['String']>;
  profile: Profile;
  smsBody?: Maybe<Scalars['String']>;
  subtype: Scalars['String'];
  type: NotificationType;
  updatedAt: Scalars['DateTime'];
  wssCode?: Maybe<Scalars['ID']>;
};

export type NotificationGroup = {
  __typename?: 'NotificationGroup';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  group: Group;
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationConfig: NotificationConfig;
  stateNotificationGroup: StateNotificationGroup;
  typeNotificationGroup: TypeNotificationGroup;
  updatedAt: Scalars['DateTime'];
};

export enum NotificationType {
  Token = 'Token'
}

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']>>;
  _eq?: InputMaybe<Scalars['Float']>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<Scalars['Float']>>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _neq?: InputMaybe<Scalars['Float']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']>>;
};

export type OrderRepairty = {
  __typename?: 'OrderRepairty';
  client: Client;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deliveryDate?: Maybe<Scalars['DateTime']>;
  fieldValues?: Maybe<Array<CustomFieldValue>>;
  id: Scalars['ID'];
  invoice?: Maybe<Invoice>;
  repairFieldForm?: Maybe<Array<RepairFieldForm>>;
  repairType: RepairType;
  status: OrderStatusEnum;
  updatedAt: Scalars['DateTime'];
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
  arguments?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  routeType?: Maybe<RouterType>;
  target?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type Pagination = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Parameter = {
  __typename?: 'Parameter';
  codigo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: TypeParameterEnum;
  updatedAt: Scalars['DateTime'];
  valueDate?: Maybe<Scalars['DateTime']>;
  valueFile?: Maybe<FileInfo>;
  valueInt?: Maybe<Scalars['Float']>;
  valueString?: Maybe<Scalars['String']>;
};

export enum PersonTypes {
  Legal = 'Legal',
  Natural = 'Natural'
}

export type Position = {
  __typename?: 'Position';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductInflow = {
  __typename?: 'ProductInflow';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inflowDate: Scalars['DateTime'];
  product: Products;
  quantity: Scalars['Int'];
  status: ProductInflowEmun;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export enum ProductInflowEmun {
  Cancelado = 'CANCELADO',
  Realizado = 'REALIZADO'
}

export type ProductOutflow = {
  __typename?: 'ProductOutflow';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inflowDate: Scalars['DateTime'];
  invoiceProducts: Array<InvoiceProduct>;
  paymentMethod: PaymentMethodEnum;
  status: StatusInvoice;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Products = {
  __typename?: 'Products';
  costPrice?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['DateTime']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isShowPublic: Scalars['Boolean'];
  minStock?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  salePrice: Scalars['Float'];
  tax?: Maybe<Scalars['Float']>;
  unitOfMeasure?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Profile = {
  __typename?: 'Profile';
  city: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  document: Scalars['String'];
  email: Scalars['String'];
  externalId: Scalars['ID'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  region: Scalars['Int'];
  stateAws?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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
  codeRecoverPassword: Scalars['String'];
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
  functionalities: FunctionalityModel;
  genrateQrByRepair: Scalars['String'];
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
  sendEmailRecovryPassword: Scalars['String'];
  statictsByStatusRepair: RepairStatusView;
  user: User;
  users: Array<User>;
  usersCount: MetadataPagination;
  validateUserToken: User;
};


export type QueryCompanyArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
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
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryNotificationGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductInflowArgs = {
  id: Scalars['ID'];
};


export type QueryProductOutflowArgs = {
  id: Scalars['ID'];
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
  departmentId?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCityArgs = {
  departmentId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryClientContactArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryCustomFieldValueArgs = {
  id: Scalars['ID'];
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
  countryId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryDepartmentsArgs = {
  countryId?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryDocumentTypeArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryFileArgs = {
  id: Scalars['ID'];
};


export type QueryFindAllArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFindOneArgs = {
  id: Scalars['ID'];
};


export type QueryFindOneArgArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryFindOneByDocumentNumberArgs = {
  numberDocument: Scalars['String'];
};


export type QueryGenrateQrByRepairArgs = {
  idRepair: Scalars['String'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryNotificationConfigArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryOrderRepairTypeArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryPageLinksArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinksCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParameterArgs = {
  id: Scalars['ID'];
};


export type QueryParametersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParametersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionArgs = {
  id: Scalars['ID'];
};


export type QueryPositionsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryRoleFxArgs = {
  id: Scalars['ID'];
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
  email: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
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
  email: Scalars['String'];
};

export type RepairField = {
  __typename?: 'RepairField';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isRequired: Scalars['Boolean'];
  maxLength?: Maybe<Scalars['Float']>;
  minLength?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  repairType: RepairType;
  type: FieldTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export type RepairFieldForm = {
  __typename?: 'RepairFieldForm';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isRequired: Scalars['Boolean'];
  maxLength?: Maybe<Scalars['Float']>;
  minLength?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  orderRepairty: OrderRepairty;
  type: FieldTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export type RepairStatusView = {
  __typename?: 'RepairStatusView';
  total: Scalars['Float'];
  total_cancelada: Scalars['Float'];
  total_completa: Scalars['Float'];
  total_pendiente: Scalars['Float'];
};

export type RepairType = {
  __typename?: 'RepairType';
  costEstimate?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fields?: Maybe<Array<RepairField>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime'];
  defaultForType?: Maybe<UserTypes>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  roleFx: Array<RoleFx>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type RoleFx = {
  __typename?: 'RoleFx';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  permission: Scalars['String'];
  role?: Maybe<Role>;
  updatedAt: Scalars['DateTime'];
};

export enum RouterType {
  ExternalRoute = 'ExternalRoute',
  InternalRouteWithArguments = 'InternalRouteWithArguments',
  InternaltRoute = 'InternaltRoute'
}

export type SendDoubleVerificationInput = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type SigninAdminInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  verificationTypes?: InputMaybe<VerificationTypes>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']>;
  identificationNumber?: InputMaybe<Scalars['String']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  personType?: InputMaybe<PersonTypes>;
  verificationDigit?: InputMaybe<Scalars['String']>;
};

export type SignupEmailInput = {
  confirmationPassword: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
};

export type SignupInput = {
  address: Scalars['String'];
  cityId: Scalars['ID'];
  confirmationEmail: Scalars['String'];
  confirmationPassword: Scalars['String'];
  countryId: Scalars['ID'];
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId: Scalars['ID'];
  email: Scalars['String'];
  hasRural: Scalars['Boolean'];
  identificationNumber: Scalars['String'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
  phoneCountryCode: Scalars['String'];
  phoneNumber: Scalars['String'];
  secondSurname?: InputMaybe<Scalars['String']>;
};

export type SmsRecipient = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
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
  _contains?: InputMaybe<Scalars['String']>;
  _endswith?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _like?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _notcontains?: InputMaybe<Scalars['String']>;
  _notendswith?: InputMaybe<Scalars['String']>;
  _notlike?: InputMaybe<Scalars['String']>;
  _notstartswith?: InputMaybe<Scalars['String']>;
  _startswith?: InputMaybe<Scalars['String']>;
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
  celular?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  identificationType?: InputMaybe<UserDocumentTypes>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  numberDocument?: InputMaybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  instagram?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nit?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type UpdateCustomFieldInput = {
  fieldId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  valorFecha?: InputMaybe<Scalars['DateTime']>;
  valorFotoId?: InputMaybe<Scalars['String']>;
  valorNumerico?: InputMaybe<Scalars['Float']>;
  valorTexto?: InputMaybe<Scalars['String']>;
  valorTextoLargo?: InputMaybe<Scalars['String']>;
};

export type UpdateDocumentTypeInput = {
  document?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']>;
  firstField?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  phone?: InputMaybe<Scalars['String']>;
  secondField?: InputMaybe<Scalars['DateTime']>;
  thirdField?: InputMaybe<Scalars['Float']>;
};

export type UpdateGroupInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  notificationConfigId?: InputMaybe<Scalars['ID']>;
};

export type UpdateInventoryCloseInput = {
  companyId?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  status?: InputMaybe<InventoryCloseEmun>;
};

export type UpdateInvoiceInput = {
  clienteId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Float']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  issueDate?: InputMaybe<Scalars['DateTime']>;
  orderRepairId?: InputMaybe<Scalars['ID']>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  paymentReference?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusInvoice>;
  subtotal?: InputMaybe<Scalars['Float']>;
  tax?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
};

export type UpdateMultikeyRegisterInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: MultikeyRegisterIdInput;
};

export type UpdateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']>;
  hasEmail?: InputMaybe<Scalars['Boolean']>;
  hasPush?: InputMaybe<Scalars['Boolean']>;
  hasSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']>;
  hasWss?: InputMaybe<Scalars['Boolean']>;
  html?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['ID']>;
  smsBody?: InputMaybe<Scalars['String']>;
  subtype?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NotificationType>;
  wssCode?: InputMaybe<Scalars['String']>;
};

export type UpdateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notificationConfigId?: InputMaybe<Scalars['ID']>;
};

export type UpdateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['String']>;
  notificationGroupId?: InputMaybe<Scalars['ID']>;
  notificationGroupName?: InputMaybe<Scalars['ID']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeNotification>;
  typeConfig?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['ID']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type UpdateOrderRepairInput = {
  clientId?: InputMaybe<Scalars['String']>;
  fieldValues?: InputMaybe<Array<CreateCustomFieldValueInput>>;
  id: Scalars['ID'];
  repairTypeId?: InputMaybe<Scalars['String']>;
  status: OrderStatusEnum;
};

export type UpdateParametersInput = {
  codigo?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeParameterEnum>;
  valueDate?: InputMaybe<Scalars['DateTime']>;
  valueFileId?: InputMaybe<Scalars['ID']>;
  valueInt?: InputMaybe<Scalars['Float']>;
  valueString?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  password: Scalars['ValidatePassword'];
  passwordConfirm: Scalars['ValidatePassword'];
  token: Scalars['String'];
};

export type UpdatePositionInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProductsInflowInput = {
  companyId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  inflowDate?: InputMaybe<Scalars['DateTime']>;
  productId?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<ProductInflowEmun>;
};

export type UpdateProductsInput = {
  companyId?: InputMaybe<Scalars['ID']>;
  costPrice?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  expirationDate?: InputMaybe<Scalars['DateTime']>;
  fileId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  isShowPublic?: InputMaybe<Scalars['Boolean']>;
  minStock?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  salePrice?: InputMaybe<Scalars['Float']>;
  tax?: InputMaybe<Scalars['Float']>;
  unitOfMeasure?: InputMaybe<Scalars['String']>;
};

export type UpdateProductsOutflowInput = {
  companyId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  inflowDate?: InputMaybe<Scalars['DateTime']>;
  invoiceProducts?: InputMaybe<Array<CreateInvoiceProductInput>>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  status?: InputMaybe<StatusInvoice>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  city?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['Int']>;
};

export type UpdateRepairTypeInput = {
  costEstimate?: InputMaybe<Scalars['Float']>;
  fields?: InputMaybe<Array<CreateRepairFieldInput>>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInformationInput = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['ID']>;
  countryId?: InputMaybe<Scalars['ID']>;
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  hasRural?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  identificationNumber?: InputMaybe<Scalars['String']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['ValidatePassword']>;
  phoneCountryCode?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  secondSurname?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserStatusTypes>;
  type?: InputMaybe<UserTypes>;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword'];
  newPassword: Scalars['ValidatePassword'];
  newPasswordConfirm: Scalars['ValidatePassword'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<City>;
  confirmationCode?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  dateIssue?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  email: Scalars['String'];
  emailVerification: Scalars['Boolean'];
  fullName: Scalars['String'];
  hasRural?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  identificationNumber?: Maybe<Scalars['String']>;
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']>;
  legalRepresentativeIdentificationNumber?: Maybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: Maybe<UserDocumentTypes>;
  middleName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneCountryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneVerification: Scalars['Boolean'];
  position?: Maybe<Scalars['String']>;
  secondSurname?: Maybe<Scalars['String']>;
  status: UserStatusTypes;
  type: UserTypes;
  typeWoker?: Maybe<TypeWorker>;
  updatedAt: Scalars['DateTime'];
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
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  expirationCode: Scalars['String'];
  id: Scalars['ID'];
  origin: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  token: Scalars['String'];
};

export enum VerificationTypes {
  Email = 'Email',
  Phone = 'Phone'
}

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  phonePrefix?: InputMaybe<Scalars['String']>;
};

export enum PaymentMethodEnum {
  Efectivo = 'EFECTIVO',
  Tarjeta = 'TARJETA',
  Transferencia = 'TRANSFERENCIA'
}

export type ValidateUserTokenQueryVariables = Exact<{
  validateTokenInput: ValidateTokenInput;
}>;


export type ValidateUserTokenQuery = { __typename?: 'Query', validateUserToken: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } };

export type SigninMutationVariables = Exact<{
  signinInput: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } } };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> };

export type FindOneByDocumentNumberQueryVariables = Exact<{
  numberDocument: Scalars['String'];
}>;


export type FindOneByDocumentNumberQuery = { __typename?: 'Query', findOneByDocumentNumber?: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string, identificationType?: UserDocumentTypes | null } | null };

export type ClientsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientOrderBy> | FindClientOrderBy>;
  where?: InputMaybe<FindClientWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }>, clientsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type OrderRepairQueryVariables = Exact<{
  orderRepairId: Scalars['ID'];
}>;


export type OrderRepairQuery = { __typename?: 'Query', orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null } };

export type OrderRepairsTypeQueryVariables = Exact<{
  where?: InputMaybe<FindOrderRepairTypeWhere>;
  orderBy?: InputMaybe<Array<FindOrderRepairTypeOrderBy> | FindOrderRepairTypeOrderBy>;
  pagination?: InputMaybe<Pagination>;
}>;


export type OrderRepairsTypeQuery = { __typename?: 'Query', orderRepairsType: Array<{ __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }>, orderRepairsTypeCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type OrderRepairsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindOrderRepairOrderBy> | FindOrderRepairOrderBy>;
  where?: InputMaybe<FindOrderRepairWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type OrderRepairsQuery = { __typename?: 'Query', orderRepairs: Array<{ __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null }, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null, invoice?: { __typename?: 'Invoice', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, invoiceNumber: string, issueDate: any, dueDate?: any | null, subtotal?: number | null, tax?: number | null, total?: number | null, discount?: number | null, status: StatusInvoice, paymentMethod?: PaymentMethodEnum | null, paymentReference?: string | null, description?: string | null, cliente: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }, orrderReapirty: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument: string, email: string, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }, invoice?: { __typename?: 'Invoice', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, invoiceNumber: string, issueDate: any, dueDate?: any | null, subtotal?: number | null, tax?: number | null, total?: number | null, discount?: number | null, status: StatusInvoice, paymentMethod?: PaymentMethodEnum | null, paymentReference?: string | null, description?: string | null } | null, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null }, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null, repairFieldForm?: Array<{ __typename?: 'RepairFieldForm', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null, orderRepairty: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null } }> | null } } | null }>, orderRepairsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type GenrateQrByRepairQueryVariables = Exact<{
  idRepair: Scalars['String'];
}>;


export type GenrateQrByRepairQuery = { __typename?: 'Query', genrateQrByRepair: string };

export type CreateOrderRepairTypeMutationVariables = Exact<{
  createInput: CreateRepairTypeInput;
}>;


export type CreateOrderRepairTypeMutation = { __typename?: 'Mutation', createOrderRepairType: { __typename?: 'RepairType', id: string } };

export type UsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindUsersOrderBy> | FindUsersOrderBy>;
  where?: InputMaybe<FindUsersWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, typeWoker?: TypeWorker | null, fullName: string, city?: { __typename?: 'City', id: string, name: string } | null, department?: { __typename?: 'Department', id: string, name: string } | null, country?: { __typename?: 'Country', id: string, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, name: string }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string }> }>, usersCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateUserMutationVariables = Exact<{
  createInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type RemoveUserMutationVariables = Exact<{
  removeUserId: Scalars['ID'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string, fullName: string, name?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  updateInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName: string, lastName?: string | null } };

export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
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
  dateIssue
  legalRepresentativeIdentificationType
  legalRepresentativeIdentificationNumber
  phoneCountryCode
  phoneNumber
  address
  hasRural
  confirmationCode
  position
  status
  phoneVerification
  emailVerification
  type
  city {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  department {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  country {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  userRoles {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    defaultForType
    users {
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
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    roleFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
    }
  }
  userRolesFx {
    id
    createdAt
    updatedAt
    deletedAt
    permission
    role {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
    }
  }
  fullName
}
    `;
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
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    department {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    country {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    userRoles {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
      users {
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
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      roleFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
      }
    }
    userRolesFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
      role {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
      }
    }
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
export function useValidateUserTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
      }
export function useValidateUserTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export type ValidateUserTokenQueryHookResult = ReturnType<typeof useValidateUserTokenQuery>;
export type ValidateUserTokenLazyQueryHookResult = ReturnType<typeof useValidateUserTokenLazyQuery>;
export type ValidateUserTokenQueryResult = Apollo.QueryResult<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>;
export const SigninDocument = gql`
    mutation Signin($signinInput: SigninInput!) {
  signin(signinInput: $signinInput) {
    token
    user {
      ...userFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
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
export function useFindOneByDocumentNumberQuery(baseOptions: Apollo.QueryHookOptions<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>(FindOneByDocumentNumberDocument, options);
      }
export function useFindOneByDocumentNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneByDocumentNumberQuery, FindOneByDocumentNumberQueryVariables>(FindOneByDocumentNumberDocument, options);
        }
export type FindOneByDocumentNumberQueryHookResult = ReturnType<typeof useFindOneByDocumentNumberQuery>;
export type FindOneByDocumentNumberLazyQueryHookResult = ReturnType<typeof useFindOneByDocumentNumberLazyQuery>;
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
  clientsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
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
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
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
export function useOrderRepairQuery(baseOptions: Apollo.QueryHookOptions<OrderRepairQuery, OrderRepairQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderRepairQuery, OrderRepairQueryVariables>(OrderRepairDocument, options);
      }
export function useOrderRepairLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderRepairQuery, OrderRepairQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderRepairQuery, OrderRepairQueryVariables>(OrderRepairDocument, options);
        }
export type OrderRepairQueryHookResult = ReturnType<typeof useOrderRepairQuery>;
export type OrderRepairLazyQueryHookResult = ReturnType<typeof useOrderRepairLazyQuery>;
export type OrderRepairQueryResult = Apollo.QueryResult<OrderRepairQuery, OrderRepairQueryVariables>;
export const OrderRepairsTypeDocument = gql`
    query OrderRepairsType($where: FindOrderRepairTypeWhere, $orderBy: [FindOrderRepairTypeOrderBy!], $pagination: Pagination) {
  orderRepairsType(where: $where, orderBy: $orderBy, pagination: $pagination) {
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
  orderRepairsTypeCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
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
 *      pagination: // value for 'pagination'
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
export type OrderRepairsTypeQueryHookResult = ReturnType<typeof useOrderRepairsTypeQuery>;
export type OrderRepairsTypeLazyQueryHookResult = ReturnType<typeof useOrderRepairsTypeLazyQuery>;
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
    invoice {
      id
      createdAt
      updatedAt
      deletedAt
      invoiceNumber
      issueDate
      dueDate
      cliente {
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
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      orrderReapirty {
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
        repairFieldForm {
          id
          createdAt
          updatedAt
          deletedAt
          name
          type
          isRequired
          minLength
          maxLength
          orderRepairty {
            id
            createdAt
            updatedAt
            deletedAt
            status
            deliveryDate
          }
        }
      }
      subtotal
      tax
      total
      discount
      status
      paymentMethod
      paymentReference
      description
    }
  }
  orderRepairsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
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
export type OrderRepairsQueryHookResult = ReturnType<typeof useOrderRepairsQuery>;
export type OrderRepairsLazyQueryHookResult = ReturnType<typeof useOrderRepairsLazyQuery>;
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
export function useGenrateQrByRepairQuery(baseOptions: Apollo.QueryHookOptions<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>(GenrateQrByRepairDocument, options);
      }
export function useGenrateQrByRepairLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>(GenrateQrByRepairDocument, options);
        }
export type GenrateQrByRepairQueryHookResult = ReturnType<typeof useGenrateQrByRepairQuery>;
export type GenrateQrByRepairLazyQueryHookResult = ReturnType<typeof useGenrateQrByRepairLazyQuery>;
export type GenrateQrByRepairQueryResult = Apollo.QueryResult<GenrateQrByRepairQuery, GenrateQrByRepairQueryVariables>;
export const CreateOrderRepairTypeDocument = gql`
    mutation CreateOrderRepairType($createInput: CreateRepairTypeInput!) {
  createOrderRepairType(createInput: $createInput) {
    id
  }
}
    `;
export type CreateOrderRepairTypeMutationFn = Apollo.MutationFunction<CreateOrderRepairTypeMutation, CreateOrderRepairTypeMutationVariables>;

/**
 * __useCreateOrderRepairTypeMutation__
 *
 * To run a mutation, you first call `useCreateOrderRepairTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderRepairTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderRepairTypeMutation, { data, loading, error }] = useCreateOrderRepairTypeMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateOrderRepairTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderRepairTypeMutation, CreateOrderRepairTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderRepairTypeMutation, CreateOrderRepairTypeMutationVariables>(CreateOrderRepairTypeDocument, options);
      }
export type CreateOrderRepairTypeMutationHookResult = ReturnType<typeof useCreateOrderRepairTypeMutation>;
export type CreateOrderRepairTypeMutationResult = Apollo.MutationResult<CreateOrderRepairTypeMutation>;
export type CreateOrderRepairTypeMutationOptions = Apollo.BaseMutationOptions<CreateOrderRepairTypeMutation, CreateOrderRepairTypeMutationVariables>;
export const UsersDocument = gql`
    query Users($orderBy: [FindUsersOrderBy!], $where: FindUsersWhere, $pagination: Pagination) {
  users(orderBy: $orderBy, where: $where, pagination: $pagination) {
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
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    typeWoker
    city {
      id
      name
    }
    department {
      id
      name
    }
    country {
      id
      name
    }
    userRoles {
      id
      name
    }
    userRolesFx {
      id
    }
    fullName
  }
  usersCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createInput: CreateUserInput!) {
  createUser(createInput: $createInput) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($removeUserId: ID!) {
  removeUser(id: $removeUserId) {
    id
    fullName
    name
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      removeUserId: // value for 'removeUserId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateInput: UpdateUserInput!) {
  updateUser(updateInput: $updateInput) {
    id
    fullName
    lastName
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;