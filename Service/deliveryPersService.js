import errorcode from "../errorcode.js";
import DeliveryPersRepo from "../Repositary/deliveryPersRepo.js"
import DelperValidation from "../Validation/delPerValidation.js"


export default class deliveryPersService{
    constructor(){
        this.deliveryPersRepo = new DeliveryPersRepo()
        this.delperValidation = new DelperValidation()
    }
    async createDeliverDetails(params){
        try {
            const data = await this.deliveryPersRepo.createDeliverDetails(params)
            return data;
        } catch (error) {
            throw error;
        }
    }
    async deleteDelPers(param){
        try {
            let delquery = [{Id:param},{isDeleted:true}]
            const result = await this.deliveryPersRepo.deleteDelPers(delquery)
            return errorcode.DELETE_SUCESS
        } catch (error) {
            throw error
        }
    }
    async updateAvailability(param, update){
        try {
            await this.delperValidation.UpdateStatus(update)
            const query = [{Id:param},{status:update}]
            const response = await this.deliveryPersRepo.updateAvailability(query)
            return errorcode.UPDATE_SUCESS
        } catch (error) {
            if(error.message === errorcode.INVALID_INPUT_FORMAT_ERROR.message){
                return errorcode.INVALID_INPUT_FORMAT_ERROR
            }
        }
    }
}