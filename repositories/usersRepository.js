import bcrypt from 'bcrypt';

import db from "../config/db.js";


async function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

async function createUser(name, email, plainPassword) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(plainPassword, SALT);
    return db.query(`
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)`, 
      [name, email, passwordHash]);
  }

const usersRepository = {
    getUserByEmail,
    createUser
};
  
export default usersRepository;