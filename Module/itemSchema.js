import mongoose from "mongoose";

const IMenuSchema = mongoose.Schema({
    
    itemId:{type:String,require:true},
    itemName:{type:String,require:true},
    category:{type:String,require:true},
    price:{type:Number, require:true},
    isDeleted:{type:Boolean,require:false}
})

export default mongoose.model("IMenu",IMenuSchema)