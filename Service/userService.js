import errorcode from '../errorcode.js';
import UserRepo from '../Repositary/userRepo.js'

export default class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }

    async createUser(params) {
        try {
            const result = await this.userRepo.createUser(params)
            return result;

        } catch (error) {
            throw error
        }
    }

    async getAlluser(query) {
        try {
            const { page, limit } = query
            const data = [{ $match: { isDeleted: false } }, { $skip: (page * 1 - 1) * (limit * 1) }, { $limit: limit * 1 }]
            const response = await this.userRepo.getAlluser(data)
            return response;
        } catch (error) {
            throw error

        }
    }
    async isDeletedUser(param){
        try {
            const query = [{userId:param},{isDeleted:false}]
            const result =await this.userRepo.isDeletedUser(query)
            return errorcode.DELETE_SUCESS;
        } catch (error) {
            throw error;
            
        }
    }
}