import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";

@Entity("almacen_app_pedidos")
export class Order {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_At: Date;
  
    @ApiProperty()
    @Column({ type: 'text' })
    details: string;
  
    @ApiProperty()
    @Column({ type: 'varchar', length: 20 })
    state: string;
  
    @ApiProperty()
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    user: User;
}