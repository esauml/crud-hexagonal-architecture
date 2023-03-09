import { Request, Response } from 'express';
import { UserRepository } from './user.repository';
import { CreateUser, DeleteUser, GetAllUsers, GetUserById, UpdateUser } from './user.use-cases';
import { User } from '../entities/user.entity';
import { UserDTO } from './user.dto';

class UserController {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;

        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const useCase = new GetAllUsers(this.repository);
            const users = await useCase.execute();
            res.status(200).json(users);
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                res.status(400).json({ message: "esau : " + error.message });
            } else {
                res.status(400).json({ message: 'An error occurred' });
            }
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const useCase = new GetUserById(this.repository);
            const user = await useCase.execute(req.params.id);
            res.status(200).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An error occurred' });
            }
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const userDTO: UserDTO = req.body;
            const useCase = new CreateUser(this.repository);
            const user = await useCase.execute(new User({ name: userDTO.name, email: userDTO.email }));
            res.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An error occurred' });
            }
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userDTO: UserDTO = req.body;
            const useCase = new UpdateUser(this.repository);
            const user = await useCase.execute(req.params.id, new User({ name: userDTO.name, email: userDTO.email }));
            res.status(200).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An error occurred' });
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const useCase = new DeleteUser(this.repository);
            const result = await useCase.execute(req.params.id);
            res.status(204).json();
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An error occurred' });
            }
        }
    }
}

export { UserController };
