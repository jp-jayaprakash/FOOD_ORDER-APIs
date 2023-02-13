import PlaceOrderRepo from "../Repositary/placeOrderRepo.js"
import SequenceRepo from "../Repositary/sequenceRepo.js"
import UserSchema from "../Module/userSchema.js"
import ItemSchema from "../Module/itemSchema.js"
import DeliverySchema from "../Module/deliverySchema.js"
import UserRepo from "../Repositary/userRepo.js"
import errorcode from "../errorcode.js"

export default class placeOrderService {
    constructor() {
        this.placeOrderRepo = new PlaceOrderRepo()
        this.sequenceRepo = new SequenceRepo()
        this.userSchema = UserSchema;
        this.itemSchema = ItemSchema;
        this.deliverySchema = DeliverySchema
        this.userRepo = new UserRepo()

    }


    async placeOrderByUserId(params, cart) {
        try {
            console.log(params, cart);
            var date = new Date().toISOString();
            let noOfItems = 0;
            let totalAmount = 0
            let sequence = await this.sequenceRepo.getSequence()
            let count = sequence[0].count
            let count1 = parseInt(count) + 1;
            const orderId = `${date}00${count1}`
            let query = {count: count1}
            await this.sequenceRepo.updateSequence(query);
            const Userquery = [{ $match: { userId: params } }]
            const Userdata = await this.userRepo.getUserById(Userquery)
            const orderData = {
                user: { userid: {}, userName: {}, cart: [] },
                deliveryDetails: {}
            }
            orderData.orderid = orderId
            if (Userdata == 0) {
                return errorcode.INVALID_ID.message`can't find user`
            }
            else {
                orderData.user.userid = Userdata[0].userId;
                orderData.user.userName = Userdata[0].userName;
                for (let i = 0; i < cart.length; i++) {
                    const menuQuery = {
                        itemId: cart[i].itemId
                    }
                    const menuData = await this.itemSchema.findOne(menuQuery, { itemId: 1, itemName: 1, category: 1, price: 1, _id: 0 })
                    if (menuData.length == 0) {
                        return errorcode.REFERENCE_ID_NOT_FOUND_ERROR //`${cart[i].itemId}`
                    }
                    else {
                        noOfItems = ++noOfItems;
                        totalAmount = totalAmount + menuData.price
                        orderData.user.cart.push(menuData)
                    }
                }
                orderData.noOfItems = noOfItems;
                orderData.totalAmount = totalAmount
            }
            const deliveyQuery = { $and: [{ isDeleted: false }, { status: "Available" }] }
            const deliveryData = await this.deliverySchema.findOne(deliveyQuery)
            if (deliveryData.length == 0) {
                return errorcode.FIELD_NOT_PRESENT_ERROR
            }
            else {
                orderData.deliveryDetails = {
                    deliveryPersonId: deliveryData.Id,
                    deliverPersonName: deliveryData.name,
                    deliveryLocation: Userdata[0].location
                }
            }
            const Details = await this.placeOrderRepo.placeOrderByUserId(orderData)
            return Details

        } catch (error) {
            throw error;
        }
    }
}