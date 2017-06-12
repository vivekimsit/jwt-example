'use strict'

const repository = (db) => {
  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM movie', function (error, results, fields) {
        if (error) {
          return reject(error)
        };
        resolve(results)
      })
    })
  }

  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM movie WHERE id=?', [id], function (error, results, fields) {
        if (error) {
          return reject(error)
        };
        resolve(results)
      })
    })
  }

  const disconnect = () => {
    db.end()
  }

  return {
    getAllMovies,
    getMovieById,
    disconnect
  }
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      return reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
