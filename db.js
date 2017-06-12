'use strict'

const mysql = require('mysql')

const connect = (opts) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(opts.dbSettings())
    connection.connect((error) => {
      if (error) {
        return reject(error)
      }
      resolve(connection)
    })
  })
}

module.exports = Object.assign({}, {connect})
