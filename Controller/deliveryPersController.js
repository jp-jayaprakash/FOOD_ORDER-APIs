import BaseController from "../baseController.js";
import DeliveryPersService from "../Service/deliveryPersService.js"
import { v4 as uuidv4 } from 'uuid';
import DelperValidation from "../Validation/delPerValidation.js";
import errorcode from "../errorcode.js";

export default class deliveryPersController extends BaseController{
    constructor(){
        super();
        this.deliveryPersService = new DeliveryPersService();
        this.delperValidation = new DelperValidation()
    }

    async createDeliverDetails(req, res){
        try {
            req.body.Id= uuidv4()
            const del = await this.deliveryPersService.createDeliverDetails(req.body)
            res.status(201).json({
                del
            })
        } catch (error) {
            throw error
        }
    }
    async deleteDelPers(req, res){
        try {
            let param = req.params.id;
            await this.delperValidation.checkid(param)
            const dele = await this.deliveryPersService.deleteDelPers(param)
            res.status(200).json({
                param:dele
            })
        } catch (error) {
            if(error.message === errorcode.INVALID_ID.message){
                res
                    .status(errorcode.INVALID_ID.status)
                    .send(errorcode.INVALID_ID)
                    
            }
            
        }
    }
    async updateAvailability(req, res){
        try {
            let param = req.params.id
            let update = req.body.status
            await this.delperValidation.checkid(param)
            const check = await this.deliveryPersService.updateAvailability(param,update)
            res.status(200).json({
                check
            })
        } catch (error) {
            if(error.message === errorcode.INVALID_ID.message){
                res
                    .status(errorcode.INVALID_ID.status)
                    .send(errorcode.INVALID_ID)       
            }
            
        }
    }
}