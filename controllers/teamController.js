import teamsRepository from "../repositories/teamsRepository.js";

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