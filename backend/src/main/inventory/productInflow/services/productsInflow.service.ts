import { Injectable } from '@nestjs/common';
import { CrudServiceStructure } from 'src/patterns/crud-pattern/interfaces/structures/crud-service-structure.interface';
import { CrudServiceFrom } from 'src/patterns/crud-pattern/mixins/crud-service.mixin';
import { ProductInflow } from '../entities/productInflow.entity';
import { CreateProductInflowInput } from '../dto/inputs/create-productsInflow.input';
import { UpdateProductsInflowInput } from '../dto/inputs/update-productsInflow.input';
import { FindProductsInflowArgs } from '../dto/args/find-productsInflow.args';
import { IContext } from 'src/patterns/crud-pattern/interfaces/context.interface';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/main/company/services/company.service';
import { UsersService } from 'src/security/users/services/users.service';
import { ProductsService } from '../../products/services/products.service';

export const serviceStructure = CrudServiceStructure({
  entityType: ProductInflow,
  createInputType: CreateProductInflowInput,
  updateInputType: UpdateProductsInflowInput,
  findArgsType: FindProductsInflowArgs,
});

@Injectable()
export class ProductsInflowService extends CrudServiceFrom(serviceStructure) {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,

  ){ super(); }
  async beforeCreate(context: IContext, repository: Repository<ProductInflow>, entity: ProductInflow, createInput: CreateProductInflowInput): Promise<void> {
    // entity.company = await this.companyService.findOne(context,createInput.companyId,true);
    entity.user = await this.userService.findOne(context,context.user.id, true);
    entity.product = await this.productService.findOne(context,createInput.productId, true);
  }

}
