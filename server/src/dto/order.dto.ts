// import { IsNotEmpty, IsString, IsDate } from "class-validator";

// export class CreatePedidoDto {
//   @IsNotEmpty()
//   @IsDate()
//   fechaRealizacion: Date;

//   @IsNotEmpty()
//   @IsString()
//   detalles: string;

//   @IsNotEmpty()
//   @IsString()
//   estado: string;

//   @IsNotEmpty()
//   usuarioId: number;
// }

// // update-pedido.dto.ts
// import { PartialType } from "@nestjs/mapped-types";
// import { CreatePedidoDto } from "./create-pedido.dto";

// export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}

// // find-pedido.dto.ts
// export class FindPedidoDto {
//   @IsNotEmpty()
//   @IsString()
//   username: string;
// }
