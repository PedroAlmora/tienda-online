import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users_app_usuario')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({ name: 'last_login', type: 'timestamp with time zone' })
    lastLogin: Date;

    @ApiProperty()
    @Column({ name: 'is_superuser' })
    isSuperuser: boolean;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column({ name: 'first_name' })
    firstName: string;

    @ApiProperty()
    @Column({ name: 'last_name' })
    lastName: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column({ name: 'is_staff' })
    isStaff: boolean;

    @ApiProperty()
    @Column({ name: 'is_active' })
    isActive: boolean;

    @ApiProperty()
    @Column({ name: 'date_joined', type: 'timestamp with time zone' })
    dateJoined: Date;

    @ApiProperty()
    @Column()
    rol: string;

    @ApiProperty()
    @Column({ name: 'tarjeta_credito' })
    tarjetaCredito: string;
}