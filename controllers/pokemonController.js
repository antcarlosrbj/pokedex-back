export async function allPokemons(req, res) {

  const page = req.query.page || 1
  const limit = 21
  const from = (page-1)*limit+1
  const to = limit*page

  const promises = []

  for (let i = from; i <= to; i++) {
    promises.push(fetch("https://pokeapi.co/api/v2/pokemon/" + i).then(response => response.json()))
  }

  Promise.all(promises).then(pokemons => {
    res.send(
      pokemons.map(pokemon => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + pokemon.id + ".svg"
        }
      })
    )
  })
}