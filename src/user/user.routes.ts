import { Router } from 'express';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

const userRouter = Router();
const userRepository = new UserRepository();

const userController = new UserController(userRepository);

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
