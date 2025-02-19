import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { CompanyService } from 'src/main/company/services/company.service';
import { ProductsService } from '../../products/services/products.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { UsersService } from 'src/security/users/services/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusInvoice } from '../../invoice/emun/invoice.emun';
import { ClientService } from 'src/main/rmg/client/services/client.service';
import { StatisticService } from 'src/main/statistic/service/statistic.service';
import { Cotizacion } from '../entities/cotizacion.entity';
import { CreateCotizacionInput } from '../dto/inputs/create-cotizacion.input';
import { UpdateCotizacionInput } from '../dto/inputs/update-cotizacion.input';
import { FindCotizacionArgs } from '../dto/args/find-cotizacion.args';
import { OrderRepairTypeService } from 'src/main/rmg/repairType/service/order-repair-type.service';
import { CotizacionProduct } from '../entities/product-cotizacion.entity';
import { CotizacionServiceE } from '../entities/service-cotizacion.entity';
import { CotizacionStatusEmun } from '../emun/cotizacion.enum';


export const serviceStructure = CrudServiceStructure({
  entityType: Cotizacion,
  createInputType: CreateCotizacionInput,
  updateInputType: UpdateCotizacionInput,
  findArgsType: FindCotizacionArgs,
  
});

@Injectable()
export class CotizacionService extends CrudServiceFrom(serviceStructure) {
    constructor(
        private readonly clintService: ClientService,
        private readonly serviceService: OrderRepairTypeService,
        private readonly productsService: ProductsService
    ){ super(); }

    async beforeCreate(context: IContext, repository: Repository<Cotizacion>, entity: Cotizacion, createInput: CreateCotizacionInput): Promise<void> {
        entity.client = await this.clintService.findOne(context, createInput.clientId,true);
        entity.invoiceNumber = await this.generateInvoiceNumber(repository,createInput);
        entity.status = CotizacionStatusEmun.REALIZADA
    }
    async afterCreate(context: IContext, repository: Repository<Cotizacion>, entity: Cotizacion, createInput: CreateCotizacionInput): Promise<void> {
        await this.completeData(context,createInput,entity)
    }
    async completeData(context: IContext,createInput: CreateCotizacionInput,entity: Cotizacion){
        const cotizacionProducts: CotizacionProduct[] = [];
        const cotizacionServices: CotizacionServiceE[] = [];
        for(const item of createInput.items){
            if(item.type == 'product'){
                const product = await this.productsService.findOne(context,item.id,true);
                const discountAmount = (product.salePrice * item.discount) / 100;
                const taxAmount = (product.salePrice * item.tax) / 100;
                let cotizacionProduct: CotizacionProduct =  {
                    cotizacion: entity,
                    product: product,
                    unitPrice: product.salePrice,
                    quantity: item.quantity,
                    subtotal: product.salePrice * item.quantity,
                    tax: item.tax,
                    discount: item.discount,
                    total: (product.salePrice * item.quantity) - discountAmount + taxAmount
                } as CotizacionProduct
                const create = this.getRepository(context).manager.create<CotizacionProduct>(CotizacionProduct,cotizacionProduct)
                const result = await this.getRepository(context).manager.save<CotizacionProduct>(create)
                cotizacionProducts.push(result)
            }
            else if(item.type == 'service'){
                const service = await this.serviceService.findOne(context,item.id,true);
                const discountAmount = (service.costEstimate * item.discount) / 100;
                const taxAmount = (service.costEstimate * item.tax) / 100;
                let cotizacionService = {
                    cotizacion: entity,
                    service: service,
                    unitPrice: service.costEstimate,
                    quantity: item.quantity,
                    subtotal: service.costEstimate * item.quantity,
                    tax: item.tax,
                    discount: item.discount,
                    total: (service.costEstimate * item.quantity) - discountAmount + taxAmount
                } 
                const create = this.getRepository(context).manager.create<CotizacionServiceE>(CotizacionServiceE,cotizacionService)
                const result = await this.getRepository(context).manager.save<CotizacionServiceE>(create)
                cotizacionServices.push(result)
            }
        }
        entity.cotizacionProduct = cotizacionProducts;
        entity.cotizacionService = cotizacionServices;
        await this.getRepository(context).manager.save(entity)
    }
    async generateInvoiceNumber(repository: Repository<Cotizacion>, createInput: CreateCotizacionInput) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);  // Mes con dos dígitos
        const day = ('0' + currentDate.getDate()).slice(-2);  // Día con dos dígitos

        // Formato base: INVYYYYMMDD
        const baseInvoiceNumber = `COT${year}${month}${day}`;

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
