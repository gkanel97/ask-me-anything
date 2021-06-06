import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('access-jwt') {}

@Injectable()
export class JwtRefreshGuard extends AuthGuard('refresh-jwt') {}