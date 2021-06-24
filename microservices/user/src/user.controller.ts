import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}