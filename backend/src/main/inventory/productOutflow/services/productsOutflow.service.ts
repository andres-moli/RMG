import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { ProductOutflow } from '../entities/productOuflow.entity';
import { CreateProductOutflowInput } from '../dto/inputs/create-productsOutflow.input';
import { UpdateProductsOutflowInput } from '../dto/inputs/update-productsOutflow.input';
import { FindProductsOutflowArgs } from '../dto/args/find-productsOutflow.args';
import { CompanyService } from 'src/main/company/services/company.service';
import { ProductsService } from '../../products/services/products.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { UsersService } from 'src/security/users/services/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceProduct } from '../entities/InvoiceProduct.entity';
import { StatusInvoice } from '../../invoice/emun/invoice.emun';
import { ClientService } from 'src/main/rmg/client/services/client.service';
import { StatisticService } from 'src/main/statistic/service/statistic.service';
import { CreateInvoiceProductInput } from '../dto/inputs/CreateInvoiceProduct.input';
import { OrderRepairTypeService } from 'src/main/rmg/repairType/service/order-repair-type.service';
import { InvoiceService } from '../entities/InvoiceService.entity';

export const serviceStructure = CrudServiceStructure({
  entityType: ProductOutflow,
  createInputType: CreateProductOutflowInput,
  updateInputType: UpdateProductsOutflowInput,
  findArgsType: FindProductsOutflowArgs,
  
});

@Injectable()
export class ProductsOutflowService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly companyService: CompanyService,
    private readonly clientService: ClientService,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly statisticaService: StatisticService,
    private readonly ordertypeService: OrderRepairTypeService,
    @InjectRepository(InvoiceProduct)
    private readonly invoiceProductRepository: Repository<InvoiceProduct>,
    @InjectRepository(InvoiceService)
    private readonly invoiceServiceRepository: Repository<InvoiceService>
  ){ super(); }

  async beforeCreate(context: IContext, repository: Repository<ProductOutflow>, entity: ProductOutflow, createInput: CreateProductOutflowInput): Promise<void> {
    await this.valideDetailInvoiceStock(context,createInput,entity)
    entity.invoiceNumber = await this.generateInvoiceNumber(repository,createInput)
    // entity.company = await this.companyService.findOne(context,createInput.companyId,true);
    entity.client = await this.clientService.findOne(context,createInput.clientId,true);
    entity.status = StatusInvoice.PAGADA
  }
  async afterCreate(context: IContext, repository: Repository<ProductOutflow>, entity: ProductOutflow, createInput: CreateProductOutflowInput): Promise<void> {
    await this.CreateDetailInvoice(context,createInput,entity)
  }
  async CreateDetailInvoice(context: IContext,createInput: CreateProductOutflowInput, entity: ProductOutflow){
    for (const invoiceProductDTO of createInput.invoiceProducts) {
      const { quantity, unitPrice, discount = 0, tax = 0, productId } = invoiceProductDTO;
      const productDetail = await this.productService.findOne(context,productId,true);
      const subtotal = quantity * productDetail.salePrice;
      const descuento = (subtotal * discount) / 100;
      const impuesto = (subtotal * tax) / 100;
      const total=  subtotal - descuento + impuesto;
      // const subtotal = quantity * productDetail.salePrice;
      // const total = (subtotal - discount) + tax;

      const invoiceProduct = this.invoiceProductRepository.create({
        quantity,
        unitPrice: productDetail.salePrice,
        subtotal,
        discount,
        tax,
        total,
        product: productDetail,
        productOutflow: entity
      });

      await this.invoiceProductRepository.save(invoiceProduct);
    }
    for(const invoiceServiceDTO of createInput.invoiceServices){
      const { quantity, unitPrice, discount = 0, tax = 0, serviceId } = invoiceServiceDTO;
      const service = await this.ordertypeService.findOne(context,serviceId,true);
      const subtotal = quantity * service.costEstimate;
      const descuento = (subtotal * discount) / 100;
      const impuesto = (subtotal * tax) / 100;
      const total=  subtotal - descuento + impuesto;

      const invoiceService = this.invoiceServiceRepository.create({
        quantity,
        unitPrice: service.costEstimate,
        subtotal,
        discount,
        tax,
        total,
        service: service,
        productOutflow: entity
      });

      await this.invoiceServiceRepository.save(invoiceService);
    }
  }
  async valideDetailInvoiceStock(context: IContext,createInput: CreateProductOutflowInput, entity: ProductOutflow){
    for(const prod of createInput.invoiceProducts){
      const stock = await this.statisticaService.getStockProducts(prod.productId)
      if(prod.quantity > stock.stock){
        // const product = await this.productService.findOne(context,prod.productId,true)
        throw new Error('El stock del producto (' + stock.name + ") no hay suficiente ( " + stock.stock + ") UND")
      }
    }
  }
    async generateInvoiceNumber(repository: Repository<ProductOutflow>, createInput: CreateProductOutflowInput) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);  // Mes con dos dígitos
      const day = ('0' + currentDate.getDate()).slice(-2);  // Día con dos dígitos
  
      // Formato base: INVYYYYMMDD
      const baseInvoiceNumber = `INV${year}${month}${day}`;
  
      // Obtener el último número de factura generado para el mismo día
      const lastFactura = await repository
        .createQueryBuilder('factura')
        .where('factura.invoiceNumber LIKE :baseInvoiceNumber', { baseInvoiceNumber: `${baseInvoiceNumber}%` })
        // .andWhere('factura.company = :companyId', {companyId: createInput.companyId})
        .orderBy('factura.invoiceNumber', 'DESC')
        .getOne();
  
      let sequenceNumber = '000001';  // Si no hay facturas previas, empezamos en 000001
  
      if (lastFactura) {
        // Obtener el número de secuencia de la última factura del día
        const lastSequence = parseInt(lastFactura.invoiceNumber.split('-')[1], 10);
        sequenceNumber = ('000000' + (lastSequence + 1)).slice(-6);  // Aumentar el número y asegurarse de que tenga 6 dígitos
      }
  
      // Asignar el número de factura final
      return `${baseInvoiceNumber}-${sequenceNumber}`;
    }
}
