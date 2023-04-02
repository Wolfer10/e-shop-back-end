export default class BaseError extends Error {
    constructor(status, message){
        super(message);
        this.status = status;
    }
}