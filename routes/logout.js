
import { Router } from 'express';

const router = Router()



router.route('/').post((req, res, next) => {
    if (req.isAuthenticated()) { 
      req.logout((err) => {
        if(err) {
          console.log('Hiba a kijelentkezés során');
          return res.status(500).send(err)
        }
        return res.status(200).send('Kijelentkezes sikeres');
      });
    } else {
      return res.status(403).send('Nem is volt bejelentkezve');
    }
  })

export default router