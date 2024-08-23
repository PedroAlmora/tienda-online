import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("almacen_app_producto")
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: bigint;

  @ApiProperty()
  @Column({ name: "codigo", length: 50 })
  code: string;

  @ApiProperty()
  @Column({ name: "codigo_barras", length: 50, nullable: true })
  barCode: string;

  @ApiProperty()
  @Column({ name: "nombre" })
  name: string;

  @ApiProperty()
  @Column({ name: "descripcion", type: "text", nullable: true })
  description: string;

  @ApiProperty()
  @Column({ name: "precio", type: "numeric", precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @Column({ name: "cantidad" })
  amount: number;

  @ApiProperty()
  @Column({ name: "compatibilidad", nullable: true })
  compatibility: string;

  @ApiProperty()
  @Column({ name: "imagen", length: 100, nullable: true })
  avatar: string;

  @ApiProperty()
  @Column({ name: "oem", type: "text", nullable: true })
  oem: string;

  @ApiProperty()
  @Column({ name: "campo_predefinido", length: 50, nullable: true })
  section: string;
}
