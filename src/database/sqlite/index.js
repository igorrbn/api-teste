// importando o sqlite3
const sqlite3 = require("sqlite3");
// importando o sqlite
const sqlite = require("sqlite");

// biblioteca para melhorar a obtenção de endereçõs em qualquer ambiente
const path = require("path");


// Criando uma função assincrona
async function sqliteConnection() {
    const database = await sqlite.open({
        filename:  path.resolve(__dirname, "..", "database.db"),         
        // Propriedade pra dizer onde o arquivo ficará salvo
        driver: sqlite3.Database
    });
    
    return database;
}

// Exportando a função sqliteConnection que será utlizada no server.js
module.exports = sqliteConnection;