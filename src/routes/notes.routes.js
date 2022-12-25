// importando o app
const { Router } = require("express");

// Importando o controller
const NotesController = require("../controllers/NotesController");

// IMportando o middlware de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const notesRoutes = Router();


// Instanciando
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated); // aplicado o middleware para todas as rotas


// MÉTODO POST
notesRoutes.post("/", notesController.create);
// MÉTODO GET
notesRoutes.get("/:id", notesController.show); // show é o nome da função
// MÉTODO DELETE
notesRoutes.delete("/:id", notesController.delete); // delete é o nome da função
// MÉTODO GET
notesRoutes.get("/", notesController.index); // index é o nome da função, e como é passado como query, basta o "/"


// Exportando
module.exports = notesRoutes;