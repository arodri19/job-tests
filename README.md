# Projeto Backend Calendario

Criação do backend do calendario utilizando nodejs e express com banco de dados sqlite, mas que pode ser modificado para utilizar outros bancos por estar utilizando o sequelize

## Instalação

```bash
npm i
```

## Carregar o banco base
```
npx sequelize-cli db:migrate
```

Caso não tenha a pasta migrations

```
#inicializa os arquivos ORM do sequelize
npx sequelize-cli init

#cria os modelos de banco
npx sequelize-cli model:create --name Reminders --attributes title:string,reminder:string,hourMinuteBegin:time,hourMinuteEnd:time,date:date

#Efetiva a execução no banco
npx sequelize-cli db:migrate
```

## Execução

modo debug com nodemon
```
npm run nodemon
```

modo sem debug
```
npm run start
```

## Estrutura arquivos
- Server.js = Inicialização do serviço
    - app.js = configuração do servidor express
    - routes
        - controller
            - model
                - dao


## Tecnologias utilizadas
- express (body-parser, cors, dayjs, dot-env)
- sequelize
- sqlite3





