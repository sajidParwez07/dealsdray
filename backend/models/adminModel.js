import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        adminname : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique: true,
        },
        password : {
            type : String,
            required : true
        },
        confirmpassword : {
            type : String,
            required : true
        }
        
    }
);

const models = mongoose.model('admindata', adminSchema);

export default models;