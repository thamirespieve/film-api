const express = require('express')

//Inicializando o express
const app = express()

const routes = require('./router/index')
//Definindo o tipo de dado a ser recebi pelas requisições
app.use(express.json())
app.use(routes)
//Inicializando a porta
const PORT = 3333
app.listen(PORT, () => console.log(`Inicializando na porta ${PORT}`))
