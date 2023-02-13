import mongoose from "mongoose";

const DeliverDetails = mongoose.Schema({
    Id:{type: String, require: true},
    
    name:{type: String, require: true},

    age: {type: Number, require: true},

    gender:{type: String, require: true},

    status:{type: String, require: true},

    isDeleted:{type:Boolean, require: false}
 
})
export default mongoose.model('DP_Details',DeliverDetails)