import mongoose from "mongoose";

const empSchema = mongoose.Schema(
    {
        image : {
            type : Buffer,
            required : true
        },
        username : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique: true,
        },
        mobileno : {
            type : Number,
            required : true,
            unique: true
        },
        designation : {
            type : String,
            required : true
        },
        gender : {
            type : String,
            required : true
        },
        coursename : {
            type : String,
            required : true
        }
        
    },
    {timestamps : true}
);

const empmodels = mongoose.model('empdata', empSchema);

export default empmodels;