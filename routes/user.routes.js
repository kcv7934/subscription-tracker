import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import {getUsers, getUser} from '../controllers/user.controller.js';

const userRouter = Router();

// GET /users -> get all users
// Get /users/:id -> get user by id // 123 4244 1234

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send('CREATE new user'));

userRouter.put('/:id', (req, res) => res.send('UPDATE user'));

userRouter.delete('/:id', (req, res) => res.send('DELETE user'));


export default userRouter;