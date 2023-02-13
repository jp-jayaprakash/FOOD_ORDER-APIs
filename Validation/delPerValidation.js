import _ from 'lodash'
import errorcode from "../errorcode.js";
import deliverySchema from "../Module/deliverySchema.js"

export default class delperValidation{
    async checkid(param){
        const delId = await deliverySchema.find({Id:param},{isDeleted:false});
        if(delId.length == 0){
            throw new Error(errorcode.INVALID_ID.message)
        }
    }

    async UpdateStatus(update){
        if(_.isString(update) && update !=""){
            console.log(update);
            return {update}
        }
        else{
            throw new Error(errorcode.INVALID_INPUT_FORMAT_ERROR.message)
        }
    }
}