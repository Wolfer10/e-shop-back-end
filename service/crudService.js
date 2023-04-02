import BaseError from '../error/baseError.js';


export default class CrudService {
    constructor(Model) {
        this.Model = Model;
        if (this.constructor == CrudService) {
          throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async findUserByName(name) {
        const model = await this.Model.find({ username: name });
        if (!model) {
            throw new BaseError(404, `Instance not found by name`);
        }
        if (model.length > 1) {
            throw new BaseError(400, `too many instances`);
        }
        return model[0];
    }
    
    async create(model) {
        const createdModel = await this.Model.create(model);
        return createdModel;
    }
    
    async readById(id) {
        const model = await this.Model.findById(id);
        if (!model) {
            throw new BaseError(404, `Instance not found by id`);
        }
        return model;
    }

    async readAll() {
        const models = await this.Model.find();
        return models;
    }

    async update(id, model) {
        const updatedModel =  await this.Model.findByIdAndUpdate({_id: id}, model, {new: true});
        if (!updatedModel) {
            throw new BaseError(404, `Instance not found by id`);
        }
        return updatedModel;
    }

    async delete(id) {
        const res = await this.Model.deleteOne({_id: id});
        if(res.deletedCount == 0){
            throw new BaseError(404, `Instance not found by id`);
        }
    }
}

