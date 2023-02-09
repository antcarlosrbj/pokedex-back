import express from 'express';
import { allPokemons, getPokemon } from "../controllers/pokemonController.js";


const pokemonRouter = express.Router();

pokemonRouter.get('/all-pokemons', allPokemons);
pokemonRouter.get('/pokemon/:pokemonId', getPokemon);

export default pokemonRouter;