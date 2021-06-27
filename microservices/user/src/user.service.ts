import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./entities/user.entity";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { AppService } from "./app.service";

@Injectable()
export class UserService {
  constructor(
      @InjectEntityManager() private manager: EntityManager,
      private choreographerService: AppService
  ) {}

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
      let newUser = await manager.save(newUserEntity);
      const publishSuccess = await this.choreographerService.publishNewUser(newUser);
      if (publishSuccess) {
        return newUser;
      }
      else {
        throw new BadRequestException("Publishing failed");
      }
    });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.manager.findOne(User, {username: username});
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // async findByUUID(uuid: string): Promise<User> {
  //   const user = await this.manager.findOne(User, { id: uuid });
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   return user;
  // }
  //
  // async updateName(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   return this.manager.transaction(async manager => {
  //     const user = await manager.findOne(User, uuid);
  //     if (!user) {
  //       throw new NotFoundException();
  //     }
  //     // user.firstName = updateUserDto.firstName;
  //     // user.lastName = updateUserDto.lastName;
  //     manager.merge(User, user, updateUserDto);
  //     return manager.save(user);
  //   });
  // }

  async updatePassword(uuid: string, password: string): Promise<User> {
    return this.manager.transaction(async manager => {
      const user = await manager.findOne(User, { id: uuid });
      if (!user) {
        throw new NotFoundException();
      }
      // Hashing is performed in the entity by a BeforeUpdate trigger
      // BeforeUpdate trigger was removed because we have two separate updating functionalities
      // One updates just the password and the other updates just the names
      user.password = bcrypt.hash(password, 10);
      return manager.save(user);
    });
  }
}