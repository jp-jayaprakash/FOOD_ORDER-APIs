import BaseController from "../baseController.js";
import PlaceOrderService from "../Service/placeOrderService.js";


export default class placeOrderController extends BaseController{
    constructor(){
        super();
        this.placeOrderService = new PlaceOrderService();
    }
    async placeOrderByUserId(req, res){
        try {
            const params = req.body.user.userid
            const cart = req.body.user.cart
            console.log(params);
            const result = await this.placeOrderService.placeOrderByUserId(params,cart)
            res.status(200).json({
                result
            })
        } catch (error) {
            throw error
            
        }
    }
} 