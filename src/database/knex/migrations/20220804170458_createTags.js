exports.up = knex => knex.schema.createTable("tags", table => {

    table.increments("id");
    table.text("name").notNullable();  // .notNullable() é para não aceitar nulo como resposta
    
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); 
    // vinculando uma note_id
    // .onDelete("CASCADE") = se deletar a nota que a note_id esta vinculada ele automaticamente vai deletar a tag. Em outras palavras, se deletar a nota, a tag vai ser deletada junto
    table.integer("user_id").references("id").inTable("users"); // vinculando uma user_id

});  


exports.down = knex => knex.schema.dropTable("tags"); 
