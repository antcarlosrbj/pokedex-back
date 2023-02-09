import teamsRepository from "../repositories/teamsRepository.js";
import pokemonRepository from "../repositories/pokemonRepository.js";

export async function createTeam(req, res) {
    const nameTeam = req.body.name;
    const userId = res.locals.id;
    
    try {
      if (res.locals.user === "Visitante") return res.sendStatus(401)
      await teamsRepository.createTeam(userId, nameTeam)
      res.sendStatus(201);

    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
}

export async function listTeam(req, res) {
  const userId = res.locals.id;
  
  try {
    if (res.locals.user === "Visitante") return res.sendStatus(401)
    const teams = await teamsRepository.listTeam(userId)
    res.send(teams.rows);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteTeam(req, res) {
  const userId = res.locals.id;
  const teamId = req.body.id;
  
  try {

    if (res.locals.user === "Visitante") return res.sendStatus(401)

    const teams = await teamsRepository.deleteTeam(userId, teamId)
    res.send(200);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function listTeamThisPokemon(req, res) {
  const userId = res.locals.id;
  const pokemonId = req.body.pokemonId;
  
  try {
    if (res.locals.user === "Visitante") return res.sendStatus(401)
    const myTeams = await teamsRepository.listTeam(userId)
    
    const thisPokemon = await pokemonRepository.listPokemon(pokemonId)

    const thisPokemonInMyTeam = thisPokemon.rows.map(pokemon => pokemon.teamId)
    
    const answer = myTeams.rows.map(team => {
      if (thisPokemonInMyTeam.includes(team.id)) {
        return {
          id: team.id,
          name: team.name,
          have: true
        }
      } else {
        return {
          id: team.id,
          name: team.name,
          have: false
        }
        }
      })

    res.send(answer)

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function removePokemon(req, res) {
  const userId = res.locals.id;
  const pokemonId = req.body.pokemonId;
  const teamId = req.body.teamId;
  
  try {
    if (res.locals.user === "Visitante") return res.sendStatus(401)
    
    const myPokemon = await pokemonRepository.listPokemonAndTeam(pokemonId, teamId)
    const myTeam = await pokemonRepository.listTeamAndUser(teamId, userId)

    if (!(myPokemon.rows.length && myTeam.rows.length)) return res.sendStatus(401)

    await pokemonRepository.deletePokemonById(myPokemon.rows[0].id)
    
    res.sendStatus(200)

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function addPokemon(req, res) {
  const userId = res.locals.id;
  const pokemonId = req.body.pokemonId;
  const teamId = req.body.teamId;
  const species = parseInt(res.locals.species);

  const limit = 6;
  
  try {
    if (res.locals.user === "Visitante") return res.sendStatus(401)
    
    const myTeam = await pokemonRepository.listTeamAndUser(teamId, userId)
    
    if(!myTeam.rows.length) return res.sendStatus(401)
    
    const myPokemon = await pokemonRepository.listPokemonByTeam(teamId)

    if (myPokemon.rows.length >= limit) return res.status(401).send(`You have reached the limit of ${limit} pokemons per team`)

    const speciesIAlreadyHave = myPokemon.rows.map(pokemon => pokemon.speciesId)
    
    if(speciesIAlreadyHave.includes(species)) return res.status(401).send("You cannot have two Pokemon of the same species on the same team.")

    await pokemonRepository.addPokemon(teamId, pokemonId, species)
    
    res.sendStatus(200)

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}