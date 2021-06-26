import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard extends the AuthGuard included in passport library
// This guard is responsible for validating access tokens.
@Injectable()
export class JwtAuthGuard extends AuthGuard('access-jwt') {}
