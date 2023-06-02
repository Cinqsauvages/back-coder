import { MessagesModel } from "../models/messages.model.js"

class MessagesService {
    constructor() {
        this.model = MessagesModel;
    }
    async getMessages() {
        return await this.model.find({}).select('user message');
    }
    async createModelUser(usuario) {
        //crea el usuario con la estructura de model
        console.log(usuario);
        return await this.model.create(usuario);
    }

    async saveMsj(dato) {
        //esta opcion me va pusheando los mensajes, pero no se como imprimirlo en el dom
        /* //recibo el mail y el mensaje, lo tengo que pushear a la base de dato que tenga ese mail.
        let doc = await this.model.findOne({email: dato.email});
        //si el doc existe
        if(doc){
            //pusheo el mensaje al array.
            doc.message.push(dato.msj)
            //lo guardoi
            await doc.save()
        } */

        //esta opcion me los va modificando los mensajes pero se me imprime en el DOM
        let msj = []
        msj.push(dato.msj)
        return await this.model.findOneAndUpdate({ email: dato.email }, { message: msj });

    }
};



const messagesService = new MessagesService();

export default messagesService