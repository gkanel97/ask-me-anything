import {
  Controller,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {MessagePattern} from "@nestjs/microservices";

@Controller() //('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@Post('new')
  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern({ cmd: 'create-user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}