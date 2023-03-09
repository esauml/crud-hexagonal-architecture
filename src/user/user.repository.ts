import { UserModel, UserDocument } from './user.schema';
import { User } from '../entities/user.entity';

export class UserRepository {
    async findAll(): Promise<User[]> {
        const users = await UserModel.find();
        return users.map((user: UserDocument) => new User({ id: user.id, name: user.name, email: user.email }));
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);
        if (!user) {
            return null;
        }
        return new User({ id: user.id, name: user.name, email: user.email });
    }

    async create(user: User): Promise<User> {
        const newUser = new UserModel({ name: user.name, email: user.email });
        const savedUser = await newUser.save();
        return new User({ id: savedUser.id, name: savedUser.name, email: savedUser.email });
    }

    async update(id: string, updatedUser: User): Promise<User | null> {
        const existingUser = await UserModel.findById(id);
        if (!existingUser) {
            return null;
        }
        existingUser.name = updatedUser.name;
        existingUser.email = updatedUser.email;
        const savedUser = await existingUser.save();
        return new User({ id: savedUser.id, name: savedUser.name, email: savedUser.email });
    }

    async delete(id: string): Promise<User | null> {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return null;
        }
        return new User({ id: user.id, name: user.name, email: user.email });
    }
}
