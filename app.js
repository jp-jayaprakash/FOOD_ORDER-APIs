import express from 'express';
import DbConnect from './dbConnect.js';
import routes from './Routes/index.js';

const app = express();
app.use(express.json());
routes(app)

DbConnect()
const port = process.env.PORT;
app.listen (port,()=>{
    console.log(`app is Running on port ${port}`);
})

export default app