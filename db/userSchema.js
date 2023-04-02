import { Schema, model } from 'mongoose';

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

// User modell
const User = model('user', userSchema);

export default User;