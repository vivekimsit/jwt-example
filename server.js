'use strict'

const bodyParser = require('body-parser');
const express = require('express')
const helmet = require('helmet')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')

const movieAPI = require('./api/movies')
const userAPI = require('./api/users')
const auth = require('./auth')

const start = (options) => {
  options.jwt = jwt
  return new Promise((resolve, reject) => {
    // we need to verify if we have a repository added and a server port
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }
    // let's init a express app, and add some middlewares
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use(bodyParser.urlencoded({ extended: false }));

    userAPI(app, options)

    app.use(auth(options))
    app.use((err, req, res, next) => {
      console.log(err)
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    // we add our API's to the express app
    movieAPI(app, options)

    // finally we start the server, and return the newly created server
    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})
