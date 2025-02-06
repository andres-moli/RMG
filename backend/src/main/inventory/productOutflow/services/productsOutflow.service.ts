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
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    @InjectRepository(InvoiceProduct)
    private readonly invoiceProductRepository: Repository<InvoiceProduct>
  ){ super(); }

  async beforeCreate(context: IContext, repository: Repository<ProductOutflow>, entity: ProductOutflow, createInput: CreateProductOutflowInput): Promise<void> {
    await this.valideDetailInvoiceStock(context,createInput,entity)
    // entity.company = await this.companyService.findOne(context,createInput.companyId,true);
    entity.user = await this.userService.findOne(context,createInput.userId,true);
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
      const total = subtotal - discount + tax;

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
  }
  async valideDetailInvoiceStock(context: IContext,createInput: CreateProductOutflowInput, entity: ProductOutflow){
    // for(const prod of createInput.invoiceProducts){
    //   const stock = await this.statisticaService.getStockProducts(prod.productId)
    //   if(prod.quantity > stock.stock){
    //     const product = await this.productService.findOne(context,prod.productId,true)
    //     throw new Error('El stock del producto (' + product.name + ") no hay suficiente ( " + stock.stock + ") UND")
    //   }
    // }
  }
}
