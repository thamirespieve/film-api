require('express-async-errors')

const express = require('express')

const app = express() //Inicializando o express
const routes = require('./router/index') //Buscando o arquivo que contém as rotas
const AppError = require('./utils/AppError') //Buscando o arquivo que contém a classe de erro
const migration = require('./database/sqlite/migrations/index') //Buscando o arquivo que contém a configuração do banco de dados
const uploadConfig = require('./configs/upload') // Buscando o arquivo de configuração para o upload de imagens

app.use(express.json()) //Definindo o tipo de dado a ser recebi pelas requisições
app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER)) // Recebendo um arquivo estatico
app.use(routes) // Especificando que as rotas serão usadas.

//Inicializando o database
migration()

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
