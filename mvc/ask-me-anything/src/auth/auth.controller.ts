import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login() {

  }
}
