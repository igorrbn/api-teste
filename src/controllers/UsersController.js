// IMPORTANDO criptografia
const { hash, compare } = require ("bcryptjs"); 

// Importando a AppError
const AppError = require("../utils/AppError");

// Importando a conexão com o banco de dados
const sqliteConnection = require ("../database/sqlite")

const UserRepository = require("../repositories/UserRepository")

const UserCreateService = require("../services/UserCreateService")

/*
    A classe permite que tenha várias funções dentro, no máximo 5
 
    5 Métodos
    - index = GET para listar vários registros.
    - show = GET para exibir um registro específico.
    - create = POST para poder criar um registro.
    - update = PUT para atualizar um registro.
    - delete = DELETE para poder remover um registro.
*/

class UsersController {
    // A classe já sabe que create é um método por isso não precisa do FUNCTION
     async create(request, response){
    // Obtendo as informações passadas pelo método POST
    const { name, email, password } = request.body;

    const userRepository = new UserRepository() // instancia o repositório do banco de dados
    const userCreateService = new UserCreateService(userRepository) // passa para dentro da createService o banco de dados que será utiizado

    await userCreateService.execute({ name, email, password }); // executa a função execute que irá pegar o user repository passado acima para dentro do construtor e consequentemente para dentro da função execute

    return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id

        const database = await sqliteConnection();
        // Selecionando o usuário apartir de sua primary key (id)
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        // Caso o usuário não exista (!user)
        if(!user){
            throw new AppError("Usuário não encontrado");
        }

        // Conferindo se o usuário não está tentando trocar o email para um email já em uso
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email =(?)", [email]);

        // Se encontrar esse email e esse email do id for diferente da id do usuário
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError ("Este e-mail já está em uso.")
        }

        user.name = name ?? user.name;  // ?? significa  que se não houver conteúdo no novo name, será deixado o que já estava lá no banco de dados (OU É NAME OU É USER.NAME)
        user.email = email ?? user.email;

        // ALTERANDO A SENHA
        // Se não for informado a senha antiga:
        if( password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para poder criar uma nova senha.");
        }

        // Se tanto a nova senha quanto a senha antiga forem informados
        if( password && old_password){
            const checkOldPassword = await compare(old_password, user.password); 
            // user.password = password de dentro do usuário

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password,8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
            );
        
        return response.status(200).json();
        
    }
}

module.exports = UsersController;