import express from 'express';
import { allPokemons } from "../controllers/pokemonController.js";


const pokemonRouter = express.Router();

pokemonRouter.get('/all-pokemons', allPokemons);

export default pokemonRouter;