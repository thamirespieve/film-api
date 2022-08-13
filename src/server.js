require('express-async-errors')

const express = require('express')
const AppError = require('./utils/AppError')

//Inicializando o express
const app = express()
//Buscando o arquivo que contém as rotas
const routes = require('./router/index')

//Definindo o tipo de dado a ser recebi pelas requisições
app.use(express.json())
// Especificando que as rotas serão usadas.
app.use(routes)

//Configurando verficação de erros
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(404).json({
      status: 'Error',
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error'
  })
})

//Inicializando a porta
const PORT = 3333
app.listen(PORT, () => console.log(`Inicializando na porta ${PORT}`))
