class AppError {
    message;
    statusCode;

    constructor(message, statusCode = 400){
        this.message = message; // repassando o message do parametro (this.message) para o escopo global
        this.statusCode = statusCode; // repassando o statusCode do parametro (this.statusCode) para o escopo global
    }
}

module.exports = AppError;