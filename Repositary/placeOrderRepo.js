import placeOrderSchema from "../Module/placeOrderSchema.js"

export default class placeOrderRepo{
    constructor(){
        this.placeOrderSchema = placeOrderSchema

    }
    async placeOrderByUserId(params){
        try {
            const data = await this.placeOrderSchema(params)
            return data.save()
        } catch (error) {
            throw error
        }
    }
}