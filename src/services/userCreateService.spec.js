const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

// o async está aqui para poder usr o await dentro da função para simular exatamente o funcionamento da aplicação
describe("UserCreateService", () =>{

    // Fazendo uma refatoração. Utilizando o beforeEach para que seja executada antes de cada teste
    // As constantes userRepositoryInMemory e userCreateService são declaradas fora dos testes, para ter um escopo que possa ser utilizado pelos testes
    let userRepositoryInMemory = null;
    let userCreateService = null;

    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    })

    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@teste.com",
            password: "123"
        };
    
        const userCreated = await userCreateService.execute(user)
        
        //debugando
        // console.log(userCreated)
    
        // Espero que o usuário de exemplo criado tenha um objeto com uma propriedade .id
        expect(userCreated).toHaveProperty("id")
    })

    it("user not should be create with exists email ", async () => {
        const user1 = {
            name: "User Teste 1",
            email: "user@test.com",
            password: "123"
        }

        const user2 = {
            name: "User Teste 2",
            email: "user@test.com",
            password: "456"
        }

        await userCreateService.execute(user1)

        // Verificando se vai ser rejeitada a criação de um usuário com email já existente
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."))

    })
})
