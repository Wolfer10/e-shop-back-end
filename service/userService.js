import CrudService from './crudService.js';
import User from '../db/userSchema.js';

class UserService extends CrudService {
   
}

export default new UserService(User);