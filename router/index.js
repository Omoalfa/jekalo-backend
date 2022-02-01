import { Router } from 'express';
import { createUser, deleteUser, getAllUsers } from '../controller';
import { validateUserCreate } from '../validator';

const routes = Router();

routes.post('/user', validateUserCreate, createUser);
routes.get('/user', getAllUsers);
routes.delete('/user/:username', deleteUser);

export default routes;
