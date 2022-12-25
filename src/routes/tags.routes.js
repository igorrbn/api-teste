// importando o app
const { Router } = require("express");

// Importando o controller
const TagsController = require("../controllers/TagsController");

// IMportando o middlware de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const tagsRoutes = Router();


// Instanciando
const tagsController = new TagsController();


tagsRoutes.get("/", ensureAuthenticated, tagsController.index); 


// Exportando
module.exports = tagsRoutes;