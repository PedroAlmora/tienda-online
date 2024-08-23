import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import * as services from './services';
import * as modules from './modules';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order, Product, User } from './entitys';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'admin'),
        database: configService.get<string>('DB_DATABASE', 'TMP-TIENDA'),
        entities: [User, Product, Order],
        synchronize: false,

      }),
    }),
    modules.UserModule,
    modules.ProductModule,
    modules.OrderModule,
    JwtModule.register({
      global: true,
      secret: 'PedroFunciona',
      signOptions: { expiresIn: '24h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [controllers.UserController, controllers.AuthController, controllers.ProductController, controllers.OrderController],
  providers: [services.UserService, services.AuthService, services.ProductService, services.EmailService],
})
export class AppModule {}
