import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema({
        seqId:{type:String, 
            require:true
        },
        count:{type:String,
            require:true,
            default:0
        }
})
export default mongoose.model("SEQ",sequenceSchema)