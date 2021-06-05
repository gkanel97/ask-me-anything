import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser (username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      return user.id;
    }
    else {
      return null;
    }
  }

  async generateToken(userId: string) {
    const payload = {uuid: userId};
    return {
      'access_token': this.jwtService.sign(payload)
    };
  }

  async refreshToken(token: string) {

  }

  async cancelToken() {

  }
}
