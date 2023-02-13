
import UserController from "../Controller/userController.js";
import ItemMenuController from "../Controller/itemMenuController.js"
import DeliveryPersController from "../Controller/deliveryPersController.js"
import SequenceController from "../Controller/sequenceController.js";
import PlaceOrderController from "../Controller/placeOrderController.js";

export default function routes(app){
    const userController = new UserController()
    app.post('/v1/createUser', userController.createUser)
    app.get('/v1/getAllUser',userController.getAlluser)
    app.patch('/v1/DeleteUserById/:id',userController.isDeletedUser)

    const itemMenuControlle = new ItemMenuController()
    app.post('/v1/createItems',itemMenuControlle.createItem)
    app.get('/v1/allitemMenu',itemMenuControlle.getAllitems) 
    app.get('/v1/itemCategorise',itemMenuControlle.getItemCategory)  
    app.patch('/v1/deleteItemById/:id',itemMenuControlle.deleteItem) 

    
    const deliveryPersController = new DeliveryPersController()
    app.post('/v1/createDeliveryPersonDetails',deliveryPersController.createDeliverDetails)
    app.patch('/v1/deleteDelivey_Pers_Details/:id',deliveryPersController.deleteDelPers)
    app.patch('/v1/update_Del_pers/:id',deliveryPersController.updateAvailability)

    const sequenceController = new SequenceController()
    app.post('/v1/create_Sequence',sequenceController.createSequence)

    const  placeOrderController = new PlaceOrderController()
    app.get('/v1/getPlaceOrder_By_Id',placeOrderController.placeOrderByUserId)
}

