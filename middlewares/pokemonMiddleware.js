import axios from "axios";

export async function getSpecies(req, res, next) {

    const pokemonId = req.body.pokemonId;

    try {
        const promisse = axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)

        promisse.then(answer => {
            // "https://pokeapi.co/api/v2/pokemon-species/2/"
            //                                            ^
            //                   Get the species number __|
            const arr = answer.data.evolution_chain.url.split("/")
            res.locals.species = arr[arr.length-2]
            next();
        })

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}