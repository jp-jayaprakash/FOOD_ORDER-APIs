import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

async function DbConnect(){

    mongoose.set('strictQuery', false);
    const connect = await mongoose.connect(process.env.DB_CONNECTION)
    console.log(`DB connction sucessful ${connect.connection.host}`);
} 
export default DbConnect;

