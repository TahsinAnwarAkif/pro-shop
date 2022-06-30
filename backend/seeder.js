import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import products from "./data/products.js";
import user from './models/user.js';
import product from './models/product.js';
import Order from './models/order.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async() => {
    try{
        await Order.deleteMany();
        await product.deleteMany();
        await user.deleteMany();

        const createdUsers = await user.insertMany(users);
        const adminId = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return {...product, user: adminId};
        });

        await product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
    }catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async() => {
     try{
        await Order.deleteMany();
        await product.deleteMany();
        await user.deleteMany();

        console.log('Data Destroyed!'.green.inverse);
    }catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] == '-d'){
    destroyData();
}else{
    importData();
}