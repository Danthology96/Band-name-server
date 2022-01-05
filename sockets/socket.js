// importación con nombre {}
const {io} = require('../index');
const Bands = require('../models/bands_collection');
const Band = require('../models/band_model');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Black Sabbath'));
bands.addBand(new Band('Megadeth'));
bands.addBand(new Band('Ozzy Osbourne'));


// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands',bands.getBands());


    client.on('disconnect', () => { console.log('Cliente desconectado')});

    client.on('mensaje',(payload)=> {
        
        console.log(payload);
        io.emit('mensaje',{admin: 'Nuevo mensaje'});

    });

    client.on('emit-message',(payload)=> {
        
        console.log(payload);
        io.emit('new-message',payload);

    });

    client.on('add-band',(payload)=> {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band',(payload)=> {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('vote-band',(payload)=>{
        console.log(payload);
        bands.voteBand(payload.id);
        // io es el servidor, significa que manda a todos los que están conectados
        io.emit('active-bands', bands.getBands());
    });

  });
