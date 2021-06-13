import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.manager.transaction(async manager => {
      const user = await manager.findOne(User, {
        where: [
          { username: createUserDto.username },
          { email: createUserDto.email }
        ]
      });
      if (user) {
        throw new NotAcceptableException("A user with the same username and/or email already exists!");
      }
      let newUserEntity = await this.manager.create(User, createUserDto);
      // Hashing is performed in the entity by a BeforeInsert trigger
      // newUserEntity.password = await bcrypt.hash(createUserDto.password, 10);
      return manager.save(newUserEntity);
    });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.manager.findOne(User, {username: username});
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }


  async findByUUID(uuid: string): Promise<User> {
    const user = await this.manager.findOne(User, { id: uuid });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateName(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.manager.transaction(async manager => {
      const user = await manager.findOne(User, uuid);
      if (!user) {
        throw new NotFoundException();
      }
      // user.firstName = updateUserDto.firstName;
      // user.lastName = updateUserDto.lastName;
      manager.merge(User, user, updateUserDto);
      return manager.save(user);
    });
  }

  async updatePassword(uuid: string, password: string): Promise<User> {
    return this.manager.transaction(async manager => {
      const user = await manager.findOne(User, { id: uuid });
      if (!user) {
        throw new NotFoundException();
      }
      // Hashing is performed in the entity by a BeforeUpdate trigger
      // user.password = bcrypt.hash(password, 10);
      user.password = password;
      return manager.save(user);
    });
  }

  async remove(uuid: string): Promise<void> {

  }
}
