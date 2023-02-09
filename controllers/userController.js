import bcrypt from 'bcrypt';
import usersRepository from '../repositories/usersRepository.js';
import authService from '../services/authService.js';

export async function createUser(req, res) {
    const user = req.body;
    
    try {
      const existingUsers = await usersRepository.getUserByEmail(user.email)

      if (existingUsers.rows.length > 0) {
        return res.sendStatus(409);
      }

      const {name, email, password} = user;
      await usersRepository.createUser(name, email, password);
  
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const { rows: users } = await usersRepository.getUserByEmail(email);
    const [user] = users;
    if (!user) {
        return res.sendStatus(401);
    }
  
    if (bcrypt.compareSync(password, user.password)) {
        const token = authService.generateToken(email);
        return res.send(token);
    }
  
    res.sendStatus(401);
}

export async function validateToken(req, res) {
  res.send(res.locals.user)
}