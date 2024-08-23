import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { UserController } from "src/controllers";
// import { UserService } from "src/services";
import { User } from "src/entitys";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule]
})
export class UserModule{}