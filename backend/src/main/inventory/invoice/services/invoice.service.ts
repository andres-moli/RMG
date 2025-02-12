import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { CreateInvoiceInput } from '../dto/inputs/create-invoice.input';
import { UpdateInvoiceInput } from '../dto/inputs/update-invoice.input';
import { FindInvoicesArgs } from '../dto/args/find-invoice.args';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { UsersService } from 'src/security/users/services/users.service';
import { CompanyService } from 'src/main/company/services/company.service';
import { throws } from 'assert';
import { FilesService } from 'src/general/files/services/files.service';
import { StatusInvoice } from '../emun/invoice.emun';
import { MailService } from 'src/general/email/service/email.service';
import { OrderRepairService } from 'src/main/rmg/orderRepair/service/order-repair.service';

export const serviceStructure = CrudServiceStructure({
  entityType: Invoice,
  createInputType: CreateInvoiceInput,
  updateInputType: UpdateInvoiceInput,
  findArgsType: FindInvoicesArgs,
});

@Injectable()
export class InvoiceService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly usersService: UsersService,
    private readonly companyService: CompanyService,
    private readonly fileService: FilesService,
    private readonly mailService: MailService,
    private readonly orderRepairService: OrderRepairService

  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<Invoice>, entity: Invoice, createInput: CreateInvoiceInput): Promise<void> {
    const orderRepair = await this.orderRepairService.findOne(context,createInput.orderRepairId,true);
    if(await orderRepair.invoice) throw new Error('Ya existe una factura para esta reparación')
    const invoiceNumber = await this.generateInvoiceNumber(repository,createInput);
    entity.invoiceNumber = invoiceNumber;
    entity =  await this.completeData(context,entity,repository,createInput)
  }
  async afterCreate(context: IContext, repository: Repository<Invoice>, entity: Invoice, createInput: CreateInvoiceInput): Promise<void> {
    await this.relationCitaByInvoice(context,entity,createInput);
    if(entity.status === StatusInvoice.PAGADA){
      // this.sendEmail(entity)
    }
  }
  async afterUpdate(
    context: IContext, 
    repository: Repository<Invoice>, 
    entity: Invoice, 
    updateInput: UpdateInvoiceInput
  ): Promise<void> {
    // Verificar que la factura esté en estado "PAGADA"
    if(entity.status === StatusInvoice.PAGADA){
      this.sendEmail(entity)
    }
  }
  async sendEmail(entity: Invoice){
    if(entity.status === StatusInvoice.PAGADA){
      // Obtener la empresa, cliente y cita asociados a la factura
      const cliente = await entity.cliente;
      const service = (await (await entity.orrderReapirty).repairType)
  
      // Definir el título del correo
      const title =  cliente.name + ' - Factura N° ' + entity.invoiceNumber;
  
      // Crear el contexto de datos para el correo
      const dataContext = {
        invoiceNumber: entity.invoiceNumber, // Número de la factura
        issueDate: entity.issueDate.toLocaleDateString(), // Fecha de emisión de la factura
        dueDate: entity.dueDate ? entity.dueDate.toLocaleDateString() : 'N/A', // Fecha de vencimiento
        clienteName: cliente.name, // Nombre del cliente
        citaTitle: title, // Título de la cita
        subtotal: entity.subtotal ? entity.subtotal.toFixed(2) : '0.00', // Subtotal de la factura
        tax: entity.tax ? entity.tax.toFixed(2) : '0.00', // Impuestos aplicados
        discount: entity.discount ? entity.discount.toFixed(2) : '0.00', // Descuento
        total: entity.total ? entity.total.toFixed(2) : '0.00', // Total de la factura
        paymentMethod: entity.paymentMethod || 'No especificado', // Método de pago
        paymentReference: entity.paymentReference || 'N/A', // Referencia del pago
        description: entity.description || 'No hay descripción disponible', // Descripción adicional
        service
      };
  
      // Enviar el correo utilizando el servicio de correos
      this.mailService.sendMail(
        [cliente.email], // Correo electrónico del cliente
        title, // Asunto del correo
        "facturaCita", // Plantilla de correo a utilizar
        dataContext // Datos dinámicos para llenar la plantilla
      );
    }
  }
  
  async relationCitaByInvoice(context: IContext, entity: Invoice,createInput: CreateInvoiceInput){
    const orderRepair = await this.orderRepairService.findOne(context,createInput.orderRepairId,true);
    orderRepair.invoice = entity;
    const repository = this.orderRepairService.getRepository(context);
    await repository.save(orderRepair)
    
  }
  async completeData(context: IContext,entity: Invoice, repository: Repository<Invoice>, createInput: CreateInvoiceInput | UpdateInvoiceInput){
    const orderRepair = await this.orderRepairService.findOne(context, createInput.orderRepairId, true);
    if(createInput.orderRepairId){
      entity.orrderReapirty = orderRepair 
    }
    if(createInput.clienteId){
      entity.cliente = await orderRepair.client;
    }
    entity.status = StatusInvoice.PAGADA
    // if(createInput.companyId){
    //   entity.company = await this.companyService.findOne(context,createInput.companyId,true);
    // }
    entity.user = await this.usersService.findOne(context,context.user.id,true);
    return entity
  }
  async generateInvoiceNumber(repository: Repository<Invoice>, createInput: CreateInvoiceInput) {
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
