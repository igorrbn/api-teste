// Importando a conexão com o banco de dados
const knex = require ("../database/knex");

// Importando mensagens de erro
const AppError = require("../utils/AppError");

// Importando uma função do BCRYPT para fazer a comparação das senhas criptografadas
const { compare } = require("bcryptjs");

// Importando a configuração de JSW criada em configs/auth.js
const authConfig = require("../configs/auth")

// Importando um método de dentro do jsonwebToken
const { sign } = require ("jsonwebtoken")

class SessionsController {
    async create(request, response){
        const { email, password } = request.body

        const user = await knex("users").where({email}).first();
        // Usando o knex para acessar a tabela de users e fazer um filtro de email


        // Fazendo a validação
        // Caso o usuário não exista
        if (!user){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        // Fazendo a comparação da senha digitada com a senha que tem cadastrada no banco de dados
        // É aproveitado o user.password porque o user já foi até o banco de dados e já tem esse dado
        const passwordMatched = await compare(password, user.password)


        // Fazendo a verificação da senha digitada
        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }


        // ---------------------------------JWT----------------------
        // Buscando os dados do objeto criado dentro de auth.js
        const { secret, expiresIn } = authConfig.jwt

        // Criando o token
        const token = sign({}, secret, {
            subject: String(user.id), // Inserindo dentro do token o id
            expiresIn // validade do token
        })

        // testando
        return response.json({user, token})
    }
}

module.exports  = SessionsController;