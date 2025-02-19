import { Field, ID, InputType } from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { CotizacionStatusEmun } from "../../emun/cotizacion.enum";

@InputType()
export class UpdateCotizacionInput { 
      
    @Field(() => ID)
    @IsString()
    id: string;
    
    @IsEnum(CotizacionStatusEmun)
    @Field(()=> CotizacionStatusEmun)
    status: CotizacionStatusEmun
}