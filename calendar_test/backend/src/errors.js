class InvalidArgumentError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'InvalidArgumentError';
  }
}

class InternalServerError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'InternalServerError';
  }
}

class NotFound extends Error{
  constructor(entidade){
    const mensagem = `${entidade} not found`
    super(mensagem)
    this.name = 'NotFound'
  }
}


module.exports = {
  InvalidArgumentError: InvalidArgumentError,
  InternalServerError: InternalServerError,
  NotFound: NotFound,
};
