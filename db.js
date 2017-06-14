'use strict'

let bookshelf = null

const connect = (opts) => {
  const knex = require('knex')({
    client: 'mysql',
    connection: opts.dbSettings()
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
