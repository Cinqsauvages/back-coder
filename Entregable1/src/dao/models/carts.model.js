import mongoose from "mongoose";


const cartsSchema = new mongoose.Schema({
    products:{
        id: String,
        quantity: Number
    }
});


export const CartsModel = mongoose.model('carts', cartsSchema); 