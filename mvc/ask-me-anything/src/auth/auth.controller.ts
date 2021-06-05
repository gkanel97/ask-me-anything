import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.guard";
import { JwtAuthGuard } from "./jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }


  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Body('refresh_token') token) {
    return this.authService.refreshToken(token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout() {
    return this.authService.cancelToken();
  }
}
