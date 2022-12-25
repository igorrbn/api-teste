// importando o app
const { Router } = require("express");

// Importando o multer para fazer o upload das imagens
const multer = require("multer")

// Importando o uploadConfig
const uploadConfig = require("../configs/upload")

// Importando o controller
const UsersController = require("../controllers/UsersController");

// Importando o controller de avatar
const UserAvatarController = require("../controllers/UserAvatarController");

// IMportando o middlware de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRoutes = Router();

// upload será a constante de inicialização do multer com as configurações
const upload = multer(uploadConfig.MULTER)

// Instanciando
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

// MÉTODO POST
usersRoutes.post("/", userController.create);

// ADICIONANDO UMA NOVA ROTA
usersRoutes.put("/", ensureAuthenticated, userController.update)
// qnd for acessada a rota, entrará o ensureAuthenticated para verificar e só depois (next) irá para o update

// Atualizando um campo específico. Neste caso, o campo de avatar
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

// Exportando
module.exports = usersRoutes;