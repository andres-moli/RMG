import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateFileInput {
  
  @IsString()
  fileName: string;

  @IsString()
  fileExtension?: string;

  @IsString()
  fileBuffer?: string;

  @IsMongoId()
  fileMongoId?: string;

}



export class FileUploadDto {
  @ApiProperty({ description: 'Contenido del archivo en formato Base64' })
  @IsNotEmpty()
  @IsString()
  base64: string;

  @ApiProperty({ description: 'Nombre del archivo (ejemplo: documento.pdf)' })
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty({ description: 'Tipo MIME del archivo (ejemplo: application/pdf)' })
  @IsNotEmpty()
  @IsString()
  mimeType: string;
}
