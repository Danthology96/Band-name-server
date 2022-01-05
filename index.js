// parecido a una importación en flutter
const express = require('express');
const path = require('path');
require('dotenv').config();

// aplicación de express
const app = express();

// Node sockets server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// directorio publico (para cuando se emigre a un dominio y se tenga que actualizar 
// puerto constantemente)
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (error)=>{
    if ( error ) throw new Error(error);
    console.log(`Servidor corriendo en puerto`, process.env.PORT);
});
