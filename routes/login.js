import { Router } from 'express';
import passport from 'passport'

const router = Router()

router.route('/').post((req, res, next) => {
    if (req.body.username, req.body.password) {
      // Felhasználónév és jelszó ellenőrzése
      passport.authenticate('local', function (error, user) {
        if (error) { 
          console.trace(error)
          return res.status(401).send('Bejelentkezes sikertelen');
        }
        // Hibakezelés
        req.login(user, function (error) {
          if (error) { 
            console.trace(error)
            return res.status(401).send('Bejelentkezes sikertelen');
          }
          // Sikeres belépés esetén felhasználó beléptetése
          return res.status(200).send('Bejelentkezes sikeres');
        })
      })(req, res); //a stratégiának átadjuk paraméterként a req, res objektumokat
    } else {
      // Hibakezelés, ha hiányzik a felhasználónév vagy a jelszó
      return res.status(400).send('Hibas keres, username es password kell');
    }
  });
  
export default router
