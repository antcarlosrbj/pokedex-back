import express from 'express';
import { createUser, login } from "../controllers/userController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import loginSchema from '../schemas/loginSchema.js';


const authRouter = express.Router();

authRouter.post('/signup', validateSchema(userSchema), createUser);
authRouter.post('/login', validateSchema(loginSchema), login);

export default authRouter;