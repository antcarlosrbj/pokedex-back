import bcrypt from 'bcrypt';

import db from "../config/db.js";

async function listPokemon(pokemonId) {
    return db.query(`
        SELECT * FROM pokemons
        WHERE "pokemonId"=$1`, 
      [pokemonId]);
}

async function listPokemonAndTeam(pokemonId, teamId) {
    return db.query(`
        SELECT * FROM pokemons
        WHERE "pokemonId"=$1 AND "teamId"=$2`, 
      [pokemonId, teamId]);
}

async function listPokemonByTeam(teamId) {
    return db.query(`
        SELECT * FROM pokemons
        WHERE "teamId"=$1`, 
      [teamId]);
}

async function listTeamAndUser(teamId, userId) {
    return db.query(`
        SELECT * FROM teams
        WHERE id=$1 AND "userId"=$2`, 
      [teamId, userId]);
}

async function deletePokemonById(id) {
    return db.query(`
        DELETE FROM pokemons
        WHERE id=$1`, 
      [id]);
}

async function addPokemon(teamId, pokemonId, speciesId) {
    return db.query(`
        INSERT INTO pokemons ("teamId", "pokemonId", "speciesId") 
        VALUES ($1, $2, $3)`, 
        [teamId, pokemonId, speciesId]);
}

const pokemonRepository = {
    listPokemon,
    listPokemonAndTeam,
    listPokemonByTeam,
    listTeamAndUser,
    deletePokemonById,
    addPokemon
};
  
export default pokemonRepository;