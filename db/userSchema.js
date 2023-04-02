import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'

// #2 User sémadefiníció, minden dokumentumnak, amit a MongoDB-ben tárolni akarunk, kell egy séma definíció
const userSchema = new Schema({
    // a séma legfontosabb elemei az eltárolt dokumentumok adattagjai
  username: {
    type: String,
    /* támogatott típusok: String, Number, Date, Buffer, Boolean, Mixed, ObjectId,
        Array, Decimal128, Map, Schema - az utolsóval valósítható meg az egymásba ágyazás, tehát hogy az egyik dokumentum
        egy másikat tartalmazzon */
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: Number,
    required: true,
    default: 1, //adhatunk alapértelmezett értéket is
  },
  birthdate: {
    type: Date,
    required: true,
  },
});

userSchema.pre('save', function(next) {
  const user = this;
  // Ellenőrizzük, hogy a jelszó módosult-e
  if(user.isModified('password')) {
      // Generálunk egy sót a jelszó hash-eléséhez
      bcrypt.genSalt(10, function(err, salt) {
          if(err) {
              console.log('hiba a salt generalasa soran');
              // Ha hiba történik a só generálásakor, akkor visszatérünk a hibával
              return next(error);
          }
          // Hash-eljük a jelszót a sóval
          bcrypt.hash(user.password, salt, function(error, hash) {
              if(error) {
                  console.log('hiba a hasheles soran');
                  // Ha hiba történik a hash-elés során, akkor visszatérünk a hibával
                  return next(error);
              }
              // Beállítjuk a jelszó értékét a hash-re
              user.password = hash;
              // Folytatjuk a mentést
              return next();
          })
      })
  } else {
      // Ha a jelszó nem módosult, akkor folytatjuk a mentést
      return next();
  }
});

userSchema.methods.comparePasswords = async function(password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};


// User modell
const User = model('user', userSchema);

export default User;