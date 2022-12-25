const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');

async function migrationsRun(){
    const schemas = [
        createUsers // é a tabela
    ].join(''); // Join para juntar todas as migration

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;