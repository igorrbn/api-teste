// Buscando o arquivo de configuração do KNEX
const config = require ( "../../../knexfile");

// Fazendo o import do knex
const knex = require("knex");

// criando a conexão
const connection = knex(config.development);


// exportando a connection para ser utilizada em outros lugares
module.exports = connection;