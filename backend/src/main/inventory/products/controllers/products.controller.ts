import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { ProductsService } from "../services/products.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("products")
@ApiTags('products')
export class ProductsController {
  constructor(private readonly inventoryService: ProductsService) {}

  @Get("export-excel")
  async exportInventoryExcel(@Res() res: Response): Promise<void> {
    try {
      const buffer = await this.inventoryService.generateInventoryExcel();

      // Configurar la respuesta HTTP para descarga
      res.set({
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=Inventario_${new Date().toISOString().split("T")[0]}.xlsx`,
      });

      res.send(buffer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
