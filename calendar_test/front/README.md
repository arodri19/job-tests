# Projeto Frontend Calendario
Criação do frontend do calendario utilizando vuejs e vuetify, utilizando o gerenciador de estados vuex e vue-router para rotas

## Instalação
```
npm i
```

### Executar local com hot-reload
```
npm run serve
```

### Executar para publicar em um servidor
Antes de executar esse passo, precisa modificar o arquivo vue.config.js e deixar o endereço de acordo com o servidor em que for hospedar, se não, não vai encontrar os recursos
```
npm run build
```

## Estrutura componentes
- main.js (inicia o projeto)
    - App.vue
        - Calendar
            - CalendarMonthYearSelected.vue
            - CalendarMonthSelector.vue
            - CalendarHeader.vue
            - CalendarMonthDay.vue
                - CalendarMonthDayCreate.vue
                - CalendarMonthDayEdit.vue

## Detalhes adicionais
- O Projeto funciona sem o backend para verificar as funcionalidades basicas de cadastro, edição e remoção de atividades do calendário, porque utiliza o gerenciador de estado do vuex, por isso que aparece a mensagem de offline. Para funcionar de acordo, utilizar esse projeto em paralelo.
[Projeto Backend Calendario](https://github.com/arodri19/calendar_test_backend)

- caso queira visualizar a parte estatica do site, está hospedado no github pages
[Projeto Front Calendario Github pages](https://arodri19.github.io/calendar_test/#/)

## Tecnologias utilizadas - gerais
- vue
- vuetify
- vue-router
- vuex
- dayjs
