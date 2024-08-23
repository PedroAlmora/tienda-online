import { Controller, Post, Body } from '@nestjs/common';
import { OrderDto } from 'src/dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/services';

@ApiTags("EMAIL")
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: EmailService) { }

    @Post()
    @ApiOperation({
        summary: "Enviar email",
        description: "Este endpoint envia email",
    })
    @ApiOkResponse({
        description: "Email enviado exitosamente",
    })
    @ApiResponse({
        status: 400,
        description: "No encontrado",
    })
    async createOrder(@Body('to') to: string,
        @Body('items') items: { code: string; quantity: number; }[],
        @Body('totalPrice') totalPrice: number,) {
        try {
            const response = await this.orderService.sendOrderConfirmation(to, items, totalPrice);
            return { message: 'Correo enviado con éxito' };
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw error;
        }
    }
}
