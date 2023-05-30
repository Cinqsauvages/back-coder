import { Router } from "express";
import messagesService from '../dao/service/messages.service.js'

const messagesRouteAtlas = Router();

messagesRouteAtlas.get('/', (req,res) => {
    res.send('estamos en message')
})

export {messagesRouteAtlas};