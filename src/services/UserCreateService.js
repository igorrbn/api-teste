// IMPORTANDO criptografia
const { hash } = require ("bcryptjs"); 

// Importando a AppError
const AppError = require("../utils/AppError");


// Serviço de criação de usuário
class UserCreateService{
    // no momento em que a classe UserCreateService for instanciada (new....)
    // O construtor será executado
    constructor(userRepository){
        this.userRepository = userRepository
        // this.userRepository representa que é o contexto global
    }

    async execute({name, email, password}){
        // CHECANDO SE O EMAIL DIGITADO JÁ EXISTE EM ALGUM LUGAR DA TABELA
        const checkUserExists = await this.userRepository.findByEmail(email) 
        // (?) será substituido pelo email enviado pelo request.
        // Este select faz a conferência se o email já esta em uso por algum usuário
        if (checkUserExists){
            throw new AppError("Este e-mail já está em uso.");
        }
    
    
        // Fazendo a criptografia da senha com um fator de complexidade 8
        const hashedPassword = await hash(password, 8);
    
        // CADASTRO DE USUÁRIOS
        const userCreated = await this.userRepository.create({name, email, password: hashedPassword})

        return userCreated
    }
}


module.exports= UserCreateService