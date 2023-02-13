import DeliverySchema from "../Module/deliverySchema.js";

export default class deliveryPersRepo{
    constructor(){
        this.deliverySchema = DeliverySchema
    }

    async createDeliverDetails(params){
        try {
            const response = await this.deliverySchema.create(params)
            return response.save()
        } catch (error) {
            throw error;
        }
    }
    async deleteDelPers(delquery){
        try {
            const response = await this.deliverySchema.findOneAndUpdate(delquery[0],delquery[1])
            return response
        } catch (error) {
            throw error
        }
    }
    async updateAvailability(query){
        try {
            const result = await this.deliverySchema.findOneAndUpdate(query[0],query[1])
            return result
        } catch (error) {
            throw error
        }
    }

}
