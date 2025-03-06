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

export type Balance = {
  __typename?: 'Balance';
  saldo: Scalars['Float'];
  total_gasto: Scalars['Float'];
  total_recaudado: Scalars['Float'];
  total_vendido_producto: Scalars['Float'];
  total_vendido_servicio: Scalars['Float'];
};

export type BalanceInput = {
  companyId: Scalars['String'];
  fechaFin: Scalars['String'];
  fechaInicio: Scalars['String'];
};

export type BalanceResponse = {
  __typename?: 'BalanceResponse';
  id: Scalars['String'];
  saldo: Scalars['Float'];
  saldo_efectivo: Scalars['Float'];
  saldo_transferencia: Scalars['Float'];
  total_entrada: Scalars['Float'];
  total_entrada_efectivo: Scalars['Float'];
  total_entrada_transferencia: Scalars['Float'];
  total_gasto: Scalars['Float'];
  total_gasto_efectivo: Scalars['Float'];
  total_gasto_transferencia: Scalars['Float'];
  total_recuado: Scalars['Float'];
  total_saldo_anterior: Scalars['Float'];
  total_saldo_anterior_efectivo: Scalars['Float'];
  total_saldo_anterior_transferencia: Scalars['Float'];
  total_salida: Scalars['Float'];
  total_salida_efectivo: Scalars['Float'];
  total_salida_transferencia: Scalars['Float'];
  total_vendido_cita: Scalars['Float'];
  total_vendido_cita_efectivo: Scalars['Float'];
  total_vendido_cita_transferencia: Scalars['Float'];
  total_vendido_producto: Scalars['Float'];
  total_vendido_producto_efectivo: Scalars['Float'];
  total_vendido_producto_transferencia: Scalars['Float'];
};

export type CategoryExpenses = {
  __typename?: 'CategoryExpenses';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDefualtCategory: Scalars['Boolean'];
  name: Scalars['String'];
  status: StatusCategoryExpenses;
  updatedAt: Scalars['DateTime'];
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
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  numberDocument?: Maybe<Scalars['String']>;
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

export type Cotizacion = {
  __typename?: 'Cotizacion';
  client: Client;
  cotizacionProduct?: Maybe<Array<CotizacionProduct>>;
  cotizacionService?: Maybe<Array<CotizacionServiceE>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invoiceNumber: Scalars['String'];
  status: CotizacionStatusEmun;
  updatedAt: Scalars['DateTime'];
};

export type CotizacionProduct = {
  __typename?: 'CotizacionProduct';
  cotizacion: Cotizacion;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  product: Products;
  quantity: Scalars['Int'];
  subtotal: Scalars['Float'];
  tax?: Maybe<Scalars['Float']>;
  total: Scalars['Float'];
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type CotizacionServiceE = {
  __typename?: 'CotizacionServiceE';
  cotizacion: Cotizacion;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  service: RepairType;
  subtotal: Scalars['Float'];
  tax?: Maybe<Scalars['Float']>;
  total: Scalars['Float'];
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

/** Estados posibles de una cotización */
export enum CotizacionStatusEmun {
  Aprobada = 'APROBADA',
  Cancelada = 'CANCELADA',
  Pendiente = 'PENDIENTE',
  Realizada = 'REALIZADA',
  Rechazada = 'RECHAZADA'
}

export type CountExpenses = {
  __typename?: 'CountExpenses';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  nameBank?: Maybe<Scalars['String']>;
  numberCount?: Maybe<Scalars['String']>;
  status: StatusCountExpenses;
  updatedAt: Scalars['DateTime'];
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

export type CreateCategoryExpensesInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status?: InputMaybe<StatusCategoryExpenses>;
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
  numberDocument?: InputMaybe<Scalars['String']>;
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

export type CreateCotizacionInput = {
  clientId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  items: Array<ItemDto>;
};

export type CreateCountExpensesInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nameBank?: InputMaybe<Scalars['String']>;
  numberCount: Scalars['String'];
  status?: InputMaybe<StatusCountExpenses>;
};

export type CreateCustomFieldValueInput = {
  fieldId: Scalars['String'];
  valorFecha?: InputMaybe<Scalars['DateTime']>;
  valorFotoId?: InputMaybe<Scalars['String']>;
  valorNumerico?: InputMaybe<Scalars['Float']>;
  valorSeletor?: InputMaybe<Scalars['String']>;
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

export type CreateExpensesInput = {
  amount: Scalars['Float'];
  categoryId: Scalars['ID'];
  countId: Scalars['ID'];
  description: Scalars['String'];
  expenseDate: Scalars['DateTime'];
  isRecurring?: InputMaybe<Scalars['Boolean']>;
  nextDueDate?: InputMaybe<Scalars['DateTime']>;
  paymentMethod: PaymentMethodEnum;
  referenceNumber?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusExpenses>;
};

export type CreateExpensesWorkerInput = {
  amount: Scalars['Float'];
  companyId: Scalars['ID'];
  paymentMethod: PaymentMethodEnum;
  workerId: Scalars['ID'];
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
  total?: InputMaybe<Scalars['Float']>;
  unitPrice: Scalars['Float'];
};

export type CreateInvoiceServiceInput = {
  discount?: InputMaybe<Scalars['Float']>;
  quantity: Scalars['Float'];
  serviceId: Scalars['ID'];
  tax?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
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
  description?: InputMaybe<Scalars['String']>;
  inflowDate: Scalars['DateTime'];
  productId: Scalars['ID'];
  quantity: Scalars['Float'];
};

export type CreateProductInput = {
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
  clientId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  inflowDate: Scalars['DateTime'];
  invoiceProducts: Array<CreateInvoiceProductInput>;
  invoiceServices: Array<CreateInvoiceServiceInput>;
  manually?: InputMaybe<Scalars['Boolean']>;
  paymentMethod: PaymentMethodEnum;
  status: StatusInvoice;
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
  selectorOptions?: InputMaybe<Array<SelectorOptionDto>>;
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
  valorSeletor?: Maybe<Scalars['String']>;
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

export type DateRangeInput = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
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

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float'];
  autorizoBy?: Maybe<User>;
  canceldBy?: Maybe<User>;
  category: CategoryExpenses;
  count: CountExpenses;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  expenseDate: Scalars['DateTime'];
  id: Scalars['ID'];
  invoiceNumber: Scalars['String'];
  isRecurring: Scalars['Boolean'];
  nextDueDate?: Maybe<Scalars['DateTime']>;
  paymentMethod: Scalars['String'];
  referenceNumber?: Maybe<Scalars['String']>;
  status: StatusExpenses;
  updatedAt: Scalars['DateTime'];
};

export type FacturadoPorTrabajador = {
  __typename?: 'FacturadoPorTrabajador';
  apellido: Scalars['String'];
  commission_percentage: Scalars['Float'];
  company_id: Scalars['String'];
  nombre: Scalars['String'];
  total_facturado: Scalars['Float'];
  worker_id: Scalars['String'];
};

export enum FieldTypeEnum {
  Date = 'DATE',
  Image = 'IMAGE',
  LongText = 'LONG_TEXT',
  Number = 'NUMBER',
  Selector = 'SELECTOR',
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

export type FindCategoryExpensesOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindCategoryExpensesWhere = {
  _and?: InputMaybe<Array<FindCategoryExpensesWhere>>;
  _or?: InputMaybe<Array<FindCategoryExpensesWhere>>;
  company?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

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
  celular?: InputMaybe<StringFilter>;
  department?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringFilter>;
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

export type FindCotizacionOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCotizacionWhere = {
  _and?: InputMaybe<Array<FindCotizacionWhere>>;
  _or?: InputMaybe<Array<FindCotizacionWhere>>;
  client?: InputMaybe<DateFilter>;
  company?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindCountExpensesOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindCountExpensesWhere = {
  _and?: InputMaybe<Array<FindCountExpensesWhere>>;
  _or?: InputMaybe<Array<FindCountExpensesWhere>>;
  company?: InputMaybe<StringFilter>;
  nameBank?: InputMaybe<StringFilter>;
  numberCount?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
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

export type FindExpensesOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindExpensesWhere = {
  _and?: InputMaybe<Array<FindExpensesWhere>>;
  _or?: InputMaybe<Array<FindExpensesWhere>>;
  company?: InputMaybe<StringFilter>;
  createdBy?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  expenseDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
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
  client?: InputMaybe<StringFilter>;
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

export type GetFacturadoPorTrabajadorInput = {
  companyId: Scalars['ID'];
  fechaFin: Scalars['String'];
  fechaInicio: Scalars['String'];
};

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

export type InvoiceService = {
  __typename?: 'InvoiceService';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  productOutflow: ProductOutflow;
  quantity: Scalars['Int'];
  service: RepairType;
  subtotal: Scalars['Float'];
  tax?: Maybe<Scalars['Float']>;
  total: Scalars['Float'];
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ItemDto = {
  discount: Scalars['Float'];
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  tax: Scalars['Float'];
  total: Scalars['Float'];
  type: Scalars['String'];
  unitPrice: Scalars['Float'];
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
  anularInovoiceByRepair: Scalars['String'];
  codeConfirmation: User;
  create: RoleFx;
  createCategoryExpense: CategoryExpenses;
  createClient: Client;
  createClientContact: ClientContact;
  createCompany: Company;
  createCotizacion: Cotizacion;
  createCountExpense: CountExpenses;
  createCustomFieldValue: CustomFieldValue;
  createDefaultRoles: Array<Role>;
  createDocumentType: DocumentType;
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createExpense: Expense;
  createExpensesWoker: Expense;
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
  removeCategoryExpense: CategoryExpenses;
  removeClient: Client;
  removeClientContact: ClientContact;
  removeCompany: Company;
  removeCotizacion: Cotizacion;
  removeCountExpense: CountExpenses;
  removeCustomFieldValue: CustomFieldValue;
  removeDocumentType: DocumentType;
  removeDummy: Dummy;
  removeExpense: Expense;
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
  updateCategoryExpense: CategoryExpenses;
  updateClient: Client;
  updateClientContact: ClientContact;
  updateCompany: Company;
  updateCotizacion: Cotizacion;
  updateCountExpense: CountExpenses;
  updateCustomFieldValue: CustomFieldValue;
  updateDocumentType: DocumentType;
  updateDummy: Dummy;
  updateExpense: Expense;
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


export type MutationAnularInovoiceByRepairArgs = {
  idRepair: Scalars['String'];
};


export type MutationCodeConfirmationArgs = {
  createInput: CodeConfirmationInput;
};


export type MutationCreateArgs = {
  createInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateCategoryExpenseArgs = {
  createInput: CreateCategoryExpensesInput;
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


export type MutationCreateCotizacionArgs = {
  createInput: CreateCotizacionInput;
};


export type MutationCreateCountExpenseArgs = {
  createInput: CreateCountExpensesInput;
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


export type MutationCreateExpenseArgs = {
  createInput: CreateExpensesInput;
};


export type MutationCreateExpensesWokerArgs = {
  createInput: CreateExpensesWorkerInput;
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


export type MutationRemoveCategoryExpenseArgs = {
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


export type MutationRemoveCotizacionArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCountExpenseArgs = {
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


export type MutationRemoveExpenseArgs = {
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


export type MutationUpdateCategoryExpenseArgs = {
  updateInput: UpdateCategoryExpensesInput;
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


export type MutationUpdateCotizacionArgs = {
  updateInput: UpdateCotizacionInput;
};


export type MutationUpdateCountExpenseArgs = {
  updateInput: UpdateCountExpensesInput;
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


export type MutationUpdateExpenseArgs = {
  updateInput: UpdateExpensesInput;
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

export type OrderRepair = {
  __typename?: 'OrderRepair';
  status: Scalars['String'];
  total_por_estado: Scalars['Float'];
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
  client: Client;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inflowDate: Scalars['DateTime'];
  invoiceNumber: Scalars['String'];
  invoiceProducts: Array<InvoiceProduct>;
  invoiceServices: Array<InvoiceService>;
  manually?: Maybe<Scalars['Boolean']>;
  paymentMethod: PaymentMethodEnum;
  status: StatusInvoice;
  updatedAt: Scalars['DateTime'];
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
  stock: StockProductView;
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
  CategoryExpense: CategoryExpenses;
  CategoryExpenses: Array<CategoryExpenses>;
  CategoryExpensesCount: MetadataPagination;
  Company: Company;
  Companys: Array<Company>;
  CompanysCount: MetadataPagination;
  Cotizacion: Cotizacion;
  Cotizaciones: Array<Cotizacion>;
  CotizacionesCount: MetadataPagination;
  Count: MetadataPagination;
  CountExpense: CountExpenses;
  CountExpenses: Array<CountExpenses>;
  CountExpensesCount: MetadataPagination;
  Expense: Expense;
  Expenses: Array<Expense>;
  ExpensesCount: MetadataPagination;
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
  findOneByNumberPhone?: Maybe<Client>;
  functionalities: FunctionalityModel;
  genrateQrByRepair: Scalars['String'];
  getBalanceByDateRange: Balance;
  getGastosByDateRange: Array<SumGastos>;
  getOrdersByDateRange: Array<OrderRepair>;
  getProductByDateRange: Array<SumGastos>;
  getServiceByDateRange: Array<SumGastos>;
  getStockProduct: StockProductView;
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
  obtenerBalanceEmpresaByDate: BalanceResponse;
  obtenerFacturadoPorTrabajador: Array<FacturadoPorTrabajador>;
  obtenerTopProductosVendidos: Array<TopProductosVendidos>;
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


export type QueryCategoryExpenseArgs = {
  id: Scalars['ID'];
};


export type QueryCategoryExpensesArgs = {
  orderBy?: InputMaybe<Array<FindCategoryExpensesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCategoryExpensesWhere>;
};


export type QueryCategoryExpensesCountArgs = {
  orderBy?: InputMaybe<Array<FindCategoryExpensesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCategoryExpensesWhere>;
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


export type QueryCotizacionArgs = {
  id: Scalars['ID'];
};


export type QueryCotizacionesArgs = {
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCotizacionWhere>;
};


export type QueryCotizacionesCountArgs = {
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCotizacionWhere>;
};


export type QueryCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryCountExpenseArgs = {
  id: Scalars['ID'];
};


export type QueryCountExpensesArgs = {
  orderBy?: InputMaybe<Array<FindCountExpensesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCountExpensesWhere>;
};


export type QueryCountExpensesCountArgs = {
  orderBy?: InputMaybe<Array<FindCountExpensesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCountExpensesWhere>;
};


export type QueryExpenseArgs = {
  id: Scalars['ID'];
};


export type QueryExpensesArgs = {
  orderBy?: InputMaybe<Array<FindExpensesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindExpensesWhere>;
};


export type QueryExpensesCountArgs = {
  orderBy?: InputMaybe<Array<FindExpensesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindExpensesWhere>;
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


export type QueryFindOneByNumberPhoneArgs = {
  numberPhone: Scalars['String'];
};


export type QueryGenrateQrByRepairArgs = {
  idRepair: Scalars['String'];
};


export type QueryGetBalanceByDateRangeArgs = {
  dateRange: DateRangeInput;
};


export type QueryGetGastosByDateRangeArgs = {
  dateRange: DateRangeInput;
};


export type QueryGetOrdersByDateRangeArgs = {
  dateRange: DateRangeInput;
};


export type QueryGetProductByDateRangeArgs = {
  dateRange: DateRangeInput;
};


export type QueryGetServiceByDateRangeArgs = {
  dateRange: DateRangeInput;
};


export type QueryGetStockProductArgs = {
  productId: Scalars['String'];
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


export type QueryObtenerBalanceEmpresaByDateArgs = {
  input: BalanceInput;
};


export type QueryObtenerFacturadoPorTrabajadorArgs = {
  input: GetFacturadoPorTrabajadorInput;
};


export type QueryObtenerTopProductosVendidosArgs = {
  input: GetFacturadoPorTrabajadorInput;
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
  selectorOptions?: Maybe<Array<SelectorOption>>;
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
  status?: Maybe<Scalars['Boolean']>;
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

export type SelectorOption = {
  __typename?: 'SelectorOption';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  repairField: RepairField;
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type SelectorOptionDto = {
  value: Scalars['String'];
};

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

export enum StatusCategoryExpenses {
  Activo = 'ACTIVO',
  Inactivo = 'INACTIVO'
}

export enum StatusCountExpenses {
  Activo = 'ACTIVO',
  Cerrada = 'CERRADA',
  Inactivo = 'INACTIVO'
}

export enum StatusExpenses {
  Cancelada = 'CANCELADA',
  Pagada = 'PAGADA',
  Pendiente = 'PENDIENTE'
}

export enum StatusInvoice {
  Anulada = 'ANULADA',
  Elaborada = 'ELABORADA',
  Pagada = 'PAGADA',
  Vencida = 'VENCIDA'
}

export type StockProductView = {
  __typename?: 'StockProductView';
  description: Scalars['String'];
  entrada_producto: Scalars['Float'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  salida_producto: Scalars['Float'];
  stock: Scalars['Float'];
};

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

export type SumGastos = {
  __typename?: 'SumGastos';
  day: Scalars['Float'];
  month: Scalars['Float'];
  total: Scalars['Float'];
  year: Scalars['Float'];
};

export type TopProductosVendidos = {
  __typename?: 'TopProductosVendidos';
  company_id: Scalars['String'];
  cost_price: Scalars['Float'];
  diferencia: Scalars['Float'];
  nombre_producto: Scalars['String'];
  product_id: Scalars['String'];
  quantity: Scalars['Float'];
  sale_price: Scalars['Float'];
  total_vendido_producto: Scalars['Float'];
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

export type UpdateCategoryExpensesInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusCategoryExpenses>;
};

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

export type UpdateCotizacionInput = {
  id: Scalars['ID'];
  status: CotizacionStatusEmun;
};

export type UpdateCountExpensesInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  nameBank?: InputMaybe<Scalars['String']>;
  numberCount?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusCountExpenses>;
};

export type UpdateCustomFieldInput = {
  fieldId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  valorFecha?: InputMaybe<Scalars['DateTime']>;
  valorFotoId?: InputMaybe<Scalars['String']>;
  valorNumerico?: InputMaybe<Scalars['Float']>;
  valorSeletor?: InputMaybe<Scalars['String']>;
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

export type UpdateExpensesInput = {
  amount?: InputMaybe<Scalars['Float']>;
  autorizoById?: InputMaybe<Scalars['ID']>;
  canceldById?: InputMaybe<Scalars['ID']>;
  categoryId?: InputMaybe<Scalars['ID']>;
  countId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  expenseDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isRecurring?: InputMaybe<Scalars['Boolean']>;
  nextDueDate?: InputMaybe<Scalars['DateTime']>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  referenceNumber?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusExpenses>;
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
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  inflowDate?: InputMaybe<Scalars['DateTime']>;
  productId?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<ProductInflowEmun>;
};

export type UpdateProductsInput = {
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
  clientId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  inflowDate?: InputMaybe<Scalars['DateTime']>;
  invoiceProducts?: InputMaybe<Array<CreateInvoiceProductInput>>;
  invoiceServices?: InputMaybe<Array<CreateInvoiceServiceInput>>;
  manually?: InputMaybe<Scalars['Boolean']>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  status?: InputMaybe<StatusInvoice>;
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
  status: Scalars['Boolean'];
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


export type FindOneByDocumentNumberQuery = { __typename?: 'Query', findOneByDocumentNumber?: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string, identificationType?: UserDocumentTypes | null } | null };

export type ClientsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientOrderBy> | FindClientOrderBy>;
  where?: InputMaybe<FindClientWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string }>, clientsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type FindOneByNumberPhoneQueryVariables = Exact<{
  numberPhone: Scalars['String'];
}>;


export type FindOneByNumberPhoneQuery = { __typename?: 'Query', findOneByNumberPhone?: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string } | null };

export type CreateClientMutationVariables = Exact<{
  createInput: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string } };

export type UpdateClientMutationVariables = Exact<{
  updateInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: string } };

export type CreateCotizacionMutationVariables = Exact<{
  createInput: CreateCotizacionInput;
}>;


export type CreateCotizacionMutation = { __typename?: 'Mutation', createCotizacion: { __typename?: 'Cotizacion', id: string } };

export type UpdateCotizacionMutationVariables = Exact<{
  updateInput: UpdateCotizacionInput;
}>;


export type UpdateCotizacionMutation = { __typename?: 'Mutation', updateCotizacion: { __typename?: 'Cotizacion', id: string } };

export type CotizacionesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy> | FindCotizacionOrderBy>;
  where?: InputMaybe<FindCotizacionWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type CotizacionesQuery = { __typename?: 'Query', Cotizaciones: Array<{ __typename?: 'Cotizacion', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, invoiceNumber: string, description?: string | null, status: CotizacionStatusEmun, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string }, cotizacionService?: Array<{ __typename?: 'CotizacionServiceE', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, quantity: number, unitPrice: number, subtotal: number, discount?: number | null, tax?: number | null, total: number, service: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, status?: boolean | null, costEstimate?: number | null } }> | null, cotizacionProduct?: Array<{ __typename?: 'CotizacionProduct', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, quantity: number, unitPrice: number, subtotal: number, discount?: number | null, tax?: number | null, total: number, product: { __typename?: 'Products', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, salePrice: number, minStock?: number | null, costPrice?: number | null, tax?: number | null, unitOfMeasure?: string | null, isActive: boolean, isShowPublic: boolean, expirationDate?: any | null, stock: { __typename?: 'StockProductView', id: string, entrada_producto: number, salida_producto: number, stock: number, name: string, isActive: boolean, description: string } } }> | null }>, CotizacionesCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type CreateCategoryExpenseMutationVariables = Exact<{
  createInput: CreateCategoryExpensesInput;
}>;


export type CreateCategoryExpenseMutation = { __typename?: 'Mutation', createCategoryExpense: { __typename?: 'CategoryExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, status: StatusCategoryExpenses } };

export type UpdateCategoryExpenseMutationVariables = Exact<{
  updateInput: UpdateCategoryExpensesInput;
}>;


export type UpdateCategoryExpenseMutation = { __typename?: 'Mutation', updateCategoryExpense: { __typename?: 'CategoryExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, status: StatusCategoryExpenses } };

export type CategoryExpensesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindCategoryExpensesOrderBy> | FindCategoryExpensesOrderBy>;
  where?: InputMaybe<FindCategoryExpensesWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type CategoryExpensesQuery = { __typename?: 'Query', CategoryExpenses: Array<{ __typename?: 'CategoryExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, status: StatusCategoryExpenses, isDefualtCategory: boolean }>, CategoryExpensesCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type CategoryExpenseQueryVariables = Exact<{
  categoryExpenseId: Scalars['ID'];
}>;


export type CategoryExpenseQuery = { __typename?: 'Query', CategoryExpense: { __typename?: 'CategoryExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, status: StatusCategoryExpenses } };

export type CreateExpenseMutationVariables = Exact<{
  createInput: CreateExpensesInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense: { __typename?: 'Expense', id: string } };

export type UpdateExpenseMutationVariables = Exact<{
  updateInput: UpdateExpensesInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense: { __typename?: 'Expense', id: string } };

export type ExpensesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindExpensesOrderBy> | FindExpensesOrderBy>;
  where?: InputMaybe<FindExpensesWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ExpensesQuery = { __typename?: 'Query', Expenses: Array<{ __typename?: 'Expense', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, amount: number, expenseDate: any, invoiceNumber: string, isRecurring: boolean, nextDueDate?: any | null, paymentMethod: string, referenceNumber?: string | null, status: StatusExpenses, category: { __typename?: 'CategoryExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, status: StatusCategoryExpenses }, createdBy: { __typename?: 'User', fullName: string, email: string, id: string, identificationNumber?: string | null }, autorizoBy?: { __typename?: 'User', fullName: string, email: string, id: string, identificationNumber?: string | null } | null, count: { __typename?: 'CountExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, numberCount?: string | null, nameBank?: string | null, status: StatusCountExpenses }, canceldBy?: { __typename?: 'User', fullName: string, email: string, id: string, identificationNumber?: string | null } | null }>, ExpensesCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type ExpenseQueryVariables = Exact<{
  expenseId: Scalars['ID'];
}>;


export type ExpenseQuery = { __typename?: 'Query', Expense: { __typename?: 'Expense', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, amount: number, expenseDate: any, invoiceNumber: string, isRecurring: boolean, nextDueDate?: any | null, paymentMethod: string, referenceNumber?: string | null, status: StatusExpenses, category: { __typename?: 'CategoryExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, status: StatusCategoryExpenses }, count: { __typename?: 'CountExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, numberCount?: string | null, nameBank?: string | null, status: StatusCountExpenses }, createdBy: { __typename?: 'User', fullName: string, email: string, id: string, identificationNumber?: string | null }, autorizoBy?: { __typename?: 'User', fullName: string, email: string, id: string, identificationNumber?: string | null } | null, canceldBy?: { __typename?: 'User', fullName: string, email: string, id: string, identificationNumber?: string | null } | null } };

export type CreateCountExpenseMutationVariables = Exact<{
  createInput: CreateCountExpensesInput;
}>;


export type CreateCountExpenseMutation = { __typename?: 'Mutation', createCountExpense: { __typename?: 'CountExpenses', id: string } };

export type UpdateCountExpenseMutationVariables = Exact<{
  updateInput: UpdateCountExpensesInput;
}>;


export type UpdateCountExpenseMutation = { __typename?: 'Mutation', updateCountExpense: { __typename?: 'CountExpenses', id: string } };

export type CountExpensesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindCountExpensesOrderBy> | FindCountExpensesOrderBy>;
  where?: InputMaybe<FindCountExpensesWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type CountExpensesQuery = { __typename?: 'Query', CountExpenses: Array<{ __typename?: 'CountExpenses', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, numberCount?: string | null, nameBank?: string | null, status: StatusCountExpenses }>, CountExpensesCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type CreateInvoiceMutationVariables = Exact<{
  createInput: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: { __typename?: 'Invoice', id: string } };

export type AnularInovoiceByRepairMutationVariables = Exact<{
  idRepair: Scalars['String'];
}>;


export type AnularInovoiceByRepairMutation = { __typename?: 'Mutation', anularInovoiceByRepair: string };

export type OrderRepairQueryVariables = Exact<{
  orderRepairId: Scalars['ID'];
}>;


export type OrderRepairQuery = { __typename?: 'Query', orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, status?: boolean | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, valorSeletor?: string | null, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null } };

export type OrderRepairsTypeQueryVariables = Exact<{
  where?: InputMaybe<FindOrderRepairTypeWhere>;
  orderBy?: InputMaybe<Array<FindOrderRepairTypeOrderBy> | FindOrderRepairTypeOrderBy>;
  pagination?: InputMaybe<Pagination>;
}>;


export type OrderRepairsTypeQuery = { __typename?: 'Query', orderRepairsType: Array<{ __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, status?: boolean | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null, selectorOptions?: Array<{ __typename?: 'SelectorOption', value: string, id: string, repairField: { __typename?: 'RepairField', id: string } }> | null }> | null }>, orderRepairsTypeCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type OrderRepairsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindOrderRepairOrderBy> | FindOrderRepairOrderBy>;
  where?: InputMaybe<FindOrderRepairWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type OrderRepairsQuery = { __typename?: 'Query', orderRepairs: Array<{ __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, status?: boolean | null, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null, selectorOptions?: Array<{ __typename?: 'SelectorOption', value: string, id: string, repairField: { __typename?: 'RepairField', id: string } }> | null }> | null }, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, valorSeletor?: string | null, orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null }, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null, selectorOptions?: Array<{ __typename?: 'SelectorOption', value: string, id: string, repairField: { __typename?: 'RepairField', id: string } }> | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null, invoice?: { __typename?: 'Invoice', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, invoiceNumber: string, issueDate: any, dueDate?: any | null, subtotal?: number | null, tax?: number | null, total?: number | null, discount?: number | null, status: StatusInvoice, paymentMethod?: PaymentMethodEnum | null, paymentReference?: string | null, description?: string | null, cliente: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string }, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }, orrderReapirty: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, identificationType?: UserDocumentTypes | null, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string }, repairType: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, costEstimate?: number | null, fields?: Array<{ __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }> | null }, invoice?: { __typename?: 'Invoice', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, invoiceNumber: string, issueDate: any, dueDate?: any | null, subtotal?: number | null, tax?: number | null, total?: number | null, discount?: number | null, status: StatusInvoice, paymentMethod?: PaymentMethodEnum | null, paymentReference?: string | null, description?: string | null } | null, fieldValues?: Array<{ __typename?: 'CustomFieldValue', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, valorTexto?: string | null, valorFecha?: any | null, valorNumerico?: number | null, valorTextoLargo?: string | null, valorSeletor?: string | null, orderRepair: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null }, field: { __typename?: 'RepairField', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null }, valorFoto?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> | null, repairFieldForm?: Array<{ __typename?: 'RepairFieldForm', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, type: FieldTypeEnum, isRequired: boolean, minLength?: number | null, maxLength?: number | null, orderRepairty: { __typename?: 'OrderRepairty', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: OrderStatusEnum, deliveryDate?: any | null } }> | null } } | null }>, orderRepairsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type GenrateQrByRepairQueryVariables = Exact<{
  idRepair: Scalars['String'];
}>;


export type GenrateQrByRepairQuery = { __typename?: 'Query', genrateQrByRepair: string };

export type CreateOrderRepairTypeMutationVariables = Exact<{
  createInput: CreateRepairTypeInput;
}>;


export type CreateOrderRepairTypeMutation = { __typename?: 'Mutation', createOrderRepairType: { __typename?: 'RepairType', id: string } };

export type CreateOrderRepairFullMutationVariables = Exact<{
  createOrderRepairFullInput: CreateOrderRepairFullInput;
}>;


export type CreateOrderRepairFullMutation = { __typename?: 'Mutation', createOrderRepairFull: string };

export type UpdateOrderRepairMutationVariables = Exact<{
  updateInput: UpdateOrderRepairInput;
}>;


export type UpdateOrderRepairMutation = { __typename?: 'Mutation', updateOrderRepair: { __typename?: 'OrderRepairty', id: string } };

export type UpdateOrderRepairTypeMutationVariables = Exact<{
  updateInput: UpdateRepairTypeInput;
}>;


export type UpdateOrderRepairTypeMutation = { __typename?: 'Mutation', updateOrderRepairType: { __typename?: 'RepairType', id: string } };

export type CreateProductMutationVariables = Exact<{
  createInput: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Products', id: string } };

export type UpdateProductMutationVariables = Exact<{
  updateInput: UpdateProductsInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Products', id: string } };

export type ProductsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindProductsOrderBy> | FindProductsOrderBy>;
  where?: InputMaybe<FindProductsWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ProductsQuery = { __typename?: 'Query', Products: Array<{ __typename?: 'Products', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, salePrice: number, costPrice?: number | null, tax?: number | null, unitOfMeasure?: string | null, isActive: boolean, expirationDate?: any | null, isShowPublic: boolean, minStock?: number | null, stock: { __typename?: 'StockProductView', id: string, entrada_producto: number, salida_producto: number, stock: number, name: string } }>, ProductsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type ProductQueryVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Query', Product: { __typename?: 'Products', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, salePrice: number, costPrice?: number | null, tax?: number | null, unitOfMeasure?: string | null, isActive: boolean, expirationDate?: any | null, minStock?: number | null, stock: { __typename?: 'StockProductView', id: string, entrada_producto: number, salida_producto: number, stock: number, name: string } } };

export type CreateProductInflowMutationVariables = Exact<{
  createInput: CreateProductInflowInput;
}>;


export type CreateProductInflowMutation = { __typename?: 'Mutation', createProductInflow: { __typename?: 'ProductInflow', id: string } };

export type UpdateProductInflowMutationVariables = Exact<{
  updateInput: UpdateProductsInflowInput;
}>;


export type UpdateProductInflowMutation = { __typename?: 'Mutation', updateProductInflow: { __typename?: 'ProductInflow', id: string } };

export type ProductsInflowsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindProductsInflowOrderBy> | FindProductsInflowOrderBy>;
  where?: InputMaybe<FindProductsInflowWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ProductsInflowsQuery = { __typename?: 'Query', ProductsInflows: Array<{ __typename?: 'ProductInflow', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, quantity: number, inflowDate: any, status: ProductInflowEmun, description?: string | null, product: { __typename?: 'Products', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, salePrice: number, costPrice?: number | null, tax?: number | null, unitOfMeasure?: string | null, isActive: boolean, expirationDate?: any | null }, user: { __typename?: 'User', email: string, fullName: string, id: string, identificationNumber?: string | null } }>, ProductsInflowsCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type ProductInflowQueryVariables = Exact<{
  productInflowId: Scalars['ID'];
}>;


export type ProductInflowQuery = { __typename?: 'Query', ProductInflow: { __typename?: 'ProductInflow', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, quantity: number, inflowDate: any, description?: string | null, product: { __typename?: 'Products', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description?: string | null, salePrice: number, costPrice?: number | null, tax?: number | null, unitOfMeasure?: string | null, isActive: boolean, expirationDate?: any | null }, user: { __typename?: 'User', email: string, fullName: string, id: string, identificationNumber?: string | null } } };

export type CreateProductOutflowMutationVariables = Exact<{
  createInput: CreateProductOutflowInput;
}>;


export type CreateProductOutflowMutation = { __typename?: 'Mutation', createProductOutflow: { __typename?: 'ProductOutflow', id: string } };

export type UpdateProductOutflowMutationVariables = Exact<{
  updateInput: UpdateProductsOutflowInput;
}>;


export type UpdateProductOutflowMutation = { __typename?: 'Mutation', updateProductOutflow: { __typename?: 'ProductOutflow', id: string } };

export type ProductsOutflowsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindProductsOutflowOrderBy> | FindProductsOutflowOrderBy>;
  where?: InputMaybe<FindProductsOutflowWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ProductsOutflowsQuery = { __typename?: 'Query', ProductsOutflows: Array<{ __typename?: 'ProductOutflow', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, inflowDate: any, description?: string | null, paymentMethod: PaymentMethodEnum, status: StatusInvoice, invoiceNumber: string, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, lastName?: string | null, numberDocument?: string | null, email?: string | null, address?: string | null, celular: string }, invoiceProducts: Array<{ __typename?: 'InvoiceProduct', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, quantity: number, unitPrice: number, subtotal: number, discount?: number | null, tax?: number | null, total: number, product: { __typename?: 'Products', costPrice?: number | null, id: string, name: string, tax?: number | null, salePrice: number } }>, invoiceServices: Array<{ __typename?: 'InvoiceService', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, quantity: number, unitPrice: number, subtotal: number, discount?: number | null, tax?: number | null, total: number, service: { __typename?: 'RepairType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, status?: boolean | null, costEstimate?: number | null } }> }>, ProductsOutflowsCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type GetReportQueryVariables = Exact<{
  dateRange: DateRangeInput;
}>;


export type GetReportQuery = { __typename?: 'Query', getOrdersByDateRange: Array<{ __typename?: 'OrderRepair', status: string, total_por_estado: number }>, getBalanceByDateRange: { __typename?: 'Balance', total_vendido_producto: number, total_vendido_servicio: number, total_gasto: number, total_recaudado: number, saldo: number }, getGastosByDateRange: Array<{ __typename?: 'SumGastos', total: number, day: number, month: number, year: number }>, getProductByDateRange: Array<{ __typename?: 'SumGastos', total: number, day: number, month: number, year: number }>, getServiceByDateRange: Array<{ __typename?: 'SumGastos', total: number, day: number, month: number, year: number }> };

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
export function useFindOneByNumberPhoneQuery(baseOptions: Apollo.QueryHookOptions<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>(FindOneByNumberPhoneDocument, options);
      }
export function useFindOneByNumberPhoneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>(FindOneByNumberPhoneDocument, options);
        }
export type FindOneByNumberPhoneQueryHookResult = ReturnType<typeof useFindOneByNumberPhoneQuery>;
export type FindOneByNumberPhoneLazyQueryHookResult = ReturnType<typeof useFindOneByNumberPhoneLazyQuery>;
export type FindOneByNumberPhoneQueryResult = Apollo.QueryResult<FindOneByNumberPhoneQuery, FindOneByNumberPhoneQueryVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($createInput: CreateClientInput!) {
  createClient(createInput: $createInput) {
    id
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
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
export const CreateCotizacionDocument = gql`
    mutation CreateCotizacion($createInput: CreateCotizacionInput!) {
  createCotizacion(createInput: $createInput) {
    id
  }
}
    `;
export type CreateCotizacionMutationFn = Apollo.MutationFunction<CreateCotizacionMutation, CreateCotizacionMutationVariables>;

/**
 * __useCreateCotizacionMutation__
 *
 * To run a mutation, you first call `useCreateCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCotizacionMutation, { data, loading, error }] = useCreateCotizacionMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCotizacionMutation, CreateCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCotizacionMutation, CreateCotizacionMutationVariables>(CreateCotizacionDocument, options);
      }
export type CreateCotizacionMutationHookResult = ReturnType<typeof useCreateCotizacionMutation>;
export type CreateCotizacionMutationResult = Apollo.MutationResult<CreateCotizacionMutation>;
export type CreateCotizacionMutationOptions = Apollo.BaseMutationOptions<CreateCotizacionMutation, CreateCotizacionMutationVariables>;
export const UpdateCotizacionDocument = gql`
    mutation UpdateCotizacion($updateInput: UpdateCotizacionInput!) {
  updateCotizacion(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateCotizacionMutationFn = Apollo.MutationFunction<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>;

/**
 * __useUpdateCotizacionMutation__
 *
 * To run a mutation, you first call `useUpdateCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCotizacionMutation, { data, loading, error }] = useUpdateCotizacionMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>(UpdateCotizacionDocument, options);
      }
export type UpdateCotizacionMutationHookResult = ReturnType<typeof useUpdateCotizacionMutation>;
export type UpdateCotizacionMutationResult = Apollo.MutationResult<UpdateCotizacionMutation>;
export type UpdateCotizacionMutationOptions = Apollo.BaseMutationOptions<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>;
export const CotizacionesDocument = gql`
    query Cotizaciones($orderBy: [FindCotizacionOrderBy!], $where: FindCotizacionWhere, $pagination: Pagination) {
  Cotizaciones(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    invoiceNumber
    description
    status
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
    cotizacionService {
      id
      createdAt
      updatedAt
      deletedAt
      quantity
      unitPrice
      subtotal
      discount
      tax
      total
      service {
        id
        createdAt
        updatedAt
        deletedAt
        name
        status
        costEstimate
      }
    }
    cotizacionProduct {
      id
      createdAt
      updatedAt
      deletedAt
      quantity
      unitPrice
      subtotal
      discount
      tax
      total
      product {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        salePrice
        minStock
        costPrice
        tax
        unitOfMeasure
        isActive
        isShowPublic
        expirationDate
        stock {
          id
          entrada_producto
          salida_producto
          stock
          name
          isActive
          description
        }
      }
    }
  }
  CotizacionesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useCotizacionesQuery__
 *
 * To run a query within a React component, call `useCotizacionesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCotizacionesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCotizacionesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCotizacionesQuery(baseOptions?: Apollo.QueryHookOptions<CotizacionesQuery, CotizacionesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CotizacionesQuery, CotizacionesQueryVariables>(CotizacionesDocument, options);
      }
export function useCotizacionesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CotizacionesQuery, CotizacionesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CotizacionesQuery, CotizacionesQueryVariables>(CotizacionesDocument, options);
        }
export type CotizacionesQueryHookResult = ReturnType<typeof useCotizacionesQuery>;
export type CotizacionesLazyQueryHookResult = ReturnType<typeof useCotizacionesLazyQuery>;
export type CotizacionesQueryResult = Apollo.QueryResult<CotizacionesQuery, CotizacionesQueryVariables>;
export const CreateCategoryExpenseDocument = gql`
    mutation CreateCategoryExpense($createInput: CreateCategoryExpensesInput!) {
  createCategoryExpense(createInput: $createInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
  }
}
    `;
export type CreateCategoryExpenseMutationFn = Apollo.MutationFunction<CreateCategoryExpenseMutation, CreateCategoryExpenseMutationVariables>;

/**
 * __useCreateCategoryExpenseMutation__
 *
 * To run a mutation, you first call `useCreateCategoryExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryExpenseMutation, { data, loading, error }] = useCreateCategoryExpenseMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateCategoryExpenseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryExpenseMutation, CreateCategoryExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryExpenseMutation, CreateCategoryExpenseMutationVariables>(CreateCategoryExpenseDocument, options);
      }
export type CreateCategoryExpenseMutationHookResult = ReturnType<typeof useCreateCategoryExpenseMutation>;
export type CreateCategoryExpenseMutationResult = Apollo.MutationResult<CreateCategoryExpenseMutation>;
export type CreateCategoryExpenseMutationOptions = Apollo.BaseMutationOptions<CreateCategoryExpenseMutation, CreateCategoryExpenseMutationVariables>;
export const UpdateCategoryExpenseDocument = gql`
    mutation UpdateCategoryExpense($updateInput: UpdateCategoryExpensesInput!) {
  updateCategoryExpense(updateInput: $updateInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
  }
}
    `;
export type UpdateCategoryExpenseMutationFn = Apollo.MutationFunction<UpdateCategoryExpenseMutation, UpdateCategoryExpenseMutationVariables>;

/**
 * __useUpdateCategoryExpenseMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryExpenseMutation, { data, loading, error }] = useUpdateCategoryExpenseMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateCategoryExpenseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryExpenseMutation, UpdateCategoryExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryExpenseMutation, UpdateCategoryExpenseMutationVariables>(UpdateCategoryExpenseDocument, options);
      }
export type UpdateCategoryExpenseMutationHookResult = ReturnType<typeof useUpdateCategoryExpenseMutation>;
export type UpdateCategoryExpenseMutationResult = Apollo.MutationResult<UpdateCategoryExpenseMutation>;
export type UpdateCategoryExpenseMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryExpenseMutation, UpdateCategoryExpenseMutationVariables>;
export const CategoryExpensesDocument = gql`
    query CategoryExpenses($orderBy: [FindCategoryExpensesOrderBy!], $where: FindCategoryExpensesWhere, $pagination: Pagination) {
  CategoryExpenses(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
    isDefualtCategory
  }
  CategoryExpensesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useCategoryExpensesQuery__
 *
 * To run a query within a React component, call `useCategoryExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryExpensesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCategoryExpensesQuery(baseOptions?: Apollo.QueryHookOptions<CategoryExpensesQuery, CategoryExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryExpensesQuery, CategoryExpensesQueryVariables>(CategoryExpensesDocument, options);
      }
export function useCategoryExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryExpensesQuery, CategoryExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryExpensesQuery, CategoryExpensesQueryVariables>(CategoryExpensesDocument, options);
        }
export type CategoryExpensesQueryHookResult = ReturnType<typeof useCategoryExpensesQuery>;
export type CategoryExpensesLazyQueryHookResult = ReturnType<typeof useCategoryExpensesLazyQuery>;
export type CategoryExpensesQueryResult = Apollo.QueryResult<CategoryExpensesQuery, CategoryExpensesQueryVariables>;
export const CategoryExpenseDocument = gql`
    query CategoryExpense($categoryExpenseId: ID!) {
  CategoryExpense(id: $categoryExpenseId) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
  }
}
    `;

/**
 * __useCategoryExpenseQuery__
 *
 * To run a query within a React component, call `useCategoryExpenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryExpenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryExpenseQuery({
 *   variables: {
 *      categoryExpenseId: // value for 'categoryExpenseId'
 *   },
 * });
 */
export function useCategoryExpenseQuery(baseOptions: Apollo.QueryHookOptions<CategoryExpenseQuery, CategoryExpenseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryExpenseQuery, CategoryExpenseQueryVariables>(CategoryExpenseDocument, options);
      }
export function useCategoryExpenseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryExpenseQuery, CategoryExpenseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryExpenseQuery, CategoryExpenseQueryVariables>(CategoryExpenseDocument, options);
        }
export type CategoryExpenseQueryHookResult = ReturnType<typeof useCategoryExpenseQuery>;
export type CategoryExpenseLazyQueryHookResult = ReturnType<typeof useCategoryExpenseLazyQuery>;
export type CategoryExpenseQueryResult = Apollo.QueryResult<CategoryExpenseQuery, CategoryExpenseQueryVariables>;
export const CreateExpenseDocument = gql`
    mutation CreateExpense($createInput: CreateExpensesInput!) {
  createExpense(createInput: $createInput) {
    id
  }
}
    `;
export type CreateExpenseMutationFn = Apollo.MutationFunction<CreateExpenseMutation, CreateExpenseMutationVariables>;

/**
 * __useCreateExpenseMutation__
 *
 * To run a mutation, you first call `useCreateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseMutation, { data, loading, error }] = useCreateExpenseMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpenseMutation, CreateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(CreateExpenseDocument, options);
      }
export type CreateExpenseMutationHookResult = ReturnType<typeof useCreateExpenseMutation>;
export type CreateExpenseMutationResult = Apollo.MutationResult<CreateExpenseMutation>;
export type CreateExpenseMutationOptions = Apollo.BaseMutationOptions<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const UpdateExpenseDocument = gql`
    mutation UpdateExpense($updateInput: UpdateExpensesInput!) {
  updateExpense(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateExpenseMutationFn = Apollo.MutationFunction<UpdateExpenseMutation, UpdateExpenseMutationVariables>;

/**
 * __useUpdateExpenseMutation__
 *
 * To run a mutation, you first call `useUpdateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpenseMutation, { data, loading, error }] = useUpdateExpenseMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExpenseMutation, UpdateExpenseMutationVariables>(UpdateExpenseDocument, options);
      }
export type UpdateExpenseMutationHookResult = ReturnType<typeof useUpdateExpenseMutation>;
export type UpdateExpenseMutationResult = Apollo.MutationResult<UpdateExpenseMutation>;
export type UpdateExpenseMutationOptions = Apollo.BaseMutationOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const ExpensesDocument = gql`
    query Expenses($orderBy: [FindExpensesOrderBy!], $where: FindExpensesWhere, $pagination: Pagination) {
  Expenses(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    amount
    expenseDate
    invoiceNumber
    category {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
    isRecurring
    nextDueDate
    paymentMethod
    referenceNumber
    status
    createdBy {
      fullName
      email
      id
      identificationNumber
    }
    autorizoBy {
      fullName
      email
      id
      identificationNumber
    }
    count {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      numberCount
      nameBank
      status
    }
    canceldBy {
      fullName
      email
      id
      identificationNumber
    }
  }
  ExpensesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useExpensesQuery__
 *
 * To run a query within a React component, call `useExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpensesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useExpensesQuery(baseOptions?: Apollo.QueryHookOptions<ExpensesQuery, ExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExpensesQuery, ExpensesQueryVariables>(ExpensesDocument, options);
      }
export function useExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpensesQuery, ExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExpensesQuery, ExpensesQueryVariables>(ExpensesDocument, options);
        }
export type ExpensesQueryHookResult = ReturnType<typeof useExpensesQuery>;
export type ExpensesLazyQueryHookResult = ReturnType<typeof useExpensesLazyQuery>;
export type ExpensesQueryResult = Apollo.QueryResult<ExpensesQuery, ExpensesQueryVariables>;
export const ExpenseDocument = gql`
    query Expense($expenseId: ID!) {
  Expense(id: $expenseId) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    amount
    expenseDate
    invoiceNumber
    category {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
    isRecurring
    nextDueDate
    paymentMethod
    referenceNumber
    status
    count {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      numberCount
      nameBank
      status
    }
    createdBy {
      fullName
      email
      id
      identificationNumber
    }
    autorizoBy {
      fullName
      email
      id
      identificationNumber
    }
    canceldBy {
      fullName
      email
      id
      identificationNumber
    }
  }
}
    `;

/**
 * __useExpenseQuery__
 *
 * To run a query within a React component, call `useExpenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpenseQuery({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *   },
 * });
 */
export function useExpenseQuery(baseOptions: Apollo.QueryHookOptions<ExpenseQuery, ExpenseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExpenseQuery, ExpenseQueryVariables>(ExpenseDocument, options);
      }
export function useExpenseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpenseQuery, ExpenseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExpenseQuery, ExpenseQueryVariables>(ExpenseDocument, options);
        }
export type ExpenseQueryHookResult = ReturnType<typeof useExpenseQuery>;
export type ExpenseLazyQueryHookResult = ReturnType<typeof useExpenseLazyQuery>;
export type ExpenseQueryResult = Apollo.QueryResult<ExpenseQuery, ExpenseQueryVariables>;
export const CreateCountExpenseDocument = gql`
    mutation CreateCountExpense($createInput: CreateCountExpensesInput!) {
  createCountExpense(createInput: $createInput) {
    id
  }
}
    `;
export type CreateCountExpenseMutationFn = Apollo.MutationFunction<CreateCountExpenseMutation, CreateCountExpenseMutationVariables>;

/**
 * __useCreateCountExpenseMutation__
 *
 * To run a mutation, you first call `useCreateCountExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCountExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCountExpenseMutation, { data, loading, error }] = useCreateCountExpenseMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateCountExpenseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCountExpenseMutation, CreateCountExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCountExpenseMutation, CreateCountExpenseMutationVariables>(CreateCountExpenseDocument, options);
      }
export type CreateCountExpenseMutationHookResult = ReturnType<typeof useCreateCountExpenseMutation>;
export type CreateCountExpenseMutationResult = Apollo.MutationResult<CreateCountExpenseMutation>;
export type CreateCountExpenseMutationOptions = Apollo.BaseMutationOptions<CreateCountExpenseMutation, CreateCountExpenseMutationVariables>;
export const UpdateCountExpenseDocument = gql`
    mutation UpdateCountExpense($updateInput: UpdateCountExpensesInput!) {
  updateCountExpense(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateCountExpenseMutationFn = Apollo.MutationFunction<UpdateCountExpenseMutation, UpdateCountExpenseMutationVariables>;

/**
 * __useUpdateCountExpenseMutation__
 *
 * To run a mutation, you first call `useUpdateCountExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCountExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCountExpenseMutation, { data, loading, error }] = useUpdateCountExpenseMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateCountExpenseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCountExpenseMutation, UpdateCountExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCountExpenseMutation, UpdateCountExpenseMutationVariables>(UpdateCountExpenseDocument, options);
      }
export type UpdateCountExpenseMutationHookResult = ReturnType<typeof useUpdateCountExpenseMutation>;
export type UpdateCountExpenseMutationResult = Apollo.MutationResult<UpdateCountExpenseMutation>;
export type UpdateCountExpenseMutationOptions = Apollo.BaseMutationOptions<UpdateCountExpenseMutation, UpdateCountExpenseMutationVariables>;
export const CountExpensesDocument = gql`
    query CountExpenses($orderBy: [FindCountExpensesOrderBy!], $where: FindCountExpensesWhere, $pagination: Pagination) {
  CountExpenses(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    numberCount
    nameBank
    status
  }
  CountExpensesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useCountExpensesQuery__
 *
 * To run a query within a React component, call `useCountExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountExpensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountExpensesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCountExpensesQuery(baseOptions?: Apollo.QueryHookOptions<CountExpensesQuery, CountExpensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountExpensesQuery, CountExpensesQueryVariables>(CountExpensesDocument, options);
      }
export function useCountExpensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountExpensesQuery, CountExpensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountExpensesQuery, CountExpensesQueryVariables>(CountExpensesDocument, options);
        }
export type CountExpensesQueryHookResult = ReturnType<typeof useCountExpensesQuery>;
export type CountExpensesLazyQueryHookResult = ReturnType<typeof useCountExpensesLazyQuery>;
export type CountExpensesQueryResult = Apollo.QueryResult<CountExpensesQuery, CountExpensesQueryVariables>;
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
export const AnularInovoiceByRepairDocument = gql`
    mutation AnularInovoiceByRepair($idRepair: String!) {
  anularInovoiceByRepair(idRepair: $idRepair)
}
    `;
export type AnularInovoiceByRepairMutationFn = Apollo.MutationFunction<AnularInovoiceByRepairMutation, AnularInovoiceByRepairMutationVariables>;

/**
 * __useAnularInovoiceByRepairMutation__
 *
 * To run a mutation, you first call `useAnularInovoiceByRepairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnularInovoiceByRepairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [anularInovoiceByRepairMutation, { data, loading, error }] = useAnularInovoiceByRepairMutation({
 *   variables: {
 *      idRepair: // value for 'idRepair'
 *   },
 * });
 */
export function useAnularInovoiceByRepairMutation(baseOptions?: Apollo.MutationHookOptions<AnularInovoiceByRepairMutation, AnularInovoiceByRepairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnularInovoiceByRepairMutation, AnularInovoiceByRepairMutationVariables>(AnularInovoiceByRepairDocument, options);
      }
export type AnularInovoiceByRepairMutationHookResult = ReturnType<typeof useAnularInovoiceByRepairMutation>;
export type AnularInovoiceByRepairMutationResult = Apollo.MutationResult<AnularInovoiceByRepairMutation>;
export type AnularInovoiceByRepairMutationOptions = Apollo.BaseMutationOptions<AnularInovoiceByRepairMutation, AnularInovoiceByRepairMutationVariables>;
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
      status
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
      valorSeletor
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
    status
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
      selectorOptions {
        value
        id
        repairField {
          id
        }
      }
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
      status
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
        selectorOptions {
          value
          id
          repairField {
            id
          }
        }
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
        selectorOptions {
          value
          id
          repairField {
            id
          }
        }
      }
      valorTexto
      valorFecha
      valorNumerico
      valorTextoLargo
      valorSeletor
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
          valorSeletor
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
export const UpdateOrderRepairTypeDocument = gql`
    mutation UpdateOrderRepairType($updateInput: UpdateRepairTypeInput!) {
  updateOrderRepairType(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateOrderRepairTypeMutationFn = Apollo.MutationFunction<UpdateOrderRepairTypeMutation, UpdateOrderRepairTypeMutationVariables>;

/**
 * __useUpdateOrderRepairTypeMutation__
 *
 * To run a mutation, you first call `useUpdateOrderRepairTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderRepairTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderRepairTypeMutation, { data, loading, error }] = useUpdateOrderRepairTypeMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateOrderRepairTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderRepairTypeMutation, UpdateOrderRepairTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderRepairTypeMutation, UpdateOrderRepairTypeMutationVariables>(UpdateOrderRepairTypeDocument, options);
      }
export type UpdateOrderRepairTypeMutationHookResult = ReturnType<typeof useUpdateOrderRepairTypeMutation>;
export type UpdateOrderRepairTypeMutationResult = Apollo.MutationResult<UpdateOrderRepairTypeMutation>;
export type UpdateOrderRepairTypeMutationOptions = Apollo.BaseMutationOptions<UpdateOrderRepairTypeMutation, UpdateOrderRepairTypeMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($createInput: CreateProductInput!) {
  createProduct(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($updateInput: UpdateProductsInput!) {
  updateProduct(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const ProductsDocument = gql`
    query Products($orderBy: [FindProductsOrderBy!], $where: FindProductsWhere, $pagination: Pagination) {
  Products(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    salePrice
    costPrice
    tax
    unitOfMeasure
    isActive
    expirationDate
    isShowPublic
    minStock
    stock {
      id
      entrada_producto
      salida_producto
      stock
      name
    }
  }
  ProductsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = gql`
    query Product($productId: ID!) {
  Product(id: $productId) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    salePrice
    costPrice
    tax
    unitOfMeasure
    isActive
    expirationDate
    minStock
    stock {
      id
      entrada_producto
      salida_producto
      stock
      name
    }
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const CreateProductInflowDocument = gql`
    mutation CreateProductInflow($createInput: CreateProductInflowInput!) {
  createProductInflow(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProductInflowMutationFn = Apollo.MutationFunction<CreateProductInflowMutation, CreateProductInflowMutationVariables>;

/**
 * __useCreateProductInflowMutation__
 *
 * To run a mutation, you first call `useCreateProductInflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductInflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductInflowMutation, { data, loading, error }] = useCreateProductInflowMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProductInflowMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductInflowMutation, CreateProductInflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductInflowMutation, CreateProductInflowMutationVariables>(CreateProductInflowDocument, options);
      }
export type CreateProductInflowMutationHookResult = ReturnType<typeof useCreateProductInflowMutation>;
export type CreateProductInflowMutationResult = Apollo.MutationResult<CreateProductInflowMutation>;
export type CreateProductInflowMutationOptions = Apollo.BaseMutationOptions<CreateProductInflowMutation, CreateProductInflowMutationVariables>;
export const UpdateProductInflowDocument = gql`
    mutation UpdateProductInflow($updateInput: UpdateProductsInflowInput!) {
  updateProductInflow(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProductInflowMutationFn = Apollo.MutationFunction<UpdateProductInflowMutation, UpdateProductInflowMutationVariables>;

/**
 * __useUpdateProductInflowMutation__
 *
 * To run a mutation, you first call `useUpdateProductInflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductInflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductInflowMutation, { data, loading, error }] = useUpdateProductInflowMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProductInflowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductInflowMutation, UpdateProductInflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductInflowMutation, UpdateProductInflowMutationVariables>(UpdateProductInflowDocument, options);
      }
export type UpdateProductInflowMutationHookResult = ReturnType<typeof useUpdateProductInflowMutation>;
export type UpdateProductInflowMutationResult = Apollo.MutationResult<UpdateProductInflowMutation>;
export type UpdateProductInflowMutationOptions = Apollo.BaseMutationOptions<UpdateProductInflowMutation, UpdateProductInflowMutationVariables>;
export const ProductsInflowsDocument = gql`
    query ProductsInflows($orderBy: [FindProductsInflowOrderBy!], $where: FindProductsInflowWhere, $pagination: Pagination) {
  ProductsInflows(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    quantity
    inflowDate
    status
    description
    product {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      salePrice
      costPrice
      tax
      unitOfMeasure
      isActive
      expirationDate
    }
    user {
      email
      fullName
      id
      identificationNumber
    }
  }
  ProductsInflowsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useProductsInflowsQuery__
 *
 * To run a query within a React component, call `useProductsInflowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsInflowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsInflowsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsInflowsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsInflowsQuery, ProductsInflowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsInflowsQuery, ProductsInflowsQueryVariables>(ProductsInflowsDocument, options);
      }
export function useProductsInflowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsInflowsQuery, ProductsInflowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsInflowsQuery, ProductsInflowsQueryVariables>(ProductsInflowsDocument, options);
        }
export type ProductsInflowsQueryHookResult = ReturnType<typeof useProductsInflowsQuery>;
export type ProductsInflowsLazyQueryHookResult = ReturnType<typeof useProductsInflowsLazyQuery>;
export type ProductsInflowsQueryResult = Apollo.QueryResult<ProductsInflowsQuery, ProductsInflowsQueryVariables>;
export const ProductInflowDocument = gql`
    query ProductInflow($productInflowId: ID!) {
  ProductInflow(id: $productInflowId) {
    id
    createdAt
    updatedAt
    deletedAt
    quantity
    inflowDate
    description
    product {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      salePrice
      costPrice
      tax
      unitOfMeasure
      isActive
      expirationDate
    }
    user {
      email
      fullName
      id
      identificationNumber
    }
  }
}
    `;

/**
 * __useProductInflowQuery__
 *
 * To run a query within a React component, call `useProductInflowQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductInflowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductInflowQuery({
 *   variables: {
 *      productInflowId: // value for 'productInflowId'
 *   },
 * });
 */
export function useProductInflowQuery(baseOptions: Apollo.QueryHookOptions<ProductInflowQuery, ProductInflowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductInflowQuery, ProductInflowQueryVariables>(ProductInflowDocument, options);
      }
export function useProductInflowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductInflowQuery, ProductInflowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductInflowQuery, ProductInflowQueryVariables>(ProductInflowDocument, options);
        }
export type ProductInflowQueryHookResult = ReturnType<typeof useProductInflowQuery>;
export type ProductInflowLazyQueryHookResult = ReturnType<typeof useProductInflowLazyQuery>;
export type ProductInflowQueryResult = Apollo.QueryResult<ProductInflowQuery, ProductInflowQueryVariables>;
export const CreateProductOutflowDocument = gql`
    mutation CreateProductOutflow($createInput: CreateProductOutflowInput!) {
  createProductOutflow(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProductOutflowMutationFn = Apollo.MutationFunction<CreateProductOutflowMutation, CreateProductOutflowMutationVariables>;

/**
 * __useCreateProductOutflowMutation__
 *
 * To run a mutation, you first call `useCreateProductOutflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductOutflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductOutflowMutation, { data, loading, error }] = useCreateProductOutflowMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProductOutflowMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductOutflowMutation, CreateProductOutflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductOutflowMutation, CreateProductOutflowMutationVariables>(CreateProductOutflowDocument, options);
      }
export type CreateProductOutflowMutationHookResult = ReturnType<typeof useCreateProductOutflowMutation>;
export type CreateProductOutflowMutationResult = Apollo.MutationResult<CreateProductOutflowMutation>;
export type CreateProductOutflowMutationOptions = Apollo.BaseMutationOptions<CreateProductOutflowMutation, CreateProductOutflowMutationVariables>;
export const UpdateProductOutflowDocument = gql`
    mutation UpdateProductOutflow($updateInput: UpdateProductsOutflowInput!) {
  updateProductOutflow(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProductOutflowMutationFn = Apollo.MutationFunction<UpdateProductOutflowMutation, UpdateProductOutflowMutationVariables>;

/**
 * __useUpdateProductOutflowMutation__
 *
 * To run a mutation, you first call `useUpdateProductOutflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductOutflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductOutflowMutation, { data, loading, error }] = useUpdateProductOutflowMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProductOutflowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductOutflowMutation, UpdateProductOutflowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductOutflowMutation, UpdateProductOutflowMutationVariables>(UpdateProductOutflowDocument, options);
      }
export type UpdateProductOutflowMutationHookResult = ReturnType<typeof useUpdateProductOutflowMutation>;
export type UpdateProductOutflowMutationResult = Apollo.MutationResult<UpdateProductOutflowMutation>;
export type UpdateProductOutflowMutationOptions = Apollo.BaseMutationOptions<UpdateProductOutflowMutation, UpdateProductOutflowMutationVariables>;
export const ProductsOutflowsDocument = gql`
    query ProductsOutflows($orderBy: [FindProductsOutflowOrderBy!], $where: FindProductsOutflowWhere, $pagination: Pagination) {
  ProductsOutflows(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    inflowDate
    description
    paymentMethod
    status
    invoiceNumber
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
    invoiceProducts {
      id
      createdAt
      updatedAt
      deletedAt
      quantity
      unitPrice
      subtotal
      discount
      tax
      total
      product {
        costPrice
        id
        name
        tax
        salePrice
      }
    }
    invoiceServices {
      id
      createdAt
      updatedAt
      deletedAt
      quantity
      unitPrice
      subtotal
      discount
      tax
      total
      service {
        id
        createdAt
        updatedAt
        deletedAt
        name
        status
        costEstimate
      }
    }
  }
  ProductsOutflowsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useProductsOutflowsQuery__
 *
 * To run a query within a React component, call `useProductsOutflowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsOutflowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsOutflowsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProductsOutflowsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsOutflowsQuery, ProductsOutflowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsOutflowsQuery, ProductsOutflowsQueryVariables>(ProductsOutflowsDocument, options);
      }
export function useProductsOutflowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsOutflowsQuery, ProductsOutflowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsOutflowsQuery, ProductsOutflowsQueryVariables>(ProductsOutflowsDocument, options);
        }
export type ProductsOutflowsQueryHookResult = ReturnType<typeof useProductsOutflowsQuery>;
export type ProductsOutflowsLazyQueryHookResult = ReturnType<typeof useProductsOutflowsLazyQuery>;
export type ProductsOutflowsQueryResult = Apollo.QueryResult<ProductsOutflowsQuery, ProductsOutflowsQueryVariables>;
export const GetReportDocument = gql`
    query GetReport($dateRange: DateRangeInput!) {
  getOrdersByDateRange(dateRange: $dateRange) {
    status
    total_por_estado
  }
  getBalanceByDateRange(dateRange: $dateRange) {
    total_vendido_producto
    total_vendido_servicio
    total_gasto
    total_recaudado
    saldo
  }
  getGastosByDateRange(dateRange: $dateRange) {
    total
    day
    month
    year
  }
  getProductByDateRange(dateRange: $dateRange) {
    total
    day
    month
    year
  }
  getServiceByDateRange(dateRange: $dateRange) {
    total
    day
    month
    year
  }
}
    `;

/**
 * __useGetReportQuery__
 *
 * To run a query within a React component, call `useGetReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useGetReportQuery(baseOptions: Apollo.QueryHookOptions<GetReportQuery, GetReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReportQuery, GetReportQueryVariables>(GetReportDocument, options);
      }
export function useGetReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportQuery, GetReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReportQuery, GetReportQueryVariables>(GetReportDocument, options);
        }
export type GetReportQueryHookResult = ReturnType<typeof useGetReportQuery>;
export type GetReportLazyQueryHookResult = ReturnType<typeof useGetReportLazyQuery>;
export type GetReportQueryResult = Apollo.QueryResult<GetReportQuery, GetReportQueryVariables>;
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