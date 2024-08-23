import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entitys";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    exports: [TypeOrmModule]
})
export class ProductModule{}