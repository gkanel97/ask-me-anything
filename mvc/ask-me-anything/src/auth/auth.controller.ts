import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.guard";
import { JwtAuthGuard, JwtRefreshGuard } from "./jwt.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.generateInitialTokens(req.user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Request() req,  @Body('refresh_token') token: string) {
    return this.authService.refreshAccessToken(req.user, token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout() {
    return this.authService.cancelToken();
  }
}
