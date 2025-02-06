import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyService } from './services/company.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { UsersModule } from 'src/security/users/users.module';
import { FilesModule } from 'src/general/files/files.module';
import { ParameterModule } from 'src/general/parameters/parameter.module';

@Global()
@Module({
  providers: [CompanyService,CompanyResolver],
  imports:[
    TypeOrmModule.forFeature([Company]),
    UsersModule,
    FilesModule,
    forwardRef(()=> ParameterModule)
  ],
  exports: [CompanyService]
})
export class CompanyModule {}
