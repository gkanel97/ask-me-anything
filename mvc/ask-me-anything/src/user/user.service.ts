import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    return this.manager.transaction(async manager => {
      const user = await manager.findOne(User, {username: createUserDto.username});
      if (user) {
        throw new ConflictException();
      }
      let newUserEntity = await this.manager.create(User, createUserDto);
      newUserEntity.password = await bcrypt.hash(createUserDto.password, 10);
      return manager.save(newUserEntity);
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.manager.findOne(User, {username: username});
  }


  async findByUUID(uuid: number): Promise<any> {
    return this.manager.findOne(User, {id: uuid}, {relations: ['tokens']});
  }

  async updateName(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    return null;
  }

  async updatePassword(uuid: string, password: string): Promise<User> {
    return null;
  }

  async remove(uuid: string): Promise<void> {

  }
}
