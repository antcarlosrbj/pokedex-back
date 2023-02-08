import bcrypt from 'bcrypt';

import db from "../config/db.js";

async function createTeam(userId, nameTeam) {
    return db.query(`
      INSERT INTO teams ("userId", "name") 
      VALUES ($1, $2)`, 
      [userId, nameTeam]);
}

async function listTeam(userId) {
    return db.query(`
        SELECT * FROM teams
        WHERE "userId"=$1`, 
      [userId]);
}

const teamsRepository = {
    createTeam,
    listTeam
};
  
export default teamsRepository;