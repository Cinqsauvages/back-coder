const socket = io();
//este socket es el que se usa para poder comunicarse con el servidor

socket.emit('message', 'me estoy comunicando desde websocket')