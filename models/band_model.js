const {v4:uuidV4} = require('uuid');

class Band {
    // constructor de la clase
    constructor(name = 'no-name'){

        this.id = uuidV4(); // identificador único
        this.name = name;
        this.votes = 0;
    }
}
// en nodejs hay que exportar manualmente la clase para usar la clase
module.exports = Band;