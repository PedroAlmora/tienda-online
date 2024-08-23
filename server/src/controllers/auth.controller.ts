import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "src/services";
import { ApiTags } from "@nestjs/swagger";
import { AuthDto } from "src/dto";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() authDto: AuthDto): Promise<{ accessToken: string, email: string }> {
    const state = await this.authService.validateUser(authDto);
    return state;
  }

  @HttpCode(HttpStatus.OK)
  @Post("verified")
  async verified(@Body("accessToken") accessToken: string) {
    await this.authService.isTokenInvalid(accessToken);
    return "Token vencido";
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logout(@Body("accessToken") accessToken: string) {
    await this.authService.invalidateToken(accessToken);
    return "Sesión cerrada exitosamente";
  }
}
