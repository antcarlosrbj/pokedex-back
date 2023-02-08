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

async function deleteTeam(userId, teamId) {
    return db.query(`
        DELETE FROM teams
        WHERE "userId"=$1 AND id=$2`, 
      [userId, teamId]);
}

const teamsRepository = {
    createTeam,
    listTeam,
    deleteTeam
};
  
export default teamsRepository;