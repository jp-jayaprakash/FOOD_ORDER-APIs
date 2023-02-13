import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userId:{type: String,require:true},
    userName:{type: String, require: true},
    location:{type: String},
    isDeleted:{type:Boolean, require: false}
   
})

export default mongoose.model("UserDetails",UserSchema)