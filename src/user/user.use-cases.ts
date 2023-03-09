import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { UserDTO } from './user.dto';

export class CreateUser {
    constructor(private readonly repository: UserRepository) { }

    async execute(userDTO: UserDTO): Promise<User> {
        const user = new User({ name: userDTO.name, email: userDTO.email });
        return await this.repository.create(user);
    }
}

export class GetAllUsers {
    constructor(private readonly repository: UserRepository) { }

    async execute(): Promise<User[]> {
        return await this.repository.findAll();
    }
}

export class GetUserById {
    constructor(private readonly repository: UserRepository) { }

    async execute(id: string): Promise<User | null> {
        return await this.repository.findById(id);
    }
}

export class UpdateUser {
    constructor(private readonly repository: UserRepository) { }

    async execute(id: string, userDTO: UserDTO): Promise<User | null> {
        const user = new User({ name: userDTO.name, email: userDTO.email });
        return await this.repository.update(id, user);
    }
}

export class DeleteUser {
    constructor(private readonly repository: UserRepository) { }

    async execute(id: string): Promise<boolean> {
        const user = await this.repository.findById(id);
        if (!user) {
            return false;
        }
        const result = await this.repository.delete(id);
        return !!result;
    }

}
