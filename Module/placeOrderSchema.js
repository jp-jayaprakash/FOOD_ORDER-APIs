import mongoose from "mongoose";

const PlaceOrderSchema = new mongoose.Schema({
    orderid:{type:String, require:true},
        user:{
                userid:{type:String, require:true},
                userName:{type:String, require:true},
             
        cart:
            [ {
                itemid:{type:String, require:true},
                itemName:{type:String, require:true},
                category:{type:String, require:true},
                price:{type:String, require:true}
             }
            ]
    },
            deliveryDetails:
            {

                deliveryPersonId:{type:String, require:true},
                deliverPersonName:{type:String, require:true},
                deliveryLocation:{type:String, require:true}
            },
    
    noOfItems:{type:String, require:true},
    totalAmount:{type:String, require:true},
    isDeleted:{type:String, require:true}

})

export default mongoose.model("PO-Details",PlaceOrderSchema)