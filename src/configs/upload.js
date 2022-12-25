// Importando do próprio node o path
const path = require("path");

// Importando o multer
const multer = require("multer")

// Importando o crypto
const crypto = require("crypto")

// Adicioando o path na constante de TMP_FOLDER (temporary folder)
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

// Pasta onde os arquivos irão ficar
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");


const MULTER = {
    //storage é uma propriedade do multer que é um objeto com locais de destino(destination) e nome do arquivo(filename)
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            // crypto gera um hash aleatório, é utilizado o hash para evitar arquivos com o mesmo nome. Vai garantir cada usuário com um arquivo unico
            const fileHash = crypto.randomBytes(10).toString("hex")

            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename)
        },
    }), 
};



module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}