import { Router } from 'express';
import UserService from '../service/userService.js';

const router = Router()


router.post('/', async (req, res) => {
    try {
      const existingUser = await UserService.findUserByName(req.body.username);
      if (existingUser) {
        return res.status(400).send('Username is already taken');
      }
  
      const user = await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).send(error.message);
    }
  });

export default router
