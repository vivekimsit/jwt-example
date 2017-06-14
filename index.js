'use strict'

const config = require('./config')
const movieRepo = require('./repository/movie')
const userRepo = require('./repository/user')
const server = require('./server')
const database = require('./db')

// log unhandled execpetions
process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

const start = () => {
  let rep

  // verbose logging when we are starting the server
  console.log('--- Movies Service ---')
  console.log('Connecting to movies repository...')

  database.connect(config)
      .then((connection) => {
        return Promise.all([
          movieRepo.connect(connection),
          userRepo.connect(connection)
        ])
      })
      .then(([repo, userRepo]) => {
        rep = repo
        console.log('Repository connected, starting server.')
        return server.start({
          port: config.server.port,
          secret: config.server.secret,
          repo,
          userRepo
        })
      })
      .then((app) => {
        console.log(`Server started succesfully, running on port ${config.server.port}`)
        app.on('close', () => {
          rep.disconnect()
        })
      })
      .catch((err) => console.log(err))
}

start()
