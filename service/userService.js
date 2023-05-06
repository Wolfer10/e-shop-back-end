import CrudService from './crudService.js';
import User from '../db/userSchema.js';
import BaseError from '../error/baseError.js';

class UserService extends CrudService {

    async findUserByName(name) {
        const model = await User.find({ username: name });
        if (model.length > 1) {
            throw new BaseError(400, `too many instances`);
        }
        return model[0];
    }
   
}

export default new UserService(User);