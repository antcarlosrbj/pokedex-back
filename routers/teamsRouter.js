import express from 'express';
import { validateSchema } from "./../middlewares/schemaValidator.js";
import createTeamSchema from '../schemas/createTeamSchema.js';
import deleteTeamSchema from '../schemas/deleteTeamSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createTeam, listTeam, deleteTeam } from '../controllers/teamController.js';


const teamsRouter = express.Router();

teamsRouter.post('/create-team', validateSchema(createTeamSchema), verifyToken, createTeam);
teamsRouter.get('/list-team', verifyToken, listTeam);
teamsRouter.post('/delete-team', validateSchema(deleteTeamSchema), verifyToken, deleteTeam);

export default teamsRouter;