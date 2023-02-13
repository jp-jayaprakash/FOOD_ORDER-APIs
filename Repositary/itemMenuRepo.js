import ItemSchema from "../Module/itemSchema.js"
import errorcode from "../errorcode.js";

export default class itemMenuRepo{
    constructor(){
        this.itemSchema = ItemSchema
    }

    async createItem(params){
        try {
            const result = await this.itemSchema.create(params)
            return result.save();
        } catch (error) {
            throw error;
        }
    }
    async getAllitems(query,params){
        try {
            const data = await this.itemSchema.aggregate(query,params)
            if(data.length==0){
                return errorcode.FIELD_NOT_PRESENT_ERROR
            }else{
            return data
            }
        } catch (error) {
            throw error
        }
    }
    async getItemCategory (query,params){
        try {
            const data = await this.itemSchema.aggregate(query,params)
            if(data.length == 0){
                return errorcode.FIELD_NOT_PRESENT_ERROR
            }
            else{
                return data
            }
        } catch (error) {
            throw error
        }
    }
    async deleteItem(delquery){
        try {
            const response = await this.itemSchema.findOneAndUpdate(delquery[0],delquery[1])
            return response
        } catch (error) {
            
        }
    }
}