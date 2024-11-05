import mongoose from "mongoose";

const SchemaUser = new mongoose.Schema({
    name : {
        type: String,
        require: true
    },

    username : {
        type: String,
        require: true
    },

    email : {
        type : String,
        require: true
    },

    password : {
        type : String,
        reuqire : true
    },
    image : {
        type : String
    }
})

const ModelUser = mongoose.model("users", SchemaUser)

export default ModelUser