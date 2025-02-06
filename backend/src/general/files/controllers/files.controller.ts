import {
  Post,
  Get,
  Param,
  Res,
  Controller,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../services/files.service';
import { FilesManagerService } from '../services/files-manager.service';
import { CreateFileInput, FileUploadDto } from '../dto/inputs/create-file.input';
import { FileInfo } from '../entities/file-info.entity';
import { CurrentContext } from '../../../patterns/crud-pattern/decorators/current-context.decorator';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';


  @Controller('/attachment/files')
  @ApiTags('Attachments')
  export class FilesController {
    constructor(
      private filesService: FilesService,
      private filesManagerService: FilesManagerService,
    ) {}

    @Post('')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @UseInterceptors(FilesInterceptor('file'))
    async upload(
      @CurrentContext() context:IContext,
      @UploadedFiles() files
    ) {
      if(files?.length > 0){
        const file = files[0];
        return await this.filesService.saveImageUrl(context,file)

      }

      // const uploadFiles: Promise<FileInfo>[] = files.map(async (file) => {
      //   const fileArgs: CreateFileInput = {
      //     fileName: file.originalname,
      //     fileBuffer: file.buffer,
      //     fileMongoId: file.id?.toString(),
      //   };
    
      //   const fileResponse = await this.filesService.create(context, fileArgs);
      //   return fileResponse;
      // });
    
      // return await Promise.all(uploadFiles);
    }
    @Post('uploadBase64File')
    @ApiOperation({ summary: 'Subir archivo en formato Base64 y convertirlo a Express.Multer.File' })
    @ApiResponse({ status: 201, description: 'Archivo procesado exitosamente' })
    @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
    async uploadBase64File(@Body() uploadFileDto: FileUploadDto) {
      const { base64, fileName, mimeType } = uploadFileDto;
      const file = await this.filesManagerService.convertBase64ToFile(base64, fileName, mimeType);
  
      return {
        message: 'Archivo subido exitosamente',
        fileInfo: {
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        },
      };
    }
    @Get('download/:id')
    async download(
      @CurrentContext() context:IContext,
      @Param('id') id: string, 
      @Res() res: Response
    ) {
      return await this.filesService.download(context, id, res);
    }

  }
  