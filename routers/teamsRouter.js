import express from 'express';
import { validateSchema } from "./../middlewares/schemaValidator.js";
import createTeamSchema from '../schemas/createTeamSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createTeam, listTeam } from '../controllers/createTeamController.js';


const teamsRouter = express.Router();

teamsRouter.post('/create-team', validateSchema(createTeamSchema), verifyToken, createTeam);
teamsRouter.get('/list-team', verifyToken, listTeam);

export default teamsRouter;