import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

let URL = process.env.MONGO;

const MongoConnect = async () => {
    

    try {
        
        await mongoose.connect(URL);
        console.log("CONNECTION TO DATABASE SUCCESS");
        

    } catch (error) {
        console.error("HAS PROBLEM OCURRED THE CONNECTION TO MONGO : ",error);
        
    }

}

export default MongoConnect;