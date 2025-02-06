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
    private readonly fileService: FilesService
  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<Products>, entity: Products, createInput: CreateProductInput): Promise<void> {
    // entity.company = await this.companyService.findOne(context,createInput.companyId,true);
    if(createInput.fileId){
      entity.file = await this.fileService.findOne(context,createInput.fileId,true);
    }
  }
}
