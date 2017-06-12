'use strict'

const config = require('./config')
const repository = require('./repository')
const server = require('./server')
const database = require('./db')

// verbose logging when we are starting the server
console.log('--- Movies Service ---')
console.log('Connecting to movies repository...')

// log unhandled execpetions
process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

database.connect(config)
    .then((connection) => {
      return repository.connect(connection)
    })
    .then((repo) => {
      console.log('Repository connected, starting server.')
      return server.start({port: config.server.port, repo})
    })
    .then((app) => {
      console.log(`Server started succesfully, running on port ${config.server.port}`)
      app.on('close', () => {
        repository.disconnect()
      })
    })
    .catch((err) => console.log(err))
