import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entitys";


@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    exports: [TypeOrmModule]
})
export class OrderModule{}