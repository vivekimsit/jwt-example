'use strict'

const users = [{
  name: 'foo',
  password: 'bar'
}]

const repository = (options) => {
  const fetch = ({name}) => {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.name === name)
      if (!user) {
        reject(new Error('User not found'))
      } else {
        resolve(user)
      }
    })
  }

  const disconnect = () => {
    console.log('Closing connection')
  }

  return {
    fetch,
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
