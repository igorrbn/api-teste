const knex = require("../database/knex");

class TagsController{
    async index(request, response){
        const user_id = request.user.id;
 

        const tags = await knex("tags") // knex ir na tabela de tags
            .where({ user_id }) // e filtra onde seja igual ao user_id
            .groupBy("name") // agrupando as tags por nome iguais
        return response.json(tags)
    }
}


module.exports = TagsController;