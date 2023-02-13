import UserSchema from '../Module/userSchema.js'

export default class userRepo{
    constructor(){
        this.USchema = UserSchema
    }

    async createUser(params){
        try {
            const result = await this.USchema.create(params)
            return result.save();
        } catch (error) {
            throw error ;
        }
    }
    async  getAlluser(data){
        try {
            const result = await this.USchema.aggregate(data)
            return result
        } catch (error) {
            
        }
    }
    async isDeletedUser(query){
        try {
            const response = await this.USchema.findByIdAndUpdate(query[0],query[1])
            return response;
        } catch (error) {
            
        }
    }
    async getUserById (params){
        try {
            const result = await this.USchema.aggregate(params)
            return result
        } catch (error) {
            
        }

    }
}