import {
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { User } from "./entities/user.entity";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async addUser(user: User): Promise<User> {
        return await this.manager.save(User, user);
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
}
