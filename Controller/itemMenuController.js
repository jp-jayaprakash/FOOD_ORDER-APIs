import BaseController from "../baseController.js";
import ItemMenuService from "../Service/itemMenuService.js";
import { v4 as uuidv4 } from 'uuid';
import errorcode from "../errorcode.js";
import MenuValidation from "../Validation/menuValidation.js";



export default class itemMenuController extends BaseController{
    constructor(){
        super();
        this.itemMenuService = new ItemMenuService();
        this.menuValidation = new MenuValidation()
    }
    async createItem(req, res){
        try {
            req.body.itemId = uuidv4();
            const createItem = await this.itemMenuService.createItem(req.body)
            res.status(201).json({
                createItem
            })
        } catch (error) {
            throw error
        }
    }
    async getAllitems(req, res){
        try {
            let page = req.query.page || 1
            let limit = req.query.limit || 15;
            let search = req.query.search;
            const data = await this.menuValidation.menuPagination(page,limit)
            const get = await this.itemMenuService.getAllitems(data,search)
            res.status(200).json({
                get
            })
            
        } catch (error) {
            if(error.message == errorcode.INVALID_INPUT_FORMAT_ERROR.message){
                res
                    .status(errorcode.INVALID_INPUT_FORMAT_ERROR.status)
                    .send(errorcode.INVALID_INPUT_FORMAT_ERROR)
            }
        }
    }
    async getItemCategory(req, res){
        try {
            let page = req.query.page || 1
            let limit = req.query.limit|| 15;
            let search = req.query.search;
            const data = await this.menuValidation.menuPagination(page,limit)
            const result = await this.itemMenuService.getItemCategory(data,search)
            res.status(200).json({
                result
            })
        } catch (error) {
            if(error.message == errorcode.INVALID_INPUT_FORMAT_ERROR.message){
                res
                    .status(errorcode.INVALID_INPUT_FORMAT_ERROR.status)
                    .send(errorcode.INVALID_INPUT_FORMAT_ERROR)
            }
        }
    }
    async deleteItem(req, res){
        try {
            let param = req.params.id;
            await this.menuValidation.checkId(param)
            console.log(param);
            const value = await this.itemMenuService.deleteItem(param)
            res.status(200).json({
                value
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
