// Importando a função verify do jsonwebtoken
const { verify } = require('jsonwebtoken')

// Importando o AppError
const AppError = require("../utils/AppError")

// Importando as configurações de autenticação
const authConfig = require("../configs/auth")

// middleware sempre precisa do next
function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization; // request.headers.authorization é o local que se encomtra o token de autorização

    // verificação se o token não existe
    if (!authHeader){
        throw new AppError("JWT Token não informado", 401);
    }

    // Caso o token exista
    const [, token] = authHeader.split(" ") // Fazendo a separação quando houver um espaço e adicionando em um vetor (chamado de token) que é a segunda posição
    // primeira posição do vetor é omitida

    try{
        // verificando se é um token válido
        const { sub: user_id } = verify(token, authConfig.jwt.secret);
        // Desestruturando o verify e buscando o parâmetro SUB e dizendo que sub é user_id (um apelido) agora

        // criando .user com propriedade chamada id e adicionando o user_id que veio do verify
        request.user = {
            id: Number(user_id),
        };

        // chamando a próxima função
        return next();
    } catch{
        // caso o token seja inválido
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;