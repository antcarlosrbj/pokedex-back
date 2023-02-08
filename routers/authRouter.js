import express from 'express';
import { createUser } from "../controllers/userController.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";


const authRouter = express.Router();

authRouter.post('/signup', validateSchema(userSchema), createUser);

export default authRouter;