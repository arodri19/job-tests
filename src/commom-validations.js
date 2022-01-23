const { InvalidArgumentError } = require('./errors');
const dayjs = require('dayjs')


module.exports = {
  stringNotEmpty(value, name){
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${name}!`);
  },
  stringMinLength(value, name, min){
    if (value.length < min)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser maior que ${min} caracteres!`
      );
  },
  stringMaxLength(value, name, max){
    if (value.length > max)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser menor que ${max} caracteres!`
      );
  },
  stringCheckDate(value, name){
    if(!dayjs(value).isValid()){
      throw new InvalidArgumentError(
        `O campo ${name} não foi preenchida corretamente`
      );
    }
  }
};
