import { Router } from 'express';
import passport from 'passport'

const router = Router()

router.route('/').post((req, res, next) => {
    if (req.body.username, req.body.password) {
      // Felhasználónév és jelszó ellenőrzése
      passport.authenticate('local', function (error, user) {
        if (error) { 
          console.trace(error)
          return res.status(401).send({'response' : 'Bejelentkezes sikertelen'});
        }
        // Hibakezelés
        req.login(user, function (error) {
          if (error) { 
            console.trace(error)
            return res.status(401).send({'response' : 'Bejelentkezes sikertelen'});
          }
          // Sikeres belépés esetén felhasználó beléptetése
          console.log("Sikeres bejelntkezés");
          return res.status(200).send({'response' : 'Bejelentkezes sikeres'});
        })
      })(req, res); //a stratégiának átadjuk paraméterként a req, res objektumokat
    } else {
      // Hibakezelés, ha hiányzik a felhasználónév vagy a jelszó
      return res.status(400).send({'response' : 'Hibas keres, hiányzik a username és a password'});
    }
  });
  
export default router
