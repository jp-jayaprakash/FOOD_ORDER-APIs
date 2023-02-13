import errorcode from "../errorcode.js"
import itemSchema from "../Module/itemSchema.js";


export default class menuValidation{
    async menuPagination(page,limit){
        if(typeof(page == "String"), typeof (limit == "String")){
            page = parseInt(page)
            limit = parseInt(limit)
            if(isNaN(page)|| isNaN(limit)){
                throw new Error(errorcode.INVALID_INPUT_FORMAT_ERROR.message);
            }
            else{
                return {page:page,limit:limit}
            }
        }
         else{
            return {page:page,limit:limit}
        }
        
    }
    async checkId(param){
        const delId = await itemSchema.find({itemId:param}, {isDeleted:false});
        if(delId.length == 0){
            throw new Error(errorcode.INVALID_ID.message)
        }
    }
    // async unhandle(search){
    //     let item = await itemSchema.find({itemName:search})
    //     console.log('unhandle',item);
    //     if (item.length == 0){
    //         throw new Error(errorcode.DUPLICATE_NAME_ERROR.message)
    //     }
    // }
}