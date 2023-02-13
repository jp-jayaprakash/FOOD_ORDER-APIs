import errorcode from "../errorcode.js"
import itemMenuRepo from "../Repositary/itemMenuRepo.js"
import MenuValidation from "../Validation/menuValidation.js"

export default class ItemMenuService {
    constructor(){
        this.itemMenuRepo = new itemMenuRepo()
        this.menuValidation = new MenuValidation
    }
    async createItem(params){
        try {
            const data = await this.itemMenuRepo.createItem(params)
            return data
        } catch (error) {
            throw error
        }
    }
    async getAllitems(data,search){
        try {
            const {page, limit}=data
            // await this.menuValidation.unhandle(search)
            if(search != null && page != null && limit !=null){
                const query = [{$match:{itemName: new RegExp(`^${search}`,"i")}},{$skip:(page*1-1)*(limit*1)} , { $limit:(limit*1)}]
                const response = await this.itemMenuRepo.getAllitems(query)
                return response
            }
            else{
                const params =([{$limit:limit*1}])
                const result = await this.itemMenuRepo.getAllitems(params)
                return result;

            }
        } catch (error) {
            if(error.message === errorcode.DUPLICATE_NAME_ERROR.message){
                return errorcode.DUPLICATE_NAME_ERROR
            }
        }
    }
    async getItemCategory(data,search){
        try {
            const {page, limit}= data;
            console.log(page, limit, search);
            if(search != null && page != null && limit !=null){
                const query = [{$match:{category: new RegExp(`^${search}`,"i")}},{$skip:(page*1-1)*(limit*1)} , { $limit:(limit*1)}]
                 console.log("SERVICE", query);
                const response = await this.itemMenuRepo.getItemCategory(query)
                return response;
            }else{
                const params =([{$limit:limit*1}])
                const result = await this.itemMenuRepo.getItemCategory(params)
                return result
            }
        } catch (error) {
            throw error;
        }
    }
    async deleteItem(param){
        try {
            const delquery =[{itemId:param},{isDeleted:true}]
            const result = await this.itemMenuRepo.deleteItem(delquery)
            return errorcode.DELETE_SUCESS
        } catch (error) {
            throw error
        }
    }
}