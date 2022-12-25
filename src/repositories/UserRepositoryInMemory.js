class UserRepositoryInMemory{
    users = [];

    async create({name, email, password}){
        const user = {
            //Math.floor(Math.random()*100)+1 -> gerando um número
            id: Math.floor(Math.random()*100)+1.,
            email,
            name,
            password
        };

        this.users.push(user);

        return user;
    }

    async findByEmail(email){
        return this.users.find(user => user.email === email)
    }
}

module.exports=UserRepositoryInMemory;