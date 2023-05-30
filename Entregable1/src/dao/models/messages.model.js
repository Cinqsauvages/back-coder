import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    user:{
        type:String,
        unique: true
    },
    message: String
});

export const MessagesModel = mongoose.model('messages', messagesSchema); 