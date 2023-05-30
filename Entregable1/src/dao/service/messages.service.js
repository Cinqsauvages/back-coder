import { MessagesModel } from "../models/messages.model.js"

class MessagesService{
    constructor(){
        this.model = MessagesModel;
    }
    async getMessages(){
        return await this.model.find();
    }
};



const messagesService = new MessagesService();
export default {messagesService}