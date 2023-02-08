import express from 'express';
import { createUser, login, validateToken } from "../controllers/userController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import loginSchema from '../schemas/loginSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const authRouter = express.Router();

authRouter.post('/signup', validateSchema(userSchema), createUser);
authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.get('/validate-token', verifyToken, validateToken);


export default authRouter;