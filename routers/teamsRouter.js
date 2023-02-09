import express from 'express';
import { validateSchema } from "./../middlewares/schemaValidator.js";
import createTeamSchema from '../schemas/createTeamSchema.js';
import deleteTeamSchema from '../schemas/deleteTeamSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createTeam, listTeam, deleteTeam, listTeamThisPokemon, removePokemon, addPokemon } from '../controllers/teamController.js';
import { getSpecies } from '../middlewares/pokemonMiddleware.js';


const teamsRouter = express.Router();

teamsRouter.post('/create-team', validateSchema(createTeamSchema), verifyToken, createTeam);
teamsRouter.get('/list-team', verifyToken, listTeam);
teamsRouter.post('/delete-team', validateSchema(deleteTeamSchema), verifyToken, deleteTeam);
teamsRouter.post('/list-team-this-pokemon', verifyToken, listTeamThisPokemon);
teamsRouter.post('/remove-pokemon', verifyToken, removePokemon);
teamsRouter.post('/add-pokemon', verifyToken, getSpecies, addPokemon);


export default teamsRouter;