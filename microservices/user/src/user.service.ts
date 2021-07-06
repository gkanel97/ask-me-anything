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
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
      @InjectEntityManager() private manager: EntityManager,
      private choreographerService: AppService
  ) {}

  // create generates a new user with a unique username and e-mail address.
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

  // findByUsername function searches for a user entity with a specific username.
  async findByUsername(username: string): Promise<User> {
    const user = await this.manager.findOne(User, {username: username});
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // findByUUID function searches for a user entity with a specific uuid.
  async findByUUID(uuid: string): Promise<User> {
    const user = await this.manager.findOne(User, { id: uuid });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // updateName function updates the properties of a user entity and saves the changes to the database.
  async updateName(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.manager.transaction(async manager => {
      const user = await manager.findOne(User, uuid);
      if (!user) {
        throw new NotFoundException();
      }

      manager.merge(User, user, updateUserDto);
      return manager.save(user);
    });
  }

  // updatePassword changes the password of a specific user. It may be useful when a user has
  // forgotten their password and wants to reset it.
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