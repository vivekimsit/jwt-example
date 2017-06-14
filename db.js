'use strict'

let bookshelf = null

const connect = (options) => {
  const knex = require('knex')({
    client: 'mysql',
    connection: options.dbSettings()
  })
  return new Promise((resolve, reject) => {
    try {
      if (!bookshelf) {
        bookshelf = require('bookshelf')(knex)
      }
      resolve(bookshelf)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = Object.assign({}, {connect})
