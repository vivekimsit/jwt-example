'use strict'

const repository = (bookshelf) => {
  const Movie = bookshelf.Model.extend({
    tableName: 'movie'
  })

  const getAllMovies = () => {
    return Movie.fetchAll()
  }

  const getMovieById = (id) => {
    return new Movie({'id': id}).fetch()
  }

  const disconnect = () => {
    console.log('Closing connection')
    bookshelf.knex.destroy()
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
