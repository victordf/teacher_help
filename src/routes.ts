import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";
import { alterUserController } from './useCases/AlterUser'
import { searchUserController } from "./useCases/SearchUser";

const router = Router();

// -- User Routes
router.post('/users', createUserController.handle)
router.put('/users/:id', alterUserController.handle)
router.get('/users', searchUserController.handle)
// -- End User Routes

export { router }