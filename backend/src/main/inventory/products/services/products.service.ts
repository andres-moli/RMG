import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { Products } from '../entities/products.entity';
import { CreateProductInput } from '../dto/inputs/create-products.input';
import { UpdateProductsInput } from '../dto/inputs/update-products.input';
import { FindProductsArgs } from '../dto/args/find-products.args';
import { CompanyService } from 'src/main/company/services/company.service';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { FilesService } from 'src/general/files/services/files.service';
import { StatisticService } from 'src/main/statistic/service/statistic.service';
import { Workbook } from 'exceljs';

export const serviceStructure = CrudServiceStructure({
  entityType: Products,
  createInputType: CreateProductInput,
  updateInputType: UpdateProductsInput,
  findArgsType: FindProductsArgs,
});

@Injectable()
export class ProductsService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly companyService: CompanyService,
    private readonly fileService: FilesService,
    private readonly statisticService: StatisticService
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<Products>, entity: Products, createInput: CreateProductInput): Promise<void> {
    // entity.company = await this.companyService.findOne(context,createInput.companyId,true);
    if(createInput.fileId){
      entity.file = await this.fileService.findOne(context,createInput.fileId,true);
    }
  }
  getSctockProductById(id: string){
    return this.statisticService.getStockProducts(id)
  }
  async generateInventoryExcel() {
    // Obtener los datos de la vista
    const products = await this.statisticService.getStockProductsAll();
    if (!products.length) {
      throw new Error("No se encontraron productos en inventario.");
    }

    // Crear un nuevo libro de Excel
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Inventario");

    // Definir las columnas (Ocultar ID)
    worksheet.columns = [
      { header: "Nombre", key: "name", width: 25 },
      { header: "Estado", key: "isActive", width: 15 },
      { header: "Descripción", key: "description", width: 30 },
      { header: "Precio Venta", key: "salePrice", width: 15 },
      { header: "Entrada", key: "entrada_producto", width: 15 },
      { header: "Salida", key: "salida_producto", width: 15 },
      { header: "Stock", key: "stock", width: 15 },
    ];

    // Aplicar estilos a la cabecera
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0070C0" }, // Azul
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });

    // Agregar los datos corregidos
    products.forEach((product) => {
      worksheet.addRow({
        name: product.name,
        isActive: product.isActive ? "Activo" : "Inactivo",
        description: product.description || "Sin descripción",
        entrada_producto: product.entrada_producto,
        salida_producto: product.salida_producto,
        stock: product.stock,
      });
    });

    // Crear un Buffer en memoria
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

  
}
