import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodb_url = process.env.MONGODB_URL;

const ConnectedDB = async()=>{
    try {
        const dblink = await mongoose.connect(mongodb_url);
        console.log(`Data bases is connected at ${mongodb_url}`.bgGreen.bold);
    } catch (error) {
        console.log(error);
    }
};

export default ConnectedDB;