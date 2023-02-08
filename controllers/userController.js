import usersRepository from '../repositories/usersRepository.js';

export async function createUser(req, res) {
    const user = req.body;
    
    try {
      const existingUsers = await usersRepository.getUserByEmail(user.email)
      if (existingUsers.rowCount > 0) {
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