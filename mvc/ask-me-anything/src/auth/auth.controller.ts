import { Controller, Request, Post, UseGuards, Body, HttpCode } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.guard";
import { JwtAuthGuard, JwtRefreshGuard } from "./jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.generateInitialTokens(req.user);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Request() req) {
    return this.authService.refreshAccessToken(req.user);
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  async logout(@Request() req) {
    await this.authService.cancelToken(req.user);
    return null;
  }

  @Post('globalLogout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async globalLogout(@Request() req) {
    await this.authService.cancelAllTokens(req.user);
    return null;
  }
}
