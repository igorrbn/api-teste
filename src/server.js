// importando a biblioteca para tratamento de erros
require("express-async-errors");

require("dotenv/config") // importando o dotenv para ter acesso as variáveis de ambiente

const migrationsRun = require("./database/sqlite/migrations") // importando a database
const uploadConfig = require("./configs/upload") // Importando as configurações de upload

const cors = require("cors")

const AppError= require("./utils/AppError") // Importando o AppError

const express = require("express");
const routes = require("./routes") // acessando a pasta routes e carregando index.js como padrão

migrationsRun();

const app = express();
app.use(cors())
app.use(express.json());

// Buscando o arquivo da foto do usuário
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next ) => {
    if(error instanceof AppError){
        // Se o erro acontecer no client side
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.log(error); // Apenas para poder debugar melhor o código
    
    // se o erro não for no client side, será emitido um erro padrão
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

// || é para definir um valor "default"
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on Port: ${PORT}`));